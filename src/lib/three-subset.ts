/**
 * Superfície mínima do three.js usada pelo campo de partículas do Hero.
 *
 * Por que este arquivo existe: `import('three')` importa o namespace inteiro,
 * e o Rollup não consegue fazer tree-shaking através de um import dinâmico de
 * namespace — o bundle sai com a biblioteca completa (~732 KB). Reexportando
 * apenas os símbolos usados, os exports do alvo do import dinâmico passam a ser
 * estaticamente conhecidos e o tree-shaking volta a funcionar.
 *
 * Ao adicionar um símbolo novo ao Hero, adicione aqui também — senão o erro
 * aparece só em runtime, como `undefined is not a constructor`.
 */
export {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Clock,
  Color,
  Group,
  PerspectiveCamera,
  Plane,
  Points,
  Raycaster,
  Scene,
  ShaderMaterial,
  Vector2,
  Vector3,
  WebGLRenderer,
} from 'three';
