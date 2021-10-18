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
                <v-autocomplete
                  v-model="selectedCrop"
                  :items="crops"
                  no-data-text="No hay datos"
                  prepend-icon="mdi-magnify"
                  item-text="name"
                  item-value="id"
                  placeholder="Tipo de cultivo *"
                  @change="onCropChange($event)"
                  :error-messages="errors"
                  required
                ></v-autocomplete>
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
                name="Gotas por CM2"
                rules="required"
              >
                <v-text-field
                  label="Gotas por CM2*"
                  v-model="genInfoToAdd.dropsPerCm2"
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
                name="Bloque"
                rules="required"
              >
                <v-autocomplete
                  v-model="selectedBlock"
                  :items="blocks"
                  no-data-text="No hay datos"
                  clearable
                  prepend-icon="mdi-magnify"
                  item-text="name"
                  item-value="id"
                  placeholder="Escriba para buscar bloque"
                  @change="onBlockChange($event)"
                  :error-messages="errors"
                  required
                ></v-autocomplete>
              </ValidationProvider>
            </v-col>
            <v-col cols="12" sm="6" md="3">
              <span class="headline">{{ formatedSelectedBlock }}</span>
            </v-col>
            <v-col cols="12" sm="6" md="3">
              <v-text-field
                label="Área (ha)"
                v-model="getAreaByAreas"
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="3">
              <v-text-field
                label="Tiempo de Aplicación (mm:ss)"
                v-model="getTimeByAreas"
                readonly
              ></v-text-field>
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
import { mapGetters } from 'vuex'
import moment from 'moment';
export default {
  name: "information",
  props: ['applicationId'],
  data: () => ({
    genInfoToAdd: {
      area: "",
      clientId: "",
      climateAtEnd: "",
      climateAtStart: "",
      cropId: "",
      endDate: "",
      farmId: "",
      startDate: "",
      temperatureAtEnd: "",
      temperatureAtStart: "",
      blockId: "",
      dropsPerCm2: ""
    },
    selectedClient: {},
    formatedSelectedClient: "",
    selectedFarm: {},
    formatedSelectedFarm: "",
    selectedBlock: {},
    formatedSelectedBlock: "",
    selectedCrop: {},
    startDateModal: false,
    endDateModal: false,
    loaderActive: false,
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
      await this.$store.dispatch('applications/getApplications');
      await this.$store.dispatch('farms/getFarmsByClient', {
        currentClient: this.selectedClient
      });
      if(this.selectedFarm){
        await this.$store.dispatch('crops/getFarmCrops', {
          farmId: this.selectedFarm.id
        });
        await this.$store.dispatch('blocks/getFarmBlocks', {
          farmId: this.selectedFarm.id
        });
        await this.$store.dispatch('areas/getBlockAreas', {
          blockId: this.selectedBlock.id
        });
      }
    } catch (error) {
      this.activateSnackbar("Obteniendo la información " + error, false);
    }
    this.loaderActive = false;
  },
  mounted(){
    this.init();
  },
  computed: {
    ...mapGetters({
      clients: 'clients/clients',
      farms: 'farms/farmsByClient',
      getProductTypeText: 'productTypes/getProductTypeText',
      farmCrops: 'crops/farmCrops',
      productTypes: 'productTypes/productTypes',
      blocks: 'blocks/farmBlocks',
      getArea: "areas/getArea"
    }),
    currentApplication() {
      return this.$store.getters["applications/getApplication"](this.applicationId);
    },
    crops() {
      return this.productTypes.reduce((result, product) => {
          const farmCrop = this.farmCrops.find(crop => crop.type === product.id)
          if(farmCrop){
            result.push({
              name: this.getProductTypeText(product.id),
              id: farmCrop.id,
              cropType: product.id
            });
          }
          return result;
      }, []);
    },
    getAreaByAreas() {
      if(this.applicationId && this.currentApplication && this.currentApplication.missions){
        return this.currentApplication.missions.reduce((result, mission) => {
          let areaObj = this.getArea(mission.areaId);
          if(areaObj){
            result += parseInt(areaObj.area);
            return result;
          }
          return result;
        }, 0);
      }
      return 0;
    },
    getTimeByAreas() {
      if(this.applicationId && this.currentApplication && this.currentApplication.missions){
        return this.currentApplication.missions.reduce((result, mission) => {
          let missionMM = mission.time.split(':')[0];
          let missionSS = mission.time.split(':')[1];

          let resultMM = result ? result.split(':')[0] : 0;
          let resultSS = result ? result.split(':')[0] : 0;
          
          result = (parseInt(missionMM) + parseInt(resultMM)) + ':' + (parseInt(missionSS) + parseInt(resultSS));
          return result;
        }, '00:00');
      }
      return '00:00';
    }
  },
  methods: {
    init(){
      if(this.applicationId){
        this.genInfoToAdd.clientId = this.currentApplication.clientId;
        this.genInfoToAdd.climateAtEnd = this.currentApplication.climateAtEnd;
        this.genInfoToAdd.climateAtStart = this.currentApplication.climateAtStart;
        this.genInfoToAdd.endDate = this.formatTimestamp(this.currentApplication.endDate);
        this.genInfoToAdd.farmId = this.currentApplication.farmId;
        this.genInfoToAdd.startDate = this.formatTimestamp(this.currentApplication.startDate);
        this.genInfoToAdd.temperatureAtEnd = this.currentApplication.temperatureAtEnd;
        this.genInfoToAdd.temperatureAtStart = this.currentApplication.temperatureAtStart;
        this.genInfoToAdd.cropId = this.currentApplication.cropId;
        this.genInfoToAdd.blockId = this.currentApplication.blockId;
        this.genInfoToAdd.dropsPerCm2 = this.currentApplication.dropsPerCm2;

        this.loadClientFarmCropBlock(this.currentApplication.clientId, this.currentApplication.farmId, this.currentApplication.cropId, this.currentApplication.blockId);
      } else {
        this.genInfoToAdd.clientId = '';
        this.genInfoToAdd.climateAtEnd = '';
        this.genInfoToAdd.climateAtStart = '';
        this.genInfoToAdd.endDate = '';
        this.genInfoToAdd.farmId = '';
        this.genInfoToAdd.startDate = '';
        this.genInfoToAdd.temperatureAtEnd = '';
        this.genInfoToAdd.temperatureAtStart = '';
        this.genInfoToAdd.cropId = '';
        this.genInfoToAdd.blockId = '';
        this.genInfoToAdd.dropsPerCm2 = '';

        this.selectedClient = null;
        this.selectedFarm = null;
        this.selectedCrop = null;
        this.selectedBlock = {};
        
      }
    },
    loadSelectedClient(id){
      if(id){
        const currentClient = this.clients.filter((item) => {
          return item.id == id.toString();
        }).shift();
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
    loadSelectedFarm(id) {
      if(id){
        const currentFarm = this.farms.filter((item) => {
          return item.id == id.toString();
        }).shift();
        this.selectedFarm = currentFarm;
      } else {
        this.selectedFarm = null;
      }
      this.formatSelectedFarm();
    },
    loadSelectedBlock(id) {
      if(id){
        const currentBlock = this.blocks.filter((item) => {
          return item.id == id.toString();
        }).shift();
        this.selectedBlock = currentBlock;
      } else {
        this.selectedBlock = {};
      }
      this.formatSelectedBlock();
    },
    onFarmChange(id) {
      this.loadSelectedFarm(id);
      this.$fetch();
    },
    onBlockChange(id) {
      this.loadSelectedBlock(id);
      this.$fetch();
    },
    loadSelectedCrop(id) {
      if(id){
        const currentCrop = this.crops.filter((item) => {
          return item.id == id.toString();
        }).shift();
        this.selectedCrop = currentCrop;
      } else {
        this.selectedCrop = null;
      }
    },
    onCropChange(id) {
      this.loadSelectedCrop(id);
      this.$fetch();
    },
    saveGenInfo() {
      if(this.applicationId){
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
            clientId: this.selectedClient.id,
            climateAtEnd: this.genInfoToAdd.climateAtEnd,
            climateAtStart: this.genInfoToAdd.climateAtStart,
            endDate: this.$fireModule.firestore.Timestamp.fromDate(new Date(this.genInfoToAdd.endDate)),
            farmId: this.selectedFarm.id,
            startDate: this.$fireModule.firestore.Timestamp.fromDate(new Date(this.genInfoToAdd.startDate)),
            temperatureAtEnd: this.genInfoToAdd.temperatureAtEnd,
            temperatureAtStart: this.genInfoToAdd.temperatureAtStart,
            cropId: this.selectedCrop.id,
            blockId: this.selectedBlock.id,
            dropsPerCm2: this.genInfoToAdd.dropsPerCm2
          })
          .then((application) => {
            this.loaderActive = false;
            this.activateSnackbar("Aplicación creada correctamente", true);
            
            this.$router.push({ path: '', query: { applicationId: application.id }})
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
            clientId: this.selectedClient.id,
            climateAtEnd: this.genInfoToAdd.climateAtEnd,
            climateAtStart: this.genInfoToAdd.climateAtStart,
            endDate: this.genInfoToAdd.endDate,
            farmId: this.selectedFarm.id,
            startDate: this.genInfoToAdd.startDate,
            temperatureAtEnd: this.genInfoToAdd.temperatureAtEnd,
            temperatureAtStart: this.genInfoToAdd.temperatureAtStart,
            cropId: this.selectedCrop.id,
            blockId: this.selectedBlock.id,
            dropsPerCm2: this.genInfoToAdd.dropsPerCm2
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
    formatSelectedBlock(){
      if(this.selectedBlock){
        this.formatedSelectedBlock = `${this.selectedBlock.name}`;
      } else {
        this.formatedSelectedBlock = '';
      }
    },
    formatTimestamp(timestamp){
      return moment(timestamp.toDate()).format('DD-MM-YYYY');
    },
    loadClientFarmCropBlock(clientId, farmId, cropId, blockId) {
      this.loadSelectedClient(clientId);

      this.$store.dispatch('farms/getFarmsByClient', {
        currentClient: this.selectedClient
      }).then(() => {
        this.loadSelectedFarm(farmId);

        this.$store.dispatch('crops/getFarmCrops', {
          farmId: this.selectedFarm.id
        }).then(() => {
          this.onCropChange(cropId);

          this.$store.dispatch('blocks/getFarmBlocks', {
            farmId: this.selectedFarm.id
          }).then(() => {
            this.onBlockChange(blockId);
          });
        });
      });
    }
  }
};
</script>
