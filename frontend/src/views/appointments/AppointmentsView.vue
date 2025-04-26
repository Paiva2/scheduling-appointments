<template>
  <div class="doctors-list-wrapper pt-4 px-2">
    <div class="list">
      <v-card class="information-bar ma-0 pa-4 rounded-0">
        <v-card-title class="pa-0">Appointments</v-card-title>
        <v-card-text class="pa-0">Show: All</v-card-text>
      </v-card>

      <v-data-iterator
        v-if="!!appointmentsList?.length"
        :items="appointmentsList"
        :page="page"
        class="list-items"
        :loading="loading"
      >
        <template v-slot:default="{ items }">
          <appointment-card-pacient
            v-if="isDoctor"
            v-for="{ raw: item } in items"
            :scheduled="item"
            :key="item.pacient.id"
            :pacient="item.pacient"
            @update-list="refetchList"
          />

          <appointment-card-doctor
            v-else
            v-for="{ raw: item } in items"
            :scheduled="item"
            :key="item.doctor?.id"
            :doctor="item.doctor"
            @update-list="refetchList"
          />
        </template>

        <template v-slot:footer v-if="!loading">
          <v-pagination v-model="page" :length="totalPages"></v-pagination>
        </template>
      </v-data-iterator>

      <empty-fallback
        text="Set up your appointments and they will appear right here!"
        title="Nothing here..."
        v-else-if="!loading"
      />
    </div>
  </div>
</template>

<script>
import { actionTypes } from "../../lib/store/types/actionTypes";
import { mapGetters } from "vuex";
import AppointmentCardPacient from "./components/AppointmentCardPacient.vue";
import AppointmentCardDoctor from "./components/AppointmentCardDoctor.vue";
import { useToast } from "vue-toastification";

export default {
  name: "AppointmentsView",
  components: {
    AppointmentCardPacient,
    AppointmentCardDoctor,
  },
  setup() {
    const toast = useToast();

    return { toast };
  },
  watch: {
    async page() {
      await this.getSchedulings();
    },
  },
  data() {
    return {
      page: 1,
      totalPages: 1,
      appointmentsList: [],
      loading: false,
    };
  },
  computed: {
    ...mapGetters(["isDoctor"]),
  },
  async mounted() {
    await this.getSchedulings();
  },
  methods: {
    async getSchedulings() {
      this.loading = true;

      try {
        const action = this.isDoctor
          ? actionTypes.SCHEDULING.GET_DOCTOR_SCHEDLINGS
          : actionTypes.SCHEDULING.GET_USER_SCHEDLINGS;

        const list = await this.$store.dispatch(action, {
          page: this.page,
          size: 15,
        });

        this.page = list.page;
        this.totalPages = list.totalPages;
        this.appointmentsList = list.data;
      } catch {
        this.toast.error("Error while fetching appointments...");
      } finally {
        this.loading = false;
      }
    },
    async refetchList() {
      this.page = 1;
      await this.getSchedulings();
    },
  },
};
</script>

<style>
.doctors-list-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.list {
  display: flex;
  width: 100%;
  max-width: 700px;
  height: 100%;
  flex-direction: column;
  gap: 0.75rem;
}

.information-bar {
  width: 100%;
  height: fit-content;
  background-color: #1565c0;
  color: #fff;
}

.list-items > div {
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  height: 43.75rem;
  padding-right: 5px !important;
}

.list-items > div .info-card {
  min-height: fit-content;
  max-width: 100%;
}
</style>
