<template>
  <v-empty-state
    class="empty-fallback"
    icon="mdi-magnify"
    title="We couldn't find a match."
    text="Try adjusting your search terms or filters."
  ></v-empty-state>
</template>

<script>
export default {
  name: "EmptyFallback",
};
</script>

<style scoped>
.empty-fallback {
  min-height: initial;
}
</style>
