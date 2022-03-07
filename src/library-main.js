// vue コンポーネントのインポート
import component from './swipe-modal.vue';
/* import { Install } from './types'; */

// 重複して読み込まないようにする
const install = function(Vue) {
  if (install.installed) return;
  install.installed = true;
  Vue.component('swipeModal', component); // Vuetifyのように、どこからでもこのコンポーネントを呼び出せるようにする
};

// Vue.use() のためのモジュール定義を作成
// Create module definition for Vue.use()
const plugin = {
  install,
};

// vue が見つかった場合に自動インストールする (ブラウザで <script> タグを用いた場合等)
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
export { component };