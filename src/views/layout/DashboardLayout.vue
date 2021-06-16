<template>
  <v-app id="sandbox">
    <Alert />
    <SideBar :primary-drawer="primaryDrawer" />

    <v-app-bar
      :clipped-left="primaryDrawer.clipped"
      app
      color="indigo darken-1"
      dark
    >
      <v-app-bar-nav-icon
        v-if="primaryDrawer.type !== 'permanent'"
        @click.stop="primaryDrawer.model = !primaryDrawer.model"
      />
      <div class="navbar d-flex align-center justify-space-between">

      <v-toolbar-title>CRUD de Provas</v-toolbar-title>
      <v-switch
        v-model="$vuetify.theme.dark"
        inset
        label="Tema Escuro"
        class="mt-5"
      />
      </div>
    </v-app-bar>

    <v-container fluid>
      <v-row
        align="center"
        justify="center"
      >
        <v-col cols="10">
          <v-card>
            <v-card-text>
              <v-row>
                <dashboard-content :primary-drawer="primaryDrawer"> </dashboard-content>
              </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

    <v-footer
      :inset="footer.inset"
      app
      class="d-flex justify-space-between"
    >
      <div class="show-menu d-flex align-center" @click="primaryDrawer.mini = !primaryDrawer.mini">
        <v-icon>
          <!-- eslint-disable max-len -->
          {{ !primaryDrawer.mini ? 'mdi-arrow-left-drop-circle-outline' : 'mdi-arrow-right-drop-circle-outline' }}
        </v-icon>
        <span class="ml-2">
          {{  primaryDrawer.mini ? 'Menu completo' : 'Mini menu' }}
        </span>
      </div>
      <span class="px-4">
        <a href="https://github.com/luizfeer" class="credits" target="_blank" rel="noopener noreferrer">
         Luiz Almeida &copy;
        </a>
        {{ new Date().getFullYear() }}
      </span>
    </v-footer>
  </v-app>
</template>

<script>
import SideBar from '@/views/layout/SideBar.vue';
import DashboardContent from './Content.vue';
import Alert from './Alert.vue';

export default {
  components: {
    DashboardContent,
    SideBar,
    Alert,
  },
  name: 'App',
  data: () => ({
    primaryDrawer: {
      model: null,
      type: 'default (no property)',
      clipped: false,
      floating: false,
      mini: false,
    },
    footer: {
      inset: false,
    },
  }),
};
</script>
<style scoped>
.navbar{
  width: 100%;
}
.show-menu{
  cursor: pointer;
}
.credits{
  color:black;
  text-decoration: none;
}
</style>
