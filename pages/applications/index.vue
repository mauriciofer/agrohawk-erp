<template>
  <div>
    <h1 class="ma-10">Aplicaciones</h1>

    <!-- Applications -->

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
            <NuxtLink absolute right tile color="primary" :to="`applications/new?applicationId=`">
              <v-icon left>mdi-plus</v-icon>Agregar
            </NuxtLink>
          </v-toolbar>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <NuxtLink :to="`applications/${item.id}?applicationId=${item.id}`" style="text-decoration: none;">
            <v-icon small class="mr-2">
              mdi-feature-search
            </v-icon>
          </NuxtLink>
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
        <template v-slot:[`item.cropId`]="{ item }">
          {{getProductTypeText(getCropType(item.cropId))}}
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
export default {
  name: "applications",
  data: () => ({
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
      { text: "Cultivo", value: "cropId" },
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
    isEdition: false
  }),
  async fetch() {
    this.loaderActive = true;

    try {
      await this.$store.dispatch('applications/getApplications');
      await this.$store.dispatch('crops/getCrops');
    } catch (error) {
      this.activateSnackbar("Obteniendo la información " + error, false);
    }
    this.loaderActive = false;
  },
  async beforeMount(){
    this.loaderActive = true;
    try {
      await this.$store.dispatch('farms/getFarms');
    } catch (error) {
      this.activateSnackbar("Obteniendo la información " + error, false);
    }

    this.loaderActive = false;
  },
  computed: {
    ...mapGetters({
      getClient: "clients/getClient",
      getFarm: "farms/getFarm",
      applications: 'applications/applications',
      cropById: 'crops/cropById',
      getProductTypeText: 'productTypes/getProductTypeText',
      getCropType: 'crops/getCropType',
    }),
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
    getFarmName(farmId){
      return this.getFarm(farmId).name;
    },
    getFarmArea(farmId){
      return this.getFarm(farmId).area;
    },
    // getCropText(cropId) {
    //   this.$store.dispatch('crops/getCropById', {
    //     cropId: cropId
    //   });
    //   return this.cropById.type ? this.getProductTypeText(this.cropById.type) : '';
    // },
    formatTimestamp(timestamp){
      return moment(timestamp.toDate()).format('DD-MM-YYYY');
    }
  }
};
</script>
