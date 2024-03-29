<template>
  <div>
    <h1 class="ma-10">Fincas</h1>

    <!-- farms -->

    <!-- Dialog to create farm -->
    <ValidationObserver
      ref="observer"
      v-slot="{ invalid }"
      tag="form"
      @submit.prevent="submit()"
    >
      <v-dialog v-model="farmDialog" persistent max-width="70%">
        <v-card>
          <v-card-title>
            <span class="headline">{{
              "Agregar finca"
            }}</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="6">
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="Cliente"
                    rules="required"
                  >
                  <v-autocomplete
                    v-model="selectedClient"
                    :items="clients"
                    no-data-text="No hay datos"
                    clearable
                    prepend-icon="mdi-magnify"
                    item-text="identification"
                    item-value="id"
                    placeholder="Escriba para buscar cliente"
                    @change="onClientChange($event)"
                      required
                      :error-messages="errors"
                    ></v-autocomplete>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <span class="headline"
                    >{{ selectedClient ? selectedClient.firstName : "" }}
                    {{
                      selectedClient ? selectedClient.firstLastname : ""
                    }}</span
                  >
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="3">
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="Finca"
                    rules="required"
                  >
                    <v-text-field
                      label="Finca*"
                      v-model="farm.name"
                      required
                      :error-messages="errors"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="Area"
                    rules="required"
                  >
                    <v-text-field
                      label="Area*"
                      v-model="farm.area"
                      :type="'number'"
                      suffix="ha"
                      hint="Ingrese el area en metros cuadrados"
                      required
                      :error-messages="errors"
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
                      v-model="farm.provincia"
                      @change="onProvinciaChange()"
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
                      :items="currentCantones"
                      item-text="canton"
                      item-value="id"
                      :error-messages="errors"
                      label="Cantones *"
                      v-model="farm.canton"
                      @change="onCantonChange()"
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
                      :items="currentDistritos"
                      item-text="distrito"
                      item-value="id"
                      :error-messages="errors"
                      label="Distritos *"
                      v-model="farm.distrito"
                    ></v-select>
                  </ValidationProvider>
                </v-col>

                <v-col cols="12" sm="6" md="3">
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="Dirección"
                    rules="required"
                  >
                    <v-text-field
                      label="Dirección *"
                      v-model="farm.address"
                      :error-messages="errors"
                      required
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="Estado"
                    rules="required"
                  >
                    <v-select
                      text="text"
                      :items="stateTypeList"
                      v-model="farm.state"
                      name="state"
                      label="Estado finca"
                      :error-messages="errors"
                      required
                    ></v-select>
                  </ValidationProvider>
                </v-col>
              </v-row>
            </v-container>
            <small>*campos requeridos</small><br />
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeFarmDialog()"
              >Cerrar</v-btn
            >
            <v-btn
              color="blue darken-1"
              text
              @click="createFarm()"
              :disabled="invalid"
              >Crear</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </ValidationObserver>
    <!-- End dialog to create farm -->

    <v-card class="ma-10" elevation="2" outlined>
      <!-- farms table -->
      <v-data-table
        :headers="filteredHeaders"
        :items="farms"
        :items-per-page="10"
        :search="farmsTableSearch"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Fincas</v-toolbar-title>

            <v-divider class="mx-4" inset vertical></v-divider>

            <v-text-field
              v-model="farmsTableSearch"
              append-icon="mdi-magnify"
              label="Buscar"
              single-line
              hide-details
            ></v-text-field>
            <v-spacer></v-spacer>
            <v-icon
              x-large
              color="primary"
              @click="openCreateFarmDialog()"
              v-if="isEditor"
            >
              mdi-plus-circle
            </v-icon>
          </v-toolbar>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <NuxtLink :to="`farms/${item.id}`" class="no_decoration">
            <v-icon small class="mr-2">
              mdi-feature-search
            </v-icon>
          </NuxtLink>
        </template>
        <template v-slot:[`item.state`]="{ item }">
          {{ getFarmStateTypeText(item.state) }}
        </template>
        <template v-slot:[`item.provincia`]="{ item }">
          {{ getProvinciaText(item.provincia) }}
        </template>
        <template v-slot:[`item.canton`]="{ item }">
          {{ getCantonText(item.canton) }}
        </template>
        <template v-slot:[`item.distrito`]="{ item }">
          {{ getDistritoText(item.distrito) }}
        </template>
      </v-data-table>
      <!-- End farms table -->
    </v-card>
    <!-- End farms -->

    <!-- Snackbar -->
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
        <v-btn icon @click="snackbar.visible = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-layout>
    </v-snackbar>
    <!-- End Snackbar -->
    <v-overlay :value="loaderActive" :z-index="203">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Farms',
  data: () => ({
    farmDialog: false,
    currentFarm: null,
    currentCantones: [],
    currentDistritos: [],
    farm: {
      name: '',
      area: '',
      provincia: '',
      canton: '',
      distrito: '',
      address: '',
      state: 1,
      clientId: ''
    },
    stateTypeList: [
      { text: 'Activo', value: 1 },
      { text: 'Inactivo', value: 2 }
    ],
    farmsTableHeaders: [
      { text: 'Finca', value: 'name' },
      { text: 'Area', value: 'area' },
      { text: 'Provincia', value: 'provincia' },
      { text: 'Cantón', value: 'canton' },
      { text: 'Distrito', value: 'distrito' },
      { text: 'Dirección', value: 'address' },
      { text: 'Estado', value: 'state', sortable: false },
      { text: 'Acciones', value: 'actions', sortable: false }
    ],
    farmsTableSearch: '',
    currentModules: [],
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
    startDateMenu: false,
    startDateModal: false,
    harvestDateMenu: false,
    harvestDateModal: false,
    selectedClient: {}
  }),
  async fetch() {
    this.loaderActive = true
    try {
      await this.$store.dispatch('farms/getFarms')

      //Tables are reset
      this.$store.dispatch('crops/updateCropsBySelectedAreas', {
        crops: []
      })
      this.$store.dispatch('areas/updateAreasBySelectedBlocks', {
        areas: []
      })
    } catch (error) {
      console.log(error)
      this.activateSnackbar('Obteniendo la información ' + error, false)
    }

    this.loaderActive = false
  },
  computed: {
    ...mapGetters({
      getProvinciaText: 'locations/getProvinciaText',
      getCantonText: 'locations/getCantonText',
      getDistritoText: 'locations/getDistritoText'
    }),
    provincias() {
      return this.$store.getters['locations/provincias']
    },
    cantones() {
      return this.$store.getters['locations/cantones']
    },
    distritos() {
      return this.$store.getters['locations/distritos']
    },
    farms() {
      return this.$store.getters['farms/farms']
    },
    clients() {
      return this.$store.getters['clients/clients']
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
      return JSON.stringify(filteredModules).includes('farms')
    },
    filteredHeaders() {
      const readerHeaders = this.farmsTableHeaders.slice(
        0,
        this.farmsTableHeaders.length - 1
      )
      return this.isEditor ? this.farmsTableHeaders : readerHeaders
    }
  },
  methods: {
    openCreateFarmDialog() {
      this.farmDialog = true
      this.currentModules = []
      this.farm = {
        name: '',
        area: '',
        provincia: '',
        canton: '',
        distrito: '',
        address: '',
        state: 1
      }
    },

    closeFarmDialog() {
      this.farmDialog = false
      this.selectedClient = null
      this.$refs.observer.reset()
    },

    async createFarm() {
      if (!this.selectedClient) {
        this.activateSnackbar('Seleccione un Cliente', false)
        return false
      }

      const isValid = await this.$refs.observer.validate()
      if (isValid) {
        this.loaderActive = true

        this.$fire.firestore
          .collection('farms')
          .add({
            name: this.farm.name,
            area: this.farm.area,
            provincia: this.farm.provincia,
            canton: this.farm.canton,
            distrito: this.farm.distrito,
            address: this.farm.address,
            state: this.farm.state,
            clientId: this.selectedClient.id,
            active: true
          })
          .then(() => {
            this.activateSnackbar('Finca creada correctamente', true)
            this.$fetch()
            this.$refs.observer.reset()
            this.farmDialog = false
          })
          .catch(error => {
            console.error(error)

            this.activateSnackbar('Error creando finca', false)
          })

        this.loaderActive = false
      }
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

    getFarmStateTypeText(type) {
      return this.stateTypeList.filter(item => {
        return item.value == type
      })[0].text
    },

    onProvinciaChange() {
      this.currentDistritos = []
      this.currentCantones = this.cantones.filter(
        canton => canton.provincia === this.farm.provincia
      )
    },

    onCantonChange() {
      this.currentDistritos = this.distritos.filter(
        distrito => distrito.canton === this.farm.canton
      )
    },

    onClientChange(id) {
      if (id) {
        const currentClient = this.clients.filter(item => {
          return item.id == id.toString()
        })[0]
        this.selectedClient = currentClient
      } else {
        this.selectedClient = null
      }
    }
  }
}
</script>
