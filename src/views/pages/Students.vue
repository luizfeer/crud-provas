<template>
<v-col cols="12">
  <v-data-table
    :headers="headers"
    :items="storeStudents"
    :items-per-page="10"
    class="elevation-1"
    :footer-props="{
        showFirstLastPage: true,
           'items-per-page-text':'Alunos por página'
      }"
  >
  <template v-slot:item="{ item, index }">
    <tr>
     <td>{{item.name}}</td>
     <td>{{ scoreTotal(item) }}</td>
     <td>
         <div
         class="d-flex flex-wrap justify-center"
         style="max-width:400px"
         >
            <v-chip
                v-for="(subject, key) in item.subjects" :key="key"
                color="blue"
                class="mr-3 my-1"
                outlined
            >{{ subject }} </v-chip>
         </div>
    </td>
     <td>{{item.email}}</td>
     <td>{{ `${new Date(item.birthDate).toLocaleDateString('pt-PT')}` }}</td>
     <td>
        <v-btn
         icon
         @click="editStudent(index)">
         <v-icon dark>mdi-pencil</v-icon>
        </v-btn>
       </td>
      <td>
        <v-btn
         icon
         @click="removeStudent(index)">
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
            @click="reset"
        >
        Cadastrar Aluno
        </v-btn>

        <v-expand-transition>
        <v-form v-model="valid" v-if="expand" class="mt-4" ref="form">
        <v-card
            elevation="2"
            class="pa-4"
        >
        <v-card-title v-if="!edit">Cadastro de alunos</v-card-title>
        <v-card-title v-else>Edição de alunos</v-card-title>
        <v-card-subtitle>Preencha todos os campos a baixo.</v-card-subtitle>
                <v-row justify="center" class="ma-6">
                     <v-col
                        cols="12"
                        sm="12"
                        md="6"
                    >
                        <v-text-field
                            v-model="formStudent.name"
                            :rules="nameRules"
                            :counter="64"
                            label="Nome do aluno"
                            required
                        ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="12"
                        md="6"
                        class="pl-11"
                    >
                        <v-text-field
                            v-model="formStudent.email"
                            :rules="emailRules"
                            label="E-mail"
                            required
                        ></v-text-field>
                    </v-col>
                     </v-row>
                     <v-row justify="center">
                    <v-col
                        class="pl-12"
                        cols="12"
                        sm="12"
                        md="6">
                        <v-autocomplete
                            v-model="formStudent.subjects"
                            :items="subjects"
                            label="Matérias cursadas"
                            item-text="name"
                            chips
                            multiple
                            deletable-chips
                            :required="true"
                            :rules="[v => !!v || 'É obrigatório selecionar uma matéria']"
                        ></v-autocomplete>
                    </v-col>

                    <v-col
                        cols="12"
                        sm="12"
                        md="6"
                        class="pr-12"
                    >
                    <v-menu
                        ref="menu"
                        v-model="menuDate"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                        >
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                            class="pt-5"
                            v-model="formStudent.birthDate"
                            label="Data de nascimento"
                            prepend-icon="mdi-calendar"
                            v-bind="attrs"
                            v-on="on"
                            ></v-text-field>
                        </template>
                        <v-date-picker
                            v-model="formStudent.birthDate"
                            :active-picker.sync="activePicker"
                            :max="new Date().toISOString().substr(0, 10)"
                            min="1950-01-01"
                            @change="save"
                        ></v-date-picker>
                        </v-menu>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-btn
                            :disabled="!valid"
                            color="success"
                            class="mr-4"
                            @click="edit ? saveEditedStudent() : saveStudent() "
                        >
                            {{ edit ? 'Salvar edições' : 'Cadastrar'  }}
                        </v-btn>
                    </v-col>
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
      edit: null,
      editIndex: null,
      valid: true,
      expand: false,
      menuDate: false,
      activePicker: 'YEAR',
      min: 0,
      max: 100,
      formStudent: {
        name: '',
        birthDate: null,
        email: '',
        subjects: [],
      },
      storeStudents: [],
      headers: [
        {
          text: 'Nome',
          align: 'start',
          value: 'name',
        },
        {
          text: 'Nota',
          align: 'center',
          value: 'totalScore',
        },
        {
          text: 'Matérias',
          align: 'center',
          value: 'subjects',
        },
        {
          text: 'Email',
          align: 'start',
          value: 'email',
        },
        {
          text: 'Nascimento',
          align: 'start',
          value: 'birthDate',
        },
        {
          text: 'Editar',
          sortable: false,
        },
        {
          text: 'Remover',
          sortable: false,
        },

      ],
      nameRules: [
        (v) => !!v || 'Preencha o nome do aluno',
        (v) => (v && v.length <= 64) || 'O nome deve ter no máximo 64 letras.',
      ],
      emailRules: [
        (v) => !!v || 'Preencha o e-mail',
        (v) => /.+@.+/.test(v) || 'E-mail inválido',
      ],
    };
  },
  watch: {
    menuDate(val) {
      /* eslint no-unused-expressions: [2, { allowShortCircuit: true }] */
      val && setTimeout(() => { this.activePicker = 'YEAR'; });
    },
  },
  mounted() {
    this.getStudents();
  },
  computed: {
    subjects() {
      return JSON.parse(localStorage.getItem('subjects'));
    },
    tests() {
      return JSON.parse(localStorage.getItem('tests'));
    },
  },
  methods: {
    ...mapActions({ setAlert: 'alert' }),
    getStudents() {
      this.storeStudents = JSON.parse(localStorage.getItem('students'));
    },
    scoreTotal(student) {
      const testThisStudent = this.tests.filter((test) => student.subjects.includes(test.subject));
      // filta e retorna todos os tests cadastrados correspodnentes às matérias do aluno em questão
      const totalScore = (testThisStudent.reduce((a, b) => a + (b.score || 0), 0));
      if (!totalScore) return 0;
      // faz o loop e soma as notas totais desses tests
      // retorna valor dividido pelo numero total de tests (media)
      return ((totalScore / testThisStudent.length).toFixed(2)) || 0;
    },
    saveStudent() {
      let students = [];
      if (this.storeStudents) {
        students = this.storeStudents;
      }
      students.push(this.formStudent);
      localStorage.setItem('students', JSON.stringify(students));
      this.$refs.form.reset();
      this.setAlert({ msg: 'Aluno cadastrado com sucesso!' });
      this.getStudents();
    },
    removeStudent(index) {
      this.storeStudents.splice(index, 1);
      this.setAlert({ msg: 'Aluno removido!', color: 'red' });
      localStorage.setItem('students', JSON.stringify(this.storeStudents));
      this.getStudents();
    },
    editStudent(index) {
      this.formStudent = { ...this.storeStudents[index] };
      this.editIndex = index;
      this.expand = true;
      this.edit = true;
    },
    saveEditedStudent() {
      this.storeStudents[this.editIndex] = this.formStudent;
      localStorage.setItem('students', JSON.stringify(this.storeStudents));
      this.reset();
      this.setAlert({ msg: 'Aluno editado com sucesso!' });
      this.getStudents();
    },
    reset() {
      this.expand = !this.expand;
      this.edit = false;
      this.formStudent = {
        name: '',
        birthDate: null,
        email: '',
        subjects: [],
      };
    },
    save(date) {
      this.$refs.menu.save(date);
    },
  },
};
</script>
<style scoped>
</style>
