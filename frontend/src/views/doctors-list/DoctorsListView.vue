<template>
  <div class="doctors-list-wrapper pt-4 px-2">
    <div class="list">
      <v-card class="information-bar ma-0 pa-4 rounded-0">
        <v-card-title class="pa-0">Specialism: {{ specialismQueried }}</v-card-title>
        <v-card-text class="pa-0">State: {{ stateQueried }}</v-card-text>
      </v-card>

      <v-data-iterator
        v-if="!!doctorsList.length"
        :items="doctorsList"
        :page="page"
        class="list-items"
        :loading="loading"
      >
        <template v-slot:default="{ items: doctors }">
          <doctor-card v-for="{ raw: doctor } in doctors" :key="doctor.id" :doctor="doctor" />
        </template>

        <template v-slot:footer v-if="!loading">
          <v-pagination v-model="page" :length="totalPages"></v-pagination>
        </template>
      </v-data-iterator>

      <empty-fallback v-else-if="!loading" />
    </div>
  </div>
</template>

<script>
import { actionTypes } from "@/lib/store/types/actionTypes";
import EmptyFallback from "@/components/empty-fallback/EmptyFallback";
import DoctorCard from "./components/doctor-card/DoctorCard.vue";
import { useToast } from "vue-toastification";

export default {
  name: "DoctorsListView",
  components: {
    EmptyFallback,
    DoctorCard,
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
  data() {
    return {
      page: 1,
      totalPages: 1,
      doctorsList: [],
      loading: false,
    };
  },
  async mounted() {
    await this.getDoctors();
  },
  computed: {
    specialismQueried() {
      return this.$route.query.specialism;
    },
    stateQueried() {
      return this.$route.query.state;
    },
  },
  methods: {
    async getDoctors() {
      try {
        this.loading = true;

        const paginableData = await this.$store.dispatch(actionTypes.LIST.GET_DOCTORS, {
          state: this.stateQueried,
          specialism: this.specialismQueried,
          size: 15,
          page: 1,
        });

        this.doctorsList = paginableData.data;
        this.page = paginableData.page;
        this.totalPages = paginableData.totalPages;
      } catch (e) {
        this.toast.error("Error while getting list...");
      } finally {
        this.loading = false;
      }
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
}

.list-items > div .info-card {
  min-height: 240px;
}
</style>
