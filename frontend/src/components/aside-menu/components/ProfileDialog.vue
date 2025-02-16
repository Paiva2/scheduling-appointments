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
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6" sm="6">
            <v-text-field
              color="blue-darken-3"
              label="Email*"
              type="text"
              v-model="formFields.email"
              required
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
            ></v-text-field>
            <v-text-field
              color="blue-darken-3"
              label="Confirm Password*"
              type="password"
              v-model="formFields.confirmPassword"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-card-title class="px-0">
          <v-icon size="25">mdi-home-variant-outline</v-icon>
          Address
        </v-card-title>
        <v-row dense>
          <v-col cols="12" md="4" sm="6">
            <v-text-field
              color="blue-darken-3"
              label="Street*"
              v-model="formFields.address.street"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4" sm="6">
            <v-text-field
              color="blue-darken-3"
              label="Neighbourhood*"
              v-model="formFields.address.neighbourhood"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4" sm="6">
            <v-text-field
              label="House Number*"
              v-model="formFields.address.houseNumber"
              type="text"
              required
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
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4" sm="6">
            <v-text-field
              color="blue-darken-3"
              label="City*"
              type="text"
              v-model="formFields.address.city"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4" sm="6">
            <v-text-field
              color="blue-darken-3"
              label="State*"
              type="text"
              v-model="formFields.address.state"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="12" sm="6">
            <v-text-field
              color="blue-darken-3"
              label="Complement"
              type="text"
              v-model="formFields.address.complement"
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

export default {
  name: "ProfileDialog",
  props: {
    dialogProfile: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState(["user"]),
    ...mapGetters(["isDoctor"]),
  },
  async mounted() {
    this.fillFormFields();
    await this.fillSpecialisms();
  },
  data() {
    return {
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
  },
};
</script>
<style scoped></style>
