<template>
  <div>
    <h1 class="ma-10">Fincas</h1>

    <!-- farms -->

    <!-- Dialog to create/modify farm -->

    <ValidationObserver ref="observer" v-slot="{ invalid }" tag="form" @submit.prevent="submit()">
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
                      @change="getCantones($event)"
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
                      :items="cantones"
                      item-text="canton"
                      item-value="id"
                      :error-messages="errors"
                      label="Cantones *"
                      v-model="farm.canton"
                      @change="getDistritos($event)"
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
                      :items="distritos"
                      item-text="distrito"
                      item-value="id"
                      :error-messages="errors"
                      label="Distritos *"
                      v-model="farm.distrito"
                    ></v-select>
                  </ValidationProvider>
                </v-col>

                <v-col cols="12" sm="6" md="3">
                  <ValidationProvider v-slot="{ errors }" name="Dirección" rules="required">
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
                  <ValidationProvider v-slot="{ errors }" name="Estado" rules="required">
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
                  <v-subheader>Cultivos 
                    <v-spacer></v-spacer>
                    <v-icon large class="mr-2" color="primary" @click="openAddCropDialog()">
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
              isEdition ? "Editar finca" : "Agregar finca"
            }}</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="3">
                  <ValidationProvider
                    v-slot="{ errors }"
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
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <ValidationProvider
                    v-slot="{ errors }"
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
        :headers="farmsTableHeaders"
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
      { text: "Canton", value: "canton" },
      { text: "Distrito", value: "distrito" },
      { text: "Address", value: "address" },
      
      { text: "Estado", value: "state" },
      { text: "Acciones", value: "actions", sortable: false },
    ],
    farmsTableSearch: "",
    currentModules: [],
    provincias: [],
    cantones: [],
    distritos: [],
    isEdition: false,
    snackbar: false,
    snackbarText: "",
    snackbarTimeout: 2000,
    actionSuccess: false,
    loaderActive: false,
  }),
  async fetch() {
    this.loaderActive = true;
    try {
      await this.$store.dispatch('farm/getFarms');
    } catch (error) {
      console.log(error)
      this.activateSnackbar("Obteniendo la información " + error, false);
    }

    this.loaderActive = false;
    },
  computed:{
      farms(){
        return this.$store.getters['farm/farms'];
      },
    isEditor(){
      const filteredModules = (this.$store.getters['authentication/currentUser'].modules) ? this.$store.getters['authentication/currentUser'].modules.filter((item) => {
        return item.read && item.write;
      }) : [];
      return JSON.stringify(filteredModules).includes("farms");
    },
    filteredHeaders(){
      const readerHeaders = this.farmsTableHeaders.slice(0, this.farmsTableHeaders.length - 1);
      return (this.isEditor) ? this.farmsTableHeaders : readerHeaders
    },      
    },
  methods: {
    openCreateFarmDialog() {
      this.getProvincias();
      this.cantones = [];
      this.distritos = [];      
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

    closeDeleteFarmDialog() {
      this.deleteFarmDialog = false;
      this.currentFarm = null;
    },

    closeFarmDialog() {
      this.farmDialog = false;
      this.$refs.observer.reset();
    },


    async getProvincias() {
      this.provinciasData = [];
      await this.$fire.firestore
        .collection("provincias")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.provinciasData.push({ provincia: doc.data().name, ...doc.data() });
            this.provincias = this.provinciasData;
          });
        })
        .catch((error) => {
          this.activateSnackbar("Error obteniendo la lista de provincias", false);
          console.error("Error getting documents: ", error);
        });
    },

    async getCantones(provinciaId) {
      this.cantonesData = [];
      await this.$fire.firestore
        .collection("cantones")
        .where("provincia", "==", provinciaId)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.cantonesData.push({ canton: doc.data().name, ...doc.data() });
            this.cantones = this.cantonesData;
          });
        })
        .catch((error) => {
          this.activateSnackbar("Error obteniendo la lista de cantones", false);
          console.error("Error getting documents: ", error);
        });
    },

    async getDistritos(cantonId) {
      this.distritosData = [];
      await this.$fire.firestore
        .collection("distritos")
        .where("canton", "==", cantonId)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.distritosData.push({ distrito: doc.data().name, ...doc.data() });
            this.distritos = this.distritosData;
          });
        })
        .catch((error) => {
          this.activateSnackbar("Error obteniendo la lista de distritos", false);
          console.error("Error getting documents: ", error);
        });
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
      }
    },

    openUpdateFarmDialog(data) {
      this.getProvincias();
      this.getCantones(data.provincia);
      this.getDistritos(data.canton);

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
        state: data.state
      };

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
    

  },


};
</script>

