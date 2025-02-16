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
        "Acre",
        "Alagoas",
        "Amapá",
        "Amazonas",
        "Bahia",
        "Ceará",
        "Distrito Federal",
        "Espírito Santo",
        "Goiás",
        "Maranhão",
        "Mato Grosso",
        "Mato Grosso do Sul",
        "Minas Gerais",
        "Pará",
        "Paraíba",
        "Paraná",
        "Pernambuco",
        "Piauí",
        "Rio de Janeiro",
        "Rio Grande do Norte",
        "Rio Grande do Sul",
        "Rondônia",
        "Roraima",
        "Santa Catarina",
        "São Paulo",
        "Sergipe",
        "Tocantins",
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
