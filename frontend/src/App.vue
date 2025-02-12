<template>
  <v-app>
    <v-main class="main d-flex">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { RouterView } from "vue-router";
import { mapState } from "vuex";
import { actionTypes } from "@/lib/store/types/actionTypes";

export default {
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

<style scoped></style>
