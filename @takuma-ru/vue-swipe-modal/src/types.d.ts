import { VueConstructor } from 'vue';

// Vue.use() によって実行される install 関数を定義
export interface Install {
  (Vue: VueConstructor): void;
  installed: boolean;
}

// src/index.ts で export default されるオブジェクトの型
export default class MyComponent {
  static install: Install;
}

// src/index.ts で export const component されるオブジェクトの型
export const swipeModal: VueConstructor;