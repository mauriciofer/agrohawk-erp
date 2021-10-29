<template>
  <div>
    <v-toolbar flat class="ma-10">
      <v-toolbar-title>
        <h2>Detalle de finca</h2>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <NuxtLink :to="`/farms`" class="no_decoration">
        <v-btn icon color="primary">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
      </NuxtLink>
      <v-btn icon color="primary"
        @click="openUpdateFarmDialog()"
        v-if="isEditor">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <v-btn icon color="primary"
        @click="openDeleteFarmDialog()"
        v-if="isEditor">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-toolbar>
    <!-- Segunda opcion -->
    <!-- <v-toolbar flat class="ma-10">
      <v-toolbar-title>
        <h2>Detalle de finca</h2>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <NuxtLink :to="`/farms`" class="no_decoration">
        <v-btn color="primary">
          <v-icon left>
            mdi-arrow-left
          </v-icon>Regresar</v-btn>
      </NuxtLink>
      <v-btn class="ml-5" color="primary" 
        @click="openUpdateFarmDialog()"
        v-if="isEditor">
        <v-icon left>mdi-pencil</v-icon>Editar
      </v-btn>
      <v-btn class="ml-5" color="primary">
        <v-icon>mdi-delete</v-icon>Eliminar
      </v-btn>
    </v-toolbar> -->
    <v-row>
      <v-col cols="12" sm="6" md="6">
        <v-card class="mx-10" elevation="0">
          <v-card-title class="headline">{{
            this.currentFarm.name
          }}</v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="Area"
                  v-model="this.temporalArea.area"
                  :suffix="this.farm.type"
                  required
                >
                    <template v-slot:append-outer>
                        <v-menu
                          style="top: -9px"
                          offset-y
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn
                              v-bind="attrs"
                              v-on="on"
                              icon
                            >
                              <v-icon small>
                                mdi-menu
                              </v-icon>
                            </v-btn>
                          </template>
                          <v-card>
                              <v-btn
                                
                                @click="clickHe"
                              >
                                <v-icon >
                                </v-icon>He
                              </v-btn>
                              <v-btn
                                text
                                @click="clickMa"
                              >
                                <v-icon >
                                </v-icon>Ma
                              </v-btn>
                              <v-btn
                                text
                                @click="clickM2"
                              >
                                <v-icon >
                                </v-icon>M2
                              </v-btn>
                          </v-card>
                        </v-menu>
                      </template>

                </v-text-field>
                
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="Dirección"
                  v-model="this.fullAddress"
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="Señas"
                  v-model="this.currentFarm.address"
                  readonly
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="6">
        <v-card class="mx-10" elevation="0">
          <v-card-title class="headline">{{ this.clientName }}</v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="Correo"
                  v-model="this.currentClient.email"
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="Télefono"
                  v-model="this.currentClient.phone"
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="Celular"
                  v-model="this.currentClient.mobile"
                  readonly
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-divider class="mx-10"></v-divider>
    <v-row class="mt-10">
      <v-col cols="12" sm="6" md="3">
        <farm-detail-blocks-vue :currentFarm="currentFarm"></farm-detail-blocks-vue>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <farm-detail-areas-vue :currentFarm="currentFarm"></farm-detail-areas-vue>
      </v-col>
      <v-col cols="12" sm="6" md="6">
        <farm-detail-crops-vue :currentFarm="currentFarm"></farm-detail-crops-vue>
      </v-col>
    </v-row>
    <v-row class="ma-10">
      <v-col cols="12" sm="12" md="12">
        <farm-detail-applications-vue :currentFarm="currentFarm"></farm-detail-applications-vue>
      </v-col>
    </v-row>

    <!-- Dialog to modify farm -->
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
              "Editar finca"
            }}</span>
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
                      v-model="updatedFarm.name"
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
                      v-model="updatedFarm.area"
                      suffix='he'
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
                      v-model="updatedFarm.provincia"
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
                      v-model="updatedFarm.canton"
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
                      v-model="updatedFarm.distrito"
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
                      v-model="updatedFarm.address"
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
                      v-model="updatedFarm.state"
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
              @click="updateFarm()"
              :disabled="invalid"
              >Modificar</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </ValidationObserver>
    <!-- End dialog to create/modify farm -->

    <!-- Dialog to confirm deletion -->
    <v-dialog v-model="deleteFarmDialog" persistent max-width="50%">
      <v-card>
        <v-card-title class="headline"
          >Confirme la eliminación de la finca</v-card-title
        >
        <v-card-text>Esta acción no puede ser revertida y se eliminarán también los bloques y cultivos asociados</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="closeDeleteFarmDialog()"
            >Cancelar</v-btn
          >
          <v-btn color="green darken-1" text @click="deleteFarm()"
            >Eliminar</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- End Dialog to confirm deletion -->

    <!-- Snackbar -->
    <v-snackbar
      v-model="snackbar.visible"
      :color="snackbar.color"
      :multi-line=snackbar.multiline
      :timeout=snackbar.timeout
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
import FarmDetailBlocksVue from './blocks.vue'
import FarmDetailCropsVue from './crops.vue'
import FarmDetailApplicationsVue from './applications.vue'
import FarmDetailAreasVue from './areas.vue'
export default {
  name: 'Farm_Detail',
  components: {
    FarmDetailBlocksVue,
    FarmDetailCropsVue,
    FarmDetailApplicationsVue,
    FarmDetailAreasVue
  },
  data: () => ({
    farmDialog: false,
    updatedFarm: {},
    deleteFarmDialog: false,
    currentCantones: [],
    currentDistritos: [],
    stateTypeList: [
      { text: 'Activo', value: 1 },
      { text: 'Inactivo', value: 2 }
    ],
    farm: {
      name: '',
      area: '',
      provincia: '',
      canton: '',
      distrito: '',
      address: '',
      state: 1,
      clientId: '',
      type: 'he'
    },
    snackbar: {
      color: null,
      icon: null,
      text: null,
      title: null,
      multiline: true,
      timeout: 2000,
      visible: false
    },
    loaderActive: false,
    currentModules: [],
    blockHeaders: [
      {
        text: 'Nombre',
        align: 'start',
        sortable: true,
        value: 'name'
      },
      { text: 'Area', value: 'area' },
      { text: 'Acciones', value: 'actions', sortable: false }
    ],
    selectedClient: {},
    currentClient: {},
    temporalArea:{area:0}
  }),
  async fetch() {
    this.loaderActive = true
    try {
      await this.$store.dispatch('blocks/updateSelectedBlocks', {
        blocks: []
      })
      await this.$store.dispatch('crops/updateCropsBySelectedAreas', {
        crops: []
      })
      await this.$store.dispatch('farms/getFarms')
      this.getCurrentClient()
    } catch (error) {
      console.log(error)
      this.activateSnackbar('Obteniendo la información ' + error, false)
    }
    this.loaderActive = false
    this.temporalArea.area = this.currentFarm.area
  },
  computed: {
    ...mapGetters({
      getProvinciaText: 'locations/getProvinciaText',
      getCantonText: 'locations/getCantonText',
      getDistritoText: 'locations/getDistritoText'
    }),
    clients() {
      return this.$store.getters['clients/clients']
    },
    currentFarm() {
      return this.$store.getters['farms/getFarm'](this.$route.params.id)
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
    clientName() {
      const name =
        this.currentClient.type == 1
          ? this.currentClient.firstName +
            this.currentClient.secondName +
            this.currentClient.firsLastname +
            this.currentClient.secondLastname
          : this.currentClient.firstName
      return name
    },
    fullAddress() {
      const address =
        this.getDistritoText(this.currentFarm.distrito) +
        ' de ' +
        this.getCantonText(this.currentFarm.canton) +
        ', ' +
        this.getProvinciaText(this.currentFarm.provincia)
      return address
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
    }
  },
  methods: {
    getCurrentClient(){
      this.currentClient = this.$store.getters['clients/getClient'](this.currentFarm.clientId)
    },

    openUpdateFarmDialog() {
      this.updatedFarm = { ...this.currentFarm }
      this.farmDialog = true
      this.onProvinciaChange()
      this.onCantonChange()
      this.onClientChange(this.updatedFarm.clientId)
    },

    closeFarmDialog() {
      this.farmDialog = false
      this.selectedClient = null
      this.$refs.observer.reset()
    },

    openDeleteFarmDialog() {
      this.deleteFarmDialog = true
    },

    closeDeleteFarmDialog() {
      this.deleteFarmDialog = false
    },

    async updateFarm() {
      const isValid = await this.$refs.observer.validate()
      if (isValid) {
        this.loaderActive = true
        this.$fire.firestore
          .collection('farms')
          .doc(this.currentFarm.id)
          .update({
            name: this.updatedFarm.name,
            area: this.updatedFarm.area,
            provincia: this.updatedFarm.provincia,
            canton: this.updatedFarm.canton,
            distrito: this.updatedFarm.distrito,
            address: this.updatedFarm.address,
            state: this.updatedFarm.state,
            clientId: this.updatedFarm.clientId
          })
          .then(() => {
            this.activateSnackbar('Finca modificada correctamente', true)
            this.$refs.observer.reset()
            this.$fetch()
            this.farmDialog = false
          })
          .catch(error => {
            console.error(error)
            this.activateSnackbar('Error modificando finca', false)
          })
        this.loaderActive = false
      }
    },
    async deleteFarm() {

      this.loaderActive = true
      this.deleteFarmDialog = false

      const crops = await this.$fire.firestore
        .collection('crops')
        .where('farmId', '==', this.currentFarm.id)
        .get();

      const blocks = await this.$fire.firestore
        .collection('blocks')
        .where('farmId', '==', this.currentFarm.id)
        .get();

      const farmRef = await this.$fire.firestore
        .collection('farms')
        .doc(this.currentFarm.id);

      const batch = this.$fire.firestore.batch();

      crops.forEach(doc => {
        batch.delete(doc.ref);
      });

      blocks.forEach(doc => {
        batch.delete(doc.ref);
      });

      batch.delete(farmRef)

      await batch.commit()
        .then(() => {
          this.loaderActive = false
          this.activateSnackbar('Finca y referencias borradas.', true)
          setTimeout(function(){ this.$nuxt.$router.replace({ path: "/farms" }) }, 2500);
        })
        .catch(error => {
          console.error('Error borrando la finca: ', error)
          this.activateSnackbar('Borrando la finca', false)
          this.loaderActive = false
        })
    },

    onProvinciaChange() {
      this.currentDistritos = []
      this.currentCantones = this.cantones.filter(
        canton => canton.provincia === this.updatedFarm.provincia
      )
    },

    onCantonChange() {
      this.currentDistritos = this.distritos.filter(
        distrito => distrito.canton === this.updatedFarm.canton
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
       clickMa () {
        
        if (this.farm.type === "he"){
          this.temporalArea.area = this.temporalArea.area * 0.7050
        }else if (this.farm.type === "m2") {
          this.temporalArea.area = this.temporalArea.area * 0.00014308
        }
        this.farm.type = "ma"
      },
      clickHe () {
        
        if (this.farm.type === "ma"){
          this.temporalArea.area = this.temporalArea.area * 1.4308
        }else if (this.farm.type === "m2") {
          this.temporalArea.area = this.temporalArea.area * 0.0001              
        }
        this.farm.type = "he"
      },
      clickM2 () {
        
        if (this.farm.type === "he"){
          this.temporalArea.area = this.temporalArea.area / 0.0001             
        }else if (this.farm.type === "ma") {
          this.temporalArea.area = this.temporalArea.area * 6988
        }

        this.farm.type = "m2"
      }
  }
}
</script>
