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
              v-for="(specialism, index) in doctor.specialisms"
              :key="specialism.id"
            >
              <span v-if="showMoreSpecialism ? showMoreSpecialism : index < 1">
                {{ specialism.name.toLowerCase() + showComma(index, doctor.specialisms.length - 1) }}
              </span>
            </v-card-text>

            <v-card-text
              @click="showMoreSpecialisms"
              class="pa-0 more-text"
              v-if="doctor.specialisms.length > 1 && !showMoreSpecialism"
            >
              More
            </v-card-text>
          </div>
        </div>
      </div>

      <div class="d-flex ga-3">
        <v-btn
          @click="openReschedule"
          color="blue-darken-3"
          height="40"
          tile
          flat
          prepend-icon="mdi-calendar-refresh-outline"
          :disabled="hasAppointmentEnded"
        >
          Reschedule
        </v-btn>

        <v-btn
          v-if="!hasAppointmentEnded"
          @click="cancelSchedule"
          color="blue-grey-lighten-4"
          height="40"
          tile
          flat
          prepend-icon="mdi-calendar-remove-outline"
        >
          Cancel
        </v-btn>
      </div>
    </div>
    <v-divider></v-divider>
    <div class="d-flex pt-5 more-card-wrapper">
      <div class="ga-1 informations-wrapper">
        <v-icon size="20">mdi-invoice-clock-outline</v-icon>
        <v-card-text class="pa-0 informations-title">
          <strong>Active</strong>: {{ this.scheduled.active ? "Yes" : "No" }}
        </v-card-text>
      </div>

      <div class="ga-1 informations-wrapper">
        <v-icon size="20">mdi-clock-outline</v-icon>
        <v-card-text class="pa-0 informations-title">
          <strong>Date</strong>: {{ formatDate(this.scheduled.scheduledAt) }}
        </v-card-text>
      </div>

      <div v-if="!!scheduled.finishedAt" class="ga-1 informations-wrapper">
        <v-icon size="20">mdi-clock-check-outline</v-icon>
        <v-card-text class="pa-0 informations-title">
          <strong>Finished at</strong>: {{ formatDate(this.scheduled.finishedAt) }}
        </v-card-text>
      </div>

      <div class="ga-1 informations-wrapper" v-if="!!scheduled.informations">
        <v-icon size="20">mdi-information-outline</v-icon>
        <v-card-text class="pa-0 informations-title">
          <strong>Informations</strong>: {{ scheduled.informations }}
        </v-card-text>
      </div>

      <div class="d-flex ga-1 align-baseline address-wrapper">
        <v-icon size="20">mdi-map-marker-radius-outline</v-icon>
        <v-card-text prepend-icon="mdi-magnify" class="pa-0 address-card text-capitalize">
          {{ mountAddress(doctor.address) }}
          <br />
          {{ doctor.address.complement }}
        </v-card-text>
      </div>
    </div>

    <schedule-date-picker-dialog
      :scheduled="scheduled"
      :key="dialogDatePicker.open"
      :dialog="dialogDatePicker"
      :doctorId="doctor.id"
    />
  </v-card>
</template>

<script>
import ScheduleDatePickerDialog from "./dialog/ScheduleDatePickerDialog.vue";
import { actionTypes } from "@/lib/store/types/actionTypes";
import { useToast } from "vue-toastification";
import { AxiosError } from "axios";

export default {
  name: "AppointmentCardDoctor",
  setup() {
    const toast = useToast();
    return { toast };
  },
  components: {
    ScheduleDatePickerDialog,
  },
  props: {
    scheduled: {
      type: Object,
      required: true,
    },
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
  computed: {
    hasAppointmentEnded() {
      return !this.scheduled.active || !!this.scheduled.finishedAt;
    },
  },
  methods: {
    openReschedule() {
      this.dialogDatePicker.open = true;
    },
    async cancelSchedule(id) {
      try {
        await this.$store.dispatch(actionTypes.SCHEDULING.CANCEL_SCHEDULING, {
          isDoctor: false,
          schedulingId: this.scheduled.id,
        });
        this.$emit("update-list");
      } catch (e) {
        if (e instanceof AxiosError) {
          this.toast.error(e.response.data.message);
        } else {
          this.toast.error("Error while trying to cancel scheduling...");
        }
      }
    },
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
    formatDate(date) {
      return new Date(date).toLocaleString();
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

.more-card-wrapper {
  width: 100%;
  flex-direction: column;
  gap: 5px;
}

.informations-wrapper {
  display: flex;
  max-width: 21.875rem;
  font-size: 0.875rem;
  color: #464646ee;
  align-items: center;
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
