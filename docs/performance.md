# Performance — medição e como o Giovanni repete sozinho

## (a) Resultados medidos

**Medição: 21/09/2026.**
**Ferramenta:** Lighthouse 13.5.0, Chromium 141.0.7390.37 headless, perfis mobile (throttling 4G simulado) e `--preset=desktop`.
**URL alvo:** build de produção servido localmente por `astro preview` em `http://localhost:4321/`.

> **Por que localhost e não a URL pública.** Todo tráfego HTTPS deste container passa por um proxy que reterminaliza TLS com uma CA própria. Ferramentas de linha de comando confiam nessa CA por variável de ambiente, mas o Chromium usa o Chrome Root Store embutido e não a lê — o Lighthouse morria em `net::ERR_CERT_AUTHORITY_INVALID` antes de abrir a página. Instalar a CA no sistema seria enfraquecer a validação de TLS do ambiente, então a saída foi servir o `dist/` por HTTP puro, o que evita a interceptação por completo. **O bundle medido é exatamente o que vai para produção.**
>
> **A ressalva que isso impõe:** em localhost o TTFB é ~10 ms, contra ~297 ms medidos na produção (GitHub Pages/Fastly). Some ~0,3 s ao LCP para estimar o número real. O que a medição local mede com fidelidade é o **caminho de renderização** — ordem de recursos, bloqueio de thread, estabilidade de layout —, que é onde os problemas de performance de verdade moram.

### Notas

| Categoria | Mobile | Desktop |
|---|---|---|
| **Performance** | **100** | **100** |
| Acessibilidade | 95 | 95 |
| Práticas recomendadas | 100 | 96 |
| SEO | **100** | **100** |

### Métricas de laboratório

| Métrica | Mobile | Desktop | Limiar "bom" |
|---|---|---|---|
| LCP | 1,7 s | 0,3 s | ≤ 2,5 s |
| CLS | 0 | 0,007 | ≤ 0,10 |
| TBT (proxy de INP) | 40 ms | 0 ms | ≤ 200 ms |
| FCP | 1,2 s | 0,3 s | ≤ 1,8 s |
| Speed Index | 1,3 s | 0,4 s | ≤ 3,4 s |
| Time to Interactive | 1,7 s | 0,3 s | — |

Mesmo somando os ~300 ms de TTFB real da produção, o LCP mobile fica em torno de **2,0 s** — dentro da faixa boa, com folga.

### A hipótese do gargalo em WebGL está derrubada

A hipótese era que o custo de execução do campo de partículas WebGL dominaria o TBT/INP em mobile. **Os dados derrubam isso**, e o código explica por quê.

Em `src/components/site/Hero.astro` (~linha 212) o `import()` de `src/lib/three-subset.ts` é pulado em **três** condições: `prefers-reduced-motion: reduce`, `navigator.connection.saveData` e **`max-width: 760px`**. Ou seja, abaixo de 760px o three.js nunca é sequer baixado — o comentário no código diz que o campo fica atrás do véu escuro e é quase invisível em tela pequena, então o custo é cortado inteiro em vez de renderizado em versão reduzida.

Resultado: TBT de **40 ms** em mobile e **0 ms** em desktop, ambos muito abaixo do limiar de 200 ms. Não há gargalo de main thread para atacar. **Nenhuma otimização de performance é necessária neste momento** — mexer no three.js agora seria otimizar o que já não custa nada.

### O que de fato apareceu (não é performance)

Performance está resolvida; o que as auditorias acharam são outras coisas, e duas são reais:

1. **Contraste de cor — acessibilidade, WCAG AA (afeta os dois perfis).** É o achado mais relevante, porque atinge o CTA principal:
   - `.hd__cta` e `.tz-btn` ("Iniciar diagnóstico"): branco `#ffffff` sobre laranja `#e85a25` dá **3,54:1**; o mínimo AA para texto normal é 4,5:1.
   - `.tz-eyebrow__label` em fundo claro: `#94a3b8` sobre `#f6f8fc` dá **2,41:1** — bem abaixo do mínimo.
   - `.tz-eyebrow__n` / `.help__n`: laranja `#e85a25` sobre `#f6f8fc` dá **3,33:1**.

   Não é só conformidade: é legibilidade real do botão que gera o lead, sob sol, em tela de celular barata. Corrigir sem perder a identidade de marca costuma significar escurecer o laranja **apenas quando ele é texto ou fundo de texto pequeno**, mantendo o tom atual nos elementos decorativos.

2. **Ordem de cabeçalhos** — existe um `<h4>` que quebra a sequência descendente. Conta como acessibilidade e também como sinal de estrutura semântica para buscadores.

3. **JavaScript não usado (só desktop, nota 50)** — `three-subset.js` tem 129 KB, dos quais ~81 KB não são executados. Como o chunk é carregado por `import()` dinâmico e fora do caminho crítico, **não afeta LCP nem TBT** (as notas 100 comprovam). É dívida técnica de baixa prioridade, não um problema de performance.

4. **Erro de console em WebGL (`THREE.WebGLRenderer: A WebGL context could not be created`)** — **isto é artefato da medição, não defeito do site.** O Chromium rodou com `--disable-gpu` em container sem GPU, então o contexto WebGL não existia para ser criado. Num navegador real com GPU isso não acontece. Foi o que derrubou "Práticas recomendadas" de 100 para 96 no desktop. Ignorar.

### Contexto de rede já medido (não é do Lighthouse)

| Recurso | Comprimido | Bruto |
|---|---|---|
| HTML da home | 16.085 B | 78.867 B |
| CSS (3 arquivos) | 9.993 B | 43.363 B |
| JS do Hero | 2.702 B | 5.902 B |
| TTFB (GitHub Pages/Fastly) | ~297 ms | — |

Payload crítico ~29 KB comprimido — enxuto para qualquer padrão. O three.js (chunk separado, 129 KB) não entra nesse total porque é carregado sob demanda e fora do caminho crítico. Isso é coerente com as notas 100 de performance acima: não há peso de rede nem execução de JS competindo com a renderização inicial.

---

## (b) Guia para repetir a medição

Você é o dono do site — pode (e deve) medir você mesmo, com dados melhores do que os deste ambiente: dados de campo reais.

### 1. PageSpeed Insights (pagespeed.web.dev)

Cole `https://trevizzosolucoes.com.br/`. O relatório tem **dois blocos que medem coisas completamente diferentes** — é o ponto que mais gera confusão:

| Bloco | O que é | Fonte | O que representa |
|---|---|---|---|
| "Descubra o que seus usuários reais estão enfrentando" | **Dados de campo** | CrUX (Chrome UX Report) — telemetria agregada de usuários reais do Chrome, últimos 28 dias | O que de fato conta para o ranqueamento do Google (Core Web Vitals) |
| "Diagnosticar problemas de desempenho" | **Dados de laboratório** | Lighthouse — uma execução sintética, single-run, em condições de rede/CPU simuladas | Diagnóstico técnico, útil para achar a causa, mas não é o que o Google usa para ranquear |

**Um site novo (como este, com poucos meses de vida) normalmente não tem bloco de campo — ele aparece vazio ou com a mensagem "A CrUX não tem dados suficientes".** Isso é esperado, não é erro: o CrUX exige volume mínimo de tráfego real do Chrome ao longo de 28 dias para publicar um resultado por URL/origem. Não confunda "sem dados de campo" com "site com problema".

### 2. Google Search Console

Menu lateral → **Core Web Vitals** (visão resumida por status: bom/precisa melhorar/ruim) e **Experiência na página**. Os dois relatórios separam **mobile** e **desktop**, e agrupam por padrões de URL — é a mesma fonte CrUX do PageSpeed, mas com histórico e agrupamento por página, então é mais útil para achar quais URLs específicas estão ruins.

### 3. Chrome DevTools

- Aba **Lighthouse** (F12 → Lighthouse): mesma engine do PageSpeed, mas rodando no seu navegador local, sem fila nem cota da API pública.
- Aba **Performance** com o painel de **Core Web Vitals** ativado, ou a extensão abaixo: mostra LCP/CLS ao vivo enquanto você navega — medição local real, não simulada, mas ainda é você (um usuário), não uma amostra de usuários reais.

### 4. Extensão Web Vitals (Chrome Web Store)

É o único jeito prático de medir **INP de verdade** no dia a dia. Diferença importante: **INP exige interação humana real** (clique, toque, tecla) para existir como métrica — não dá para simular com um script headless. O Lighthouse, que roda sem interação nenhuma, não consegue medir INP; ele reporta **TBT (Total Blocking Time)** como um *proxy* de laboratório, uma estimativa de quanto a thread principal ficaria bloqueada, não a experiência real de resposta a um clique. TBT e INP correlacionam, mas não são a mesma coisa — um TBT baixo não garante um INP bom se, por exemplo, um clique específico dispara um handler pesado que o TBT sintético não exercitou.

A extensão mostra LCP, INP e CLS em tempo real, com o valor real de cada interação sua, direto no site em produção.

---

## (c) O que colar no chat comigo

Quando for me passar um resultado de performance, cole sempre **os quatro contextos** — mobile e desktop, campo (CrUX) e laboratório (Lighthouse) — nunca um número solto. A razão é simples: um "LCP de 3,2s" sem dizer se é campo ou laboratório, mobile ou desktop, pode levar a otimizar a coisa errada (por exemplo, mexer em CSS crítico por causa de um número de laboratório desktop quando o problema real é campo mobile, ou vice-versa).

### Tabela de limiares (Core Web Vitals)

| Métrica | Bom | Precisa melhorar | Ruim |
|---|---|---|---|
| LCP | ≤ 2,5 s | 2,5 – 4,0 s | > 4,0 s |
| INP | ≤ 200 ms | 200 – 500 ms | > 500 ms |
| CLS | ≤ 0,10 | 0,10 – 0,25 | > 0,25 |

### Bloco para copiar e colar

```
URL testada:
Data/hora do teste:

--- CAMPO (CrUX — PageSpeed Insights ou Search Console) ---
Mobile:  LCP=___  INP=___  CLS=___   (ou "sem dados de campo suficientes")
Desktop: LCP=___  INP=___  CLS=___   (ou "sem dados de campo suficientes")

--- LABORATÓRIO (Lighthouse) ---
Mobile:  Performance=___/100  SEO=___/100  Best Practices=___/100  Acessibilidade=___/100
         FCP=___  LCP=___  TBT=___  CLS=___  Speed Index=___  TTI=___
Desktop: Performance=___/100  SEO=___/100  Best Practices=___/100  Acessibilidade=___/100
         FCP=___  LCP=___  TBT=___  CLS=___  Speed Index=___  TTI=___

--- Oportunidades reportadas pelo Lighthouse (com economia estimada) ---
- [nome da auditoria]: economia estimada de ___ ms
- ...
```

Quanto mais completo esse bloco, menos eu preciso adivinhar em que perfil e em que fonte o número se baseia — e menos risco de otimizar o alvo errado.
