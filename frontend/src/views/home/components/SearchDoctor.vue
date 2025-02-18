<template>
  <div class="search">
    <v-select
      hide-details
      clearable
      tile
      bg-color="white"
      v-model="specialism"
      :items="specialisms"
      width="45%"
      label="Specialism"
      variant="solo"
      color="blue-darken-3"
    />

    <v-select
      hide-details
      clearable
      width="45%"
      tile
      bg-color="white"
      v-model="state"
      :items="locations"
      label="State"
      variant="solo"
      color="blue-darken-3"
      item-title="name"
      item-value="value"
    />

    <v-btn
      prepend-icon="mdi-magnify"
      flat
      color="blue-darken-1"
      tile
      text="Search"
      width="140px"
      height="100%"
      :disabled="!specialism || !state"
      @click="search"
    ></v-btn>
  </div>
</template>

<script>
export default {
  name: "SearchDoctor",
  data() {
    return {
      specialism: null,
      state: null,
      specialisms: ["Cardiology", "Neurology", "Dermatology", "Pediatrics", "Orthopedics"],
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
    };
  },
  methods: {
    search() {
      this.$router.push({
        name: "doctors-list",
        query: {
          specialism: this.specialism,
          state: this.state,
        },
      });
    },
  },
};
</script>

<style>
.search {
  background-color: rgba(0, 0, 0, 0.1);
  width: 100%;
  display: flex;
  gap: 5px;
  padding: 15px;
}
</style>
