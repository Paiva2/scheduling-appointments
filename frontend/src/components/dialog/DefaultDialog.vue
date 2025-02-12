<template>
  <v-dialog v-model="dialog.open" width="auto" persistent>
    <v-card max-width="400" :prepend-icon="icon" :title="title" :text="text">
      <template v-slot:actions>
        <v-btn class="ms-auto" @click="close">{{ buttonText }}</v-btn>
      </template>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "DefaultDialog",
  props: {
    dialog: {
      type: Object,
      required: true,
    },
    buttonText: {
      type: String,
      required: false,
      default: "Close",
    },
    icon: {
      type: String,
      required: false,
      default: "",
    },
    title: {
      type: String,
      required: false,
      default: "",
    },
    text: {
      type: String,
      required: false,
      default: "",
    },
  },
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped></style>
