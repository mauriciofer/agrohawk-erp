<template v-slot:default>
  <div>
    <v-card elevation="2" outlined>
      <!-- Crops table -->
      <v-data-table
        :headers="cropsTableHeaders"
        :items="cropsBySelectedAreas"
        :items-per-page="10"
        :search="cropsTableSearch"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Cultivos</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-text-field
              v-model="cropsTableSearch"
              append-icon="mdi-magnify"
              label="Buscar"
              single-line
              hide-details
            ></v-text-field>
            <v-icon
              large
              class="ml-5"
              color="primary"
              @click="openCreateCropDialog()"
            >
              mdi-plus-circle
            </v-icon>
          </v-toolbar>
        </template>
        <template v-slot:item="{ item }">
            <tr
              :class="getSelectedRowClass(item.id)"
              @click="onCropsRowClicked(item.id)"
            >
            <td>{{ getAreaText(item.areaId) }}</td>
            <td>{{ getProductTypeText(item.type) }}</td>
            <td>{{ item.sowDate }}</td>
            <td>{{ item.harvestDate }}</td>
            <td>{{ item.cycle }}</td>
            <td>
              <v-icon small class="mr-2" @click="openUpdateCropDialog(item)">
                mdi-pencil
              </v-icon>
              <v-icon small @click="openDeleteCropDialog(item)">
                mdi-delete
              </v-icon>
            </td>
          </tr>
        </template>
      </v-data-table>
      <!-- End crops table -->
    </v-card>

    <!-- Dialog to create/modify Crops -->

    <ValidationObserver
      ref="observer"
      v-slot="{ invalid }"
      tag="form"
      @submit.prevent="submit()"
    >
      <v-dialog v-model="cropDialog" persistent max-width="70%">
        <v-card>
          <v-card-title>
            <span class="headline">{{
              isEdition ? "Editar cultivo" : "Agregar cultivo"
            }}</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="3">
                  <v-autocomplete
                    v-model="selectedArea"
                    :items="areas"
                    no-data-text="No hay datos"
                    prepend-icon="mdi-magnify"
                    item-text="name"
                    item-value="id"
                    placeholder="Escriba para buscar áreas"
                  ></v-autocomplete>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="3">
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="Tipo de cultivo"
                    rules="required"
                  >
                    <v-autocomplete
                      v-model="crop.type"
                      :items="productTypes"
                      no-data-text="No hay datos"
                      prepend-icon="mdi-magnify"
                      :item-text="item =>`${item.name} ${item.variety}`"
                      item-value="id"
                      placeholder="Escriba para buscar productos"
                      :error-messages="errors"
                    ></v-autocomplete>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-dialog
                    ref="sowDateDialog"
                    v-model="sowDateModal"
                    :return-value.sync="crop.sowDate"
                    persistent
                    width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <ValidationProvider
                        v-slot="{ errors }"
                        name="Fecha de siembra"
                        rules="required"
                        ref="sowDate"
                      >
                        <v-text-field
                          v-model="crop.sowDate"
                          label="Fecha de siembra *"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                          :error-messages="errors"
                          required
                        ></v-text-field>
                      </ValidationProvider>
                    </template>
                    <v-date-picker
                      v-model="crop.sowDate"
                      scrollable
                      locale="es-ES"
                      @input="$refs.sowDateDialog.save(crop.sowDate)"
                      @change="calculateCropCycle()"
                    >
                    </v-date-picker>
                  </v-dialog>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-dialog
                    ref="harvestDateDialog"
                    v-model="harvestDateModal"
                    :return-value.sync="crop.harvestDate"
                    persistent
                    width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <ValidationProvider
                        v-slot="{ errors }"
                        name="Fecha de cosecha"
                        ref="password"
                        rules="required|cropCycleDates:@Fecha de siembra"
                      >
                        <v-text-field
                          v-model="crop.harvestDate"
                          label="Fecha de cosecha *"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                          :error-messages="errors"
                          required
                        ></v-text-field>
                      </ValidationProvider>
                    </template>
                    <v-date-picker
                      v-model="crop.harvestDate"
                      scrollable
                      locale="es-ES"
                      @input="$refs.harvestDateDialog.save(crop.harvestDate)"
                      @change="calculateCropCycle()"
                    >
                    </v-date-picker>
                  </v-dialog>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field
                    label="Ciclo de cultivo"
                    v-model="crop.cycle"
                    readonly
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <small>*campos requeridos</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeCropDialog()"
              >Cerrar</v-btn
            >
            <v-btn
              color="blue darken-1"
              text
              @click="createCrop()"
              v-if="!isEdition"
              :disabled="invalid"
              >Crear</v-btn
            >
            <v-btn
              color="blue darken-1"
              text
              @click="updateCrop()"
              v-if="isEdition"
              :disabled="invalid"
              >Modificar</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </ValidationObserver>
    <!-- End dialog to create/modify crops -->

    <!-- Dialog to confirm crop deletion -->
    <confirm-dialog ref="deleteCropDialog"></confirm-dialog>
    <!-- End Dialog to confirm block deletion -->

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
export default {
  name: 'farm-detail-crops',
  props: ['currentFarm'],
  data: () => ({
    isEdition: false,
    cropsTableHeaders: [
      { text: 'Área', align: 'start', value: 'areaId' },
      { text: 'Tipo de cultivo', value: 'type' },
      { text: 'Fecha de inicio', value: 'sowDate' },
      { text: 'Fecha de cosecha', value: 'harvestDate' },
      { text: 'Ciclo de cultivo', value: 'cycle' },
      { text: 'Acciones', value: 'actions', sortable: false }
    ],
    cropDialog: false,
    crop: {
      type: 1,
      sowDate: new Date().toISOString().substr(0, 10),
      harvestDate: new Date().toISOString().substr(0, 10),
      cycle: ''
    },
    sowDateMenu: false,
    sowDateModal: false,
    harvestDateMenu: false,
    harvestDateModal: false,
    cropsTableSearch: '',
    selectedArea: '',
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
    selectedCropForApplications: {} //Mover
  }),
  async fetch() {
    this.loaderActive = true
    try {
      await this.$store.dispatch('crops/getFarmCrops', {
        farmId: this.$route.params.id
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
      getDistritoText: 'locations/getDistritoText',
      getProductTypeText: 'productTypes/getProductTypeText',
      getAreaText: 'areas/getAreaText'
    }),
    areas() {
      return this.$store.getters['areas/farmAreas']
    },
    selectedAreas() {
      return this.$store.getters['areas/selectedAreas']
    },
    cropsBySelectedAreas() {
      return this.$store.getters['crops/cropsBySelectedAreas']
    },
    productTypes() {
      return this.$store.getters['productTypes/productTypes']
    }
  },
  methods: {
    openCreateCropDialog() {
      this.cropDialog = true
      this.isEdition = false
      this.crop = {
        type: 1,
        sowDate: '',
        harvestDate: '',
        aplications: [],
        cycle: '',
        areaId: ''
      }
      this.selectedArea = ''
    },

    openUpdateCropDialog(data) {
      // If we do: "this.crop = data" we get a vuex error because we're using the same reference
      // Vuex - Do not mutate vuex store state outside mutation handlers
      this.crop.id = data.id
      this.crop.type = data.type
      this.crop.sowDate = data.sowDate
      this.crop.harvestDate = data.harvestDate
      this.crop.cycle = data.cycle
      this.crop.aplications = data.aplications
      this.crop.areaId = data.areaId
      this.crop.farmId = data.farmId
      this.isEdition = true
      this.cropDialog = true
      this.selectedArea = data.areaId
    },

    closeCropDialog() {
      this.cropDialog = false
      this.$refs.observer.reset()
    },

    async openDeleteCropDialog(data) {
      this.crop = data
      const ok = await this.$refs.deleteCropDialog.show({
        title: `Confirme la eliminación del cultivo: ${this.getProductTypeText(
          this.crop.type
        )}`,
        message: 'Esta acción no puede ser revertida',
        okButton: 'Eliminar'
      })
      if (ok) {
        this.deleteCrop()
      } else {
        this.crop = {
          type: 1,
          sowDate: new Date().toISOString().substr(0, 10),
          harvestDate: new Date().toISOString().substr(0, 10),
          cycle: ''
        }
      }
    },

    async createCrop() {
      const isValid = await this.$refs.observer.validate()

      if (isValid) {
        this.loaderActive = true
        const newCrop = {
          type: this.crop.type,
          sowDate: this.crop.sowDate,
          harvestDate: this.crop.harvestDate,
          aplications: [],
          cycle: this.crop.cycle,
          areaId: this.selectedArea,
          farmId: this.currentFarm.id,
          active: true
        }
        await this.$fire.firestore
          .collection('crops')
          .add(newCrop)
          .then(doc => {
            newCrop.id = doc.id
            this.activateSnackbar('Cultivo creado.', true)
            this.updateCropsBySelectedAreas(newCrop)
          })
          .catch(error => {
            console.error(error)
            this.activateSnackbar('Creando cultivo', false)
          })
        this.loaderActive = false
        this.$fetch()
        this.cropDialog = false
        this.$refs.observer.reset()
      }
    },

    async updateCrop() {
      const isValid = await this.$refs.observer.validate()

      if (isValid) {
        this.loaderActive = true
        await this.$fire.firestore
          .collection('crops')
          .doc(this.crop.id)
          .update({
            type: this.crop.type,
            sowDate: this.crop.sowDate,
            harvestDate: this.crop.harvestDate,
            aplications: [],
            cycle: this.crop.cycle,
            areaId: this.selectedArea,
            farmId: this.currentFarm.id
          })
          .then(() => {
            this.activateSnackbar('Bloque modificado.', true)
            this.updateCropsBySelectedAreas(this.crop, true)
          })
          .catch(error => {
            console.error('Error updating document: ', error)
            this.activateSnackbar('Modificando bloque', false)
          })

        this.loaderActive = false
        this.$fetch()
        this.cropDialog = false
        this.$refs.observer.reset()
      }
    },

    async deleteCrop() {
      this.loaderActive = true
      await this.$fire.firestore
        .collection('crops')
        .doc(this.crop.id)
        .update({
          active: false
        })
        .then(() => {
          this.activateSnackbar('Cultivo borrado.', true)
          this.loaderActive = false
          this.updateCropsBySelectedAreas(this.crop)
        })
        .catch(error => {
          console.error('Error borrando el cultivo: ', error)
          this.activateSnackbar('Borrando el cultivo', false)
          this.loaderActive = false
        })
      this.$fetch()
    },

    calculateCropCycle() {
      let cropCycletext = ''
      const totalDays = Math.round(
        (new Date(this.crop.harvestDate) - new Date(this.crop.sowDate)) /
          (24 * 60 * 60 * 1000)
      )
      const weeks = Math.floor(totalDays / 7)
      const days = totalDays % 7
      if (weeks > 0 && days >= 0) {
        weeks == 1
          ? (cropCycletext = weeks + ' Semana')
          : (cropCycletext = weeks + ' Semanas')
        if (days == 1) cropCycletext += ' y ' + days + ' Día'
        if (days > 1) cropCycletext += ' y ' + days + ' Días'
      } else if (days > 0) {
        days == 1
          ? (cropCycletext = days + ' Día')
          : (cropCycletext = days + ' Días')
      }
      this.crop.cycle = cropCycletext
    },

    updateCropsBySelectedAreas(crop, isUpdate) {
      console.log(isUpdate)
      let updatedList =
        typeof this.cropsBySelectedAreas !== 'undefined'
          ? this.cropsBySelectedAreas.slice(0)
          : []

      if (isUpdate) {
        let cropIndex = updatedList.findIndex(
          currentCrop => currentCrop['id'] === crop.id
        )
        updatedList[cropIndex] = crop
      } else {
        if (updatedList.includes(crop)) {
          updatedList = updatedList.filter(
            currentCrop => currentCrop.id !== crop.id
          )
        } else {
          updatedList.push(crop)
        }
      }
      this.$store.dispatch('crops/updateCropsBySelectedAreas', {
        crops: updatedList
      })
      // this.crop = {
      //   type: 1,
      //   sowDate: new Date().toISOString().substr(0, 10),
      //   harvestDate: new Date().toISOString().substr(0, 10),
      //   cycle: ''
      // }
    },

    onCropsRowClicked(rowId) {
      this.selectedCropForApplications =
        this.selectedCropForApplications !== rowId ? rowId : {}
    },

    getSelectedRowClass(rowId) {
      return this.selectedCropForApplications == rowId ? 'selected' : ''
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
    }
  }
}
</script>
