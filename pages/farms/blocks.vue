<template v-slot:default>
  <div>
    <v-card elevation="2" outlined>
      <!-- Blocks table -->
      <v-data-table
        :headers="blockHeaders"
        :items="this.blocks"
        :items-per-page="10"
        :search="blocksTableSearch"
        item-key="name"
        sort-by="name"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Bloques</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-text-field
              v-model="blocksTableSearch"
              append-icon="mdi-magnify"
              label="Buscar"
              single-line
              hide-details
            ></v-text-field>
            <v-icon
              large
              class="ml-5"
              color="primary"
              @click="openBlockDialog()"
            >
              mdi-plus-circle
            </v-icon>
          </v-toolbar>
        </template>
        <template v-slot:item="{ item }">
          <tr
            :class="getSelectedRowClass(item.id)"
            @click="onBlocksRowClicked(item)"
          >
            <td>{{ item.name }}</td>
            <td>{{ item.area }}</td>
            <td>
              <v-icon
                small
                class="mr-2"
                @click="openUpdateBlockDialog(item)"
              >
                mdi-pencil
              </v-icon>
              <v-icon small @click="openDeleteBlockDialog(item)">
                mdi-delete
              </v-icon>
            </td>
          </tr>
        </template>
      </v-data-table>
      <!-- End blocks table -->
    </v-card>

    <!-- Dialog to create/modify block -->
    <ValidationObserver ref="observer" v-slot="{ invalid }" tag="form">
      <v-dialog v-model="blockDialog" persistent max-width="50%">
        <v-card>
          <v-card-title>
            <span class="headline">{{
              isEdition ? "Editar bloque" : "Agregar bloque"
            }}</span>
            <v-spacer></v-spacer>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="6">
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="Nombre"
                    rules="required"
                  >
                    <v-text-field
                      label="Nombre del bloque"
                      v-model="block.name"
                      :error-messages="errors"
                      required
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="Área del bloque"
                    rules="required"
                  >
                    <v-text-field
                      label="Área del bloque"
                      type="number"
                      v-model="block.area"
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
            <v-btn color="blue darken-1" text @click="closeBlockDialog()"
              >Cerrar</v-btn
            >
            <v-btn
              color="blue darken-1"
              text
              @click="addBlock()"
              v-if="!isEdition"
              :disabled="invalid"
              >Agregar</v-btn
            >
            <v-btn
              color="blue darken-1"
              text
              @click="updateBlock()"
              v-if="isEdition"
              :disabled="invalid"
              >Modificar</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </ValidationObserver>
    <!-- End dialog to create/modify block -->

    <!-- Dialog to confirm block deletion -->
    <confirm-dialog ref="deleteBlockDialog"></confirm-dialog>
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
export default {
  name: 'farm-detail-blocks',
  props: ['currentFarm'],
  data: () => ({
    block: {
      id: '',
      name: '',
      area: 0
    },
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
    blocksTableSearch: '',
    isEdition: false,
    blockDialog: false,
    selectedBlocks: [],
    snackbar: {
      color: null,
      icon: null,
      text: null,
      title: null,
      multiline: true,
      timeout: 2000,
      visible: false
    },
    loaderActive: false
  }),
  async fetch() {
    this.loaderActive = true
    try {
      await this.$store.dispatch('blocks/getFarmBlocks', {
        farmId: this.$route.params.id
      })
    } catch (error) {
      console.log(error)
      this.activateSnackbar('Obteniendo la información ' + error, false)
    }
    this.loaderActive = false
  },
  computed: {
    blocks() {
      return this.$store.getters['blocks/farmBlocks']
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
    openBlockDialog() {
      this.blockDialog = true
      this.isEdition = false
      this.block = {
        name: '',
        area: ''
      }
    },

    openUpdateBlockDialog(data) {
      // If we do: "this.block = data" we get a vuex error because we're using the same reference
      // Vuex - Do not mutate vuex store state outside mutation handlers
      this.block.id = data.id
      this.block.name = data.name
      this.block.area = data.area
      this.isEdition = true
      this.blockDialog = true
    },

    closeBlockDialog() {
      this.blockDialog = false
      this.$refs.observer.reset()
    },

    async openDeleteBlockDialog(data) {
      this.block = data
      const areaList = this.$store.getters['areas/getAreasByBlock'](this.block.id)

      const message =
        areaList.length > 0
          ? `Este bloque posee asociaciones, eliminelas antes de proceder con su eliminación`
          : 'Esta acción no puede ser revertida.'

      const ok = await this.$refs.deleteBlockDialog.show({
        title: `Confirme la eliminación del bloque: ${this.block.name}`,
        message: message,
        okButton: areaList.length > 0 ? null : 'Eliminar'
      })
      if (ok) {
        this.deleteBlock()
      } else {
        this.area = null
      }
    },

    async addBlock() {
      //TODO: add validation that the sum of blocks areas is not higher than the farm area
      const isValid = await this.$refs.observer.validate()
      if (isValid) {
        this.loaderActive = true

        this.$fire.firestore
          .collection('blocks')
          .add({
            farmId: this.currentFarm.id,
            name: this.block.name,
            area: this.block.area,
            active: true
          })
          .then(() => {
            this.activateSnackbar('Bloque agregado correctamente', true)
            this.$fetch()
            this.$refs.observer.reset()
            this.blockDialog = false
          })
          .catch(error => {
            console.error(error)
            this.activateSnackbar('Error agregando bloque', false)
          })

        this.loaderActive = false
      }
    },

    async updateBlock() {
      const isValid = await this.$refs.observer.validate()

      if (isValid) {
        this.loaderActive = true
        await this.$fire.firestore
          .collection('blocks')
          .doc(this.block.id)
          .update({
            name: this.block.name,
            area: this.block.area
          })
          .then(() => {
            this.activateSnackbar('Bloque modificado.', true)
          })
          .catch(error => {
            console.error('Error updating document: ', error)
            this.activateSnackbar('Modificando bloque', false)
          })

        this.loaderActive = false
        this.$fetch()
        this.blockDialog = false
        this.$refs.observer.reset()
      }
    },

    async deleteBlock() {
      this.loaderActive = true
      await this.$fire.firestore
        .collection('blocks')
        .doc(this.block.id)
        .update({
          active: false,
        })
        .then(() => {
          this.activateSnackbar('Bloque borrado.', true)
          // Not needed at this point, we're not doing cascade deletion
          //this.deleteBlockCrops(this.block.id)
          this.loaderActive = false
        })
        .catch(error => {
          console.error('Error borrando el bloque: ', error)
          this.activateSnackbar('Borrando el bloque', false)
          this.loaderActive = false
        })
      this.$fetch()
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

    async deleteBlockCrops(blockId) {
      const crops = await this.$fire.firestore
        .collection('crops')
        .where('blockId', '==', blockId)
        .get()

      const batch = this.$fire.firestore.batch()

      crops.forEach(doc => {
        batch.delete(doc.ref)
      })
      await batch.commit()
    },

    onBlocksRowClicked(row) {
      this.selectedBlocks = this.$store.getters['blocks/selectedBlocks'].slice()
      if (this.selectedBlocks.includes(row.id)) {
        this.selectedBlocks = this.selectedBlocks.filter(
          selectedKeyID => selectedKeyID !== row.id
        )
      } else {
        this.selectedBlocks.push(row.id)
      }

      this.$store.dispatch('crops/updateCropsBySelectedAreas', {
        crops: []
      })

      this.$store.dispatch('blocks/updateSelectedBlocks', {
        blocks: this.selectedBlocks
      })
      this.getAreasBySelectedBlocks()
    },

    getAreasBySelectedBlocks() {
      const tempSelectedAreas = []
      this.selectedBlocks.forEach(block => {
        tempSelectedAreas.push(
          this.$store.getters['areas/getAreasByBlock'](block)
        )
      })
      this.$store.dispatch('areas/updateAreasBySelectedBlocks', {
        areas: tempSelectedAreas.flat()
      })
    },

    getSelectedRowClass(rowId) {
      return this.selectedBlocks.indexOf(rowId) > -1 ? 'selected' : ''
    }
  }
}
</script>
