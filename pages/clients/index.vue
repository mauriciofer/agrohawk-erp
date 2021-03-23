<template>
  <div>
    <h1 class="ma-10">Clientes</h1>

    <!-- Clients -->

    <!-- Dialog to create/modify client -->

    <ValidationObserver ref="observer" v-slot="{ invalid }" tag="form" @submit.prevent="submit()">
      <v-dialog v-model="clientDialog" persistent max-width="70%">
        <v-card>
          <v-card-title>
            <span class="headline">{{
              isEdition ? "Editar cliente" : "Agregar cliente"
            }}</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="3">
                  <ValidationProvider v-slot="{ errors }" name="Tipo Cliente" rules="required">
                    <v-select
                      text="text"
                      :items="clientTypeList"
                      v-model="client.clientType"
                      name="clientType"
                      label="Tipo de cliente"
                      :error-messages="errors"
                      required
                    ></v-select>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <ValidationProvider v-slot="{ errors }" name="Cedula" rules="required">
                    <v-text-field
                      label="Cédula"
                      v-model="client.identification"
                      required
                      :error-messages="errors"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <ValidationProvider v-slot="{ errors }" name="Nombre" rules="required">
                    <v-text-field
                      label="Nombre"
                      v-model="client.firstName"
                      required
                      :error-messages="errors"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                
                <v-col cols="12" sm="6" md="3" v-if="client.clientType === 1">
                  <ValidationProvider v-slot="{ errors }" name="Segundo nombre" rules="required">
                    <v-text-field
                      label="Segundo nombre"
                      v-model="client.secondName"
                      required
                      :error-messages="errors"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" sm="6" md="3" v-if="client.clientType === 1">
                  <ValidationProvider v-slot="{ errors }" name="Primer apellido" rules="required">
                    <v-text-field
                      label="Apellido"
                      v-model="client.firstLastname"
                      required
                      :error-messages="errors"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" sm="6" md="3" v-if="client.clientType === 1">
                  <ValidationProvider v-slot="{ errors }" name="Segundo apellido" rules="required">
                    <v-text-field
                      label="Segundo Apellido"
                      v-model="client.secondLastname"
                      required
                      :error-messages="errors"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>

                <v-col cols="12" sm="6" md="3">
                  <ValidationProvider v-slot="{ errors }" name="Teléfono" rules="required">
                    <v-text-field
                      label="Teléfono"
                      v-model="client.phone"
                      required
                      :error-messages="errors"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <ValidationProvider v-slot="{ errors }" name="Celular" rules="required">
                    <v-text-field
                      label="Celular"
                      v-model="client.mobile"
                      required
                      :error-messages="errors"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <ValidationProvider v-slot="{ errors }" name="Email" rules="required|email">
                    <v-text-field
                      label="Email"
                      v-model="client.email"
                      :error-messages="errors"
                      required
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>

                <v-col cols="12" sm="6" md="3">
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="Provincia"
                    rules="required"
                  >
                    <v-select
                      :items="provincias"
                      item-text="provincia"
                      item-value="id"
                      :error-messages="errors"
                      label="Provincias"
                      v-model="client.provincia"
                      @change="getCantones($event)"
                    ></v-select>
                  </ValidationProvider>
                </v-col>

                <v-col cols="12" sm="6" md="3">
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="Cantón"
                    rules="required"
                  >
                    <v-select
                      :items="cantones"
                      item-text="canton"
                      item-value="id"
                      :error-messages="errors"
                      label="Cantones"
                      v-model="client.canton"
                      @change="getDistritos($event)"
                    ></v-select>
                  </ValidationProvider>
                </v-col>

                <v-col cols="12" sm="6" md="3">
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="Distrito"
                    rules="required"
                  >
                    <v-select
                      :items="distritos"
                      item-text="distrito"
                      item-value="id"
                      :error-messages="errors"
                      label="Distritos"
                      v-model="client.distrito"
                    ></v-select>
                  </ValidationProvider>
                </v-col>

                <v-col cols="12" sm="6" md="3">
                  <ValidationProvider v-slot="{ errors }" name="Dirección" rules="required">
                    <v-text-field
                      label="Dirección"
                      v-model="client.address"
                      :error-messages="errors"
                      required
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>

              </v-row>

              <v-row>
                <v-col cols="12" sm="6" md="9">
                  <v-divider></v-divider>
                  <v-subheader>Contactos</v-subheader>
                  <v-simple-table>
                    <template v-slot:default>
                      <thead>
                        <tr>
                          <th class="text-left">
                            Principal
                          </th>
                          <th class="text-left">
                            Tipo
                          </th>
                          <th class="text-left">
                            Nombre
                          </th>
                          <th class="text-left">
                            Apellidos
                          </th>
                          <th class="text-left">
                            email
                          </th>
                          <th class="text-left">
                            Teléfono
                          </th>
                          <th class="text-left">
                            Celular
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="item in currentContacts" :key="item.name">
                          <td>
                            <v-icon small class="mr-2" v-if="item.isPrincipal">
                              mdi-check
                            </v-icon>
                            <v-icon small class="mr-2" v-if="!item.isPrincipal"
                              >> mdi-close
                            </v-icon>
                          </td>
                          <td>{{ item.type }}</td>
                          <td>{{ item.name }}</td>
                          <td>{{ item.lastName }}</td>
                          <td>{{ item.email }}</td>
                          <td>{{ item.phone }}</td>
                          <td>{{ item.mobile }}</td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </v-col>
              </v-row>

            </v-container>
            <small>*campos requeridos</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeClientDialog()"
              >Cerrar</v-btn
            >
            <v-btn
              color="blue darken-1"
              text
              @click="createClient()"
              v-if="!isEdition"
              :disabled="invalid"
              >Crear</v-btn
            >
            <v-btn
              color="blue darken-1"
              text
              @click="updateClient()"
              v-if="isEdition"
              :disabled="invalid"
              >Modificar</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </ValidationObserver>
    <!-- End dialog to create/modify client -->

    <!-- Dialog to confirm deletion -->
    <v-dialog v-model="deleteClientDialog" persistent max-width="50%">
      <v-card>
        <v-card-title class="headline"
          >¿Esta segur@ que desea eliminar el cliente?</v-card-title
        >
        <v-card-text>Esta acción no puede ser revertida</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="closeDeleteClientDialog()"
            >Cancelar</v-btn
          >
          <v-btn color="green darken-1" text @click="deleteClient()"
            >Eliminar</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- End Dialog to confirm deletion -->

    <v-card class="ma-10" elevation="2" outlined>
      <!-- Cliens table -->
      <v-data-table
        :headers="clientsTableHeaders"
        :items="clients"
        :items-per-page="5"
        :search="clientsTableSearch"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Clientes</v-toolbar-title>

            <v-divider class="mx-4" inset vertical></v-divider>

            <v-text-field
              v-model="clientsTableSearch"
              append-icon="mdi-magnify"
              label="Buscar"
              single-line
              hide-details
            ></v-text-field>
            <v-spacer></v-spacer>
            <v-btn
              absolute
              right
              tile
              color="primary"
              @click="openCreateClientDialog()"
            >
              <v-icon left>mdi-plus</v-icon>Agregar</v-btn
            >
          </v-toolbar>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="openUpdateClientDialog(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="openDeleteClientDialog(item)">
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
      <!-- End Clients table -->
    </v-card>
    <!-- End Clients -->

    <!-- Snackbars -->
    <v-snackbar
      v-model="snackbar"
      :timeout="snackbarTimeout"
      :color="actionSuccess ? 'success' : 'error'"
    >
      {{ snackbarText }}
      <template v-slot:action="{ attrs }">
        <v-btn icon v-bind="attrs" @click="successSnackbar = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
    <v-overlay :value="loaderActive" :z-index="203">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <!-- End Snackbars -->

  </div>
</template>

<script>

export default {
  name: "clients",
  data: () => ({
    clientDialog: false,
    deleteClientDialog: false,
    currentClient: null,
    client: {
      clientType: 1,
      identification: "",
      firstName: "",
      secondName: "",
      firstLastname: "",
      secondLastname: "",
      phone: "",
      mobile: "",
      email: "",
      provincia: "",
      canton: "",
      distrito: "",
      address: ""
    },
    clientTypeList: [
      { text: "Físico", value: 1 },
      { text: "Jurídico", value: 2 },
    ],
    clientsTableHeaders: [
      {
        text: "Cédula",
        align: "start",
        sortable: true,
        value: "identification",
      },
      { text: "Tipo", value: "clientType" },
      { text: "Nombre", value: "firstName" },
      { text: "Apellido", value: "firstLastname" },
      { text: "Teléfono", value: "phone" },
      { text: "Celular", value: "mobile" },
      { text: "Acciones", value: "actions", sortable: false },
    ],
    clientsTableSearch: "",
    clients: [],
    provincias: [],
    cantones: [],
    distritos: [],
    currentContacts: [],
    snackbar: false,
    snackbarText: "",
    snackbarTimeout: 2000,
    actionSuccess: false,
    loaderActive: false,
    isEdition: false,
  }),
  methods: {
    openCreateClientDialog() {
      this.getProvincias();

      this.clientDialog = true;
      this.isEdition = false;
      this.currentContacts = [];
      this.client = {
        clientType: 1,
        identification: "",
        firstName: "",
        secondName: "",
        firstLastname: "",
        secondLastname: "",
        phone: "",
        mobile: "",
        email: "",
        provincia: "",
        canton: "",
        distrito: "",
        address: ""
      };
    },

    openUpdateClientDialog(data) {
      this.getProvincias();
      this.getCantones(data.provincia);
      this.getDistritos(data.canton);

      this.currentClient = data;
      this.isEdition = true;
      this.clientDialog = true;
      this.client = {
        clientType: data.clientType,
        identification: data.identification,
        firstName: data.firstName,
        secondName: data.secondName,
        firstLastname: data.firstLastname,
        secondLastname: data.secondLastname,
        email: data.email,
        phone: data.phone,
        mobile: data.mobile,
        provincia: data.provincia,
        canton: data.canton,
        distrito: data.distrito,
        address: data.address
      };

      this.loadContacts(data.identification);

    },

    closeClientDialog() {
      this.clientDialog = false;
      this.$refs.observer.reset();
    },

    openDeleteClientDialog(item) {
      this.deleteClientDialog = true;
      this.currentClient = item;
    },

    closeDeleteClientDialog() {
      this.deleteClientDialog = false;
      this.currentClient = null;
    },

    async createClient() {
      const isValid = await this.$refs.observer.validate();

      if (isValid) {
        this.loaderActive = true;
        this.$fire.firestore
          .collection("clients")
          .add({
            clientType: this.client.clientType,
            identification: this.client.identification,
            firstName: this.client.firstName,
            secondName: this.client.secondName,
            firstLastname: this.client.firstLastname,
            secondLastname: this.client.secondLastname,
            email: this.client.email,
            phone: this.client.phone,
            mobile: this.client.mobile,
            provincia: this.client.provincia,
            canton: this.client.canton,
            distrito: this.client.distrito,
            address: this.client.address
          })
          .then(() => {
            this.activateSnackbar("Cliente creado correctamente", true);
            this.getClients();
            this.clientDialog = false;
            this.$refs.observer.reset();
            this.loaderActive = false;
          })
          .catch((error) => {
            console.error("Error writing document: ", error);
            this.activateSnackbar("Error creando cliente", false);
            this.loaderActive = false;
          });
      }
    },

    async getClients() {
      this.loaderActive = true;
      this.clientsData = [];
      await this.$fire.firestore
        .collection("clients")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.clientsData.push({ id: doc.id, ...doc.data() });
            this.clients = this.clientsData;
            this.loaderActive = false;
          });
        })
        .catch((error) => {
          this.activateSnackbar("Error obteniendo la lista de clientes", false);
          console.log("Error getting documents: ", error);
          this.loaderActive = false;
        });
    },

    async updateClient() {
      const isValid = await this.$refs.observer.validate();

      if (isValid) {
        this.loaderActive = true;
        this.$fire.firestore
          .collection("clients")
          .doc(this.currentClient.id)
          .update({
            clientType: this.client.clientType,
            identification: this.client.identification,
            firstName: this.client.firstName,
            secondName: this.client.secondName,
            firstLastname: this.client.firstLastname,
            secondLastname: this.client.secondLastname,
            email: this.client.email,
            phone: this.client.phone,
            mobile: this.client.mobile,
            provincia: this.client.provincia,
            canton: this.client.canton,
            distrito: this.client.distrito,
            address: this.client.address
          })
          .then(() => {
            this.activateSnackbar("Cliente modificado correctamente", true);
            this.getClients();
            this.clientDialog = false;
            this.$refs.observer.reset();
            this.loaderActive = false;
          })
          .catch((error) => {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
            this.activateSnackbar("Error modificando cliente", false);
            this.loaderActive = false;
          });
      }
    },

    async deleteClient() {
      this.loaderActive = true;
      await this.$fire.firestore
        .collection("clients")
        .doc(this.currentClient.id)
        .delete()
        .then(() => {
          this.activateSnackbar("Cliente borrado correctamente", true);
          this.getClients();
          this.deleteClientDialog = false;
          this.loaderActive = false;
        })
        .catch((error) => {
          console.error("Error removing document: ", error);
          this.activateSnackbar("Error borrando cliente", false);
          this.loaderActive = false;
        });
    },

    async loadContacts(clientId) {
      this.loaderActive = true;
      this.currentContacts = [];
      await this.$fire.firestore
        .collection("contacts")
        .where("clientId", "==", clientId)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.currentContacts.push(doc.data());
          });
          this.loaderActive = false;
        })
        .catch((error) => {
          this.activateSnackbar("Error obteniendo la lista de contactos", false);
          console.error("Error getting documents: ", error);
          this.loaderActive = false;
        });
    },

    activateSnackbar(message, success) {
      this.snackbar = true;
      this.snackbarText = message;
      this.actionSuccess = success;
    },

    async getProvincias() {
      this.provinciasData = [];
      await this.$fire.firestore
        .collection("provincias")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.provinciasData.push({ provincia: doc.data().name, ...doc.data() });
            this.provincias = this.provinciasData;
          });
        })
        .catch((error) => {
          this.activateSnackbar("Error obteniendo la lista de provincias", false);
          console.error("Error getting documents: ", error);
        });
    },

    async getCantones(provinciaId) {
      this.cantonesData = [];
      await this.$fire.firestore
        .collection("cantones")
        .where("provincia", "==", provinciaId)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.cantonesData.push({ canton: doc.data().name, ...doc.data() });
            this.cantones = this.cantonesData;
          });
        })
        .catch((error) => {
          this.activateSnackbar("Error obteniendo la lista de cantones", false);
          console.error("Error getting documents: ", error);
        });
    },

    async getDistritos(cantonId) {
      this.distritosData = [];
      await this.$fire.firestore
        .collection("distritos")
        .where("canton", "==", cantonId)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.distritosData.push({ distrito: doc.data().name, ...doc.data() });
            this.distritos = this.distritosData;
          });
        })
        .catch((error) => {
          this.activateSnackbar("Error obteniendo la lista de distritos", false);
          console.error("Error getting documents: ", error);
        });
    }

  },

  mounted() {
    this.getClients();
  },
};
</script>
