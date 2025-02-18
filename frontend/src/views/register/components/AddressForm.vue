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
        :loading="loadingZipcode"
        :disabled="loadingZipcode"
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
        :loading="loadingZipcode"
        :disabled="loadingZipcode"
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
        v-mask="'#####-###'"
        @blur="getZipcodeInfos"
      />

      <v-autocomplete
        hide-details
        label="City"
        type="text"
        variant="underlined"
        color="blue-darken-3"
        :rules="cityRules"
        :items="cities"
        v-model="formFields.address.city"
        validate-on="submit"
        :disabled="!cities.length || loadingZipcode"
      />

      <v-select
        hide-details
        label="State"
        type="text"
        item-title="name"
        item-value="value"
        variant="underlined"
        color="blue-darken-3"
        :rules="stateRules"
        v-model="formFields.address.state"
        validate-on="submit"
        :items="locations"
        :loading="loadingZipcode"
        :disabled="loadingZipcode"
      />
      <v-text-field
        hide-details
        label="Complement"
        type="text"
        variant="underlined"
        color="blue-darken-3"
        v-model="formFields.address.complement"
        validate-on="submit"
        :disabled="loadingZipcode"
        :loading="loadingZipcode"
      />
    </v-container>
  </v-form>
</template>

<script>
import { actionTypes } from "@/lib/store/types/actionTypes";
import { useToast } from "vue-toastification";

export default {
  name: "AddressForm",
  setup() {
    const toast = useToast();
    return { toast };
  },
  props: {
    formFields: {
      type: Object,
      required: true,
    },
  },
  watch: {
    async "formFields.address.state"() {
      await this.fillCities();
    },
  },
  data() {
    return {
      lastZipcodeSearched: null,
      loadingZipcode: false,
      cities: [],
      locations: [
        { name: "Acre", value: "AC" },
        { name: "Alagoas", value: "AL" },
        { name: "Amapá", value: "AP" },
        { name: "Amazonas", value: "AM" },
        { name: "Bahia", value: "BA" },
        { name: "Ceará", value: "CE" },
        { name: "Distrito Federal", value: "DF" },
        { name: "Espírito Santo", value: "ES" },
        { name: "Goiás", value: "GO" },
        { name: "Maranhão", value: "MA" },
        { name: "Mato Grosso", value: "MT" },
        { name: "Mato Grosso do Sul", value: "MS" },
        { name: "Minas Gerais", value: "MG" },
        { name: "Pará", value: "PA" },
        { name: "Paraíba", value: "PB" },
        { name: "Paraná", value: "PR" },
        { name: "Pernambuco", value: "PE" },
        { name: "Piauí", value: "PI" },
        { name: "Rio de Janeiro", value: "RJ" },
        { name: "Rio Grande do Norte", value: "RN" },
        { name: "Rio Grande do Sul", value: "RS" },
        { name: "Rondônia", value: "RO" },
        { name: "Roraima", value: "RR" },
        { name: "Santa Catarina", value: "SC" },
        { name: "São Paulo", value: "SP" },
        { name: "Sergipe", value: "SE" },
        { name: "Tocantins", value: "TO" },
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
  methods: {
    async fillCities() {
      try {
        const listCities = await this.$store.dispatch(actionTypes.GET_STATES, this.formFields.address.state);
        this.cities = listCities.map((city) => city.nome);
      } catch (e) {
        this.toast.error("Error while searching cities... Try again.");
      }
    },
    async getZipcodeInfos() {
      if (this.lastZipcodeSearched === this.formFields.address.zipCode) return;

      this.lastZipcodeSearched = this.formFields.address.zipCode;

      try {
        this.loadingZipcode = true;
        const zipcodeInfos = await this.$store.dispatch(actionTypes.GET_ZIPCODE_INFOS, this.formFields.address.zipCode);

        if (zipcodeInfos?.erro === "true") {
          this.toast.error("Error while searching zipcode informations... Try again.");
          return;
        }

        if (zipcodeInfos.bairro) {
          this.formFields.address.neighbourhood = zipcodeInfos.bairro;
        } else {
          this.formFields.address.neighbourhood = "";
        }

        if (zipcodeInfos.uf) {
          this.formFields.address.state = this.locations.find((location) => location.value === zipcodeInfos.uf).value;
        }

        if (zipcodeInfos.logradouro) {
          this.formFields.address.street = zipcodeInfos.logradouro;
        } else {
          this.formFields.address.street = "";
        }

        if (zipcodeInfos.localidade) {
          this.formFields.address.city = zipcodeInfos.localidade;
        }

        if (zipcodeInfos.complemento) {
          this.formFields.address.complement = zipcodeInfos.complemento;
        }
      } catch (e) {
        this.toast.error("Error while searching zipcode informations... Try again.");
      } finally {
        this.loadingZipcode = false;
      }
    },
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
