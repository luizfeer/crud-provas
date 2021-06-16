<template>
<v-col cols="12">
  <v-data-table
    :headers="headers"
    :items="storeTests"
    :items-per-page="10"
    class="elevation-1"
    :footer-props="{
        showFirstLastPage: true,
           'items-per-page-text':'Provas por página'
      }"
  >
  <template v-slot:item="{ item, index }">
    <tr>
     <td>{{item.name}}</td>
     <td>{{item.subject}}</td>
     <td>{{item.score}}</td>
     <td>{{ `${new Date(item.date).toLocaleDateString('pt-PT')} às ${item.time}h` }}</td>
      <td>
        <v-btn
         icon
         @click="removeSubject(index)">
         <v-icon dark>mdi-delete</v-icon>
        </v-btn>
       </td>
     </tr>
  </template>
</v-data-table>
<v-row
    align="center"
    justify="center">
    <v-col class="shrink" cols="12">
        <v-btn
            class="pa-2 mt-5"
            color="primary"
            @click="expand = !expand"
        >
        Cadastrar Prova
        </v-btn>

        <v-expand-transition>
        <v-form v-model="valid" v-if="expand" class="mt-4" ref="form">
        <v-card
            elevation="2"
            class="pa-4"
        >
        <v-card-title>Cadastro de novas provas</v-card-title>
        <v-card-subtitle>Preencha todos os campos a baixo.</v-card-subtitle>
                <v-row justify="center" class="ma-6">
                    <v-col
                        cols="12"
                        sm="12"
                        md="6">
                        <v-autocomplete
                            v-model="formTest.subject"
                            :items="subjects"
                            label="Matéria"
                            item-text="name"
                            :required="true"
                            :rules="[v => !!v || 'É obrigatório selecioanar uma matéria']"
                        ></v-autocomplete>
                    </v-col>
                    <v-col
                     class="pl-10"
                        cols="12"
                        sm="12"
                        md="6">
                    <v-text-field
                        v-model="formTest.name"
                        :rules="nameRules"
                        :counter="24"
                        label="Tema da prova"
                        required
                    ></v-text-field>
                    </v-col>
                    </v-row>
                    <v-row justify="center">
                    <v-col
                     class="pl-10 pr-3"
                        cols="12"
                        sm="12"
                        md="6"
                    >
                    <v-menu
                        ref="menutime"
                        v-model="menuDate"
                        :close-on-content-click="false"
                        :return-value.sync="formTest.date"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                    >
                        <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                            v-model="formTest.date"
                            label="Data da prova"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                        ></v-text-field>
                        </template>
                        <v-date-picker
                        v-model="formTest.date"
                        no-title
                        scrollable
                        >
                        <v-spacer></v-spacer>
                        <v-btn
                            text
                            color="primary"
                            @click="menu = false"
                        >
                            Cancelar
                        </v-btn>
                        <v-btn
                            text
                            color="primary"
                            @click="$refs.menutime.save(formTest.date)"
                        >
                            Salvar
                        </v-btn>
                        </v-date-picker>
                    </v-menu>
                    </v-col>
                    <v-col
                        class="px-10"
                        cols="12"
                        sm="12"
                        md="6"
                    >
                    <v-menu
                        ref="menu"
                        v-model="menuTime"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        :return-value.sync="formTest.time"
                        transition="scale-transition"
                        offset-y
                        max-width="290px"
                        min-width="290px"
                    >
                        <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                            v-model="formTest.time"
                            label="Horário da prova"
                            prepend-icon="mdi-clock-time-four-outline"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                        ></v-text-field>
                        </template>
                        <v-time-picker
                        v-if="menuTime"
                        v-model="formTest.time"
                        format="24hr"
                        full-width
                        @click:minute="$refs.menu.save(formTest.time)"
                        ></v-time-picker>
                    </v-menu>
                    </v-col>
                </v-row>
                <v-row>
                   <v-col
                        class="px-10"
                        cols="12"
                        sm="12"
                    >
                <v-card
                    flat
                    color="transparent"
                >
                    <v-subheader>Valor da prova</v-subheader>

                    <v-card-text>
                    <v-row>
                        <v-col class="pr-4">
                        <v-slider
                            v-model="formTest.score"
                            class="align-center"
                            :max="max"
                            :min="min"
                            hide-details
                        >
                            <template v-slot:append>
                            <v-text-field
                                v-model="formTest.score"
                                class="mt-0 pt-0"
                                hide-details
                                single-line
                                type="number"
                                style="width: 60px"
                            ></v-text-field>
                            </template>
                        </v-slider>
                        </v-col>
                    </v-row>
                    </v-card-text>
                </v-card>
                   </v-col>

            <v-btn
                :disabled="!valid"
                color="success"
                class="mr-4"
                @click="saveTest"
            >
                Cadastrar
            </v-btn>
                </v-row>

        </v-card>
        </v-form>
    </v-expand-transition>
    </v-col>
</v-row>

</v-col>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      valid: true,
      expand: false,
      menuDate: false,
      menuTime: false,
      min: 0,
      max: 100,
      formTest: {
        name: '',
        date: new Date().toISOString().substr(0, 10),
        time: '11:10',
        subject: '',
        score: 25,
      },
      storeTests: [],
      headers: [
        {
          text: 'Tema',
          align: 'start',
          value: 'name',
        },
        {
          text: 'Matéria',
          align: 'start',
          value: 'subject',
        },
        {
          text: 'Valor',
          align: 'start',
          value: 'score',
        },
        {
          text: 'Data',
          align: 'start',
          value: 'date',
        },
        {
          text: 'Remover',
          sortable: false,
        },

      ],
      nameRules: [
        (v) => !!v || 'Preencha o tema da prova',
        (v) => (v && v.length <= 24) || 'O tema de ve ter no máximo 24 letras.',
      ],
    };
  },
  mounted() {
    this.getTests();
  },
  computed: {
    subjects() {
      return JSON.parse(localStorage.getItem('subjects'));
    },
  },
  methods: {
    ...mapActions({ setAlert: 'alert' }),
    allowedStep: (m) => m % 10 === 0,
    getTests() {
      this.storeTests = JSON.parse(localStorage.getItem('tests'));
    },
    saveTest() {
      let tests = [];
      if (this.storeTests) {
        tests = this.storeTests;
      }
      tests.push(this.formTest);
      localStorage.setItem('tests', JSON.stringify(tests));
      this.$refs.form.reset();
      this.setAlert({ msg: 'Prova salva com sucesso!' });
      this.getTests();
    },
    removeSubject(index) {
      console.log(index);
      this.storeTests.splice(index, 1);
      this.setAlert({ msg: 'Prova removida!', color: 'red' });
      localStorage.setItem('tests', JSON.stringify(this.storeTests));
      this.getTests();
    },
  },
};
</script>
<style scoped>
</style>
