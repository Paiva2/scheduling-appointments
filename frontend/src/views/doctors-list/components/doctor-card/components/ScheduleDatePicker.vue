<template>
  <v-dialog v-model="dialog.open" width="auto" persistent>
    <Datepicker
      v-if="showDatePicker"
      :min-time="{ hours: 8, minutes: 30 }"
      :disabled-times="disabledTimes"
      time-picker-inline
      :min-date="todayMinDate"
      v-model="dateSelected"
      inline
      hide-offset-dates
      timezone="America/Sao_Paulo"
      @update:model-value="selectDate"
      :disabled="loading"
    >
      <template #action-row="{ selectDate }">
        <div class="action-time-picker d-flex">
          <v-btn
            variant="tonal"
            flat
            tile
            class="select-button"
            color="primary"
            @click="selectDate"
            :disabled="loading"
          >
            Select
          </v-btn>
          <v-btn
            variant="tonal"
            flat
            tile
            class="select-button"
            @click="close"
            :disabled="loading"
          >
            Cancel
          </v-btn>
        </div>
      </template>
    </Datepicker>

    <v-container fluid v-if="showInformations">
      <v-textarea
        v-model="informations"
        :rules="rulesInformation"
        label="Text"
        counter
        width="500"
        bg-color="white"
        color="white"
        tile
        no-resize
      />
      <v-btn class="mt-2" flat tile @click="scheduleDate">Confirm</v-btn>
    </v-container>
  </v-dialog>
</template>

<script>
import Datepicker from "@vuepic/vue-datepicker";
import { useToast } from "vue-toastification";
import { actionTypes } from "@/lib/store/types/actionTypes";
import { AxiosError } from "axios";

export default {
  name: "ScheduleDatePicker",
  components: {
    Datepicker,
  },
  props: {
    dialog: {
      type: Object,
      required: true,
    },
    doctorId: {
      type: String,
      required: true,
    },
  },
  computed: {
    todayMinDate() {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      return today;
    },
    disableSelect() {
      return this.dateSelected === null;
    },
  },
  setup() {
    const toast = useToast();

    const rulesInformation = [(v) => v?.length <= 500 || "Max 500 characters"];

    return { toast, rulesInformation };
  },
  data() {
    return {
      showDatePicker: true,
      dateSelected: null,
      loading: false,
      showInformations: false,
      informations: null,
      disabledTimes: [
        { hours: 21, minutes: "*" },
        { hours: 22, minutes: "*" },
        { hours: 23, minutes: "*" },
      ],
    };
  },
  methods: {
    selectDate() {
      this.showDatePicker = false;
      this.showInformations = true;
    },
    async scheduleDate() {
      this.loading = true;
      try {
        await this.$store.dispatch(actionTypes.SCHEDULING.CREATE, {
          userDoctorId: this.doctorId,
          scheduleDate: this.dateSelected,
          informations: this.informations,
        });

        this.toast.success("Date scheduled!");
      } catch (e) {
        if (e instanceof AxiosError) {
          this.toast.error(e.response.data.message);
        } else {
          this.toast.error("Error while scheduling date...");
        }
      } finally {
        this.loading = false;
        this.close();
      }
    },
    close() {
      this.dialog.open = false;
      this.dateSelected = null;
    },
  },
};
</script>

<style>
.dp__time_picker_inline_container .dp__time_input {
  padding: 20px !important;
}

.action-time-picker {
  justify-content: space-between;
  width: 100%;
  gap: 10px;
}

.action-time-picker button {
  flex: 1;
}
</style>
