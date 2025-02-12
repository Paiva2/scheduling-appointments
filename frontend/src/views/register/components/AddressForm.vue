<template>
  <v-form @submit.prevent="handleRegister" ref="form" class="d-flex form-wrapper px-3 py-6">
    <div class="form-title d-flex">
      <h2 class="d-flex">
        <v-icon color="blue-darken-3" size="22">mdi-calendar-arrow-right</v-icon>
        <span class="ml-1">Scheduling Appointments </span>
      </h2>
    </div>

    <v-container class="fields-wrapper d-flex pa-0">
      <v-text-field
        hide-details="auto"
        label="Street"
        type="text"
        variant="underlined"
        color="blue-darken-3"
        :rules="streetRules"
        v-model="formFields.address.street"
        validate-on="submit"
      />

      <v-text-field
        hide-details="auto"
        label="Neighbourhood"
        type="text"
        variant="underlined"
        color="blue-darken-3"
        :rules="neighbourhoodRules"
        v-model="formFields.address.neighbourhood"
        validate-on="submit"
      />

      <v-text-field
        hide-details="auto"
        label="Number"
        type="text"
        variant="underlined"
        color="blue-darken-3"
        :rules="numberRules"
        v-model="formFields.address.houseNumber"
        validate-on="submit"
      />

      <v-text-field
        hide-details="auto"
        label="Zip code"
        type="text"
        variant="underlined"
        color="blue-darken-3"
        :rules="zipCodeRules"
        v-model="formFields.address.zipCode"
        validate-on="submit"
      />

      <v-text-field
        hide-details="auto"
        label="City"
        type="text"
        variant="underlined"
        color="blue-darken-3"
        :rules="cityRules"
        v-model="formFields.address.city"
        validate-on="submit"
      />

      <v-text-field
        hide-details="auto"
        label="State"
        type="text"
        variant="underlined"
        color="blue-darken-3"
        :rules="stateRules"
        v-model="formFields.address.state"
        validate-on="submit"
      />

      <v-text-field
        hide-details="auto"
        label="Country"
        type="text"
        variant="underlined"
        color="blue-darken-3"
        :rules="countryRules"
        v-model="formFields.address.country"
        validate-on="submit"
      />
      <v-text-field
        hide-details="auto"
        label="Complement"
        type="text"
        variant="underlined"
        color="blue-darken-3"
        v-model="formFields.address.complement"
        validate-on="submit"
      />
    </v-container>
  </v-form>
</template>

<script>
export default {
  name: "AddressForm",
  props: {
    formFields: {
      type: Object,
      required: true,
    },
    handleRegister: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      streetRules: [
        (value) => {
          if (value?.length > 1) return true;
          return "Street can't be null";
        },
      ],
      neighbourhoodRules: [
        (value) => {
          if (value?.length > 1) return true;
          return "Neighbourhood can't be null";
        },
      ],
      zipCodeRules: [
        (value) => {
          if (value?.length > 1) return true;
          return "Zip code can't be null";
        },
      ],
      numberRules: [
        (value) => {
          if (value?.length > 1) return true;
          return "Number can't be null";
        },
      ],
      cityRules: [
        (value) => {
          if (value?.length > 1) return true;
          return "City can't be null";
        },
      ],
      stateRules: [
        (value) => {
          if (value?.length > 1) return true;
          return "State can't be null";
        },
      ],
      countryRules: [
        (value) => {
          if (value?.length > 1) return true;
          return "Country can't be null";
        },
      ],
    };
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

.login-btn {
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
