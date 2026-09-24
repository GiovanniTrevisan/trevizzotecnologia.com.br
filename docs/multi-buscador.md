# Indexação multi-buscador — o site só aparece no Google

Runbook do que só o Giovanni pode fazer, porque exige login nas contas dele (Bing Webmaster Tools, Brave, Yandex). Nada aqui pode ser automatizado por um agente sem credenciais pessoais.

## Diagnóstico (fechado — não precisa reinvestigar)

**O que foi verificado nesta sessão:**

- `site:trevizzosolucoes.com.br` no Bing retorna **zero resultados** — o site não está no índice do Bing.
- **Não é bloqueio técnico.** Confirmado:
  - `curl` com `User-Agent: bingbot/2.0` recebe **HTTP 200 em ~297 ms**.
  - `curl` com `User-Agent: DuckDuckBot` idem.
  - `public/robots.txt` não bloqueia nenhum bot — é um `Allow: /` amplo, inclusive com entradas explícitas para bots de IA (GPTBot, ClaudeBot, PerplexityBot etc.).
  - `http://` e o `www.` fazem 301 correto para o canonical HTTPS sem `www`.
- **Causa real:** o domínio é novo (`foundingDate` abril/2026), **nunca foi submetido ao Bing Webmaster Tools**, e tem perfil de backlinks próximo de zero. O Bing pesa autoridade de domínio e links de entrada muito mais que o Google na decisão de indexar (ou não) um domínio desconhecido — mesmo que o crawler consiga acessar o site sem problema nenhum.
- **Por que isso derruba vários buscadores de uma vez:** DuckDuckGo usa 100% o índice do Bing para resultados web (tem sua própria UI e algumas fontes extras, mas o índice de páginas é do Bing). Yahoo, Ecosia, AOL e parte do Qwant também vêm da mesma origem. Resolver o Bing resolve esse grupo inteiro de uma vez. **Brave Search é caso à parte** — tem índice independente, próprio, alimentado pelo Web Discovery Project, e precisa de submissão separada.
- **Por que só o Google funciona:** só o Google foi avisado. A tag `<meta name="google-site-verification">` está no `<head>` (`src/layouts/Layout.astro`), ou seja, o Search Console foi configurado e o Google sabe que o site existe e tem um sitemap para consultar. Não existe equivalente disso para nenhum outro buscador — não é que os outros rejeitaram o site, é que nunca foram avisados dele.
- **Prazo realista depois de resolver o Bing:** DuckDuckGo, Yahoo e Ecosia tipicamente refletem o índice do Bing em 1 a 4 semanas após a submissão. Brave é mais lento e menos previsível, por rodar um pipeline de indexação próprio.

## Passo a passo

### 1. Bing Webmaster Tools (bing.com/webmasters) — **este é o passo que resolve o problema**

- Entre com a conta Microsoft e escolha **"Importar do Google Search Console"** → autorizar o acesso.
- O domínio entra **já verificado**, com os sitemaps já reconhecidos — não precisa adicionar nenhuma tag nova no `<head>` do site nem editar nada no repositório. É reaproveitar a verificação que o Google já tem.
- Depois de importado:
  - **Sitemaps** → confirmar que `sitemap-index.xml` foi detectado e está sendo lido sem erro.
  - **URL Inspection** → colar a home (`https://trevizzosolucoes.com.br/`) e clicar em **Request Indexing**.

Sem esse passo, nada mais na lista funciona — é o ponto de entrada.

### 2. IndexNow

Na mesma ferramenta do Bing Webmaster Tools, há uma seção IndexNow onde se cola a chave pública do site: `f5975d6a13f055a1ab5064aa4e4dd10a`. (O arquivo de verificação `public/f5975d6a13f055a1ab5064aa4e4dd10a.txt` e o step de notificação no GitHub Actions já estão no repositório — nada a fazer do lado do código, só confirme que a chave bate quando a ferramenta pedir para validar.)

Em uma linha: o IndexNow empurra a lista de URLs para Bing, Yandex e Seznam no momento exato do deploy, em vez de esperar o crawler decidir revisitar o site por conta própria — reduz o atraso entre "publiquei" e "o buscador sabe disso" de dias/semanas para minutos.

### 3. Brave Search

Índice independente — resolver o Bing **não** resolve o Brave. Inscrever o site via o formulário de submissão do Brave Search (associado ao Web Discovery Project). É o buscador com o prazo mais incerto da lista; não hesite se demorar mais que os outros.

### 4. Yandex Webmaster

Cobre o Yandex diretamente e também alimenta parte do ecossistema IndexNow (Yandex é um dos três destinatários do protocolo, junto com Bing e Seznam). Cadastro similar ao Bing Webmaster Tools — login na conta Yandex, adicionar o domínio, verificar.

### 5. Backlinks — a parte que nenhum arquivo resolve

Sem links de entrada, a indexação acontece (o Bing Webmaster Tools força isso), mas **o ranqueamento fica raso**: o site existe no índice mas não sobe para posições relevantes, porque o Bing pondera autoridade de domínio e perfil de links muito mais pesadamente que o Google no cálculo de relevância. Isso é estrutural, não tem atalho técnico — só constrói com tempo.

Caminhos legítimos e de esforço razoável, na ordem que costuma valer o esforço primeiro:

1. **Google Business Profile** — perfil de negócio com link para o site (também alimenta o `sameAs`, veja pendências abaixo).
2. **Listagens setoriais brasileiras** de desenvolvimento web/tecnologia (diretórios de agências, câmaras de comércio, associações do setor).
3. **Perfis sociais com link na bio** — Instagram (já existe), LinkedIn, e qualquer outra rede ativa.
4. **Sites dos clientes VW Suplementos** (`vwsuplementosbh.com.br`) **e Maria Clara · Psicóloga** (`mclaramentepsico.com.br`) — são cases reais já publicados no site da Trevizzo; um link de volta com crédito de desenvolvimento ("site desenvolvido por Trevizzo Soluções") no rodapé ou na página de contato do site do cliente é um backlink legítimo e contextualmente relevante, não link farm.

Não há atalho de "SEO técnico" que substitua isso — é relacionamento e presença, não configuração.

## Pendências que dependem de dados do Giovanni

Duas lacunas que travam sinais de qualidade mais fortes que qualquer submissão manual, porque entram direto no schema.org estruturado do site (`src/data/business.ts` / `src/data/schema.ts`) — não é trabalho deste runbook, é informação que só você tem:

- **URL do Google Business Profile e do LinkedIn.** Faltam em `sameAs` (`src/data/business.ts` hoje só tem o Instagram). `sameAs` é o sinal de **reconciliação de entidade** de maior peso que um site pode dar a um buscador — é o que conecta "este site" com "este negócio" no grafo de conhecimento. Pesa especialmente no Bing, que se apoia mais em sinais de entidade e menos em comportamento de usuário do que o Google.
- **Horário de atendimento real.** O `openingHoursSpecification` em `src/data/schema.ts` hoje está `00:00–23:59` de segunda a sexta — ou seja, declara atendimento 24 horas em dia útil, o que quase certamente não é o horário real. O comentário no próprio arquivo já avisa: esse valor **precisa bater exatamente** com o que está cadastrado no Google Business Profile. Uma divergência de NAP (Name/Address/Phone — e por extensão, horário) entre o site e o Business Profile derruba o sinal de consistência que a busca local usa para confiar no negócio. Confirme o horário real de atendimento e corrija os dois lugares (schema do site e Business Profile) para ficarem idênticos.
