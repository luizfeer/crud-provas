<template>
<v-col cols="12">
  <v-data-table
    :headers="headers"
    :items="storageSubjects"
    :items-per-page="10"
    item-key="name"
    class="elevation-1"
    locale="pt"
    :footer-props="{
        showFirstLastPage: true,
           'items-per-page-text':'Matérias por página'
      }"
  >
  <template v-slot:item="{ item }">
        <tr>
            <td>{{item.name}}</td>
            <td>
                <v-btn
                    icon
                    @click="removeSubject(storageSubjects.indexOf(item))"
                    ><v-icon dark>mdi-delete</v-icon></v-btn>
            </td>
        </tr>
  </template>
</v-data-table>
<v-col class="shrink">
      <v-btn
        class="ma-2"
        color="primary"
        @click="expand = !expand"
      >
       Cadastrar Matéria
      </v-btn>

    <v-expand-transition>
    <v-form v-model="valid" v-if="expand" ref="form">
    <v-card
            elevation="2"
            class="pa-4"
        >
        <v-card-title>Cadastro de novas matérias</v-card-title>
        <v-card-subtitle>Preencha todos os campos a baixo.</v-card-subtitle>
            <v-text-field
              v-model="subjectName"
              :rules="nameRules"
              :counter="24"
              label="Nome da Matéria"
              required
              />
          <v-btn
              :disabled="!valid"
              color="success"
              class="mr-4"
              @click="saveSubject"
          >
              Cadastrar
          </v-btn>
    </v-card>
    </v-form>
  </v-expand-transition>
  </v-col>
</v-col>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      valid: true,
      expand: false,
      subjectName: '',
      storageSubjects: [],
      headers: [
        {
          text: 'Matérias cadastradas',
          align: 'start',
          value: 'name',
        },
        {
          text: 'Remover',
          sortable: false,
        },
      ],
      nameRules: [
        (v) => !!v || 'Preencha o nome da matéria',
        (v) => (v && v.length <= 24) || 'O nome da matéria de ve ter no máximo 24 letras.',
      ],
    };
  },
  mounted() {
    this.getSubject();
  },
  methods: {
    ...mapActions({ setAlert: 'alert' }),

    getSubject() {
      this.storageSubjects = JSON.parse(localStorage.getItem('subjects'));
    },
    saveSubject() {
      let subjects = [];
      if (this.storageSubjects) {
        subjects = this.storageSubjects;
      }
      subjects.push({ name: this.subjectName });
      localStorage.setItem('subjects', JSON.stringify(subjects));
      this.$refs.form.reset();
      this.setAlert({ msg: 'Prova salva com sucesso!' });
      this.getSubject();
    },
    removeSubject(index) {
      this.storageSubjects.splice(index, 1);
      localStorage.setItem('subjects', JSON.stringify(this.storageSubjects));
      this.getSubject();
    },
  },
};
</script>
<style scoped>
</style>
