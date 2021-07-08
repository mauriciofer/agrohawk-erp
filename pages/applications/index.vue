<template>
  <div>
    <h1 class="ma-10">Aplicaciones</h1>

    <!-- Applications -->

    <!-- Dialog to create/update applications -->

    <v-dialog v-model="applicationDialog" persistent max-width="100%">
      <v-card>
        <v-expansion-panels
          v-model="panel"
          multiple
          focusable
        >
          <v-expansion-panel>
            <v-expansion-panel-header>
              Información General
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <information-vue :currentApplication="currentApplication"></information-vue>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-header>
              Disposiciones Ténicas de Aplicación
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <provisions-vue :currentApplication="currentApplication"></provisions-vue>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>

        <v-card-actions>
          <v-btn color="blue darken-1" text @click="closeApplicationDialog()">
            Cerrar
          </v-btn>      
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Dialog to confirm deletion -->
    <v-dialog v-model="deleteApplicationDialog" persistent max-width="50%">
      <v-card>
        <v-card-title class="headline"
          >Confirme la eliminación de la aplicación</v-card-title
        >
        <v-card-text>Esta acción no puede ser revertida</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="closeDeleteApplicationDialog()"
            >Cancelar</v-btn
          >
          <v-btn color="green darken-1" text @click="deleteApplication()"
            >Eliminar</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- End Dialog to confirm deletion -->

    <!-- Applications -->
    <v-card class="ma-10" elevation="2" outlined>
      <!-- Applications table -->
      <v-data-table
        :headers="filteredHeaders"
        :items="applications"
        :items-per-page="5"
        :search="applicationsTableSearch"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Aplicaciones</v-toolbar-title>

            <v-divider class="mx-4" inset vertical></v-divider>

            <v-text-field
              v-model="applicationsTableSearch"
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
              @click="openCreateApplicationDialog()"
              v-if="isEditor"
            >
              <v-icon left>mdi-plus</v-icon>Agregar</v-btn
            >
          </v-toolbar>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="openUpdateApplicationDialog(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="openDeleteApplicationDialog(item)">
            mdi-delete
          </v-icon>
        </template>
        <template v-slot:[`item.clientId`]="{ item }">
          {{getClientName(item.clientId)}}
        </template>
        <template v-slot:[`item.farmId`]="{ item }">
          {{getFarmName(item.farmId)}}
        </template>
        <template v-slot:[`item.farmArea`]="{ item }">
          {{getFarmArea(item.farmId)}}
        </template>
        <template v-slot:[`item.cropType`]="{ item }">
          {{getCropTypeText(item.cropType)}}
        </template>
        <template v-slot:[`item.startDate`]="{ item }">
          {{formatTimestamp(item.startDate)}}
        </template>
        <template v-slot:[`item.endDate`]="{ item }">
          {{formatTimestamp(item.endDate)}}
        </template>
      </v-data-table>
      <!-- End Applications table -->
    </v-card>
    <!-- End Applications -->

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
import { mapGetters } from "vuex";
import InformationVue from './information.vue'
import ProvisionsVue from './provisions.vue'
export default {
  name: "applications",
  components: {
    InformationVue,
    ProvisionsVue
  },
  data: () => ({
    applicationDialog: false,
    deleteApplicationDialog: false,
    currentApplication: null,
    applicationsTableHeaders: [
      {
        text: "Productor",
        align: "start",
        sortable: true,
        value: "clientId",
      },
      { text: "Finca", value: "farmId" },
      { text: "Area", value: "farmArea" },
      { text: "Cultivo", value: "cropType" },
      { text: "Fecha Inicio", value: "startDate" },
      { text: "Fecha Fin", value: "endDate" },
      { text: "Acciones", value: "actions", sortable: false }
    ],
    applicationsTableSearch: "",
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
    isEdition: false,
    panel: [0],
    cropTypeList: [
      { text: "Lechuga", value: 1 }, //TODO: implement a croptype module CRUD
      { text: "Chayote", value: 2 }
    ]
  }),
  async fetch() {
    this.loaderActive = true;

    try {
      await this.$store.dispatch('applications/getApplications');
    } catch (error) {
      this.activateSnackbar("Obteniendo la información " + error, false);
    }

    this.loaderActive = false;
  },
  computed: {
    ...mapGetters({
      getClient: "clients/getClient",
      getFarm: "farms/getFarmByApplication"
    }),
    applications(){
      return this.$store.getters['applications/applications'];
    },
    isEditor(){
      const filteredModules = (this.$store.getters['authentication/currentUser'].modules) ? this.$store.getters['authentication/currentUser'].modules.filter((item) => {
        return item.read && item.write;
      }) : [];
      return JSON.stringify(filteredModules).includes("applications");
    },
    filteredHeaders(){
      const readerHeaders = this.applicationsTableHeaders.slice(0, this.applicationsTableHeaders.length - 1);
      return (this.isEditor) ? this.applicationsTableHeaders : readerHeaders
    }
  },
  methods: {
    openCreateApplicationDialog() {
      this.currentApplication = null;

      this.isEdition = false;
      this.applicationDialog = true;
      
      this.$fetch();
    },
    openUpdateApplicationDialog(data) {
      this.currentApplication = data;

      this.isEdition = true;
      this.applicationDialog = true;
      
      this.$fetch();
    },
    closeApplicationDialog() {
      this.currentApplication = null;

      this.applicationDialog = false;

      this.$fetch();
    },
    openDeleteApplicationDialog(item) {
      this.currentApplication = item;

      this.$fetch();

      this.deleteApplicationDialog = true;
    },
    closeDeleteApplicationDialog() {
      this.currentApplication = null;

      this.deleteApplicationDialog = false;
    },
    async deleteApplication() {
      this.loaderActive = true;

      await this.$fire.firestore
        .collection("applications")
        .doc(this.currentApplication.id)
        .delete()
        .then(() => {
          this.$fetch();

          this.activateSnackbar("Application borrado correctamente", true);
          this.deleteApplicationDialog = false;

          this.loaderActive = false;
        })
        .catch((error) => {
          console.error("Error removing document: ", error);
          this.activateSnackbar("Error borrando aplicación", false);

          this.loaderActive = false;
        });
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
    getClientName(clientId){
      let formattedName;

      const client = this.getClient(clientId);

      client.clientType == 1
        ? (formattedName = client.firstName + " " + client.secondName + " " + client.firstLastname + " " + client.secondLastname)
        : (formattedName = client.firstName);
      
      return formattedName.replace("  ", " "); // In case that second name or lastname are null
    },
    async getFarmById(farmId){
      await this.$store.dispatch('farms/getFarmById', {
        farmId: farmId
      });
    },
    getFarmName(farmId){
      this.getFarmById(farmId);
      return this.getFarm.name;
    },
    getFarmArea(farmId){
      this.getFarmById(farmId);
      return this.getFarm.area;
    },
    getCropTypeText(type) {
      return this.cropTypeList.filter((item) => {
        return item.value == type;
      })[0].text;
    },
    formatTimestamp(timestamp){
      return moment(timestamp.toDate()).format('DD-MM-YYYY');
    }
  }
};
</script>
