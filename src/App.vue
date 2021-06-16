<template>
  <v-app :key="key">
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    key: 0,
  }),
  mounted() {
    if (!localStorage.getItem('subjects')) {
      localStorage.setItem('subjects', JSON.stringify([
        { name: 'Geografia' },
        { name: 'História' },
        { name: 'Matemática' },
        { name: 'Química' },
        { name: 'Sociologia' },
        { name: 'Português' },
      ]));
      this.key += 1;
    }
    if (!localStorage.getItem('students')) {
      localStorage.setItem('students', JSON.stringify([
        {
          name: 'Luiz Almeida',
          birthDate: '1996-10-24',
          email: 'luiz.garra@live.com',
          subjects: ['Geografia', 'Matemática', 'Química'],
        },
        {
          name: 'João Marcelo',
          birthDate: '2002-02-04',
          email: 'joao@email.com',
          subjects: ['Matemática', 'Geografia', 'Português'],
        },
        {
          name: 'Simão Pedro',
          birthDate: '1950-01-01',
          email: 'pedrao.pescador@gmail.com',
          subjects: ['Português', 'Sociologia', 'História'],
        }]));
      this.key += 1;
    }

    if (!localStorage.getItem('tests')) {
      localStorage.setItem('tests', JSON.stringify([
        {
          name: 'Verbos',
          date: '2021-06-16',
          time: '11:10',
          subject: 'Português',
          score: 25,
        },
        {
          name: 'Mapas',
          date: '2021-06-30',
          time: '11:10',
          subject: 'Geografia',
          score: 60,
        },
        {
          name: 'Tabuada',
          date: '2023-02-23',
          time: '18:30',
          subject: 'Matemática',
          score: 100,
        },
        {
          name: 'Navegações',
          date: '2021-06-30',
          time: '11:10',
          subject: 'História',
          score: 100,
        },
      ]));
      this.key += 1;
    }
  },
};
</script>
