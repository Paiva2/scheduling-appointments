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
            {{ pacient.name }}
          </v-card-title>
        </div>
      </div>

      <div class="d-flex ga-3">
        <v-btn
          @click="finishSchedule"
          color="blue-darken-3"
          height="40"
          tile
          flat
          prepend-icon="mdi-calendar-check-outline"
          :disabled="hasAppointmentEnded"
        >
          {{ appointmentStatus }}
        </v-btn>

        <v-btn
          v-if="!hasAppointmentEnded && isAppointmentCancelable"
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
          {{ mountAddress(pacient.address) }}
          <br />
          {{ pacient.address.complement }}
        </v-card-text>
      </div>
    </div>
  </v-card>
</template>

<script>
import { actionTypes } from "@/lib/store/types/actionTypes";
import { useToast } from "vue-toastification";
import { AxiosError } from "axios";
import moment from "moment-timezone";

export default {
  name: "AppointmentCardPacient",
  setup() {
    const toast = useToast();
    return { toast };
  },
  props: {
    scheduled: {
      type: Object,
      required: true,
    },
    pacient: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      showMoreSpecialism: false,
    };
  },
  computed: {
    isAppointmentCancelable() {
      const now = moment.tz(moment.now(), "America/Sao_Paulo");
      const schedulingDate = moment.tz(this.scheduled.scheduledAt, "America/Sao_Paulo");
      const schedulingMinutesDiff = schedulingDate.diff(now, "minutes");

      return schedulingMinutesDiff >= 60;
    },
    hasAppointmentEnded() {
      return !this.scheduled.active || !!this.scheduled.finishedAt;
    },
    appointmentStatus() {
      if (this.scheduled.active && !this.scheduled.finishedAt) return "Finish";
      if (this.scheduled.active && !!this.scheduled.finishedAt) return "Finished";
      if (!this.scheduled.active && !this.scheduled.finishedAt) return "Cancelled";
    },
  },
  methods: {
    finishSchedule() {},
    async cancelSchedule() {
      try {
        await this.$store.dispatch(actionTypes.SCHEDULING.CANCEL_SCHEDULING, {
          isDoctor: true,
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
