<template v-slot:default>
  <div>
    <v-card class="ml-10" elevation="2" outlined>
      <!-- Areas table -->
      <v-data-table
        :headers="areasHeaders"
        :items="areasBySelectedBlocks"
        :items-per-page="10"
        :search="areasTableSearch"
        item-key="name"
        sort-by="name"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Áreas</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-text-field
              v-model="areasTableSearch"
              append-icon="mdi-magnify"
              label="Buscar"
              single-line
              hide-details
            ></v-text-field>
            <v-icon
              large
              class="ml-5"
              color="primary"
              @click="openAreaDialog()"
            >
              mdi-plus-circle
            </v-icon>
          </v-toolbar>
        </template>
        <template v-slot:item="{ item }">
          <tr
            :class="getSelectedRowClass(item.id)"
            @click="onAreasRowClicked(item)"
          >
            <td>{{ item.name }}</td>
            <td>{{ item.area }}</td>
            <td>
              <v-icon
                small
                class="mr-2"
                @click="openUpdateAreaDialog(item)"
              >
                mdi-pencil
              </v-icon>
              <v-icon small @click="openDeleteAreaDialog(item)">
                mdi-delete
              </v-icon>
            </td>
          </tr>
        </template>
      </v-data-table>
      <!-- End areas table -->
    </v-card>

    <!-- Dialog to create/modify area -->
    <ValidationObserver ref="observer" v-slot="{ invalid }" tag="form">
      <v-dialog v-model="areaDialog" persistent max-width="50%">
        <v-card>
          <v-card-title>
            <span class="headline">{{
              isEdition ? "Editar área" : "Agregar área"
            }}</span>
            <v-spacer></v-spacer>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-autocomplete
                    v-model="selectedBlock"
                    :items="blocks"
                    no-data-text="No hay datos"
                    prepend-icon="mdi-magnify"
                    item-text="name"
                    item-value="id"
                    placeholder="Escriba para buscar bloques"
                  ></v-autocomplete>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="Nombre"
                    rules="required"
                  >
                    <v-text-field
                      label="Nombre del área"
                      v-model="area.name"
                      :error-messages="errors"
                      required
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="Área del área"
                    rules="required"
                  >
                    <v-text-field
                      label="Área del área"
                      type="number"
                      v-model="area.area"
                      suffix="ha"
                      :error-messages="errors"
                      required
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
              </v-row>
            </v-container>
            <small>*campos requeridos</small><br />
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeAreaDialog()"
              >Cerrar</v-btn
            >
            <v-btn
              color="blue darken-1"
              text
              @click="addArea()"
              v-if="!isEdition"
              :disabled="invalid"
              >Agregar</v-btn
            >
            <v-btn
              color="blue darken-1"
              text
              @click="updateArea()"
              v-if="isEdition"
              :disabled="invalid"
              >Modificar</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </ValidationObserver>
    <!-- End dialog to create/modify area -->

    <!-- Dialog to confirm area deletion -->
    <v-dialog v-model="deleteAreaDialog" persistent max-width="40%">
      <v-card>
        <v-card-title class="headline"
          >Confirme la eliminación del área</v-card-title
        >
        <v-card-text>Esta acción no puede ser revertida</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="closeDeleteAreaDialog()"
            >Cancelar</v-btn
          >
          <v-btn color="green darken-1" text @click="deleteArea()"
            >Eliminar</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- End Dialog to confirm area deletion -->

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
  name: 'farm-detail-areas',
  props: ['currentFarm'],
  data: () => ({
    area: {
      id: '',
      name: '',
      area: 0
    },
    areasHeaders: [
      {
        text: 'Nombre',
        align: 'start',
        sortable: true,
        value: 'name'
      },
      { text: 'Area', value: 'area' },
      { text: 'Acciones', value: 'actions', sortable: false }
    ],
    areasTableSearch: '',
    isEdition: false,
    areaDialog: false,
    deleteAreaDialog: false,
    selectedAreas: [],
    selectedBlock: '',
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
  }),
  async fetch() {
    this.loaderActive = true
    try {
      await this.$store.dispatch('areas/getFarmAreas', {
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
      //getAreaText: 'areas/getAreaText'
    }),
    areas() {
      return this.$store.getters['areas/farmAreas']
    },
    blocks() {
      return this.$store.getters['blocks/farmBlocks']
    },
    areasBySelectedBlocks() {
      return this.$store.getters['areas/areasBySelectedBlocks']
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
    openAreaDialog() {
      this.areaDialog = true
      this.isEdition = false
      this.area = {
        name: '',
        area: '',
        blockId: ''
      }
      this.selectedBlock = ''
    },

    openUpdateAreaDialog(data) {
      // If we do: "this.area = data" we get a vuex error because we're using the same reference
      // Vuex - Do not mutate vuex store state outside mutation handlers
      this.area.id = data.id
      this.area.name = data.name
      this.area.area = data.area
      this.area.blockId = data.blockId
      this.isEdition = true
      this.areaDialog = true
      this.selectedBlock = data.blockId
    },

    closeAreaDialog() {
      this.areaDialog = false
      this.$refs.observer.reset()
    },

    openDeleteAreaDialog(data) {
      this.deleteAreaDialog = true
      this.area = data
    },

    closeDeleteAreaDialog() {
      this.deleteAreaDialog = false
      this.area = null
    },

    async addArea() {
      //TODO: add validation that the sum of areas areas is not higher than the farm area
      const isValid = await this.$refs.observer.validate()
      if (isValid) {
        this.loaderActive = true

        this.$fire.firestore
          .collection('areas')
          .add({
            farmId: this.currentFarm.id,
            blockId: this.selectedBlock,
            name: this.area.name,
            area: this.area.area
          })
          .then(() => {
            this.activateSnackbar('Área agregado correctamente', true)
            this.$fetch()
            this.$refs.observer.reset()
            this.areaDialog = false
          })
          .catch(error => {
            console.error(error)
            this.activateSnackbar('Error agregando el área', false)
          })

        this.loaderActive = false
      }
    },

    async updateArea() {
      const isValid = await this.$refs.observer.validate()

      if (isValid) {
        this.loaderActive = true
        await this.$fire.firestore
          .collection('areas')
          .doc(this.area.id)
          .update({
            name: this.area.name,
            area: this.area.area,
            blockId: this.selectedBlock,
            farmId: this.currentFarm.id
          })
          .then(() => {
            this.activateSnackbar('Área modificado.', true)
          })
          .catch(error => {
            console.error('Error updating document: ', error)
            this.activateSnackbar('Modificando área', false)
          })

        this.loaderActive = false
        this.$fetch()
        this.areaDialog = false
        this.$refs.observer.reset()
      }
    },

    async deleteArea() {
      this.loaderActive = true
      await this.$fire.firestore
        .collection('areas')
        .doc(this.area.id)
        .delete()
        .then(() => {
          this.activateSnackbar('Área borrada.', true)
          this.deleteAreaCrops(this.area.id)
          this.loaderActive = false
        })
        .catch(error => {
          console.error('Error borrando el área: ', error)
          this.activateSnackbar('Borrando el bloque', false)
          this.loaderActive = false
        })
      this.$fetch()
      this.deleteAreaDialog = false
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

    async deleteAreaCrops(areaId) {
      const crops = await this.$fire.firestore
        .collection('crops')
        .where('areaId', '==', areaId)
        .get();

      const batch = this.$fire.firestore.batch();

      crops.forEach(doc => {
        batch.delete(doc.ref);
      });
      await batch.commit();
    },

    onAreasRowClicked(row) {
      this.selectedAreas = this.$store.getters['areas/selectedAreas'].slice()
      if (this.selectedAreas.includes(row.id)) {
        this.selectedAreas = this.selectedAreas.filter(
          selectedKeyID => selectedKeyID !== row.id
        )
      } else {
        this.selectedAreas.push(row.id)
      }
      this.$store.dispatch('areas/updateSelectedAreas', {
        areas: this.selectedAreas
      })
      this.getCropsBySelectedAreas()
    },

    getCropsBySelectedAreas() {
      const tempSelectedCrops = []
      this.selectedAreas.forEach(area => {
        tempSelectedCrops.push(
          this.$store.getters['crops/getCropsByArea'](area)
        )
      })
      this.$store.dispatch('crops/updateCropsBySelectedAreas', {
        crops: tempSelectedCrops.flat()
      })
    },

    getSelectedRowClass(rowId){
      return this.selectedAreas.indexOf(rowId) > -1 ? 'selected' : ''
    },
  }

}
</script>
