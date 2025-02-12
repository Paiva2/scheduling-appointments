<template>
  <v-container class="d-flex main-wrapper align-center justify-center">
    <v-form @submit.prevent="handleForgot" ref="form" class="d-flex form-wrapper pa-10 elevation-2">
      <div class="form-title d-flex">
        <h2 class="d-flex">
          <v-icon color="blue-darken-3" size="22">mdi-calendar-arrow-right</v-icon>
          <span class="ml-1">Scheduling Appointments </span>
        </h2>
        <p>Forgot password</p>
      </div>

      <v-container class="fields-wrapper d-flex pa-0">
        <v-text-field
          hide-details="auto"
          label="Account e-mail address"
          placeholder="youremail@email.com"
          type="email"
          variant="underlined"
          color="blue-darken-3"
          :rules="emailRules"
          v-model="formFields.email"
          validate-on="submit"
        />
      </v-container>

      <p class="link">
        Don't have an account?
        <router-link :to="{ name: 'register' }"> Register here! </router-link>
      </p>

      <v-btn
        type="submit"
        class="send-btn"
        color="blue-darken-3 mt-8"
        rounded="0"
        :loading="loading"
        :disabled="loading"
      >
        Send
      </v-btn>
    </v-form>

    <default-dialog
      :dialog="dialog"
      @close="closeDialog"
      icon="mdi-check-circle-outline"
      title="E-mail sent"
      text="A new password has been sent to the provided e-mail!"
    />
  </v-container>
</template>

<script>
import { actionTypes } from "@/lib/store/types/actionTypes";
import { useToast } from "vue-toastification";
import DefaultDialog from "@/components/dialog/DefaultDialog.vue";

export default {
  name: "ForgotPasswordView",
  components: {
    DefaultDialog,
  },
  setup() {
    const toast = useToast();

    return { toast };
  },
  data() {
    return {
      dialog: {
        open: false,
      },
      loading: false,
      formFields: {
        email: "",
      },
      emailRules: [
        (value) => {
          if (
            /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i.test(
              value
            )
          )
            return true;
          return "Invalid e-mail.";
        },
      ],
    };
  },
  methods: {
    async handleForgot() {
      const { valid } = await this.$refs.form.validate();

      if (!valid) return;

      this.loading = true;
      this.toast.clear();

      try {
        await this.$store.dispatch(actionTypes.USER.FORGOT_PASSWORD, {
          email: this.formFields.email,
        });

        this.openDialog();
      } catch {
        this.toast.error("Error while trying to recover password...");
      } finally {
        this.loading = false;
      }
    },
    openDialog() {
      this.dialog.open = true;
    },
    closeDialog() {
      this.dialog.open = false;
    },
  },
};
</script>

<style scoped>
.main-wrapper {
  flex-direction: column;
  min-height: 100vh;
}

.form-wrapper {
  background-color: #fff;
  width: 100%;
  max-width: 28.125rem;
  min-height: 21.25rem;
  flex-direction: column;
  gap: 1.25rem;
}

.fields-wrapper {
  flex-direction: column;
  gap: 1.125rem;
}

.link {
  color: #263238;
  font-size: 0.875rem;
}

.link a {
  color: #1565c0;
  text-decoration: none;
  font-weight: 600;
}

.link a:hover {
  text-decoration: underline;
}

.form-title {
  flex-direction: column;
  color: #263238;
}

.form-title h2 {
  font-size: 1.125rem;
  align-items: center;
}

.form-title p {
  font-size: 0.8125rem;
}

.send-btn {
  width: 7.5rem;
  align-self: end;
}

.inner-btn-icon {
  position: absolute !important;
  top: 12px;
  right: 0px;
  color: #263238;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
