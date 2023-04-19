import { createApp } from "vue";
import App from "./App.vue";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import router from "./router";
import { createPinia } from "pinia";
import FlagIcon from "vue-flag-icon";
import { createI18n } from "vue-i18n";
import en from "./lang/langen.json";
import vn from "./lang/langvn.json";
const app = createApp(App);
const pinia = createPinia();
const i18n = createI18n({
  legacy: false,
  locale: "en", // Ngôn ngữ mặc định
  fallbackLocale: "vn", // Ngôn ngữ dự phòng
  messages: {
    en,
    vn,
  },
});
app.use(pinia);
app.use(FlagIcon);
app.use(Antd);
app.use(i18n);
app.use(router);
app.mount("#app");
