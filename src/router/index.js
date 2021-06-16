import Vue from 'vue';
import VueRouter from 'vue-router';
import Dashboard from '@/views/pages/Index.vue';
import DashboardLayout from '@/views/layout/DashboardLayout.vue';
import Students from '@/views/pages/Students.vue';
import Test from '@/views/pages/Test.vue';
import Subjects from '@/views/pages/Subjects.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: DashboardLayout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: Dashboard,
      },
      {
        path: 'alunos',
        name: 'Alunos',
        component: Students,
      },
      {
        path: 'provas',
        name: 'Provas',
        component: Test,
      },
      {
        path: 'materias',
        name: 'Matérias',
        component: Subjects,
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
