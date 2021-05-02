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
                      label="Tipo de cliente *"
                      :error-messages="errors"
                      required
                    ></v-select>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <ValidationProvider v-slot="{ errors }" name="Cedula" rules="required">
                    <v-text-field
                      label="Cédula *"
                      v-model="client.identification"
                      required
                      :error-messages="errors"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <ValidationProvider v-slot="{ errors }" name="Nombre" rules="required">
                    <v-text-field
                      label="Nombre *"
                      v-model="client.firstName"
                      required
                      :error-messages="errors"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" sm="6" md="3" v-if="client.clientType === 2">
                  <ValidationProvider v-slot="{ errors }" name="pympa">
                    <v-text-field
                      label="Pympa"
                      v-model="client.pympa"
                      :error-messages="errors"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" sm="6" md="3" v-if="client.clientType === 2">
                  <ValidationProvider v-slot="{ errors }" name="meic">
                    <v-text-field
                      label="Meic"
                      v-model="client.meic"
                      :error-messages="errors"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" sm="6" md="3" v-if="client.clientType === 2">
                  <ValidationProvider v-slot="{ errors }" name="otros">
                    <v-text-field
                      label="Otros"
                      v-model="client.others"
                      :error-messages="errors"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" sm="6" md="3" v-if="client.clientType === 1">
                  <ValidationProvider v-slot="{ errors }" name="Segundo nombre">
                    <v-text-field
                      label="Segundo nombre"
                      v-model="client.secondName"
                      :error-messages="errors"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" sm="6" md="3" v-if="client.clientType === 1">
                  <ValidationProvider v-slot="{ errors }" name="Primer apellido">
                    <v-text-field
                      label="Apellido"
                      v-model="client.firstLastname"
                      :error-messages="errors"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" sm="6" md="3" v-if="client.clientType === 1">
                  <ValidationProvider v-slot="{ errors }" name="Segundo apellido">
                    <v-text-field
                      label="Segundo Apellido"
                      v-model="client.secondLastname"
                      :error-messages="errors"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>

                <v-col cols="12" sm="6" md="3">
                  <ValidationProvider v-slot="{ errors }" name="Teléfono Principal" rules="required|digits:8">
                    <v-text-field
                      label="Teléfono Principal *"
                      v-model="client.mobile"
                      :type="'number'"
                      hint="8 números"
                      required
                      :error-messages="errors"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>

                <v-col cols="12" sm="6" md="3">
                  <ValidationProvider v-slot="{ errors }" name="Teléfono Secundario" rules="digits:8">
                    <v-text-field
                      label="Teléfono Secundario"
                      v-model="client.phone"
                      :type="'number'"
                      hint="8 números"
                      :error-messages="errors"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                
                <v-col cols="12" sm="6" md="3">
                  <ValidationProvider v-slot="{ errors }" name="Email" rules="required|email">
                    <v-text-field
                      label="Email *"
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
                      label="Provincias *"
                      v-model="client.provincia"
                      @change="$fetch()"
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
                      label="Cantones *"
                      v-model="client.canton"
                      @change="$fetch()"
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
                      label="Distritos *"
                      v-model="client.distrito"
                    ></v-select>
                  </ValidationProvider>
                </v-col>

                <v-col cols="12" sm="6" md="3">
                  <ValidationProvider v-slot="{ errors }" name="Dirección" rules="required">
                    <v-text-field
                      label="Dirección *"
                      v-model="client.address"
                      :error-messages="errors"
                      required
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>

              </v-row>

              <v-row>
                <v-col cols="12" sm="6" md="12">
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
                            Teléfono Principal
                          </th>
                          <th class="text-left">
                            Teléfono Secundario
                          </th>
                          <th class="text-left">
                            Señas
                          </th>
                          <th class="text-left">
                            <v-icon small class="mr-2" @click="createContact()">
                              mdi-plus
                            </v-icon>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="item in contacts" :key="item.id">
                          <td>
                            <v-edit-dialog
                              :return-value="item.isPrincipal"
                              @save="saveContact()"
                              @cancel="cancelContact"
                              @open="openContact"
                              @close="closeContact"
                              large
                              cancel-text="Cancelar"
                              save-text="Guardar"
                              persistent
                            > 
                              <v-icon small class="mr-2" v-if="item.isPrincipal">
                                mdi-check
                              </v-icon>
                              <v-icon small class="mr-2" v-if="!item.isPrincipal">
                                mdi-close
                              </v-icon>
                              <template v-slot:input>
                                <v-container
                                  class="px-0"
                                  fluid
                                >
                                  <v-checkbox
                                    :value="item.isPrincipal"
                                    @change="updateContact(item, $event, 'isPrincipal')"
                                    :label="`Es Principal: ${item.isPrincipal ? 'Sí' : 'No'}`"
                                  ></v-checkbox>
                                </v-container>
                              </template>
                            </v-edit-dialog>
                          </td>
                          <td>
                            <v-edit-dialog
                              :return-value="item.type"
                              @save="saveContact()"
                              @cancel="cancelContact"
                              @open="openContact"
                              @close="closeContact"
                              large
                              cancel-text="Cancelar"
                              save-text="Guardar"
                              persistent
                            > {{ item.type }}
                              <template v-slot:input>
                                <ValidationProvider v-slot="{ errors }" name="Tipo" rules="required">
                                  <v-text-field
                                    :value="item.type"
                                    @change="updateContact(item, $event, 'type')"
                                    label="Tipo *"
                                    single-line
                                    :error-messages="errors"
                                    required
                                  ></v-text-field>
                                </ValidationProvider>
                              </template>
                            </v-edit-dialog>
                          </td>
                          <td>
                            <v-edit-dialog
                              :return-value="item.name"
                              @save="saveContact()"
                              @cancel="cancelContact"
                              @open="openContact"
                              @close="closeContact"
                              large
                              cancel-text="Cancelar"
                              save-text="Guardar"
                              persistent
                            > {{ item.name }}
                              <template v-slot:input>
                                <ValidationProvider v-slot="{ errors }" name="Nombre" rules="required">
                                  <v-text-field
                                    :value="item.name"
                                    @change="updateContact(item, $event, 'name')"
                                    label="Nombre *"
                                    single-line
                                    :error-messages="errors"
                                    required
                                  ></v-text-field>
                                </ValidationProvider>
                              </template>
                            </v-edit-dialog>
                          </td>
                          <td>
                            <v-edit-dialog
                              :return-value="item.lastName"
                              @save="saveContact()"
                              @cancel="cancelContact"
                              @open="openContact"
                              @close="closeContact"
                              large
                              cancel-text="Cancelar"
                              save-text="Guardar"
                              persistent
                            > {{ item.lastName }}
                              <template v-slot:input>
                                <ValidationProvider v-slot="{ errors }" name="Apellidos" rules="required">
                                  <v-text-field
                                    :value="item.lastName"
                                    @change="updateContact(item, $event, 'lastName')"
                                    label="Apellidos *"
                                    single-line
                                    :error-messages="errors"
                                    required
                                  ></v-text-field>
                                </ValidationProvider>
                              </template>
                            </v-edit-dialog>
                          </td>
                          <td>
                            <v-edit-dialog
                              :return-value="item.email"
                              @save="saveContact()"
                              @cancel="cancelContact"
                              @open="openContact"
                              @close="closeContact"
                              large
                              cancel-text="Cancelar"
                              save-text="Guardar"
                              persistent
                            > {{ item.email }}
                              <template v-slot:input>
                                <ValidationProvider v-slot="{ errors }" name="Email" rules="required|email">
                                  <v-text-field
                                    :value="item.email"
                                    @change="updateContact(item, $event, 'email')"
                                    label="Email *"
                                    single-line
                                    :error-messages="errors"
                                    required
                                  ></v-text-field>
                                </ValidationProvider>
                              </template>
                            </v-edit-dialog>
                          </td>

                          <td>
                            <v-edit-dialog
                              :return-value="item.mobile"
                              @save="saveContact()"
                              @cancel="cancelContact"
                              @open="openContact"
                              @close="closeContact"
                              large
                              cancel-text="Cancelar"
                              save-text="Guardar"
                              persistent
                            > {{ item.mobile }}
                              <template v-slot:input>
                                <ValidationProvider v-slot="{ errors }" name="Teléfono Principal" rules="required|digits:8">
                                  <v-text-field
                                    :value="item.mobile"
                                    @change="updateContact(item, $event, 'mobile')"
                                    label="Teléfono Principal *"
                                    single-line
                                    :type="'number'"
                                    hint="8 números"
                                    required
                                    :error-messages="errors"
                                  ></v-text-field>
                                </ValidationProvider>
                              </template>
                            </v-edit-dialog>
                          </td>

                          <td>
                            <v-edit-dialog
                              :return-value="item.phone"
                              @save="saveContact()"
                              @cancel="cancelContact"
                              @open="openContact"
                              @close="closeContact"
                              large
                              cancel-text="Cancelar"
                              save-text="Guardar"
                              persistent
                            > {{ item.phone }}
                              <template v-slot:input>
                                <ValidationProvider v-slot="{ errors }" name="Teléfono Secundario" rules="digits:8">
                                  <v-text-field
                                    :value="item.phone"
                                    @change="updateContact(item, $event, 'phone')"
                                    label="Teléfono Secundario"
                                    single-line
                                    :type="'number'"
                                    hint="8 números"
                                    :error-messages="errors"
                                  ></v-text-field>
                                </ValidationProvider>
                              </template>
                            </v-edit-dialog>
                          </td>
                          
                          <td>
                            <v-edit-dialog
                              :return-value="item.signs"
                              @save="saveContact()"
                              @cancel="cancelContact"
                              @open="openContact"
                              @close="closeContact"
                              large
                              cancel-text="Cancelar"
                              save-text="Guardar"
                              persistent
                            > {{ item.signs }}
                              <template v-slot:input>
                                <ValidationProvider v-slot="{ errors }" name="Señas">
                                  <v-text-field
                                    :value="item.signs"
                                    @change="updateContact(item, $event, 'signs')"
                                    label="Señas *"
                                    single-line
                                    :error-messages="errors"
                                    required
                                  ></v-text-field>
                                </ValidationProvider>
                              </template>
                            </v-edit-dialog>
                          </td>
                          <td>
                            <v-icon small @click="deleteContact(item.id)">
                              mdi-delete
                            </v-icon>
                          </td>
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
        :headers="filteredHeaders"
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
              v-if="isEditor"
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
        <template v-slot:[`item.clientType`]="{ item }">
          {{getClientTypeText(item.clientType)}}
        </template>
      </v-data-table>
      <!-- End Clients table -->
    </v-card>
    <!-- End Clients -->

    <!-- Snackbars -->
    <v-snackbar
      v-model="snackbar.visible"
      :color="snackbar.color"
      :multi-line="snackbar.mode"
      :timeout="snackbar.timeout"
    >
      <v-layout align-center pr-4>
        <v-icon class="pr-3" dark large>{{ snackbar.icon }}</v-icon>
        <v-layout column>
          <div>
            <strong>{{ snackbar.title }}</strong>
          </div>
          <div>{{ snackbar.text }}</div>
        </v-layout>
          <v-btn
            icon
            @click="snackbar.visible = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
      </v-layout>
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
      pympa: "",
      meic: "",
      others: "",
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
      { text: "Jurídico", value: 2 }
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
    snackbar: {
      color: null,
      icon: null,
      mode: 'multi-line',
      text: null,
      timeout: 2000,
      title: null,
      visible: false,
    },
    actionSuccess: false,
    loaderActive: false,
    isEdition: false,
  }),
  async fetch() {
    this.loaderActive = true;

    try {
      await this.$store.dispatch('clients/getClients');
      await this.$store.dispatch('contacts/getContacts', {
        currentClient: this.currentClient
      });
      await this.$store.dispatch('locations/getProvincias');
      await this.$store.dispatch('locations/getCantones', {
        provinciaId: this.client.provincia
      });
      await this.$store.dispatch('locations/getDistritos', {
        cantonId: this.client.canton
      });
    } catch (error) {
      console.log(error)
      this.activateSnackbar("Obteniendo la información " + error, false);
    }

    this.loaderActive = false;
  },
  computed: {
    clients(){
      return this.$store.getters['clients/clients'];
    },
    contacts(){
      return this.$store.getters['contacts/contacts'];
    },
    provincias(){
      return this.$store.getters['locations/provincias'];
    },
    cantones(){
      return this.$store.getters['locations/cantones'];
    },
    distritos(){
      return this.$store.getters['locations/distritos'];
    },
    isEditor(){
      const filteredModules = (this.$store.getters['authentication/currentUser'].modules) ? this.$store.getters['authentication/currentUser'].modules.filter((item) => {
        return item.read && item.write;
      }) : [];
      return JSON.stringify(filteredModules).includes("clients");
    },
    filteredHeaders(){
      const readerHeaders = this.clientsTableHeaders.slice(0, this.clientsTableHeaders.length - 1);
      return (this.isEditor) ? this.clientsTableHeaders : readerHeaders
    }
  },
  methods: {
    openCreateClientDialog() {
      this.clientDialog = true;
      this.isEdition = false;
      this.client = {
        clientType: 1,
        identification: "",
        firstName: "",
        pympa: "",
        meic: "",
        others: "",
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

      this.$fetch();
    },

    openUpdateClientDialog(data) {
      this.currentClient = data;
      this.isEdition = true;
      this.clientDialog = true;
      this.client = {
        clientType: data.clientType,
        identification: data.identification,
        firstName: data.firstName,
        pympa: data.pympa,
        meic: data.meic,
        others: data.others,
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

      this.$fetch();
    },

    closeClientDialog() {
      this.clientDialog = false;
      this.currentClient = null;
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
        await this.$fire.firestore
          .collection("clients")
          .add({
            clientType: this.client.clientType,
            identification: this.client.identification,
            firstName: this.client.firstName,
            pympa: this.client.pympa,
            meic: this.client.meic,
            others: this.client.others,
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
            this.$fetch();
            this.activateSnackbar("Cliente creado correctamente", true);
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

    async updateClient() {
      const isValid = await this.$refs.observer.validate();

      if (isValid) {
        this.loaderActive = true;

        await this.$fire.firestore
          .collection("clients")
          .doc(this.currentClient.id)
          .update({
            clientType: this.client.clientType,
            identification: this.client.identification,
            firstName: this.client.firstName,
            pympa: this.client.pympa,
            meic: this.client.meic,
            others: this.client.others,
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
            this.$fetch();
            this.activateSnackbar("Cliente modificado correctamente", true);
            this.clientDialog = false;
            this.$refs.observer.reset();

            this.loaderActive = false;
          })
          .catch((error) => {
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
          this.$fetch();
          this.activateSnackbar("Cliente borrado correctamente", true);
          this.deleteClientDialog = false;

          this.loaderActive = false;
        })
        .catch((error) => {
          console.error("Error removing document: ", error);
          this.activateSnackbar("Error borrando cliente", false);

          this.loaderActive = false;
        });
    },

    activateSnackbar(message, success) {
      this.snackbar.text = message;
      this.snackbar.visible = true;

      if (success) {
        this.snackbar.color = "success";
        this.snackbar.icon = "mdi-check-circle";
        this.snackbar.title = "Acción exitosa";
      } else {
        this.snackbar.color = "error";
        this.snackbar.icon = "mdi-alert-circle";
        this.snackbar.title = "Error";
      }
    },

    async updateContact(contact, newValue, field) {
      const isValid = await this.$refs.observer.validate();

      if (isValid) {
        let newContact = JSON.parse(JSON.stringify(contact));
        newContact[field] = newValue;

        await this.$store.dispatch('contacts/updateContact', {
          newContact: newContact
        });

        this.$refs.observer.reset();
      }
    },

    async saveContact() {
      await this.$store.dispatch('contacts/saveContact', {
        currentContact: this.$store.getters['contacts/contact']
      });

      this.$fetch();
    },

    cancelContact() {
      this.$refs.observer.reset();
    },

    openContact() {
      this.$refs.observer.reset();
    },

    closeContact() {
      this.$refs.observer.reset();
    },

    async createContact() {
      this.loaderActive = true;

      if(this.currentClient){
        await this.$fire.firestore
        .collection("contacts")
        .add({
          email: 'editar@editar.com',
          isPrincipal: '',
          lastName: 'Seleccione...',
          mobile: '87654321',
          name: 'Seleccione...',
          phone: '45678909',
          signs: 'Seleccione...',
          type: 'Seleccione...',
          clientId: this.currentClient.id,
          timestamp: new Date()
        })
        .then(() => {
          this.$fetch();
          this.activateSnackbar("Contacto creado, proceda a editarlo", true);
          this.loaderActive = false;
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
          this.activateSnackbar("Error creando contacto", false);

          this.loaderActive = false;
        });
      } else {
        this.activateSnackbar("Para poder crear un contacto debe crear el cliente primero", false);

        this.loaderActive = false;
      }
    },

    async deleteContact(contactId) {
      this.loaderActive = true;

      await this.$fire.firestore
        .collection("contacts")
        .doc(contactId)
        .delete()
        .then(() => {
          this.$fetch();
          this.activateSnackbar("Contacto borrado correctamente", true);
          this.loaderActive = false;
        })
        .catch((error) => {
          console.error("Error removing document: ", error);
          this.activateSnackbar("Error borrando contacto", false);

          this.loaderActive = false;
        });
<<<<<<< HEAD
    }
  },
  
=======
    },
>>>>>>> develop

    getClientTypeText(type){
      return this.clientTypeList.filter((item) => {
        return item.value == type;
      })[0].text;
    },
  }
};
</script>
