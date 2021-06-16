import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// import '@/assets/css/tailwind.css';

import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
  mounted() {
    this.$vuetify.lang.defaultLocale = 'pt';
    this.$vuetify.lang.current = 'pt';

    if (!localStorage.getItem('subjects')) {
      localStorage.setItem('subjects', JSON.stringify([
        { name: 'Geografia' },
        { name: 'História' },
        { name: 'Matemática' },
        { name: 'Química' },
        { name: 'Sociologia' },
        { name: 'Português' },
      ]));
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
    }
  },
}).$mount('#app');
