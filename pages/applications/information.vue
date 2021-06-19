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
              <span class="headline">{{ formatedSelectedClient }}</span>
            </v-col>
            <v-col cols="12" sm="6" md="3">
              <ValidationProvider
                v-slot="{ errors }"
                name="Cultivo"
                rules="required"
              >
                <v-select
                  text="text"
                  :items="cropTypeList"
                  v-model="genInfoToAdd.cropType"
                  name="cropType"
                  label="Tipo de cultivo *"
                  :error-messages="errors"
                  required
                ></v-select>
              </ValidationProvider>
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
              <span class="headline">{{ formatedSelectedFarm }}</span>
            </v-col>
            <v-col cols="12" sm="6" md="3">
              <ValidationProvider
                v-slot="{ errors }"
                name="Área (ha)"
                rules="required"
              >
                <v-text-field
                  label="Área (ha) *"
                  v-model="genInfoToAdd.area"
                  :error-messages="errors"
                  required
                ></v-text-field>
              </ValidationProvider>
            </v-col>
          </v-row>
          <v-row>
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
                    name="Fecha Entrada"
                    rules="required"
                  >
                    <v-text-field
                      v-model="genInfoToAdd.startDate"
                      label="Fecha Entrada *"
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
                      $refs.startDateDialog.save(genInfoToAdd.startDate);
                      startDateModal = false
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
                name="Temperatura (°C) Entrada"
                rules="required"
              >
                <v-text-field
                  label="Temperatura (°C) Entrada *"
                  v-model="genInfoToAdd.temperatureAtStart"
                  :error-messages="errors"
                  required
                ></v-text-field>
              </ValidationProvider>
            </v-col>
            <v-col cols="12" sm="6" md="3">
              <ValidationProvider
                v-slot="{ errors }"
                name="Condición Climatica Entrada"
                rules="required"
              >
                <v-text-field
                  label="Condición Climatica Entrada *"
                  v-model="genInfoToAdd.climateAtStart"
                  :error-messages="errors"
                  required
                ></v-text-field>
              </ValidationProvider>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6" md="3">
              <v-dialog
                ref="endDateDialog"
                v-model="endDateModal"
                :return-value.sync="genInfoToAdd.endDate"
                persistent
                width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="Fecha Salida"
                    rules="required"
                  >
                    <v-text-field
                      v-model="genInfoToAdd.endDate"
                      label="Fecha Salida *"
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
                >
                  <v-spacer></v-spacer>
                  <v-btn
                    text
                    color="primary"
                    @click="endDateModal = false"
                  >
                    Cancelar
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="
                      $refs.endDateDialog.save(genInfoToAdd.endDate)
                      endDateModal = false
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
                name="Temperatura (°C) Salida"
                rules="required"
              >
                <v-text-field
                  label="Temperatura (°C) Salida *"
                  v-model="genInfoToAdd.temperatureAtEnd"
                  :error-messages="errors"
                  required
                ></v-text-field>
              </ValidationProvider>
            </v-col>
            <v-col cols="12" sm="6" md="3">
              <ValidationProvider
                v-slot="{ errors }"
                name="Condición Climatica Salida"
                rules="required"
              >
                <v-text-field
                  label="Condición Climatica Salida *"
                  v-model="genInfoToAdd.climateAtEnd"
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
import moment from 'moment';
export default {
  name: "information",
  props: ['currentApplication'],
  data: () => ({
    genInfoToAdd: {
      area: "",
      clientId: "",
      climateAtEnd: "",
      climateAtStart: "",
      cropType: "",
      endDate: "",
      farmId: "",
      startDate: "",
      temperatureAtEnd: "",
      temperatureAtStart: "",
      
    },
    selectedClient: {},
    formatedSelectedClient: "",
    selectedFarm: {},
    formatedSelectedFarm: "",
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
    this.loaderActive = true;
    try {
      await this.$store.dispatch('farm/getFarmsByClient', {
        currentClient: this.selectedClient
      });
    } catch (error) {
      this.activateSnackbar("Obteniendo la información " + error, false);
    }
    this.loaderActive = false;
  },
  mounted(){
    this.init();
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
    init(){
      if(this.currentApplication){
        this.genInfoToAdd.area = this.currentApplication.area;
        this.genInfoToAdd.clientId = this.currentApplication.clientId;
        this.genInfoToAdd.climateAtEnd = this.currentApplication.climateAtEnd;
        this.genInfoToAdd.climateAtStart = this.currentApplication.climateAtStart;
        this.genInfoToAdd.endDate = this.formatTimestamp(this.currentApplication.endDate);
        this.genInfoToAdd.farmId = this.currentApplication.farmId;
        this.genInfoToAdd.startDate = this.formatTimestamp(this.currentApplication.startDate);
        this.genInfoToAdd.temperatureAtEnd = this.currentApplication.temperatureAtEnd;
        this.genInfoToAdd.temperatureAtStart = this.currentApplication.temperatureAtStart;
        this.genInfoToAdd.cropType = this.currentApplication.cropType;

        this.loadClientAndFarm(this.currentApplication.clientId, this.currentApplication.farmId);
      } else {
        this.genInfoToAdd.area = '';
        this.genInfoToAdd.clientId = '';
        this.genInfoToAdd.climateAtEnd = '';
        this.genInfoToAdd.climateAtStart = '';
        this.genInfoToAdd.endDate = '';
        this.genInfoToAdd.farmId = '';
        this.genInfoToAdd.startDate = '';
        this.genInfoToAdd.temperatureAtEnd = '';
        this.genInfoToAdd.temperatureAtStart = '';
        this.genInfoToAdd.cropType = '';

        this.selectedClient = null;
        this.selectedFarm = null;
      }
    },
    loadSelectedClient(id){
      if(id){
        const currentClient = this.clients.filter((item) => {
          return item.id == id.toString();
        })[0];
        this.selectedClient = currentClient;
      } else {
        this.selectedClient = null;
      }
      this.formatSelectedClient();
    },
    onClientChange(id) {
      this.loadSelectedClient(id);
      this.$fetch();
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
      this.formatSelectedFarm();
    },
    saveGenInfo() {
      if(this.currentApplication){
        this.updateGenInfo();
      } else {
        this.addGenInfo();
      }
    },
    async addGenInfo() {
      this.loaderActive = true;

      const isValid = await this.$refs.observer.validate();

      if (isValid) {
        await this.$fire.firestore
          .collection("applications")
          .add({
            area: this.selectedClient.area,
            clientId: this.selectedClient.id,
            climateAtEnd: this.genInfoToAdd.climateAtEnd,
            climateAtStart: this.genInfoToAdd.climateAtStart,
            endDate: this.genInfoToAdd.endDate,
            farmId: this.selectedFarm.id,
            startDate: this.genInfoToAdd.startDate,
            temperatureAtEnd: this.genInfoToAdd.temperatureAtEnd,
            temperatureAtStart: this.genInfoToAdd.temperatureAtStart,
            cropType: this.genInfoToAdd.cropType
          })
          .then(() => {
            this.loaderActive = false;
            this.activateSnackbar("Aplicación creada correctamente", true);
          })
          .catch((error) => {
            console.error(error);
            this.loaderActive = false;

            this.activateSnackbar("Error creando Aplicación", false);
          });
      }
    },
    async updateGenInfo() {
      this.loaderActive = true;

      const isValid = await this.$refs.observer.validate();

      if (isValid) {
        await this.$fire.firestore
          .collection("applications")
          .doc(this.currentApplication.id)
          .update({
            area: this.selectedClient.area,
            clientId: this.selectedClient.id,
            climateAtEnd: this.genInfoToAdd.climateAtEnd,
            climateAtStart: this.genInfoToAdd.climateAtStart,
            endDate: this.genInfoToAdd.endDate,
            farmId: this.selectedFarm.id,
            startDate: this.genInfoToAdd.startDate,
            temperatureAtEnd: this.genInfoToAdd.temperatureAtEnd,
            temperatureAtStart: this.genInfoToAdd.temperatureAtStart,
            cropType: this.genInfoToAdd.cropType
          })
          .then(() => {
            this.loaderActive = false;
            this.activateSnackbar("Aplicación actualizada correctamente", true);
          })
          .catch((error) => {
            console.error(error);
            this.loaderActive = false;

            this.activateSnackbar("Error actualizando Aplicación", false);
          });
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
    },
    formatSelectedClient(){
      if(this.selectedClient){
        this.formatedSelectedClient = `${this.selectedClient.firstName} ${this.selectedClient.firstLastname}`;
      } else {
        this.formatedSelectedClient = '';
      }
    },
    formatSelectedFarm(){
      if(this.selectedFarm){
        this.formatedSelectedFarm = `${this.selectedFarm.name} ${this.selectedFarm.address}`;
      } else {
        this.formatedSelectedFarm = '';
      }
    },
    formatTimestamp(timestamp){
      return moment(timestamp.toDate()).format('DD-MM-YYYY');
    },
    loadClientAndFarm(clientId, farmId) {
      this.loadSelectedClient(clientId);

      this.$store.dispatch('farm/getFarmsByClient', {
        currentClient: this.selectedClient
      }).then(() => {
        this.onFarmChange(farmId);
      });
    }
  }
};
</script>
