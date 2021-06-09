<template v-slot:default>
    <div>

    <!-- Form to add/edit General Information -->
    <ValidationObserver
      ref="observer"
      v-slot="{ invalid }"
      tag="form"
      @submit.prevent="submit()"
    >
    <v-card>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6" md="3">
              <ValidationProvider
                v-slot="{ errors }"
                name="Cliente"
                rules="required"
              >
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
                  :error-messages="errors"
                  required
                ></v-autocomplete>
                </ValidationProvider>
            </v-col>
            <v-col cols="12" sm="6" md="3">
              <span class="headline">{{selectedClient ? selectedClient.firstName : ''}} {{selectedClient ? selectedClient.firstLastname : ''}}</span>
            </v-col>
            <v-col cols="12" sm="6" md="3">
              <v-dialog
                ref="startDateDialog"
                v-model="startDateModal"
                :return-value.sync="genInfoToAdd.startDate"
                persistent
                width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="Fecha Inicio"
                    rules="required"
                    ref="startDate"
                  >
                    <v-text-field
                      v-model="genInfoToAdd.startDate"
                      label="Fecha Inicio *"
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
                  v-model="genInfoToAdd.startDate"
                  scrollable
                  locale="es-ES"
                  @input="$refs.startDateDialog.save(genInfoToAdd.startDate)"
                >
                </v-date-picker>
              </v-dialog>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6" md="3">
              <ValidationProvider
                v-slot="{ errors }"
                name="Finca"
                rules="required"
              >
                <v-autocomplete
                  v-model="selectedFarm"
                  :items="farms"
                  no-data-text="No hay datos"
                  clearable
                  prepend-icon="mdi-magnify"
                  item-text="name"
                  item-value="id"
                  placeholder="Escriba para buscar finca"
                  @change="onFarmChange($event)"
                  :error-messages="errors"
                  required
                ></v-autocomplete>
              </ValidationProvider>
            </v-col>
            <v-col cols="12" sm="6" md="3">
              <span class="headline">{{selectedFarm ? selectedFarm.name : ''}} {{selectedFarm ? selectedFarm.address : ''}}</span>
            </v-col>
            <v-col cols="12" sm="6" md="3">
              <v-dialog
                ref="endDateDialog"
                v-model="endDateModal"
                :return-value.sync="genInfoToAdd.endtDate"
                persistent
                width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="Fecha Fin"
                    rules="required"
                    ref="endDate"
                  >
                    <v-text-field
                      v-model="genInfoToAdd.endDate"
                      label="Fecha Fin *"
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
                  v-model="genInfoToAdd.endDate"
                  scrollable
                  locale="es-ES"
                  @input="$refs.endDateDialog.save(genInfoToAdd.endDate)"
                >
                </v-date-picker>
              </v-dialog>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6" md="3">
              <ValidationProvider
                v-slot="{ errors }"
                name="Área"
                rules="required"
              >
                <v-text-field
                  label="Área *"
                  v-model="genInfoToAdd.area"
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
                name="Cultivo"
                rules="required"
              >
                <v-select
                  text="text"
                  :items="cropTypeList"
                  v-model="selectedCrop"
                  name="type"
                  label="Tipo de cultivo *"
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
          @click="saveGenInfo()"
          :disabled="invalid"
        >Agregar</v-btn>
      </v-card-actions>
    </v-card>
    </ValidationObserver>
    <!-- End form to add/update General Information -->

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
export default {
  name: "information",
  props: ['currentApplication'],
  data: () => ({
    genInfoToAdd: {
      clientId: "",
      climateAtEnd: "",
      climateAtStart: "",
      endDate: "",
      farmId: "",
      startDate: "",
      temperatureAtEnd: "",
      temperatureAtStart: "",
      cropType: ""
    },
    selectedClient: {},
    selectedFarm: {},
    selectedCrop: {},
    startDateModal: false,
    endDateModal: false,
    loaderActive: false,
    cropTypeList: [
      { text: "Lechuga", value: 1 }, //TODO: implement a croptype module CRUD
      { text: "Chayote", value: 2 },
    ],
    snackbar: {
      color: null,
      icon: null,
      mode: 'multi-line',
      text: null,
      timeout: 2000,
      title: null,
      visible: false,
    }
  }),
  async fetch() {
    try {
      await this.$store.dispatch('farm/getFarmsByClient', {
        currentClient: this.selectedClient
      });
    } catch (error) {
      this.activateSnackbar("Obteniendo la información " + error, false);
    }
  },
  computed: {
    clients(){
      return this.$store.getters['clients/clients'];
    },
    farms() {
      return this.$store.getters["farm/farmsByClient"];
    }
  },
  methods: {
    onClientChange(id) {
      if(id){
        const currentClient = this.clients.filter((item) => {
          return item.id == id.toString();
        })[0];
        this.selectedClient = currentClient;

        this.$fetch();
      } else {
        this.selectedClient = null;
      }
    },
    onFarmChange(id) {
      if(id){
        const currentFarm = this.farms.filter((item) => {
          return item.id == id.toString();
        })[0];
        this.selectedFarm = currentFarm;
      } else {
        this.selectedFarm = null;
      }
    },
    saveGenInfo() {
      if(this.currentApplication){
        updateGenInfo();
      } else {
        addGenInfo();
      }
    },
    async addGenInfo() {
      const isValid = await this.$refs.observer.validate();

      if (isValid) {
        this.loaderActive = true;

        this.$fire.firestore
          .collection("application")
          .add({
            clientId: this.selectedClient.id,
            climateAtEnd: this.genInfoToAdd.climateAtEnd,
            climateAtStart: this.genInfoToAdd.climateAtStart,
            endDate: this.genInfoToAdd.endDate,
            farmId: this.selectedFarm.id,
            startDate: this.genInfoToAdd.startDate,
            temperatureAtEnd: this.genInfoToAdd.temperatureAtEnd,
            temperatureAtStart: this.genInfoToAdd.temperatureAtStart,
            cropType: this.selectedCrop.value
          })
          .then(() => {
            this.activateSnackbar("Aplicación creada correctamente", true);

            this.$fetch();
            this.$refs.observer.reset();
          })
          .catch((error) => {
            console.error(error);

            this.activateSnackbar("Error creando Aplicación", false);
          });

        this.loaderActive = false;
      }
    },
    async updateGenInfo() {
      const isValid = await this.$refs.observer.validate();

      if (isValid) {
        this.loaderActive = true;

        this.$fire.firestore
          .collection("application")
          .doc(this.currentApplication.id)
          .update({
            clientId: this.selectedClient.id,
            climateAtEnd: this.genInfoToAdd.climateAtEnd,
            climateAtStart: this.genInfoToAdd.climateAtStart,
            endDate: this.genInfoToAdd.endDate,
            farmId: this.selectedFarm.id,
            startDate: this.genInfoToAdd.startDate,
            temperatureAtEnd: this.genInfoToAdd.temperatureAtEnd,
            temperatureAtStart: this.genInfoToAdd.temperatureAtStart,
            cropType: this.selectedCrop.value
          })
          .then(() => {
            this.activateSnackbar("Aplicación actualizada correctamente", true);

            this.$fetch();
            this.$refs.observer.reset();
          })
          .catch((error) => {
            console.error(error);

            this.activateSnackbar("Error actualizando Aplicación", false);
          });

        this.loaderActive = false;
      }
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
    }
  }
};
</script>
