<template>
  <div>
    <v-app id="inspire">
      <v-navigation-drawer
        v-model="drawer"
        :clipped="$vuetify.breakpoint.lgAndUp"
        app
      >
        <v-list dense>
          <v-list-item-group>
            <v-list-item
              v-for="(item, index) in items"
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

        <v-list dense>
          <v-list-item-group>
            <v-list-item to=/configuration>
              <v-list-item-icon>
                <v-icon>mdi-cog-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-title>{{ "Configuracion" }}</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>

        <v-main>
          <nuxt/>
        </v-main>

      <v-app-bar
        :clipped-left="$vuetify.breakpoint.lgAndUp"
        app
        color="blue darken-3"
        dark
      >
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
          <span class="hidden-sm-and-down">Agrohawk</span>
        </v-toolbar-title>
        <v-text-field
          flat
          solo-inverted
          hide-details
          prepend-inner-icon="mdi-magnify"
          label="Search"
          class="hidden-sm-and-down"
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>mdi-apps</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-bell</v-icon>
        </v-btn>
        <v-btn icon large>
          <v-avatar size="32px" item>
            <v-img
              src="https://cdn.vuetifyjs.com/images/logos/logo.svg"
              alt="Vuetify"
            ></v-img
          ></v-avatar>
        </v-btn>
      </v-app-bar>
    </v-app>
  </div>
</template>

<script>
export default {
  name: 'layout',
  data: () => ({
    dialog: false,
    drawer: null,
    items: [
        { 
          icon: "mdi-contacts",
          title: "Clientes", 
          path: "/clients" 
        },
        { 
          icon: "mdi-tractor",
          title: "Fincas", 
          path: "/farms" 
        }
      ],
  }),

  methods: {
  },
};
</script>