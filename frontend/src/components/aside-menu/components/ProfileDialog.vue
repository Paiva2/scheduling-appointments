<template>
  <v-dialog v-model="dialogProfile.open" max-width="800" persistent>
    <v-card prepend-icon="mdi-account-outline" size="25" title="Profile">
      <v-card-text>
        <v-row dense>
          <v-col cols="12" md="6" sm="6">
            <v-text-field
              color="blue-darken-3"
              label="Name*"
              type="text"
              v-model="formFields.name"
              required
              hide-details
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6" sm="6">
            <v-text-field
              color="blue-darken-3"
              label="Email*"
              type="text"
              v-model="formFields.email"
              required
              hide-details
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="12" sm="6">
            <v-select
              v-model="formFields.specialisms"
              :items="specialisms"
              item-title="name"
              item-value="name"
              label="Specialisms"
              color="blue-darken-3"
              hide-details
              multiple
            >
              <template v-slot:selection="{ item, index }">
                <v-chip v-if="index < 3">
                  <span>{{ item.title }}</span>
                </v-chip>
                <span v-if="index === 3" class="text-grey text-caption align-self-center">
                  (+{{ formFields.specialisms.length - 2 }} others)
                </span>
              </template>
            </v-select>
          </v-col>

          <v-col cols="12" md="12" sm="12">
            <v-text-field
              color="blue-darken-3"
              label="Password*"
              type="password"
              v-model="formFields.password"
              hide-details
              class="mb-2"
            ></v-text-field>
            <v-text-field
              color="blue-darken-3"
              label="Confirm Password*"
              type="password"
              v-model="formFields.confirmPassword"
              hide-details
            ></v-text-field>
          </v-col>
        </v-row>

        <v-card-title class="px-0 d-flex align-baseline ga-2">
          <v-icon size="25">mdi-home-variant-outline</v-icon>
          Address
        </v-card-title>
        <v-row dense class="address-rows">
          <v-col cols="12" md="4" sm="6">
            <v-text-field
              color="blue-darken-3"
              label="Street*"
              v-model="formFields.address.street"
              required
              :disabled="loadingZipcode"
              :loading="loadingZipcode"
              hide-details
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4" sm="6">
            <v-text-field
              color="blue-darken-3"
              label="Neighbourhood*"
              v-model="formFields.address.neighbourhood"
              required
              :disabled="loadingZipcode"
              :loading="loadingZipcode"
              hide-details
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4" sm="6">
            <v-text-field
              label="House Number*"
              v-model="formFields.address.houseNumber"
              type="text"
              required
              hide-details
              color="blue-darken-3"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4" sm="6">
            <v-text-field
              color="blue-darken-3"
              label="Zipcode*"
              v-model="formFields.address.zipCode"
              type="text"
              required
              v-mask="'#####-###'"
              @blur="getZipcodeInfos"
              :disabled="loadingZipcode"
              :loading="loadingZipcode"
              hide-details
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4" sm="6">
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
          </v-col>

          <v-col cols="12" md="4" sm="6">
            <v-select
              hide-details
              label="State*"
              type="text"
              item-title="name"
              item-value="value"
              variant="underlined"
              color="blue-darken-3"
              :rules="stateRules"
              v-model="formFields.address.state"
              validate-on="submit"
              :items="locations"
              :disabled="loadingZipcode"
              :loading="loadingZipcode"
            />
          </v-col>

          <v-col cols="12" md="12" sm="6">
            <v-text-field
              color="blue-darken-3"
              label="Complement"
              type="text"
              v-model="formFields.address.complement"
              :disabled="loadingZipcode"
              :loading="loadingZipcode"
              hide-details
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn text="Close" variant="plain" @click="closeDialog()"></v-btn>

        <v-btn color="blue-darken-3" text="Save" variant="tonal" @click="closeDialog()"></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { actionTypes } from "@/lib/store/types/actionTypes";
import { useToast } from "vue-toastification";

export default {
  name: "ProfileDialog",
  props: {
    dialogProfile: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
  computed: {
    ...mapState(["user"]),
    ...mapGetters(["isDoctor"]),
  },
  async mounted() {
    this.fillFormFields();
    await this.fillSpecialisms();
  },
  watch: {
    async "formFields.address.state"() {
      await this.fillCities();
    },
  },
  data() {
    return {
      ignoreFirstFill: true,
      lastZipcodeSearched: null,
      loadingZipcode: false,
      cities: [],
      formFields: {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "Pacient",
        specialisms: [],
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
    async fillSpecialisms() {
      try {
        this.specialisms = await this.$store.dispatch(actionTypes.SPECIALISM.GET_SPECIALISMS);
      } catch (e) {
        this.toast.error("Error while getting specialisms!");
      }
    },
    closeDialog() {
      this.fillFormFields();
      this.$emit("close");
    },
    fillFormFields() {
      this.formFields = {
        name: this.user.name,
        email: this.user.email,
        password: this.user.password,
        confirmPassword: this.user.confirmPassword,
        specialisms: this.user.specialisms ?? [],
        address: {
          street: this.user.address.street,
          neighbourhood: this.user.address.neighbourhood,
          houseNumber: this.user.address.houseNumber,
          city: this.user.address.city,
          state: this.user.address.state,
          country: this.user.address.country,
          zipCode: this.user.address.zipCode,
          complement: this.user.address.complement ?? "",
        },
      };
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
        } else {
          this.formFields.address.complement = "";
        }
      } catch (e) {
        console.log(e);
        this.toast.error("Error while searching zipcode informations... Try again.");
      } finally {
        this.loadingZipcode = false;
      }
    },
    async fillCities() {
      this.cities = [];

      if (!this.ignoreFirstFill) {
        this.formFields.address.city = "";
      }

      try {
        const listCities = await this.$store.dispatch(actionTypes.GET_STATES, this.formFields.address.state);
        this.cities = listCities.map((city) => city.nome);
      } catch (e) {
        this.toast.error("Error while searching cities... Try again.");
      } finally {
        if (this.ignoreFirstFill) {
          this.ignoreFirstFill = false;
        }
      }
    },
  },
};
</script>
<style>
.address-rows .v-input {
  min-height: 56px;
}
.address-rows .v-field__input {
  height: 100%;
}
</style>
