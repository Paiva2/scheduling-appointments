<template>
  <div>
    <h1>Hello {{ user.name }}</h1>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Home",
  computed: {
    ...mapState(["user"]),
  },
};
</script>

<style lang="stylus" scoped></style>
