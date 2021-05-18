<template>
  <div>
    <h1 class="ma-10">Fincas</h1>

    <!-- farms -->

    <!-- Dialog to create/modify farm -->

<<<<<<< HEAD
    <ValidationObserver ref="observer" v-slot="{ invalid }" tag="form" @submit.prevent="submit()">
=======
    <ValidationObserver
      ref="observer"
      v-slot="{ invalid }"
      tag="form"
      @submit.prevent="submit()"
    >
>>>>>>> develop
      <v-dialog v-model="farmDialog" persistent max-width="70%">
        <v-card>
          <v-card-title>
            <span class="headline">{{
              isEdition ? "Editar finca" : "Agregar finca"
            }}</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
<<<<<<< HEAD
=======
                <v-col cols="12" sm="6" md="6">
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
                  ></v-autocomplete>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <span class="headline">{{selectedClient ? selectedClient.firstName : ''}} {{selectedClient ? selectedClient.firstLastname : ''}}</span>
                </v-col>
              </v-row>
              <v-row>
>>>>>>> develop
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
<<<<<<< HEAD
                  <v-text-field
                    label="Area*"
                    v-model="farm.area"
                    :type="'number'"
                    hint="Ingrese el area en metros cuadrados"
                    required
                    :error-messages="errors"
                  ></v-text-field>
                  </ValidationProvider>
                </v-col>


=======
                    <v-text-field
                      label="Area*"
                      v-model="farm.area"
                      :type="'number'"
                      hint="Ingrese el area en metros cuadrados"
                      required
                      :error-messages="errors"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>

>>>>>>> develop
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
<<<<<<< HEAD
                      @change="$fetch()"
=======
                      @change="onProvinciaChange()"
>>>>>>> develop
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
<<<<<<< HEAD
                      :items="cantones"
=======
                      :items="currentCantones"
>>>>>>> develop
                      item-text="canton"
                      item-value="id"
                      :error-messages="errors"
                      label="Cantones *"
                      v-model="farm.canton"
<<<<<<< HEAD
                      @change="$fetch()"
=======
                      @change="onCantonChange()"
>>>>>>> develop
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
<<<<<<< HEAD
                      :items="distritos"
=======
                      :items="currentDistritos"
>>>>>>> develop
                      item-text="distrito"
                      item-value="id"
                      :error-messages="errors"
                      label="Distritos *"
                      v-model="farm.distrito"
<<<<<<< HEAD
                      @change="$fetch()"
=======
>>>>>>> develop
                    ></v-select>
                  </ValidationProvider>
                </v-col>

                <v-col cols="12" sm="6" md="3">
<<<<<<< HEAD
                  <ValidationProvider v-slot="{ errors }" name="Dirección" rules="required">
=======
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="Dirección"
                    rules="required"
                  >
>>>>>>> develop
                    <v-text-field
                      label="Dirección *"
                      v-model="farm.address"
                      :error-messages="errors"
                      required
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
<<<<<<< HEAD


              </v-row>
              <v-row>
                
                <v-col cols="12" sm="6" md="3">
                  <ValidationProvider v-slot="{ errors }" name="Estado" rules="required">
=======
                <v-col cols="12" sm="6" md="3">
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="Estado"
                    rules="required"
                  >
>>>>>>> develop
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
<<<<<<< HEAD

=======
>>>>>>> develop
              </v-row>
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <v-divider></v-divider>
<<<<<<< HEAD
                  <v-subheader>Cultivos 
                    <v-spacer></v-spacer>
                    <v-icon large class="mr-2" color="primary" @click="openAddCropDialog()">
=======
                  <v-subheader
                    >Cultivos
                    <v-spacer></v-spacer>
                    <v-icon
                      large
                      class="mr-2"
                      color="primary"
                      @click="openAddCropDialog()"
                    >
>>>>>>> develop
                      mdi-plus-circle
                    </v-icon>
                  </v-subheader>
                  <v-simple-table>
                    <template v-slot:default>
                      <thead>
                        <tr>
                          <th class="text-left">
<<<<<<< HEAD
                            Módulo
                          </th>
                          <th class="text-left">
                            Lectura
                          </th>
                          <th class="text-left">
                            Escritura
                          </th>
                          <th class="text-left">
                            Escritura
=======
                            Tipo de cultivo
                          </th>
                          <th class="text-left">
                            Fecha de inicio
                          </th>
                          <th class="text-left">
                            Fecha de cosecha
                          </th>
                          <th class="text-left">
                            Ciclo de cultivo
>>>>>>> develop
                          </th>
                        </tr>
                      </thead>
                      <tbody>
<<<<<<< HEAD
                        <tr v-for="item in currentModules" :key="item.name">
                          <td>{{ item.displayName }}</td>
                          <td>
                            <v-icon small class="mr-2" v-if="item.read">
                              mdi-check
                            </v-icon>
                            <v-icon small class="mr-2" v-if="!item.read"
                              >> mdi-close
                            </v-icon>
                          </td>
                          <td>
                            <v-icon small class="mr-2" v-if="item.write">
                              mdi-check
                            </v-icon>
                            <v-icon small class="mr-2" v-if="!item.write"
                              >> mdi-close
                            </v-icon>
                          </td>
=======
                        <tr v-for="item in addedCrops" :key="item.id">
                          <td>{{ getCropTypeText(item.type) }}</td>
                          <td>{{ item.startDate }}</td>
                          <td>{{ item.harvestDate }}</td>
                          <td>{{ item.cycle }}</td>
>>>>>>> develop
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </v-col>
              </v-row>
<<<<<<< HEAD
              
            </v-container>
            <small>*campos requeridos</small><br />
          </v-card-text>
          
=======
            </v-container>
            <small>*campos requeridos</small><br />
          </v-card-text>

>>>>>>> develop
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeFarmDialog()"
              >Cerrar</v-btn
            >
            <v-btn
              color="blue darken-1"
              text
              @click="createFarm()"
              v-if="!isEdition"
              :disabled="invalid"
              >Crear</v-btn
            >
            <v-btn
              color="blue darken-1"
              text
              @click="updateFarm()"
              v-if="isEdition"
              :disabled="invalid"
              >Modificar</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </ValidationObserver>
    <!-- End dialog to create/modify farm -->
<<<<<<< HEAD
    
=======

>>>>>>> develop
    <!-- Dialog to create/modify crop -->

    <ValidationObserver ref="observer" v-slot="{ invalid }" tag="form">
      <v-dialog v-model="addCropDialog" persistent max-width="70%">
        <v-card>
          <v-card-title>
            <span class="headline">{{
<<<<<<< HEAD
              isEdition ? "Editar finca" : "Agregar finca"
            }}</span>
=======
              isEdition ? "Editar finca" : "Agregar cultivo"
            }}</span>
            <v-spacer></v-spacer>
            <v-autocomplete
              v-model="selectedCrop"
              :items="crops"
              no-data-text="No hay datos"
              clearable
              prepend-icon="mdi-magnify"
              item-text="cycle"
              item-value="id"
              placeholder="Escriba para buscar cultivos"
              @change="onCropChange($event)"
            ></v-autocomplete>
>>>>>>> develop
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="3">
                  <ValidationProvider
                    v-slot="{ errors }"
<<<<<<< HEAD
                    name="Nombre Finca"
                    rules="required"
                  >
                    <v-text-field
                      label="Nombre Finca*"
                      v-model="farm.farmName"
                      required
                      :error-messages="errors"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field
                    label="Area"
                    v-model="farm.farmArea"
                    :type="'number'"
                    required
                  ></v-text-field>
=======
                    name="Tipo de cultivo"
                    rules="required"
                  >
                    <v-select
                      text="text"
                      :items="cropTypeList"
                      v-model="selectedCrop.type"
                      name="type"
                      label="Tipo de cultivo *"
                      :error-messages="errors"
                      required
                    ></v-select>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-dialog
                    ref="startDateDialog"
                    v-model="selectedCrop.startDateModal"
                    :return-value.sync="selectedCrop.startDate"
                    persistent
                    width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <ValidationProvider
                        v-slot="{ errors }"
                        name="Fecha de inicio"
                        rules="required"
                      >
                        <v-text-field
                          v-model="selectedCrop.startDate"
                          label="Fecha de inicio *"
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
                      v-model="selectedCrop.startDate"
                      scrollable
                      locale="es-ES"
                    >
                      <v-spacer></v-spacer>
                      <v-btn
                        text
                        color="primary"
                        @click="startDateModal = false"
                      >
                        Cancelar
                      </v-btn>
                      <v-btn
                        text
                        color="primary"
                        @click="
                          $refs.startDateDialog.save(selectedCrop.startDate)
                        "
                      >
                        Guardar
                      </v-btn>
                    </v-date-picker>
                  </v-dialog>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-dialog
                    ref="harvestDateDialog"
                    v-model="harvestDateModal"
                    :return-value.sync="selectedCrop.harvestDate"
                    persistent
                    width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <ValidationProvider
                        v-slot="{ errors }"
                        name="Fecha de cosecha"
                        rules="required"
                      >
                        <v-text-field
                          v-model="selectedCrop.harvestDate"
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
                      v-model="selectedCrop.harvestDate"
                      scrollable
                      locale="es-ES"
                    >
                      <v-spacer></v-spacer>
                      <v-btn
                        text
                        color="primary"
                        @click="harvestDateModal = false"
                      >
                        Cancelar
                      </v-btn>
                      <v-btn
                        text
                        color="primary"
                        @click="
                          $refs.harvestDateDialog.save(selectedCrop.harvestDate)
                        "
                      >
                        Guardar
                      </v-btn>
                    </v-date-picker>
                  </v-dialog>
>>>>>>> develop
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <ValidationProvider
                    v-slot="{ errors }"
<<<<<<< HEAD
                    name="Tamaño"
                    rules="required"
                  >
                    <v-text-field
                      label="Tamaño *"
                      v-model="farm.farmSize"
                      :type="'number'"
                      required
                      :error-messages="errors"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field
                    label="Ubicacion"
                    v-model="farm.farmLocation"
                    :type="'number'"
                    required
                  ></v-text-field>
                </v-col>

              </v-row>
              <v-row>
                
                <v-col cols="12" sm="6" md="3">
                  <ValidationProvider v-slot="{ errors }" name="Estado" rules="required">
                    <v-select
                      text="text"
                      :items="stateTypeList"
                      v-model="farm.farmState"
                      name="farmState"
                      label="Estado finca"
                      :error-messages="errors"
                      required
                    ></v-select>
                  </ValidationProvider>
                </v-col>

              </v-row>
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <v-divider></v-divider>
                  <v-subheader>Cultivos 
                    <v-spacer></v-spacer>
                    <v-icon large class="mr-2" color="primary" @click="addCrop()">
                      mdi-plus-circle
                    </v-icon>
                  </v-subheader>
                  <v-simple-table>
                    <template v-slot:default>
                      <thead>
                        <tr>
                          <th class="text-left">
                            Módulo
                          </th>
                          <th class="text-left">
                            Lectura
                          </th>
                          <th class="text-left">
                            Escritura
                          </th>
                          <th class="text-left">
                            Escritura
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="item in currentModules" :key="item.name">
                          <td>{{ item.displayName }}</td>
                          <td>
                            <v-icon small class="mr-2" v-if="item.read">
                              mdi-check
                            </v-icon>
                            <v-icon small class="mr-2" v-if="!item.read"
                              >> mdi-close
                            </v-icon>
                          </td>
                          <td>
                            <v-icon small class="mr-2" v-if="item.write">
                              mdi-check
                            </v-icon>
                            <v-icon small class="mr-2" v-if="!item.write"
                              >> mdi-close
                            </v-icon>
                          </td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </v-col>
              </v-row>
              
            </v-container>
            <small>*campos requeridos</small><br />
            <small
              >** Debe contener 1 mayúscula, 1 minúscula, 1 caracter especial y
              al menos un largo de 8 caracteres</small
            >
          </v-card-text>
          
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closefarmDialog()"
=======
                    name="Ciclo"
                    rules="required"
                  >
                    <v-text-field
                      label="Ciclo de cultivo *"
                      v-model="selectedCrop.cycle"
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
            <v-btn color="blue darken-1" text @click="closeAddCropDialog()"
>>>>>>> develop
              >Cerrar</v-btn
            >
            <v-btn
              color="blue darken-1"
              text
<<<<<<< HEAD
              @click="createFarm()"
              v-if="!isEdition"
              :disabled="invalid"
              >Crear</v-btn
            >
            <v-btn
              color="blue darken-1"
              text
              @click="updateFarm()"
              v-if="isEdition"
              :disabled="invalid"
              >Modificar</v-btn
=======
              @click="addCrop()"
              v-if="!isEdition"
              :disabled="invalid"
              >Agregar</v-btn
>>>>>>> develop
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </ValidationObserver>
    <!-- End dialog to create/modify crop -->

    <!-- Dialog to confirm deletion -->
    <v-dialog v-model="deleteFarmDialog" persistent max-width="50%">
      <v-card>
        <v-card-title class="headline"
          >¿Esta segur@ que desea eliminar la finca?</v-card-title
        >
        <v-card-text>Esta acción no puede ser revertida</v-card-text>
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

    <v-card class="ma-10" elevation="2" outlined>
      <!-- farms table -->
      <v-data-table
        :headers="filteredHeaders"
        :items="farms"
        :items-per-page="5"
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
            <v-btn
              absolute
              right
              tile
              color="primary"
              @click="openCreateFarmDialog()"
              v-if="isEditor"
            >
              <v-icon left>mdi-plus</v-icon>Agregar</v-btn
            >
          </v-toolbar>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="openUpdateFarmDialog(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="openDeleteFarmDialog(item)">
            mdi-delete
          </v-icon>
        </template>
        <template v-slot:[`item.state`]="{ item }">
<<<<<<< HEAD
          {{getFarmStateTypeText(item.state)}}
        </template>
        <template v-slot:[`item.provincia`]="{ item }">
          {{getProvinciaText(item.provincia)}}
        </template>
        <template v-slot:[`item.canton`]="{ item }">
          {{getCantonText(item.canton)}}
        </template>
        
=======
          {{ getFarmStateTypeText(item.state) }}
        </template>
        <template v-slot:[`item.provincia`]="{ item }">
          {{ getProvinciaText(item.provincia) }}
        </template>
        <template v-slot:[`item.canton`]="{ item }">
          {{ getCantonText(item.canton) }}
        </template>
>>>>>>> develop
      </v-data-table>
      <!-- End farms table -->
    </v-card>
    <!-- End farms -->

<<<<<<< HEAD
    <!-- Snackbars -->
    <v-snackbar
      v-model="snackbar"
      :timeout="snackbarTimeout"
      :color="actionSuccess ? 'success' : 'error'"
    >
      {{ snackbarText }}
      <template v-slot:action="{ attrs }">
        <v-btn icon v-bind="attrs" @click="successSnackbar = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
=======
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
          <v-btn
            icon
            @click="snackbar.visible = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
      </v-layout>
    </v-snackbar>
    <!-- End Snackbar -->
>>>>>>> develop
    <v-overlay :value="loaderActive" :z-index="203">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </div>
</template>

<<<<<<< HEAD

=======
>>>>>>> develop
<script>
export default {
  name: "Farms",
  data: () => ({
    farmDialog: false,
    addCropDialog: false,
    deleteFarmDialog: false,
    currentFarm: null,
<<<<<<< HEAD
=======
    currentCantones: [],
    currentDistritos: [],
>>>>>>> develop
    farm: {
      name: "",
      area: "",
      provincia: "",
      canton: "",
      distrito: "",
      address: "",
      state: 1,
<<<<<<< HEAD
=======
      clientId: ""
>>>>>>> develop
    },
    stateTypeList: [
      { text: "Activo", value: 1 },
      { text: "Inactivo", value: 2 },
    ],
<<<<<<< HEAD

=======
>>>>>>> develop
    farmsTableHeaders: [
      {
        text: "Finca",
        align: "start",
        value: "name",
      },
      { text: "Area", value: "area" },
      { text: "Provincia", value: "provincia" },
      { text: "Cantón", value: "canton" },
      { text: "Distrito", value: "distrito" },
      { text: "Dirección", value: "address" },
<<<<<<< HEAD
      
      { text: "Estado",align: "start", value: "state", sortable: false },
=======

      { text: "Estado", align: "start", value: "state", sortable: false },
>>>>>>> develop
      { text: "Acciones", value: "actions", sortable: false },
    ],
    farmsTableSearch: "",
    currentModules: [],
    isEdition: false,
<<<<<<< HEAD
    snackbar: false,
    snackbarText: "",
    snackbarTimeout: 2000,
    actionSuccess: false,
    loaderActive: false,
    
=======
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
    //Crops
    selectedCrop: {},
    cropTypeList: [
      { text: "Lechuga", value: 1 }, //TODO: implement a croptype module CRUD
      { text: "Chayote", value: 2 },
    ],
    startDateMenu: false,
    startDateModal: false,
    harvestDateMenu: false,
    harvestDateModal: false,
    addedCrops: [],
    selectedClient: {}
>>>>>>> develop
  }),
  async fetch() {
    this.loaderActive = true;
    try {
<<<<<<< HEAD
      
      await this.$store.dispatch('locations/getProvincias');
      await this.$store.dispatch('locations/getCantones', {
        provinciaId: this.farm.provincia
      });
      await this.$store.dispatch('locations/getDistritos', {
        cantonId: this.farm.canton
      });
      await this.$store.dispatch('farm/getFarms');


    } catch (error) {
      console.log(error)
=======
      await this.$store.dispatch("farm/getFarms");
      await this.$store.dispatch("crops/getCrops");
    } catch (error) {
      console.log(error);
>>>>>>> develop
      this.activateSnackbar("Obteniendo la información " + error, false);
    }

    this.loaderActive = false;
<<<<<<< HEAD
    },
  computed:{

=======
  },
  computed: {
>>>>>>> develop
    provincias(){
      return this.$store.getters['locations/provincias'];
    },
    cantones(){
      return this.$store.getters['locations/cantones'];
    },
    distritos(){
      return this.$store.getters['locations/distritos'];
<<<<<<< HEAD
    },      
      farms(){
        return this.$store.getters['farm/farms'];
      },
    isEditor(){
      const filteredModules = (this.$store.getters['authentication/currentUser'].modules) ? this.$store.getters['authentication/currentUser'].modules.filter(
        (item) => {
        return item.read && item.write;
      }) : [];
      return JSON.stringify(filteredModules).includes("farms");
    },
    filteredHeaders(){
      const readerHeaders = this.farmsTableHeaders.slice(
        0, 
        this.farmsTableHeaders.length - 1);
      return (this.isEditor) ? this.farmsTableHeaders : readerHeaders
    },      

    },
  methods: {
    openCreateFarmDialog() {
      this.$fetch();     
=======
    },
    farms() {
      return this.$store.getters["farm/farms"];
    },
    crops() {
      return this.$store.getters["crops/crops"];
    },
    clients() {
      return this.$store.getters["clients/clients"];
    },
    isEditor() {
      const filteredModules = this.$store.getters["authentication/currentUser"]
        .modules
        ? this.$store.getters["authentication/currentUser"].modules.filter(
            (item) => {
              return item.read && item.write;
            }
          )
        : [];
      return JSON.stringify(filteredModules).includes("farms");
    },
    filteredHeaders() {
      const readerHeaders = this.farmsTableHeaders.slice(
        0,
        this.farmsTableHeaders.length - 1
      );
      return this.isEditor ? this.farmsTableHeaders : readerHeaders;
    },
  },
  methods: {
    openCreateFarmDialog() {
>>>>>>> develop
      this.farmDialog = true;
      this.isEdition = false;
      this.currentModules = [];
      this.farm = {
        name: "",
        area: "",
        provincia: "",
        canton: "",
        distrito: "",
        address: "",
        state: 1,
      };
<<<<<<< HEAD
    },  

    closefarmDialog() {
      this.farmDialog = false;
      this.$refs.observer.reset();
=======
>>>>>>> develop
    },

    openDeleteFarmDialog(data) {
      this.deleteFarmDialog = true;
      this.currentFarm = data;
    },

    openAddCropDialog() {
      this.addCropDialog = true;
      this.isEdition = false;
      this.isPasswordChange = true;
      this.currentModules = [];
      this.farm = {
        farmName: "",
        farmArea: "",
        farmSize: "",
        farmLocation: "",
        farmState: 1,
      };
<<<<<<< HEAD
    },  
=======
    },

    closeAddCropDialog() {
      this.addCropDialog = false;
      this.$refs.observer.reset();
    },
>>>>>>> develop

    closeDeleteFarmDialog() {
      this.deleteFarmDialog = false;
      this.currentFarm = null;
    },

    closeFarmDialog() {
      this.farmDialog = false;
<<<<<<< HEAD
      this.$refs.observer.reset();
    },


    async createFarm() {
      const isValid = await this.$refs.observer.validate();

      if (isValid) {
        this.loaderActive = true;
        this.$fire.firestore
          .collection("farms")   
=======
      this.selectedClient = null;
      this.$refs.observer.reset();
    },

    async createFarm() {
      if(!this.selectedClient){
        this.activateSnackbar("Seleccione un Cliente", false);
        return false;
      }

      const isValid = await this.$refs.observer.validate();
      if (isValid) {
        this.loaderActive = true;

        this.$fire.firestore
          .collection("farms")
>>>>>>> develop
          .add({
            name: this.farm.name,
            area: this.farm.area,
            provincia: this.farm.provincia,
            canton: this.farm.canton,
            distrito: this.farm.distrito,
            address: this.farm.address,
<<<<<<< HEAD
            state: this.farm.state
          })
          .then(() => {
            this.activateSnackbar("Finca creada correctamente", true);
            this.$fetch()
            this.farmDialog = false;
            this.$refs.observer.reset();
          })
          .catch((error) => {
            console.error(error);
            this.activateSnackbar("Error creando finca", false);
            this.loaderActive = false;
          });
=======
            state: this.farm.state,
            clientId: this.selectedClient.id
          })
          .then(() => {
            this.activateSnackbar("Finca creada correctamente", true);

            this.$fetch();

            this.$refs.observer.reset();
            this.farmDialog = false;
          })
          .catch((error) => {
            console.error(error);

            this.activateSnackbar("Error creando finca", false);
          });
        
        this.loaderActive = false;
>>>>>>> develop
      }
    },

    openUpdateFarmDialog(data) {
<<<<<<< HEAD
      this.$fetch();

      this.currentFarm = data;
=======
      this.currentFarm = data;

      this.onClientChange(data.clientId);

>>>>>>> develop
      this.isEdition = true;
      this.farmDialog = true;
      this.farm = {
        name: data.name,
        area: data.area,
        provincia: data.provincia,
        canton: data.canton,
        distrito: data.distrito,
        address: data.address,
<<<<<<< HEAD
        state: data.state
      };

    },    

    async updateFarm() {
      const isValid = await this.$refs.observer.validate();

      if (isValid) {
        this.loaderActive = true;
=======
        state: data.state,
        clientId: data.clientId
      };
      this.onProvinciaChange()
      this.onCantonChange()
    },

    async updateFarm() {
      if(!this.selectedClient){
        this.activateSnackbar("Seleccione un Cliente", false);
        return false;
      }

      const isValid = await this.$refs.observer.validate();
      if (isValid) {
        this.loaderActive = true;

>>>>>>> develop
        this.$fire.firestore
          .collection("farms")
          .doc(this.currentFarm.id)
          .update({
            name: this.farm.name,
            area: this.farm.area,
            provincia: this.farm.provincia,
            canton: this.farm.canton,
            distrito: this.farm.distrito,
            address: this.farm.address,
<<<<<<< HEAD
            state: this.farm.state
          })
          .then(() => {
            this.$fetch()
            this.farmDialog = false;
            this.$refs.observer.reset();
            this.activateSnackbar("Finca modificada correctamente", true);
          })
          .catch((error) => {
            console.error(error);
            this.activateSnackbar("Error modificando finca", false);
            this.loaderActive = false;
          });
=======
            state: this.farm.state,
            clientId: this.selectedClient.id
          })
          .then(() => {
            this.activateSnackbar("Finca modificada correctamente", true);

            this.$refs.observer.reset();
            this.$fetch();

            this.farmDialog = false;
          })
          .catch((error) => {
            console.error(error);

            this.activateSnackbar("Error modificando finca", false);
          });

        this.loaderActive = false;
>>>>>>> develop
      }
    },

    async deleteFarm() {
      this.loaderActive = true;
<<<<<<< HEAD
=======

>>>>>>> develop
      await this.$fire.firestore
        .collection("farms")
        .doc(this.currentFarm.id)
        .delete()
        .then(() => {
          this.activateSnackbar("Finca borrada correctamente", true);
<<<<<<< HEAD
          this.$fetch();
          this.deleteFarmDialog = false;
        })
        .catch((error) => {  
          console.error(error);
          this.loaderActive = false;
          this.activateSnackbar("Error borrando finca", false);
        });
    },    

    
    getFarmStateTypeText(type){
      return this.stateTypeList.filter((item) =>{
        return item.value == type;
        })[0].text;

      },
    getProvinciaText(id){
      return this.provincias.filter((item) =>{
        return item.id == id; 
        })[0].name;

      },
    getCantonText(id){
      return this.cantones.filter((item) =>{
        return item.id == id; 
        })[0];
      },



         

  },

};
</script>

=======

          this.selectedClient = null;
          this.$fetch();

          this.deleteFarmDialog = false;
        })
        .catch((error) => {
          console.error(error);

          this.activateSnackbar("Error borrando finca", false);
        });

      this.loaderActive = false;
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

    onCropChange(id) {
      const currentCrop = this.crops.filter((item) => {
        return item.id == id.toString();
      })[0];
      this.selectedCrop = currentCrop;
    },

    getCropTypeText(type) {
      return this.cropTypeList.filter((item) => {
        return item.value == type;
      })[0].text;
    },

    addCrop() {
      this.addedCrops.push(this.selectedCrop);
      this.selectedCrop = {};
      this.closeAddCropDialog();
    },

    getFarmStateTypeText(type) {
      return this.stateTypeList.filter((item) => {
        return item.value == type;
      })[0].text;
    },

    getProvinciaText(id) {
      return this.provincias.filter((item) => {
        return item.id == id;
      })[0].name;
    },

    getCantonText(id) {
      return this.cantones.filter((item) => {
        return item.id == id;
      })[0].name;
    },

    onProvinciaChange() {
      this.currentDistritos = []
      this.currentCantones = this.cantones.filter(canton => canton.provincia === this.farm.provincia)
    },

    onCantonChange() {
      this.currentDistritos = this.distritos.filter(distrito => distrito.canton === this.farm.canton)
    },

    onClientChange(id) {
      if(id){
        const currentClient = this.clients.filter((item) => {
          return item.id == id.toString();
        })[0];
        this.selectedClient = currentClient;
      } else {
        this.selectedClient = null;
      }
    }
  },
};
</script>
>>>>>>> develop
