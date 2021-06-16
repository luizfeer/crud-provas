<template>
    <v-navigation-drawer
      v-model="primaryDrawer.model"
      :clipped="primaryDrawer.clipped"
      :floating="primaryDrawer.floating"
      :mini-variant="primaryDrawer.mini"
      :permanent="primaryDrawer.type === 'permanent'"
      :temporary="primaryDrawer.type === 'temporary'"
      app
      overflow
    >
         <v-list
        nav
        dense
      >
        <v-list-item-group
          color="text--teal text--lighten-3"
        >
          <!-- active-class="deep-purple--text text--accent-4" -->
            <v-list-item
              v-for="(link, index) in sidebarLinks"
              :key="link.name + index"
              :to="link.path"
            >
              <v-list-item-icon>
                <v-icon>{{ link.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title>{{ link.name }}</v-list-item-title>
            </v-list-item>

          </v-list-item-group>
        </v-list>
    </v-navigation-drawer>

</template>

<script>
export default {
  props: {
    primaryDrawer: {
      type: Object,
    },
  },
  data: () => ({
    sidebarLinks: [
      {
        name: 'Inicio',
        icon: 'mdi-home',
        path: '/dashboard',
      },
      {
        name: 'Alunos',
        icon: 'mdi-account-supervisor',
        path: '/alunos',
      },
      {
        name: 'Provas',
        icon: 'mdi-file-outline',
        path: '/provas',
      },
      {
        name: 'Matérias',
        icon: 'mdi-school-outline',
        path: '/materias',
      },

    ],
  }),
};
</script>

<style scoped>

</style>
