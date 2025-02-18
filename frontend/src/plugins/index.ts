import "vue-toastification/dist/index.css";
import vuetify from "./vuetify";
import Toast from "vue-toastification";
import type { App } from "vue";
import { store } from "@/lib/store/store";
import { VueMaskDirective } from "v-mask";

const vMaskV3 = {
  beforeMount: VueMaskDirective.bind,
  updated: VueMaskDirective.componentUpdated,
  unmounted: VueMaskDirective.unbind,
};

const toastOptions = {
  draggable: true,
  closeOnClick: true,
  maxToasts: 10,
  newestOnTop: true,
  pauseOnHover: true,
};

export function registerPlugins(app: App) {
  app.use(vuetify).use(Toast, toastOptions).use(store).directive("mask", vMaskV3);
}
