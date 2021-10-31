<template>
  <div>
    <h1 class="ma-10">Clientes</h1>

    <!-- Clients -->

    <!-- Dialog to create/modify client -->
    <ValidationObserver ref="observer" v-slot="{ invalid }" tag="form" @submit.prevent="submit()">
      <v-dialog v-model="clientDialog" persistent max-width="100%">
        <v-card>
          <v-card-title>
            <span class="headline">{{
              isEdition ? "Editar cliente" : "Agregar cliente"
            }}</span>
          </v-card-title>
          <v-card-text>
            <v-container fluid>
              <v-row>
                <v-col cols="12" sm="6" md="2">
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
                <v-col cols="12" sm="6" md="2">
                  <ValidationProvider v-slot="{ errors }" name="Cedula" rules="required">
                    <v-text-field
                      label="Cédula *"
                      v-model="client.identification"
                      required
                      :error-messages="errors"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <ValidationProvider v-slot="{ errors }" name="Nombre" rules="required">
                    <v-text-field
                      label="Nombre *"
                      v-model="client.firstName"
                      required
                      :error-messages="errors"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" sm="6" md="2" v-if="client.clientType === 1">
                  <ValidationProvider v-slot="{ errors }" name="Segundo nombre">
                    <v-text-field
                      label="Segundo nombre"
                      v-model="client.secondName"
                      :error-messages="errors"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" sm="6" md="2" v-if="client.clientType === 1">
                  <ValidationProvider v-slot="{ errors }" name="Primer apellido">
                    <v-text-field
                      label="Apellido"
                      v-model="client.firstLastname"
                      :error-messages="errors"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" sm="6" md="2" v-if="client.clientType === 1">
                  <ValidationProvider v-slot="{ errors }" name="Segundo apellido">
                    <v-text-field
                      label="Segundo Apellido"
                      v-model="client.secondLastname"
                      :error-messages="errors"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="2">
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
                <v-col cols="12" sm="6" md="2">
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
                <v-col cols="12" sm="6" md="2">
                  <ValidationProvider v-slot="{ errors }" name="Email" rules="required|email">
                    <v-text-field
                      label="Email *"
                      v-model="client.email"
                      @keydown.space.prevent
                      :error-messages="errors"
                      required
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" sm="6" md="2">
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
                      @change="onProvinciaChange()"
                    ></v-select>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="Cantón"
                    rules="required"
                  >
                    <v-select
                      :items="currentCantones"
                      item-text="canton"
                      item-value="id"
                      :error-messages="errors"
                      label="Cantones *"
                      v-model="client.canton"
                      @change="onCantonChange()"
                    ></v-select>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="Distrito"
                    rules="required"
                  >
                    <v-select
                      :items="currentDistritos"
                      item-text="distrito"
                      item-value="id"
                      :error-messages="errors"
                      label="Distritos *"
                      v-model="client.distrito"
                    ></v-select>
                  </ValidationProvider>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="2" >
                  <ValidationProvider v-slot="{ errors }" name="PYMPA">
                    <v-text-field
                      label="PYMPA"
                      v-model="client.pympa"
                      :error-messages="errors"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" sm="6" md="2" >
                  <ValidationProvider v-slot="{ errors }" name="MEIC">
                    <v-text-field
                      label="MEIC"
                      v-model="client.meic"
                      :error-messages="errors"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" sm="6" md="2" >
                  <ValidationProvider v-slot="{ errors }" name="Otros">
                    <v-text-field
                      label="Otros"
                      v-model="client.others"
                      :error-messages="errors"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <ValidationProvider v-slot="{ errors }" name="Dirección" rules="required">
                    <v-textarea
                      name="direccion"
                      label="Dirección *"
                      value=""
                      hint=""
                      rows="2"
                      no-resize
                      filled
                      v-model="client.address"
                      :error-messages="errors"
                      required
                    ></v-textarea>
                  </ValidationProvider>
                </v-col>
              </v-row>
              <v-row>
                <template>
                  <v-col cols="12" sm="6" md="12">
                    <v-expansion-panels
                      v-model="panel"
                      multiple
                      focusable
                    >
                      <v-expansion-panel>
                        <v-expansion-panel-header>
                          Fincas
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                          <farms-vue :currentClient="currentClient"></farms-vue>
                        </v-expansion-panel-content>
                      </v-expansion-panel>
                      <v-expansion-panel>
                        <v-expansion-panel-header>
                          Conctactos
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                          <template>
                            <contacts-vue :currentClient="currentClient"></contacts-vue>
                          </template>
                        </v-expansion-panel-content>
                      </v-expansion-panel>
                    </v-expansion-panels>
                  </v-col>
                </template>
              </v-row>
            </v-container>
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
    <confirm-dialog ref="deleteClientDialog"></confirm-dialog>
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
            <v-icon
              x-large
              color="primary"
              @click="openCreateClientDialog()"
              v-if="isEditor"
            >
              mdi-plus-circle
            </v-icon>
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
import ContactsVue from './contacts.vue'
import FarmsVue from './farms.vue'

export default {
  name: 'clients',
  components: {
    ContactsVue,
    FarmsVue
  },
  data: () => ({
    clientDialog: false,
    deleteClientDialog: false,
    currentClient: null,
    client: {
      clientType: 1,
      identification: '',
      firstName: '',
      pympa: '',
      meic: '',
      others: '',
      secondName: '',
      firstLastname: '',
      secondLastname: '',
      phone: '',
      mobile: '',
      email: '',
      provincia: '',
      canton: '',
      distrito: '',
      address: ''
    },
    currentCantones: [],
    currentDistritos: [],
    clientTypeList: [
      { text: 'Físico', value: 1 },
      { text: 'Jurídico', value: 2 }
    ],
    clientsTableHeaders: [
      {
        text: 'Cédula',
        align: 'start',
        sortable: true,
        value: 'identification'
      },
      { text: 'Tipo', value: 'clientType' },
      { text: 'Nombre', value: 'firstName' },
      { text: 'Apellido', value: 'firstLastname' },
      { text: 'Teléfono', value: 'phone' },
      { text: 'Celular', value: 'mobile' },
      { text: 'Acciones', value: 'actions', sortable: false }
    ],
    clientsTableSearch: '',
    snackbar: {
      color: null,
      icon: null,
      mode: 'multi-line',
      text: null,
      timeout: 2000,
      title: null,
      visible: false
    },
    actionSuccess: false,
    loaderActive: false,
    isEdition: false,
    panel: []
  }),
  async fetch() {
    this.loaderActive = true

    try {
      await this.$store.dispatch('clients/getClients')
      await this.$store.dispatch('contacts/getContacts', {
        currentClient: this.currentClient
      })
      await this.$store.dispatch('farms/getFarmsByClient', {
        currentClient: this.currentClient
      })
    } catch (error) {
      this.activateSnackbar('Obteniendo la información ' + error, false)
    }

    this.loaderActive = false
  },
  computed: {
    clients() {
      return this.$store.getters['clients/clients']
    },
    contacts() {
      return this.$store.getters['contacts/contacts']
    },
    provincias() {
      return this.$store.getters['locations/provincias']
    },
    cantones() {
      return this.$store.getters['locations/cantones']
    },
    distritos() {
      return this.$store.getters['locations/distritos']
    },
    isEditor() {
      const filteredModules = this.$store.getters['authentication/currentUser']
        .modules
        ? this.$store.getters['authentication/currentUser'].modules.filter(
            item => {
              return item.read && item.write
            }
          )
        : []
      return JSON.stringify(filteredModules).includes('clients')
    },
    filteredHeaders() {
      const readerHeaders = this.clientsTableHeaders.slice(
        0,
        this.clientsTableHeaders.length - 1
      )
      return this.isEditor ? this.clientsTableHeaders : readerHeaders
    },
    clientFullName() {
      const name =
        this.currentClient.clientType == 1
          ? `${this.currentClient.firstName} ${this.currentClient.secondName} ${
              this.currentClient.firstLastname
            } ${this.currentClient.secondLastname}`
          : `${this.currentClient.firstName}`
      return name
    }
  },
  methods: {
    openCreateClientDialog() {
      this.currentClient = null

      this.isEdition = false
      this.clientDialog = true
      this.client = {
        clientType: 1,
        identification: '',
        firstName: '',
        pympa: '',
        meic: '',
        others: '',
        secondName: '',
        firstLastname: '',
        secondLastname: '',
        phone: '',
        mobile: '',
        email: '',
        provincia: '',
        canton: '',
        distrito: '',
        address: ''
      }

      this.$fetch()
    },
    openUpdateClientDialog(data) {
      this.currentClient = data

      this.isEdition = true
      this.clientDialog = true
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
      }
      this.$fetch()

      this.onProvinciaChange()
      this.onCantonChange()
    },
    closeClientDialog() {
      this.currentClient = null

      this.clientDialog = false
      this.$refs.observer.reset()
    },

    async openDeleteClientDialog(data) {
      this.currentClient = data
      await this.$fetch()
      const farmList = await this.$store.getters['farms/farmsByClient']
      const message =
        farmList.length > 0
          ? `Este cliente posee asociaciones, eliminelas antes de proceder con su eliminación`
          : 'Esta acción no puede ser revertida.'

      const ok = await this.$refs.deleteClientDialog.show({
        title: `Confirme la eliminación del cliente: ${this.clientFullName}`,
        message: message,
        okButton: farmList.length > 0 ? null : 'Eliminar'
      })
      if (ok) {
        this.deleteClient()
      } else {
        this.currentClient = null
      }
    },

    async createClient() {
      const isValid = await this.$refs.observer.validate()

      if (isValid) {
        this.loaderActive = true
        await this.$fire.firestore
          .collection('clients')
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
            this.$fetch()

            this.activateSnackbar('Cliente creado correctamente', true)
            this.clientDialog = false
            this.$refs.observer.reset()

            this.loaderActive = false
          })
          .catch(error => {
            console.error('Error writing document: ', error)
            this.activateSnackbar('Error creando cliente', false)

            this.loaderActive = false
          })
      }
    },
    async updateClient() {
      const isValid = await this.$refs.observer.validate()

      if (isValid) {
        this.loaderActive = true

        await this.$fire.firestore
          .collection('clients')
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
            this.$fetch()

            this.activateSnackbar('Cliente modificado correctamente', true)
            this.clientDialog = false
            this.$refs.observer.reset()

            this.loaderActive = false
          })
          .catch(error => {
            console.error('Error updating document: ', error)
            this.activateSnackbar('Error modificando cliente', false)

            this.loaderActive = false
          })
      }
    },
    async deleteClient() {
      this.loaderActive = true

      await this.$fire.firestore
        .collection('clients')
        .doc(this.currentClient.id)
        .update({
          active: false
        })
        .then(() => {
          this.contacts.forEach(element => {
            this.deleteContact(element.id)
          })
          this.$fetch()

          this.activateSnackbar('Cliente borrado correctamente', true)
          this.deleteClientDialog = false

          this.loaderActive = false
        })
        .catch(error => {
          console.error('Error removing document: ', error)
          this.activateSnackbar('Error borrando cliente', false)

          this.loaderActive = false
        })
    },
    deleteContact(contactId) {
      this.$fire.firestore
        .collection('contacts')
        .doc(contactId)
        .update({
          active: false
        })
        .then(() => {})
        .catch(error => {
          console.error('Error borrando contacto: ', error)
        })
    },
    activateSnackbar(message, success) {
      this.snackbar.text = message
      this.snackbar.visible = true

      if (success) {
        this.snackbar.color = 'success'
        this.snackbar.icon = 'mdi-check-circle'
        this.snackbar.title = 'Acción exitosa'
      } else {
        this.snackbar.color = 'error'
        this.snackbar.icon = 'mdi-alert-circle'
        this.snackbar.title = 'Error'
      }
    },
    getClientTypeText(type) {
      return this.clientTypeList.filter(item => {
        return item.value == type
      })[0].text
    },
    onProvinciaChange() {
      this.currentDistritos = []
      this.currentCantones = this.cantones.filter(
        canton => canton.provincia === this.client.provincia
      )
    },
    onCantonChange() {
      this.currentDistritos = this.distritos.filter(
        distrito => distrito.canton === this.client.canton
      )
    }
  }
}
</script>

<style scoped>
.delete-btn {
  padding: 0.5em 1em;
  background-color: #eccfc9;
  color: #c5391a;
  border: 2px solid #ea3f1b;
  border-radius: 5px;
  font-weight: bold;
  font-size: 16px;
  text-transform: uppercase;
  cursor: pointer;
}
</style>
