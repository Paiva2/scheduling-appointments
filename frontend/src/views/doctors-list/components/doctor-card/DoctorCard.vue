<template>
  <v-card class="mb-3 px-4 py-7 info-card">
    <div class="d-flex align-center ga-4 pb-5 justify-space-between">
      <div class="d-flex align-center ga-2">
        <v-avatar
          size="80"
          image="https://media.istockphoto.com/id/1223671392/vector/default-profile-picture-avatar-photo-placeholder-vector-illustration.jpg?s=612x612&w=0&k=20&c=s0aTdmT5aU6b8ot7VKm11DeID6NctRCpB755rA1BIP0="
        />

        <div>
          <v-card-title class="text-capitalize pa-0">
            {{ doctor.name }}
          </v-card-title>
          <div class="d-flex ga-1 align-center">
            <v-card-text
              class="pa-0 specialism-text"
              v-for="(specialism, index) in doctor.specialismList"
              :key="specialism.id"
            >
              <span v-if="showMoreSpecialism ? showMoreSpecialism : index < 1">
                {{ specialism.name.toLowerCase() + showComma(index, doctor.specialismList.length - 1) }}
              </span>
            </v-card-text>

            <v-card-text
              @click="showMoreSpecialisms"
              class="pa-0 more-text"
              v-if="doctor.specialismList.length > 1 && !showMoreSpecialism"
            >
              More
            </v-card-text>
          </div>
        </div>
      </div>

      <v-btn
        @click="openSchedule"
        color="blue-darken-3"
        height="40"
        tile
        flat
        prepend-icon="mdi-calendar-arrow-right"
        v-if="!isDoctor"
      >
        Schedule
      </v-btn>
    </div>
    <v-divider></v-divider>
    <div class="d-flex ga-1 pt-5 align-baseline address-wrapper">
      <v-icon>mdi-map-marker-radius-outline</v-icon>
      <v-card-text prepend-icon="mdi-magnify" class="pa-0 address-card text-capitalize">
        {{ mountAddress(doctor.address) }}
        <br />
        {{ doctor.address.complement }}
      </v-card-text>
    </div>

    <schedule-date-picker :key="dialogDatePicker.open" :dialog="dialogDatePicker" :doctorId="doctor.id" />
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import ScheduleDatePicker from "./components/ScheduleDatePicker";

export default {
  name: "DoctorCard",
  components: {
    ScheduleDatePicker,
  },
  computed: {
    ...mapGetters(["isDoctor"]),
  },
  props: {
    doctor: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      showMoreSpecialism: false,
      dialogDatePicker: {
        open: false,
      },
    };
  },
  methods: {
    showMoreSpecialisms() {
      this.showMoreSpecialism = true;
    },
    showComma(idx, lastIdx) {
      if (idx === 0 && !this.showMoreSpecialism) return "";
      return idx === lastIdx ? "" : ", ";
    },
    mountAddress(address) {
      return `${address.street}, ${address.houseNumber}, ${address.neighbourhood}, ${address.zipCode}, ${address.city} - ${address.state}`;
    },
    openSchedule() {
      this.dialogDatePicker.open = true;
    },
  },
};
</script>

<style scoped>
.specialism-text {
  text-transform: capitalize;
  font-size: 0.8125rem;
  color: #464646ee;
}

.address-wrapper {
  max-width: 21.875rem;
  font-size: 0.875rem;
  color: #464646ee;
}

.address-wrapper .address-card {
  max-width: 100%;
}

.more-text {
  text-decoration: underline !important;
  text-transform: capitalize !important;
  font-size: 0.8125rem !important;
  color: #464646ee !important;
  cursor: pointer;
}
</style>
