<template v-slot:default>
  <div>
    <!-- farms table -->
    <v-data-table
      :headers="farmsTableHeaders"
      :items="this.farmsByClient"
      :items-per-page="5"
      :search="farmsTableSearch"
      item-key="name"
      sort-by="name"
      :hide-default-footer="true"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-text-field
            v-model="farmsTableSearch"
            append-icon="mdi-magnify"
            label="Buscar"
            single-line
            hide-details
          ></v-text-field>
          <v-icon
            large
            class="ml-5"
            color="primary"
            @click="openAddFarmDialog()"
          >
            mdi-plus-circle
          </v-icon>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <div >
          <v-icon  small @click="openRemoveFarmDialog(item)">
            mdi-delete
          </v-icon>
        </div>
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

    <!-- Dialog to link farm -->
    <v-dialog v-model="addFarmDialog" persistent max-width="70%">
      <ValidationObserver
        ref="observer"
        v-slot="{ invalid }"
        tag="form"
        @submit.prevent="submit()"
      >
      <v-card>
        <v-card-title>
          <span class="headline">Agregar Finca</span>
          <v-spacer></v-spacer>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="3">
                <ValidationProvider
                  v-slot="{ errors }"
                  name="Finca"
                  rules="required"
                >
                  <v-text-field
                    label="Finca*"
                    v-model="farmToAdd.name"
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
                    v-model="farmToAdd.area"
                    :type="'number'"
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
                    v-model="farmToAdd.provincia"
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
                    v-model="farmToAdd.canton"
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
                    v-model="farmToAdd.distrito"
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
                    v-model="farmToAdd.address"
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
                    v-model="farmToAdd.state"
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
          <v-btn
            color="blue darken-1"
            text
            @click="closeAddFarmDialog()"
          >Cerrar</v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="addFarm()"
            :disabled="invalid"
          >Agregar</v-btn>
        </v-card-actions>
      </v-card>
      </ValidationObserver>
    </v-dialog>
    <!-- End dialog to link farm -->

    <!-- Dialog to confirm deletion -->
    <confirm-dialog ref="deleteFarmDialog"></confirm-dialog>
    <!-- End Dialog to confirm deletion -->

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
import { mapGetters } from 'vuex'
export default {
  name: 'farms',
  props: ['currentClient'],
  data: () => ({
    farmToAdd: {
      name: '',
      area: '',
      provincia: '',
      canton: '',
      distrito: '',
      address: '',
      state: 1
    },
    stateTypeList: [
      { text: 'Activo', value: 1 },
      { text: 'Inactivo', value: 2 }
    ],
    currentCantones: [],
    currentDistritos: [],
    addFarmDialog: false,
    snackbar: {
      color: null,
      icon: null,
      mode: 'multi-line',
      text: null,
      timeout: 2000,
      title: null,
      visible: false
    },
    loaderActive: false,
    farmsTableHeaders: [
      { text: 'Nombre', value: 'name' },
      { text: 'Area', value: 'area' },
      { text: 'Estado', value: 'state' },
      { text: 'Provincia', value: 'provincia' },
      { text: 'Cantón', value: 'canton' },
      { text: 'Distrito', value: 'distrito' },
      { text: 'Acciones', value: 'actions', sortable: false }
    ],
    farmsTableSearch: ''
  }),
  async fetch() {
    try {
      await this.$store.dispatch('farms/getFarmsByClient', {
        currentClient: this.currentClient
      })
      await this.$store.dispatch('blocks/getBlocks')
    } catch (error) {
      this.activateSnackbar('Obteniendo la información ' + error, false)
    }
  },
  computed: {
    ...mapGetters({
      getProvinciaText: 'locations/getProvinciaText',
      getCantonText: 'locations/getCantonText',
      getDistritoText: 'locations/getDistritoText',
      getClient: 'clients/getClient'
    }),
    farmsByClient() {
      return this.$store.getters['farms/farmsByClient']
    },
    provincias() {
      return this.$store.getters['locations/provincias']
    },
    cantones() {
      return this.$store.getters['locations/cantones']
    },
    distritos() {
      return this.$store.getters['locations/distritos']
    }
  },
  methods: {
    async openRemoveFarmDialog(farm) {
      const blockList = this.$store.getters['blocks/getBlocksByFarm'](farm.id)

      const message =
        blockList.length > 0
          ? `Este finca posee asociaciones, eliminelas antes de proceder con su eliminación`
          : 'Esta acción no puede ser revertida.'

      const ok = await this.$refs.deleteFarmDialog.show({
        title: `Confirme la eliminación de la finca: ${farm.name}`,
        message: message,
        okButton: blockList.length > 0 ? null : 'Eliminar'
      })
      if (ok) {
        this.removeFarm(farm.id)
      } else {
        this.area = null
      }
    },
    async removeFarm(farmId) {
      this.loaderActive = true

      await this.$fire.firestore
        .collection('farms')
        .doc(farmId)
        .update({
          active: false
        })
        .then(() => {
          this.$fetch()

          this.activateSnackbar('Finca removida correctamente', true)
          this.loaderActive = false
        })
        .catch(error => {
          console.error('Error removing document: ', error)
          this.activateSnackbar('Error removiendo finca', false)

          this.loaderActive = false
        })
    },
    openAddFarmDialog() {
      if (this.currentClient) {
        this.addFarmDialog = true
      } else {
        this.activateSnackbar(
          'Para poder agregar una finca debe crear el cliente primero',
          false
        )
      }
    },
    closeAddFarmDialog() {
      this.farmToAdd = {
        name: '',
        area: '',
        provincia: '',
        canton: '',
        distrito: '',
        address: '',
        state: 1
      };
      this.$refs.observer.reset()
      this.addFarmDialog = false
    },
    async addFarm() {
      const isValid = await this.$refs.observer.validate()

      if (isValid) {
        this.loaderActive = true

        this.$fire.firestore
          .collection('farms')
          .add({
            active: true,
            name: this.farmToAdd.name,
            area: this.farmToAdd.area,
            provincia: this.farmToAdd.provincia,
            canton: this.farmToAdd.canton,
            distrito: this.farmToAdd.distrito,
            address: this.farmToAdd.address,
            state: this.farmToAdd.state,
            clientId: this.currentClient.id
          })
          .then(() => {
            this.activateSnackbar('Finca creada correctamente', true)
            this.$fetch()
            this.$refs.observer.reset()
            this.addFarmDialog = false
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
    onProvinciaChange() {
      this.currentDistritos = []
      this.currentCantones = this.cantones.filter(
        canton => canton.provincia === this.farmToAdd.provincia
      )
    },
    onCantonChange() {
      this.currentDistritos = this.distritos.filter(
        distrito => distrito.canton === this.farmToAdd.canton
      )
    },
    getFarmStateTypeText(type) {
      return this.stateTypeList.filter(item => {
        return item.value == type
      })[0].text
    }
  }
}
</script>
