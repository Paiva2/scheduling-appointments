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
          <v-card v-for="{ raw: doctor } in doctors" :key="doctor.id" class="mb-3 px-4 py-7">
            <div class="d-flex align-center ga-4 pb-5 justify-space-between">
              <div class="d-flex align-center ga-2">
                <v-avatar
                  size="80"
                  image="https://cdn.britannica.com/27/262227-050-E8D701BC/John-Lennon-The-Beatles-1968.jpg?w=400&h=300&c=crop"
                />

                <div>
                  <v-card-title class="title pa-0">
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

              <v-btn color="blue-darken-3" height="40" tile flat prepend-icon="mdi-calendar-arrow-right">
                Schedule
              </v-btn>
            </div>
            <v-divider></v-divider>
            <div class="d-flex ga-1 pt-5 align-baseline address-wrapper">
              <v-icon>mdi-map-marker-radius-outline</v-icon>
              <v-card-text prepend-icon="mdi-magnify" class="pa-0">
                {{ mountAddress(doctor.address) }}
                <br />
                {{ doctor.address.complement }}
              </v-card-text>
            </div>
          </v-card>
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

export default {
  name: "DoctorsListView",
  components: {
    EmptyFallback,
  },
  data() {
    return {
      page: 1,
      totalPages: 1,
      doctorsList: [],
      loading: false,
      showMoreSpecialism: false,
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
    showMoreSpecialisms() {
      this.showMoreSpecialism = true;
    },
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
        console.log(e);
      } finally {
        this.loading = false;
      }
    },
    mountAddress(address) {
      return `${address.street}, ${address.houseNumber}, ${address.neighbourhood}, ${address.zipCode}, ${address.city} - ${address.state}`;
    },
    showComma(idx, lastIdx) {
      if (idx === 0 && !this.showMoreSpecialism) return "";
      return idx === lastIdx ? "" : ", ";
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
  gap: 3.125rem;
  height: 31.25rem;
}

.specialism-text {
  text-transform: capitalize;
  font-size: 0.8125rem;
  color: #464646ee;
}

.more-text {
  text-decoration: underline !important;
  text-transform: capitalize !important;
  font-size: 0.8125rem !important;
  color: #464646ee !important;
  cursor: pointer;
}

.address-wrapper {
  max-width: 50%;
  font-size: 0.875rem;
  color: #464646ee;
}
</style>
