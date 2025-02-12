<template>
  <v-container class="d-flex main-wrapper align-center justify-center">
    <v-stepper
      :items="['Personal info', 'Address']"
      class="stepper elevation-2"
      flat
      tile
      editable
      show-actions
      next-text="Next"
      v-model="stepperValue"
    >
      <template v-slot:[`item.1`]>
        <v-form @submit.prevent="handleRegister" ref="form" class="d-flex form-wrapper px-3 py-6">
          <div class="form-title d-flex">
            <h2 class="d-flex">
              <v-icon color="blue-darken-3" size="22">mdi-calendar-arrow-right</v-icon>
              <span class="ml-1">Scheduling Appointments </span>
            </h2>
            <p>Welcome!</p>
          </div>

          <v-container class="fields-wrapper d-flex pa-0">
            <v-text-field
              hide-details="auto"
              label="Name"
              placeholder="John Doe"
              type="text"
              variant="underlined"
              color="blue-darken-3"
              :rules="nameRules"
              v-model="formFields.name"
              validate-on="submit"
            />

            <v-text-field
              hide-details="auto"
              label="E-mail address"
              placeholder="youremail@email.com"
              type="email"
              variant="underlined"
              color="blue-darken-3"
              :rules="emailRules"
              v-model="formFields.email"
              validate-on="submit"
            />

            <v-text-field
              hide-details="auto"
              label="Password"
              :type="showPassword ? 'text' : 'password'"
              variant="underlined"
              color="blue-darken-3"
              :rules="passwordRules"
              v-model="formFields.password"
              validate-on="submit"
            >
              <template v-slot:append-inner>
                <v-btn
                  @click="togglePasswordShow"
                  size="32"
                  class="elevation-0 inner-btn-icon"
                  :icon="iconPassword"
                />
              </template>
            </v-text-field>

            <v-text-field
              hide-details="auto"
              label="Confirm Password"
              :type="showConfirmPassword ? 'text' : 'password'"
              variant="underlined"
              color="blue-darken-3"
              :rules="confirmPasswordRules"
              v-model="formFields.confirmPassword"
              validate-on="submit"
            >
              <template v-slot:append-inner>
                <v-btn
                  @click="toggleConfirmPasswordShow"
                  size="32"
                  class="elevation-0 inner-btn-icon"
                  :icon="iconConfirmPassword"
                />
              </template>
            </v-text-field>
          </v-container>

          <p class="link">
            Already have an account?
            <router-link :to="{ name: 'login' }"> Sign up! </router-link>
          </p>
        </v-form>
      </template>

      <template v-slot:[`item.2`]>
        <address-form :formFields="formFields" :handleRegister="handleRegister" />
      </template>

      <template v-slot:actions>
        <div class="stepper-actions d-flex px-3 py-4">
          <v-btn tile flat @click="previous" :disabled="stepperValue < 2" class="btn-prev">
            Previous
          </v-btn>
          <v-btn @click="next" class="btn-next" tile flat>
            {{ tituloBotao }}
          </v-btn>
        </div>
      </template>
    </v-stepper>
  </v-container>
</template>

<script>
import api from "@/plugins/axios";
import { useToast } from "vue-toastification";
import AddressForm from "./components/AddressForm";
import { actionTypes } from "@/lib/store/types/actionTypes";

export default {
  name: "RegisterView",
  components: {
    AddressForm,
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
  data() {
    return {
      stepperValue: 1,
      showPassword: false,
      showConfirmPassword: false,
      loadingRegister: false,
      formFields: {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        address: {
          street: "",
          neighbourhood: "",
          houseNumber: "",
          city: "",
          state: "",
          country: "",
          zipCode: "",
          complement: "",
        },
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
      passwordRules: [
        (value) => {
          if (value.length > 5) return true;
          return "Password must have at least 6 characters.";
        },
      ],
      confirmPasswordRules: [
        (value) => {
          if (value === "") return "Password confirmation can't be empty";
          if (value === this.formFields.password) return true;
          return "Password confirmation must match password.";
        },
      ],
      nameRules: [
        (value) => {
          if (value?.length > 3) return true;

          return "Name must have at least 3 characters.";
        },
      ],
    };
  },
  computed: {
    iconPassword() {
      return this.showPassword ? "mdi-eye-outline" : "mdi-eye-off-outline";
    },
    iconConfirmPassword() {
      return this.showConfirmPassword ? "mdi-eye-outline" : "mdi-eye-off-outline";
    },
    tituloBotao() {
      return this.stepperValue < 2 ? "Next" : "Register";
    },
  },
  methods: {
    async handleRegister() {
      const { valid } = await this.$refs.form.validate();

      if (!valid) return;

      this.loadingRegister = true;

      try {
        await this.$store.dispatch(actionTypes.USER.REGISTER, {
          email: this.formFields.email,
          password: this.formFields.password,
          name: this.formFields.name,
          address: {
            street: this.formFields.address.street,
            neighbourhood: this.formFields.address.neighbourhood,
            houseNumber: this.formFields.address.houseNumber,
            city: this.formFields.address.city,
            state: this.formFields.address.state,
            country: this.formFields.address.country,
            zipCode: this.formFields.address.zipCode,
            complement: this.formFields.address.complement,
          },
        });

        this.resetForm();
        this.stepperValue = 0;
        this.toast.success("Registered successfully!");
      } catch (e) {
        if (e.response.status === 409) {
          return this.toast.error("E-mail already being used!");
        }

        this.toast.error("Error while registering... Try again.");
      } finally {
        this.loadingRegister = false;
      }
    },
    resetForm() {
      this.formFields = {
        email: "",
        password: "",
        confirmPassword: "",
        name: "",
        address: {
          street: "",
          neighbourhood: "",
          houseNumber: "",
          city: "",
          state: "",
          country: "",
          zipCode: "",
          complement: "",
        },
      };
    },
    togglePasswordShow() {
      this.showPassword = !this.showPassword;
    },
    toggleConfirmPasswordShow() {
      this.showConfirmPassword = !this.showConfirmPassword;
    },
    previous() {
      this.stepperValue--;
    },
    async next() {
      if (this.stepperValue > 1) {
        await this.handleRegister();
      } else {
        const { valid } = await this.$refs.form.validate();

        if (!valid) return;
        this.stepperValue++;
      }
    },
  },
};
</script>

<style scoped>
.main-wrapper {
  flex-direction: column;
  min-height: 100vh;
}

.stepper {
  background-color: #fff;
  width: 100%;
  max-width: 28.125rem;
  min-height: 300px;
}

.stepper-actions {
  justify-content: space-between;
  gap: 0.9375rem;
}

.stepper-actions button {
  flex: 1;
}

.stepper-actions .btn-next {
  color: #fff;
  background-color: #1565c0;
}

.stepper-actions .btn-prev {
  background-color: #c9d0d5;
}

.stepper-actions .btn-prev:disabled {
  background-color: #fff !important;
}

.form-wrapper {
  background-color: #fff;
  width: 100%;
  height: 100%;
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

.register-btn {
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
