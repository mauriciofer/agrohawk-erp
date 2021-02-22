<template>
  <div>
    <h1 class="ma-10">Configuración</h1>

    <!-- Users -->
    <v-card class="ma-10" elevation="2" outlined>
      <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-title class="headline mb-1">Usuarios</v-list-item-title>
          <v-btn absolute right tile color="primary" @click="createUser()">
            <v-icon left>mdi-plus</v-icon>Agregar</v-btn
          >
        </v-list-item-content>
      </v-list-item>
      <v-data-table
        :headers="userTableHeaders"
        :items="users"
        :items-per-page="5"
        class="ma-10"
        >>
        <template ç>
          <v-icon small class="mr-2">
            mdi-pencil
          </v-icon>
          <v-icon small>
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-card>
    <!-- End Users -->

    <!-- Roles -->
    <v-card class="ma-10" elevation="2" outlined>
      <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-title class="headline mb-1">Roles</v-list-item-title>
          <v-btn absolute right tile color="primary">
            <v-icon left>mdi-plus</v-icon>Agregar</v-btn
          >
        </v-list-item-content>
      </v-list-item>
      <v-data-table
        :headers="userTableHeaders"
        :items="users"
        :items-per-page="5"
        class="ma-10"
        >>
        <template ç>
          <v-icon small class="mr-2">
            mdi-pencil
          </v-icon>
          <v-icon small>
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-card>
    <!-- End roles -->

    <!-- Permissions -->
    <v-card class="ma-10" elevation="2" outlined>
      <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-title class="headline mb-1">Permisos</v-list-item-title>
          <v-btn absolute right tile color="primary">
            <v-icon left>mdi-plus</v-icon>Agregar</v-btn
          >
        </v-list-item-content>
      </v-list-item>
      <v-data-table
        :headers="userTableHeaders"
        :items="users"
        :items-per-page="5"
        class="ma-10"
        >>
        <template ç>
          <v-icon small class="mr-2">
            mdi-pencil
          </v-icon>
          <v-icon small>
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-card>
    <!-- End permissions -->
  </div>
</template>

<script>

export default {
  name: "configuration",
  data: () => ({
    userDialog: false,  
    currentUser: null,
    user: {
      firstName: "",
      secondName: ""
    },
    userTableHeaders: [
      {
        text: "Nombre",
        align: "start",
        sortable: false,
        value: "firstName"
      },
      { text: "Segundo Nombre", value: "secondName" },
      { text: "Apellido", value: "firstLastname" }
    ],
    users: [],
    roles: [],
    permissions: [],
  }),
  methods: {
    
    async createUser() {
      const isValid = true //await this.$refs.observer.validate();
      console.log("test")

      if (isValid) {
        this.$fire.firestore
          .collection("users")
          .add({
            firstName: "test",
            secondName: "test",
          })
          .then(() => {
            console.log("Document successfully written!");
            this.clientDialog = false;
            this.$refs.observer.reset();
          })
          .catch((error) => {
            console.error("Error writing document: ", error);
          });
      }
    },
  },

  mounted() {
    //TODO: get user,roles and permissions
  },
};
</script>

