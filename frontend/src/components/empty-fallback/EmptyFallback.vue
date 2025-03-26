<template>
  <v-empty-state class="empty-fallback" icon="mdi-magnify" :title="title" :text="text"></v-empty-state>
</template>

<script>
export default {
  name: "EmptyFallback",
  props: {
    title: {
      type: String,
      required: false,
      default: "We couldn't find a match.",
    },
    text: {
      type: String,
      required: false,
      default: "Try adjusting your search terms or filters.",
    },
  },
};
</script>

<style scoped>
.empty-fallback {
  min-height: initial;
}
</style>
