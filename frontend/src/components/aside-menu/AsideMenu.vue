<template>
  <v-navigation-drawer class="navigation" v-if="isUserLoggedIn" expand-on-hover elevation="1" permanent rail>
    <v-list>
      <v-menu min-width="200px">
        <template v-slot:activator="{ props }">
          <v-list-item
            prepend-avatar="https://media.istockphoto.com/id/1223671392/vector/default-profile-picture-avatar-photo-placeholder-vector-illustration.jpg?s=612x612&w=0&k=20&c=s0aTdmT5aU6b8ot7VKm11DeID6NctRCpB755rA1BIP0="
            :subtitle="user.email"
            :title="user.name"
            v-bind="props"
            @click="openProfileDialog"
          />
        </template>
      </v-menu>
    </v-list>

    <v-divider></v-divider>

    <v-list density="compact" nav class="actions">
      <v-list-item prepend-icon="mdi-medical-bag" title="Find doctors" value="doctors" />
      <v-list-item prepend-icon="mdi-calendar-arrow-right" title="Appointments" value="appointments" />
      <v-list-item prepend-icon="mdi-star" title="Starred" value="starred" />
      <v-list-item class="logout-button" @click="logout" prepend-icon="mdi-logout" title="Logout" value="logout" />
    </v-list>

    <profile-dialog :dialogProfile="dialogProfile" @close="closeProfileDialog" />
  </v-navigation-drawer>
</template>

<script>
import { mapState } from "vuex";
import ProfileDialog from "./components/ProfileDialog.vue";
import Cookies from "js-cookie";

export default {
  name: "AsideMenu",
  components: {
    ProfileDialog,
  },
  computed: {
    ...mapState(["user"]),
    isUserLoggedIn() {
      return !!this.user.id;
    },
  },
  data() {
    return {
      dialogProfile: {
        open: false,
      },
    };
  },
  methods: {
    openProfileDialog() {
      this.dialogProfile.open = true;
    },
    closeProfileDialog() {
      this.dialogProfile.open = false;
    },
    async logout() {
      Cookies.remove("scheduling-appointments-app");
      await this.$router.push({ name: "login" });
      this.$router.go();
    },
  },
};
</script>

<style scoped>
.actions .logout-button {
  position: fixed;
  bottom: 15px;
  width: 100%;
  max-width: 239px;
}
</style>
