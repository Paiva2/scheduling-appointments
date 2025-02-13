<template>
  <v-form ref="form2" class="d-flex form-wrapper px-3 py-6">
    <div class="form-title d-flex">
      <h2 class="d-flex">
        <v-icon color="blue-darken-3" size="22">mdi-calendar-arrow-right</v-icon>
        <span class="ml-1">Scheduling Appointments </span>
      </h2>
    </div>

    <v-container class="fields-wrapper d-flex pa-0">
      <v-text-field
        hide-details
        label="Street"
        type="text"
        variant="underlined"
        color="blue-darken-3"
        :rules="streetRules"
        v-model="formFields.address.street"
        validate-on="submit"
      />

      <v-text-field
        hide-details
        label="Neighbourhood"
        type="text"
        variant="underlined"
        color="blue-darken-3"
        :rules="neighbourhoodRules"
        v-model="formFields.address.neighbourhood"
        validate-on="submit"
      />

      <v-text-field
        hide-details
        label="Number"
        type="text"
        variant="underlined"
        color="blue-darken-3"
        :rules="numberRules"
        v-model="formFields.address.houseNumber"
        validate-on="submit"
      />

      <v-text-field
        hide-details
        label="Zip code"
        type="text"
        variant="underlined"
        color="blue-darken-3"
        :rules="zipCodeRules"
        v-model="formFields.address.zipCode"
        validate-on="submit"
      />

      <v-text-field
        hide-details
        label="City"
        type="text"
        variant="underlined"
        color="blue-darken-3"
        :rules="cityRules"
        v-model="formFields.address.city"
        validate-on="submit"
      />

      <v-text-field
        hide-details
        label="State"
        type="text"
        variant="underlined"
        color="blue-darken-3"
        :rules="stateRules"
        v-model="formFields.address.state"
        validate-on="submit"
      />

      <v-text-field
        hide-details
        label="Country"
        type="text"
        variant="underlined"
        color="blue-darken-3"
        :rules="countryRules"
        v-model="formFields.address.country"
        validate-on="submit"
      />
      <v-text-field
        hide-details
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
  },
  data() {
    return {
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
};
</script>

<style scoped>
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
</style>
