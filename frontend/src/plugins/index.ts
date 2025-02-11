import "vue-toastification/dist/index.css";
import vuetify from "./vuetify";
import Toast from "vue-toastification";
import type { App } from "vue";

const toastOptions = {
  draggable: true,
  closeOnClick: true,
  maxToasts: 10,
  newestOnTop: true,
  pauseOnHover: true,
};

export function registerPlugins(app: App) {
  app.use(vuetify).use(Toast, toastOptions);
}
