<template>
  <div>
    <v-app>
      <v-navigation-drawer
        v-model="drawer"
        :clipped="$vuetify.breakpoint.lgAndUp"
        app
      >
        <v-list nav dense>
          <v-list-item-group color="primary">
            <v-list-item
              v-for="(item, index) in filteredMenuItems"
              :key="index"
              :to="`${item.path}`"
            >
              <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-icon>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>

      <v-main>
        <nuxt />
      </v-main>

      <v-app-bar
        :clipped-left="$vuetify.breakpoint.lgAndUp"
        app
        color="primary"
        dark
      >
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title style="width: 300px;" class="ml-0 mt-2 pl-4">
          <img src="~/assets/agrohawk_named_logo.png" />
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <span>
          {{ currentUser.name }}
        </span>
        <span class="ml-5">
          {{ currentUser.role }}
        </span>
        <v-btn icon @click="logout()">
          <v-icon>mdi-logout</v-icon>
        </v-btn>
      </v-app-bar>
    </v-app>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "layout",
  data: () => ({
    dialog: false,
    drawer: null,
    menuItems: [
      {
        id: "clients",
        icon: "mdi-contacts",
        title: "Clientes",
        path: "/clients",
      },
      {
        id: "farms",
        icon: "mdi-tractor",
        title: "Fincas",
        path: "/farms",
      },
      {
        id: "crops",
        icon: "mdi-sprout",
        title: "Cultivos",
        path: "/crops",
      },
      {
        id: "applications",
        icon: "mdi-domain",
        title: "Aplicaciones",
        path: "/applications",
      },
      {
        id: "configuration",
        icon: "mdi-cog-outline",
        title: "Configuración",
        path: "/configuration",
      }
    ],
  }),
  computed: {
    currentUser(){
      return this.$store.getters['authentication/currentUser'];
      
    },
    filteredMenuItems: function () {
      const filteredModules = (this.currentUser.modules) ? this.currentUser.modules.filter((item) => {
        return item.read;
      }) : [];
      return this.menuItems.filter(({ id }) => JSON.stringify(filteredModules).includes(id));
    },
  },
  methods: {
    ...mapMutations({
      removeCurrentUser: 'authentication/removeCurrentUser'
    }),
    logout() {
      this.$fire.auth
        .signOut()
        .then(() => {
          this.removeCurrentUser()
          this.$nuxt.$router.replace({ path: "/" });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
