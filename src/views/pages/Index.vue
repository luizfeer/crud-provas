<template>
  <v-row>
  <v-col
    cols="12"
  >
  <span>Estatísticas</span>
  <div class="w-full d-flex justify-center pa-10">
    <v-card
      elevation="2"
      outlined
      class="card"
    >
    {{ subjects.length }}
    <span>Matérias cadastradas</span>
    </v-card>
    <v-card
      elevation="2"
      outlined
      class="card"
    >
    {{ tests.length }}
    <span>Provas cadastradas</span>

    </v-card>
    <v-card
      elevation="2"
      outlined
      class="card"
    >
    {{ students.length }}
    <span>Estudantes cadastradas</span>

    </v-card>
  </div>
  </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    subjects() {
      return JSON.parse(localStorage.getItem('subjects'));
    },
    tests() {
      return JSON.parse(localStorage.getItem('tests'));
    },
    students() {
      return JSON.parse(localStorage.getItem('students'));
    },
  },
};
</script>

<style scoped>
.card{
  width: 13rem;
  height: 10rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
  margin: 0 10px;
}
.card span{
  text-align: center;
  margin: 5px;
  font-size: 1rem;
  color: rgb(83, 83, 83);
  word-wrap: break-word;
}
.w-full{
  width: 100%;
}
</style>
