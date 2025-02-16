import { createRouter, createWebHistory } from "vue-router";
import { store } from "@/lib/store/store";
import { mutationTypes } from "@/lib/store/types/mutationTypes";
import LoginView from "@/views/login/LoginView.vue";
import RegisterView from "@/views/register/RegisterView.vue";
import ForgotPasswordView from "@/views/forgot-password/ForgotPasswordView.vue";
import HomeView from "@/views/home/HomeView.vue";
import Cookies from "js-cookie";
import DoctorsListView from "@/views/doctors-list/DoctorsListView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/home",
    },
    {
      path: "/home",
      name: "home",
      component: HomeView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView,
    },
    {
      path: "/forgot-password",
      name: "forgot-password",
      component: ForgotPasswordView,
    },
    {
      path: "/search",
      name: "doctors-list",
      component: DoctorsListView,
      beforeEnter: (to, from, next) => {
        if (to.query?.specialism === null || to.query.state === null) {
          next("/home");
          return;
        }

        if (!("specialism" in to.query) || !("state" in to.query)) {
          next("/home");
          return;
        }

        next();
      },
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const url = to.path;

  const authTokenFilled = store.getters.getAuthToken;
  const authTokenCookies = Cookies.get("scheduling-appointments-app");

  if (url === "/login" || url === "/register" || url === "/forgot-password") {
    if (authTokenFilled || authTokenCookies) {
      next("/home");
      return;
    }

    next();
    return;
  }

  if (!authTokenFilled && !authTokenCookies) {
    next("/login");
    return;
  }

  if (authTokenFilled || authTokenCookies) {
    try {
      const tokenFilled = authTokenFilled ?? authTokenCookies;

      store.commit(mutationTypes.USER.SET_AUTH, tokenFilled);
      next();
    } catch {
      Cookies.remove("scheduling-appointments-app");
      store.commit(mutationTypes.USER.SET_AUTH, null);
      next("/login");
    }
  }
});

export default router;
