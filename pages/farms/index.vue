<template>
  <div>
    <h1 class="ma-10">Fincas</h1>

    <!-- farms -->

    <!-- Dialog to create/modify farm -->

    <ValidationObserver ref="observer" v-slot="{ invalid }" tag="form">
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
    <!-- End dialog to create/modify farm -->

    <!-- Dialog to confirm deletion -->
    <v-dialog v-model="deleteFarmDialog" persistent max-width="50%">
      <v-card>
        <v-card-title class="headline"
          >¿Esta segur@ que desea eliminar el usuario?</v-card-title
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
    deleteFarmDialog: false,
    currentFarm: null,
    farm: {
      farmName: "",
      farmArea: "",
      farmSize: "",
      farmLocation: "",
      farmState: 1,
    },
    stateTypeList: [
      { text: "Activo", value: 1 },
      { text: "Inactivo", value: 2 },
    ],

    farmsTableHeaders: [
      {
        text: "Nombre Finca",
        align: "start",
        value: "farmName",
      },
      { text: "Area", value: "farmArea" },
      { text: "Tamaño", value: "farmSize" },
      { text: "Ubicacion", value: "farmLocation" },
      
      { text: "Estado", value: "farmState"},
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
  }),
  async fetch() {
    this.loaderActive = true;
    try {
      await this.$store.dispatch('farmsStore/getfarms');
    } catch (error) {
      console.log(error)
      this.activateSnackbar("Obteniendo la información " + error, false);
    }

    this.loaderActive = false;
    },
  computed:{
      farms(){
        return this.$store.getters['farmsStore/farms'];
      }
    },
  methods: {
    openCreateFarmDialog() {
      this.farmDialog = true;
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
    closefarmDialog() {
      this.farmDialog = false;
      this.$refs.observer.reset();
    },


    openDeleteFarmDialog(data) {
      this.deleteFarmDialog = true;
      this.currentFarm = data;
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
            farmName: this.farm.farmName,
            farmArea: this.farm.farmArea,
            farmSize: this.farm.farmSize,
            farmLocation: this.farm.farmLocation,
            farmState: this.farm.farmState
          })
          .then(() => {
            this.$fetch()
            this.farmDialog = false;
            this.$refs.observer.reset();
          })
          .catch((error) => {
            console.error(error);
            this.activateSnackbar("Creando finca", false);
            this.loaderActive = false;
          });
      }
    },

    openUpdateFarmDialog(data) {

      this.currentFarm = data;
      this.isEdition = true;
      this.farmDialog = true;
      this.farm = {

        farmName: data.farmName,
        farmArea: data.farmArea,
        farmSize: data.farmSize,
        farmLocation: data.farmLocation,
        farmState: data.farmState
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
            farmName: this.farm.farmName,
            farmArea: this.farm.farmArea,
            farmSize: this.farm.farmSize,
            farmLocation: this.farm.farmLocation,
            farmState: this.farm.farmState
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
          this.$fetch()
          this.deleteFarmDialog = false;
        })
        .catch((error) => {  
          this.loaderActive = false;
          this.activateSnackbar("Error borrando finca", false);
        });
    },    
    

  },


};
</script>

