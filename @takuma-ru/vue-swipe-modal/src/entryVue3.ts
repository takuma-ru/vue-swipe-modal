import swipeModal from './lib-components/swipeModalVue3.vue';

import { Install } from './types';

// 重複して読み込まないようにする
const install = function(Vue) {
  if (install.installed) return;
  install.installed = true;
  Vue.component('swipeModal', swipeModal);
} as Install;

const plugin = {
  install
};

let GlobalVue = null;
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue;
}
if (GlobalVue) {
  GlobalVue.use(plugin);
}

export default plugin;

// (npm/webpack 等で) モジュールとして利用させるためコンポーネントを export する
export { swipeModal };