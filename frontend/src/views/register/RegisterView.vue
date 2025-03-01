<template>
  <v-container class="d-flex main-wrapper align-center justify-center">
    <v-stepper
      :items="labels"
      class="stepper elevation-2"
      flat
      tile
      show-actions
      next-text="Next"
      v-model="stepperValue"
    >
      <template v-slot:[`item.1`]>
        <v-form ref="form" class="d-flex form-wrapper">
          <div class="form-title d-flex">
            <h2 class="d-flex">
              <v-icon color="blue-darken-3" size="22">mdi-calendar-arrow-right</v-icon>
              <span class="ml-1">Scheduling Appointments </span>
            </h2>
            <p>Welcome!</p>
          </div>

          <v-container class="fields-wrapper d-flex pa-0">
            <v-text-field
              hide-details
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
              hide-details
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
              hide-details
              label="Password"
              :type="showPassword ? 'text' : 'password'"
              variant="underlined"
              color="blue-darken-3"
              :rules="passwordRules"
              v-model="formFields.password"
              validate-on="submit"
            >
              <template v-slot:append-inner>
                <v-btn @click="togglePasswordShow" size="32" class="elevation-0 inner-btn-icon" :icon="iconPassword" />
              </template>
            </v-text-field>

            <v-text-field
              :type="showConfirmPassword ? 'text' : 'password'"
              :rules="confirmPasswordRules"
              label="Confirm Password"
              variant="underlined"
              color="blue-darken-3"
              v-model="formFields.confirmPassword"
              validate-on="submit"
              hide-details
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

            <v-select
              label="Select your role"
              v-model="formFields.role"
              color="blue-darken-3"
              variant="underlined"
              :items="roles"
              hide-details
            />

            <v-select
              v-if="formFields.role === 'Doctor' && specialismsList?.length"
              :rules="specialismRule"
              :items="specialismsList"
              v-model="this.formFields.specialismList"
              item-title="name"
              item-value="id"
              label="Select your specialism"
              color="blue-darken-3"
              id="specialism"
              name="specialism"
              variant="underlined"
              multiple
            >
              <template v-slot:selection="{ item, index }">
                <v-chip v-if="index < 2">
                  <span>{{ item.title }}</span>
                </v-chip>
                <span v-if="index === 2" class="text-grey text-caption align-self-center">
                  (+{{ formFields.specialismList.length - 2 }} others)
                </span>
              </template>
            </v-select>
          </v-container>

          <p class="link">
            Already have an account?
            <router-link :to="{ name: 'login' }">Sign up!</router-link>
          </p>
        </v-form>
      </template>

      <template v-slot:[`item.2`]>
        <address-form
          ref="address-form-ref"
          :formFields="formFields"
          :streetRules="streetRules"
          :neighbourhoodRules="neighbourhoodRules"
          :zipCodeRules="zipCodeRules"
          :numberRules="numberRules"
          :cityRules="cityRules"
          :stateRules="stateRules"
          :countryRules="countryRules"
        />
      </template>

      <template v-slot:actions>
        <div class="stepper-actions d-flex px-3 py-4">
          <v-btn tile flat @click="previous" :disabled="stepperValue < 2" class="btn-prev"> Previous </v-btn>
          <v-btn @click="next" class="btn-next" tile flat>
            {{ tituloBotao }}
          </v-btn>
        </div>
      </template>
    </v-stepper>
  </v-container>
</template>

<script>
import { useToast } from "vue-toastification";
import { actionTypes } from "@/lib/store/types/actionTypes";
import AddressForm from "./components/AddressForm";

export default {
  name: "RegisterView",
  components: {
    AddressForm,
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
  async mounted() {
    await this.fillSpecialisms();
  },
  watch: {
    "formFields.role"() {
      this.specialism = null;
      this.$refs.form.errors = this.$refs.form.errors.filter((err) => err.id !== "specialism");
      this.$refs.form.items.forEach((input) => {
        if (input.id === "specialism") {
          input.resetValidation();
        }
      });
    },
  },
  data() {
    return {
      stepperValue: 1,
      showPassword: false,
      showConfirmPassword: false,
      loadingRegister: false,
      labels: ["Personal info", "Address"],
      roles: ["Pacient", "Doctor"],
      specialismsList: [],
      formFields: {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "Pacient",
        specialismList: [],
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
          return false;
        },
      ],
      passwordRules: [
        (value) => {
          if (value.length > 5) return true;
          return false;
        },
      ],
      specialismRule: [
        (value) => {
          if (this.formFields.role === "Pacient") return true;
          if (!!value) return true;
          return false;
        },
      ],
      confirmPasswordRules: [
        (value) => {
          if (value === "") return "Password confirmation can't be empty";
          if (value === this.formFields.password) return true;
          return false;
        },
      ],
      nameRules: [
        (value) => {
          if (value?.length > 3) return true;
          return false;
        },
      ],
      streetRules: [
        (value) => {
          if (value?.length >= 1) return true;
          return false;
        },
      ],
      neighbourhoodRules: [
        (value) => {
          if (value?.length >= 1) return true;
          return false;
        },
      ],
      zipCodeRules: [
        (value) => {
          if (value?.length >= 1) return true;
          return false;
        },
      ],
      numberRules: [
        (value) => {
          if (value?.length >= 1) return true;
          return false;
        },
      ],
      cityRules: [
        (value) => {
          if (value?.length >= 1) return true;
          return false;
        },
      ],
      stateRules: [
        (value) => {
          if (value?.length >= 1) return true;
          return false;
        },
      ],
      countryRules: [
        (value) => {
          if (value?.length >= 1) return true;
          return false;
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
    async fillSpecialisms() {
      try {
        this.specialismsList = await this.$store.dispatch(actionTypes.SPECIALISM.GET_SPECIALISMS);
      } catch (e) {
        this.toast.error("Error while getting specialisms!");
      }
    },
    async handleRegister() {
      this.loadingRegister = true;

      try {
        await this.$store.dispatch(actionTypes.USER.REGISTER, {
          email: this.formFields.email,
          password: this.formFields.password,
          name: this.formFields.name,
          role: this.formFields.role.toUpperCase() === "PACIENT" ? "USER" : "DOCTOR",
          specialismListId: this.formFields.specialismList,
          address: {
            street: this.formFields.address.street,
            neighbourhood: this.formFields.address.neighbourhood,
            houseNumber: this.formFields.address.houseNumber,
            city: this.formFields.address.city,
            state: this.formFields.address.state,
            country: "BR",
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
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "Pacient",
        specialism: null,
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
        const formAddress = await this.$refs["address-form-ref"].$refs.form2.validate();
        if (!formAddress.valid) return;

        await this.handleRegister();
      } else {
        const formInfos = await this.$refs.form.validate();
        if (!formInfos.valid) return;

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
