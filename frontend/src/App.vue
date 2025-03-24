<template>
  <v-app>
    <v-main class="main d-flex">
      <aside-menu />
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
import { actionTypes } from "@/lib/store/types/actionTypes";
import AsideMenu from "@/components/aside-menu/AsideMenu.vue";
import "@vuepic/vue-datepicker/dist/main.css";

export default {
  components: { AsideMenu },
  name: "App",
  computed: {
    ...mapState(["authToken"]),
  },
  watch: {
    async authToken(val) {
      if (!!val && !this.getAuthToken) {
        await this.$store.dispatch(actionTypes.USER.PROFILE);
      }
    },
  },
};
</script>

<style scoped>
.main {
  width: 100%;
}
</style>
