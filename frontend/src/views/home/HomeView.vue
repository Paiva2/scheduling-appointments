<template>
  <div class="main-wrapper">
    <div class="search-wrapper">
      <div style="color: white; text-align: left">
        <h1>Find doctors</h1>
        <p>Search for the nearest doctor!</p>
      </div>

      <search-doctor />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import SearchDoctor from "./components/SearchDoctor";

export default {
  name: "Home",
  components: {
    SearchDoctor,
  },
  computed: {
    ...mapState(["user"]),
  },
};
</script>

<style scoped>
.main-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  background: linear-gradient(#1565c0 50%, transparent 0%) no-repeat;
}

.search-wrapper {
  height: 50%;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 1.875rem;
  max-width: 56.25rem;
}
</style>
