<template>
  <v-app>
    <v-main class="main d-flex">
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<style scoped></style>
