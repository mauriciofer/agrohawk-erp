<template>
  <v-card flat>
    <v-list-item three-line>
      <v-list-item-content>
        <v-list-item-title class="headline mb-1">Clientes</v-list-item-title>
        <v-list-item-subtitle>Clientes</v-list-item-subtitle>
        <v-btn 
          absolute
          right
          tile
          color="primary"
          @click="openCreateClientDialog()"
        >
          <v-icon left>mdi-plus</v-icon>Agregar</v-btn
        >
      </v-list-item-content>
    </v-list-item>

    <!-- Dialog to create/modify client -->

    <ValidationObserver
      ref="observer"
      v-slot="{ invalid }"
      tag="form"
      @submit.prevent="submit()"
    >
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
                  <ValidationProvider v-slot="{ errors }" name="Nombre" rules="required">
                    <v-text-field
                      label="Nombre"
                      v-model="client.firstName"
                      required
                      :error-messages="errors"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <ValidationProvider v-slot="{ errors }" name="Segundo nombre" rules="required">
                    <v-text-field
                      label="Segundo nombre"
                      v-model="client.secondName"
                      required
                      :error-messages="errors"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <ValidationProvider v-slot="{ errors }" name="Primer apellido" rules="required">
                    <v-text-field
                      label="Apellido"
                      v-model="client.firstLastname"
                      required
                      :error-messages="errors"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" sm="6" md="3">
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
                  <ValidationProvider v-slot="{ errors }" name="Celular" rules="required">
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

    <!-- Clients table -->
    <v-data-table :headers="headers" :items="clients" :items-per-page="5">
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
</template>

<script>
export default {
  name: "clients",
  data: () => ({
    clientDialog: false,
    deleteClientDialog: false,
    currentClient: null,
    client: {
      firstName: "",
      secondName: "",
      firstLastname: "",
      secondLastname: "",
      phone: "",
      mobile: "",
      email: "",
      clientType: 1,
    },
    clientTypeList: [
      { text: "Físico", value: 1 },
      { text: "Jurídico", value: 2 },
    ],
    headers: [
      {
        text: "Nombre",
        align: "start",
        sortable: false,
        value: "firstName",
      },
      { text: "Segundo Nombre", value: "secondName" },
      { text: "Apellido", value: "firstLastname" },
      { text: "Segundo Apellido", value: "secondLastname" },
      { text: "Teléfono", value: "phone" },
      { text: "Celular", value: "mobile" },
      { text: "Acciones", value: "actions", sortable: false },
    ],
    clients: [],
    isEdition: false,
  }),
  methods: {
    openCreateClientDialog() {
      this.clientDialog = true;
      this.isEdition = false;
      this.client = {
        firstName: "",
        secondName: "",
        firstLastname: "",
        secondLastname: "",
        phone: "",
        mobile: "",
        email: "",
        clientType: 1,
      };
    },

    openUpdateClientDialog(data) {
      this.currentClient = data;
      this.isEdition = true;
      this.clientDialog = true;
      this.client = {
        firstName: data.firstName,
        secondName: data.secondName,
        firstLastname: data.firstLastname,
        secondLastname: data.secondLastname,
        email: data.email,
        phone: data.phone,
        mobile: data.mobile,
        clientType: data.clientType,
      };
      console.log(data);
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
        this.$fire.firestore
          .collection("clients")
          .add({
            firstName: this.client.firstName,
            secondName: this.client.secondName,
            firstLastname: this.client.firstLastname,
            secondLastname: this.client.secondLastname,
            email: this.client.email,
            phone: this.client.phone,
            mobile: this.client.mobile,
            clientType: this.client.clientType,
          })
          .then(() => {
            console.log("Document successfully written!");
            this.getClients();
            this.clientDialog = false;
            this.$refs.observer.reset();
          })
          .catch((error) => {
            console.error("Error writing document: ", error);
          });
      }
    },

    getClients() {
      this.clientsData = [];
      this.$fire.firestore
        .collection("clients")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.clientsData.push({ id: doc.id, ...doc.data() });
            console.log(doc.id, " => ", doc.data());
            this.clients = this.clientsData;
          });
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    },

    async updateClient() {
      const isValid = await this.$refs.observer.validate();

      if (isValid) {
        this.$fire.firestore
          .collection("clients")
          .doc(this.currentClient.id)
          .update({
            firstName: this.client.firstName,
            secondName: this.client.secondName,
            firstLastname: this.client.firstLastname,
            secondLastname: this.client.secondLastname,
            email: this.client.email,
            phone: this.client.phone,
            mobile: this.client.mobile,
            clientType: this.client.clientType,
          })
          .then(() => {
            console.log("Document successfully updated!");
            this.getClients();
            this.clientDialog = false;
            this.$refs.observer.reset();
          })
          .catch((error) => {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
          });
      }
    },

    deleteClient() {
      this.$fire.firestore
        .collection("clients")
        .doc(this.currentClient.id)
        .delete()
        .then(() => {
          console.log("Document successfully deleted!");
          this.getClients();
          this.deleteClientDialog = false;
        })
        .catch((error) => {
          console.error("Error removing document: ", error);
        });
    },
  },
  

  mounted() {
    this.getClients();
  },
};
</script>
