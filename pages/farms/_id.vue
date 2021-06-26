<template>
  <div>
    <h1 class="ma-5">Detalle de Finca</h1>
    <v-row>
      <v-col cols="12" sm="6" md="6">
        <v-card class="mx-10" elevation="0">
          <v-card-title class="headline">{{
            this.currentFarm.name
          }}</v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" sm="6" md="2">
                <v-text-field
                  label="Area"
                  v-model="this.currentFarm.area"
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
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
                  v-model="this.currentFarm.mobile"
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
      <v-col cols="12" sm="6" md="4">
        <v-card class="ml-10" elevation="2" outlined>
          <!-- Blocks table -->
          <v-data-table
            :headers="blockHeaders"
            :items="this.blocks"
            :items-per-page="10"
            :search="blocksTableSearch"
            v-model="selectedBlocks"
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
                :class="selectedBlocks.indexOf(item.id) > -1 ? 'selected' : ''"
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
        </v-card> </v-col
      ><v-col cols="12" sm="6" md="8">
        <v-card class="mr-10" elevation="2" outlined>
          <!-- Crops table -->
          <v-data-table
            :headers="this.cropsTableHeaders"
            :items="this.selectedCrops"
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
                :class="selectedCropForApplications == item.id ? 'selected' : ''"
                @click="onCropsRowClicked(item)"
              >
                <td>{{ getBlockText(item.blockId) }}</td>
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
      </v-col>
    </v-row>
    <v-row class="ma-10">
      <v-col cols="12" sm="12" md="12">
        <v-stepper v-model="currentApplicationNumber">
          <v-stepper-header>
            <template v-for="n in testingApplications.length">
              <v-stepper-step
                :key="`${n}-step`"
                :complete="currentApplicationNumber > n"
                :step="n"
                editable
              >
                Aplicación # {{ n }}
              </v-stepper-step>

              <v-divider
                v-if="n !== testingApplications.length"
                :key="n"
              ></v-divider>
            </template>
          </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content
            v-for="(step, index) in testingApplications"
            :key="`${index}-content`"
            :step="index"
          >
            <v-card
              color="grey lighten-3"
            >
              <v-row class="ma-10">
                <v-col cols="4" sm="4" md="3">
                  <v-list-item two-line>
                    <v-list-item-content>
                      <v-list-item-title class="text-h4">
                        {{step.area + " ha"}}
                      </v-list-item-title>
                      <v-list-item-subtitle>{{"Inicio: " + step.startDate}}</v-list-item-subtitle>
                      <v-list-item-subtitle>{{"Final:   " + step.startDate}}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
                <v-col cols="4" sm="4" md="3">
                  <v-card-text>
                    <v-row align="center">
                      <v-col
                        cols="6"
                      >
                        {{"Clima inicio"}}
                      </v-col>
                      <v-col cols="6">
                        <v-icon>mdi-white-balance-sunny</v-icon>
                      </v-col>
                    </v-row>
                    <v-row align="center">
                      <v-col
                        cols="6"
                      >
                        {{"Clima final"}}
                      </v-col>
                      <v-col cols="6">
                        <v-icon>mdi-weather-cloudy</v-icon>
                      </v-col>
                    </v-row>
                    <v-row align="center">
                      <v-col
                        cols="6"
                      >
                        {{"Temperatura final: " + step.temperatureAtStart}}
                      </v-col>
                      <v-col cols="6">
                        <v-icon>mdi-thermometer</v-icon>
                      </v-col>
                    </v-row>
                    <v-row align="center">
                      <v-col
                        cols="6"
                      >
                        {{"Temperatura final: " + step.temperatureAtEnd}}
                      </v-col>
                      <v-col cols="6">
                        <v-icon>mdi-thermometer</v-icon>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-col>
                <v-col cols="4" sm="4" md="6">
                  <v-card class="mr-10" elevation="2" outlined>
                    <v-data-table
                      :headers="provisionTableHeaders"
                      :items="step.provisions"
                      :items-per-page="10"
                      item-key="name"
                      sort-by="name"
                    >
                      <template v-slot:top>
                        <v-toolbar flat>
                          <v-toolbar-title>Aplicaciones</v-toolbar-title>
                        </v-toolbar>
                      </template>
                      <template v-slot:[`item.actions`]="{ item }">
                        <v-icon small class="mr-2" @click="openUpdateCropDialog(item)">
                          mdi-pencil
                        </v-icon>
                        <v-icon small @click="openDeleteCropDialog(item)">
                          mdi-delete
                        </v-icon>
                      </template>
                    </v-data-table>
                  </v-card>
                </v-col>
              </v-row>
            </v-card>

            <v-btn
              color="primary"
              @click="nextStep(index)"
            >
              Continue
            </v-btn>

            <v-btn text>
              Cancel
            </v-btn>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
      </v-col>
    </v-row>

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
    <v-dialog v-model="deleteBlockDialog" persistent max-width="40%">
      <v-card>
        <v-card-title class="headline"
          >Confirme la eliminación del bloque</v-card-title
        >
        <v-card-text>Esta acción no puede ser revertida</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="closeDeleteBlockDialog()"
            >Cancelar</v-btn
          >
          <v-btn color="green darken-1" text @click="deleteBlock()"
            >Eliminar</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- End Dialog to confirm block deletion -->

    <!-- Dialog to confirm crop deletion -->
    <v-dialog v-model="deleteCropDialog" persistent max-width="40%">
      <v-card>
        <v-card-title class="headline"
          >Confirme la eliminación del cultivo</v-card-title
        >
        <v-card-text>Esta acción no puede ser revertida</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="closeDeleteCropDialog()"
            >Cancelar</v-btn
          >
          <v-btn color="green darken-1" text @click="deleteCrop()"
            >Eliminar</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- End Dialog to confirm block deletion -->

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
                    v-model="selectedBlock"
                    :items="blocks"
                    no-data-text="No hay datos"
                    prepend-icon="mdi-magnify"
                    item-text="name"
                    item-value="id"
                    placeholder="Escriba para buscar bloques"
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
  name: 'Farm_Detail',
  data: () => ({
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
    currentModules: [],
    isEdition: false,
    blockDialog: false,
    deleteBlockDialog: false,
    blocksTableSearch: '',
    cropsTableSearch: '',
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
    cropsTableHeaders: [
      { text: 'Bloque', align: 'start', value: 'blockId' },
      { text: 'Tipo de cultivo', value: 'type' },
      { text: 'Fecha de inicio', value: 'sowDate' },
      { text: 'Fecha de cosecha', value: 'harvestDate' },
      { text: 'Ciclo de cultivo', value: 'cycle' },
      { text: 'Acciones', value: 'actions', sortable: false }
    ],
    provisionTableHeaders: [
      { text: 'Nombre', align: 'start', value: 'name' },
      { text: 'Área', value: 'area' },
      { text: 'Dosis', value: 'dose' },
      { text: 'Tipo', value: 'type' },
      { text: 'Volumen', value: 'volume' },
      { text: 'Acciones', value: 'actions', sortable: false }
    ],
    block: {
      id: '',
      name: '',
      area: 0
    },
    selectedBlocks: [],
    selectedBlock: '',
    cropDialog: false,
    deleteCropDialog: false,
    crop: {
      type: 1,
      sowDate: new Date().toISOString().substr(0, 10),
      harvestDate: new Date().toISOString().substr(0, 10),
      cycle: ''
    },
    selectedCrops: [],
    sowDateMenu: false,
    sowDateModal: false,
    harvestDateMenu: false,
    harvestDateModal: false,
    selectedCropForApplications: {},
    testingApplications: [
      {
        area: 7.96,
        clientId: 'wVraObRlemixpqX1w10h',
        climateAtEnd: 'Nublado',
        climateAtStart: 'Soleado',
        cropType: 1,
        endDate: '5 de junio de 2021, 00:00:00 UTC-6',
        farmId: '7TSCR35DBV6louw96y48',
        startDate: '31 de mayo de 2021, 00:00:00 UTC-6',
        temperatureAtEnd: 19,
        temperatureAtStart: 18,
        provisions: [
          {
            area: 1.9,
            dose: 120,
            name: 'Maxicover',
            type: 'Adherente - Dispersante',
            volume: 3
          }
        ]
      },
      {
        area: 7.96,
        clientId: 'wVraObRlemixpqX1w10h',
        climateAtEnd: 'Nublado',
        climateAtStart: 'Soleado',
        cropType: 1,
        endDate: '5 de junio de 2021, 00:00:00 UTC-6',
        farmId: '7TSCR35DBV6louw96y48',
        startDate: '31 de mayo de 2021, 00:00:00 UTC-6',
        temperatureAtEnd: 19,
        temperatureAtStart: 18,
        provisions: [
          {
            area: 1.9,
            dose: 120,
            name: 'Maxicover',
            type: 'Adherente - Dispersante',
            volume: 3
          }
        ]
      },
      {
        area: 7.96,
        clientId: 'wVraObRlemixpqX1w10h',
        climateAtEnd: 'Nublado',
        climateAtStart: 'Soleado',
        cropType: 1,
        endDate: '5 de junio de 2021, 00:00:00 UTC-6',
        farmId: '7TSCR35DBV6louw96y48',
        startDate: '31 de mayo de 2021, 00:00:00 UTC-6',
        temperatureAtEnd: 19,
        temperatureAtStart: 18,
        provisions: [
          {
            area: 1.9,
            dose: 120,
            name: 'Maxicover',
            type: 'Adherente - Dispersante',
            volume: 3
          }
        ]
      },
      {
        area: 7.96,
        clientId: 'wVraObRlemixpqX1w10h',
        climateAtEnd: 'Nublado',
        climateAtStart: 'Soleado',
        cropType: 1,
        endDate: '5 de junio de 2021, 00:00:00 UTC-6',
        farmId: '7TSCR35DBV6louw96y48',
        startDate: '31 de mayo de 2021, 00:00:00 UTC-6',
        temperatureAtEnd: 19,
        temperatureAtStart: 18,
        provisions: [
          {
            area: 1.9,
            dose: 120,
            name: 'Maxicover',
            type: 'Adherente - Dispersante',
            volume: 3
          }
        ]
      },
      {
        area: 7.96,
        clientId: 'wVraObRlemixpqX1w10h',
        climateAtEnd: 'Nublado',
        climateAtStart: 'Soleado',
        cropType: 1,
        endDate: '5 de junio de 2021, 00:00:00 UTC-6',
        farmId: '7TSCR35DBV6louw96y48',
        startDate: '31 de mayo de 2021, 00:00:00 UTC-6',
        temperatureAtEnd: 19,
        temperatureAtStart: 18,
        provisions: [
          {
            area: 1.9,
            dose: 120,
            name: 'Maxicover',
            type: 'Adherente - Dispersante',
            volume: 3
          }
        ]
      }
    ],
    currentApplicationNumber: 1
  }),
  async fetch() {
    this.loaderActive = true
    try {
      await this.$store.dispatch('blocks/getFarmBlocks', {
        farmId: this.$route.params.id
      })
      await this.$store.dispatch('crops/getFarmCrops', {
        farmId: this.$route.params.id
      })
    } catch (error) {
      console.log(error)
      this.activateSnackbar('Obteniendo la información ' + error, false)
    }
    this.getCropsBySelectedBlocks()
    this.loaderActive = false
  },
  computed: {
    ...mapGetters({
      getProvinciaText: 'locations/getProvinciaText',
      getCantonText: 'locations/getCantonText',
      getDistritoText: 'locations/getDistritoText',
      getProductTypeText: 'productTypes/getProductTypeText',
      getBlockText: 'blocks/getBlockText'
    }),
    currentFarm() {
      return this.$store.getters['farms/getFarm'](this.$route.params.id)
    },
    blocks() {
      return this.$store.getters['blocks/farmBlocks']
    },
    currentClient() {
      return this.$store.getters['clients/getClient'](this.$route.query.client)
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
    productTypes() {
      return this.$store.getters['productTypes/productTypes']
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
    nextStep(n) {
      if (n === this.steps) {
        this.currentApplicationNumber = 1
      } else {
        this.currentApplicationNumber = n + 1
      }
    },
    openBlockDialog() {
      this.blockDialog = true
      this.isEdition = false
      this.block = {
        name: '',
        area: ''
      }
    },

    closeBlockDialog() {
      this.blockDialog = false
      this.$refs.observer.reset()
    },

    openDeleteBlockDialog(data) {
      this.deleteBlockDialog = true
      this.block = data
    },

    closeDeleteBlockDialog() {
      this.deleteBlockDialog = false
      this.block = null
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

    openCreateCropDialog() {
      this.cropDialog = true
      this.isEdition = false
      this.crop = {
        type: 1,
        sowDate: '',
        harvestDate: '',
        aplications: [],
        cycle: '',
        blockId: ''
      }
      this.selectedBlock = ''
    },

    openUpdateCropDialog(data) {
      // If we do: "this.block = data" we get a vuex error because we're using the same reference
      // Vuex - Do not mutate vuex store state outside mutation handlers
      this.crop.id = data.id
      this.crop.type = data.type
      this.crop.sowDate = data.sowDate
      this.crop.harvestDate = data.harvestDate
      this.crop.cycle = data.cycle
      this.crop.aplications = data.aplications
      this.crop.blockId = data.blockId
      this.crop.farmId = data.farmId
      this.isEdition = true
      this.cropDialog = true
      this.selectedBlock = data.blockId
    },

    closeCropDialog() {
      this.cropDialog = false
      this.$refs.observer.reset()
    },

    openDeleteCropDialog(data) {
      this.deleteCropDialog = true
      this.crop = data
    },

    closeDeleteCropDialog() {
      this.deleteCropDialog = false
      this.crop = {
        type: 1,
        sowDate: new Date().toISOString().substr(0, 10),
        harvestDate: new Date().toISOString().substr(0, 10),
        cycle: ''
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
            area: this.block.area
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
        .delete()
        .then(() => {
          this.activateSnackbar('Bloque borrado.', true)
          this.loaderActive = false
        })
        .catch(error => {
          console.error('Error borrando el bloque: ', error)
          this.activateSnackbar('Borrando el bloque', false)
          this.loaderActive = false
        })
      this.$fetch()
      this.deleteBlockDialog = false
    },

    async createCrop() {
      const isValid = await this.$refs.observer.validate()

      if (isValid) {
        this.loaderActive = true
        await this.$fire.firestore
          .collection('crops')
          .add({
            type: this.crop.type,
            sowDate: this.crop.sowDate,
            harvestDate: this.crop.harvestDate,
            aplications: [],
            cycle: this.crop.cycle,
            blockId: this.selectedBlock,
            farmId: this.currentFarm.id
          })
          .then(() => {
            this.activateSnackbar('Cultivo creado.', true)
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
            blockId: this.selectedBlock,
            farmId: this.currentFarm.id
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
        this.cropDialog = false
        this.$refs.observer.reset()
      }
    },

    async deleteCrop() {
      this.loaderActive = true
      await this.$fire.firestore
        .collection('crops')
        .doc(this.crop.id)
        .delete()
        .then(() => {
          this.activateSnackbar('Cultivo borrado.', true)
          this.loaderActive = false
        })
        .catch(error => {
          console.error('Error borrando el cultivo: ', error)
          this.activateSnackbar('Borrando el cultivo', false)
          this.loaderActive = false
        })
      this.$fetch()
      this.deleteCropDialog = false
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

    onBlocksRowClicked(row) {
      if (this.selectedBlocks.includes(row.id)) {
        this.selectedBlocks = this.selectedBlocks.filter(
          selectedKeyID => selectedKeyID !== row.id
        )
      } else {
        this.selectedBlocks.push(row.id)
      }
      this.getCropsBySelectedBlocks()
    },

    onCropsRowClicked(row) {
      this.selectedCropForApplications = row.id
      console.log(this.selectedCropForApplications)
    },

    getCropsBySelectedBlocks() {
      const tempSelectedCrops = []
      this.selectedCrops = [] //We reset the crops
      this.selectedBlocks.forEach(block => {
        tempSelectedCrops.push(
          this.$store.getters['crops/getCropsByBlock'](block)
        )
      })
      this.selectedCrops = tempSelectedCrops.flat()
    }
  }
}
</script>
