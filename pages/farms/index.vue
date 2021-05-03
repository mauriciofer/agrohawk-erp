<template>
  <div>
    <h1 class="ma-10">Fincas</h1>

    <!-- farms -->

    <!-- Dialog to create/modify farm -->

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
              isEdition ? "Editar finca" : "Agregar finca"
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
                      @change="$fetch()"
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
              </v-row>
              <v-row>
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
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <v-divider></v-divider>
                  <v-subheader
                    >Cultivos
                    <v-spacer></v-spacer>
                    <v-icon
                      large
                      class="mr-2"
                      color="primary"
                      @click="openAddCropDialog()"
                    >
                      mdi-plus-circle
                    </v-icon>
                  </v-subheader>
                  <v-simple-table>
                    <template v-slot:default>
                      <thead>
                        <tr>
                          <th class="text-left">
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
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="item in addedCrops" :key="item.id">
                          <td>{{ getCropTypeText(item.type) }}</td>
                          <td>{{ item.startDate }}</td>
                          <td>{{ item.harvestDate }}</td>
                          <td>{{ item.cycle }}</td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
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

    <!-- Dialog to create/modify crop -->

    <ValidationObserver ref="observer" v-slot="{ invalid }" tag="form">
      <v-dialog v-model="addCropDialog" persistent max-width="70%">
        <v-card>
          <v-card-title>
            <span class="headline">{{
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
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="3">
                  <ValidationProvider
                    v-slot="{ errors }"
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
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <ValidationProvider
                    v-slot="{ errors }"
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
              >Cerrar</v-btn
            >
            <v-btn
              color="blue darken-1"
              text
              @click="addCrop()"
              v-if="!isEdition"
              :disabled="invalid"
              >Agregar</v-btn
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
          {{ getFarmStateTypeText(item.state) }}
        </template>
        <template v-slot:[`item.provincia`]="{ item }">
          {{ getProvinciaText(item.provincia) }}
        </template>
        <template v-slot:[`item.canton`]="{ item }">
          {{ getCantonText(item.canton) }}
        </template>
      </v-data-table>
      <!-- End farms table -->
    </v-card>
    <!-- End farms -->

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
    <v-overlay :value="loaderActive" :z-index="203">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
export default {
  name: "Farms",
  data: () => ({
    farmDialog: false,
    addCropDialog: false,
    deleteFarmDialog: false,
    currentFarm: null,
    currentCantones: [],
    currentDistritos: [],
    farm: {
      name: "",
      area: "",
      provincia: "",
      canton: "",
      distrito: "",
      address: "",
      state: 1,
    },
    stateTypeList: [
      { text: "Activo", value: 1 },
      { text: "Inactivo", value: 2 },
    ],

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

      { text: "Estado", align: "start", value: "state", sortable: false },
      { text: "Acciones", value: "actions", sortable: false },
    ],
    farmsTableSearch: "",
    currentModules: [],
    isEdition: false,
    snackbar: false,
    snackbarText: "",
    snackbarTimeout: 2000,
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
  }),
  async fetch() {
    this.loaderActive = true;
    try {
      await this.$store.dispatch("farm/getFarms");
      await this.$store.dispatch("crops/getCrops");
    } catch (error) {
      console.log(error);
      this.activateSnackbar("Obteniendo la información " + error, false);
    }

    this.loaderActive = false;
  },
  computed: {
    provincias(){
      return this.$store.getters['locations/provincias'];
    },
    cantones(){
      return this.$store.getters['locations/cantones'];
    },
    distritos(){
      return this.$store.getters['locations/distritos'];
    },
    farms() {
      return this.$store.getters["farm/farms"];
    },
    crops() {
      return this.$store.getters["crops/crops"];
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
      this.$fetch();
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
    },

    closefarmDialog() {
      this.farmDialog = false;
      this.$refs.observer.reset();
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
    },

    closeAddCropDialog() {
      this.addCropDialog = false;
      this.$refs.observer.reset();
    },

    closeDeleteFarmDialog() {
      this.deleteFarmDialog = false;
      this.currentFarm = null;
    },

    closeFarmDialog() {
      this.farmDialog = false;
      this.$refs.observer.reset();
    },

    async createFarm() {
      const isValid = await this.$refs.observer.validate();

      if (isValid) {
        this.loaderActive = true;
        this.$fire.firestore
          .collection("farms")
          .add({
            name: this.farm.name,
            area: this.farm.area,
            provincia: this.farm.provincia,
            canton: this.farm.canton,
            distrito: this.farm.distrito,
            address: this.farm.address,
            state: this.farm.state,
          })
          .then(() => {
            this.activateSnackbar("Finca creada correctamente", true);
            this.$fetch();
            this.farmDialog = false;
            this.$refs.observer.reset();
          })
          .catch((error) => {
            console.error(error);
            this.activateSnackbar("Error creando finca", false);
            this.loaderActive = false;
          });
      }
    },

    openUpdateFarmDialog(data) {
      this.currentFarm = data;
      this.isEdition = true;
      this.farmDialog = true;
      this.farm = {
        name: data.name,
        area: data.area,
        provincia: data.provincia,
        canton: data.canton,
        distrito: data.distrito,
        address: data.address,
        state: data.state,
      };
      this.onProvinciaChange()
      this.onCantonChange()
    },

    async updateFarm() {
      const isValid = await this.$refs.observer.validate();

      if (isValid) {
        this.loaderActive = true;
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
            state: this.farm.state,
          })
          .then(() => {
            this.$fetch();
            this.farmDialog = false;
            this.$refs.observer.reset();
            this.activateSnackbar("Finca modificada correctamente", true);
          })
          .catch((error) => {
            console.error(error);
            this.activateSnackbar("Error modificando finca", false);
            this.loaderActive = false;
          });
      }
    },

    async deleteFarm() {
      this.loaderActive = true;
      await this.$fire.firestore
        .collection("farms")
        .doc(this.currentFarm.id)
        .delete()
        .then(() => {
          this.activateSnackbar("Finca borrada correctamente", true);
          this.$fetch();
          this.deleteFarmDialog = false;
        })
        .catch((error) => {
          console.error(error);
          this.loaderActive = false;
          this.activateSnackbar("Error borrando finca", false);
        });
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
    }
  },
};
</script>
