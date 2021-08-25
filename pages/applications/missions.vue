<template v-slot:default>
    <div>

    <!-- Missions table -->
    <v-data-table
      :headers="missionsHeaders"
      :items="this.missions"
      :items-per-page="10"
      :search="missionsTableSearch"
      item-key="name"
      sort-by="name"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Parámetros Técnicos de Aplicación</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-text-field
            v-model="missionsTableSearch"
            append-icon="mdi-magnify"
            label="Buscar"
            single-line
            hide-details
          ></v-text-field>
          <v-icon
            large
            class="ml-5"
            color="primary"
            @click="openAddMissionDialog()"
          >
            mdi-plus-circle
          </v-icon>
        </v-toolbar>
      </template>
      <template v-slot:item="{ item }">
        <tr>
          <td>{{ item.name }}</td>
          <td>{{ item.flights }}</td>
          <td>{{ item.terrain }}</td>
          <td>{{ getNozzleName(item.nozzle) }}</td>
          <td>{{ item.buffer }}</td>
          <td>{{ item.angle }}</td>
          <td>{{ item.height }}</td>
          <td>{{ item.aspersion }}</td>
          <td>{{ item.velocity }}</td>
          <td>{{ item.modality }}</td>
          <td>{{ item.liters }}</td>
          <td>{{ item.drops }}</td>
          <td>{{ item.time }}</td>
          <td>
            <v-icon
              small
              class="mr-2"
              @click="openUpdateMissionDialog(item)"
            >
              mdi-pencil
            </v-icon>
            <v-icon small @click="openDeleteMissionDialog(item)">
              mdi-delete
            </v-icon>
          </td>
        </tr>
      </template>
    </v-data-table>
    <!-- End Missions table -->

    <!-- Dialog to add/modify Missions -->
    <v-dialog v-model="addMissionDialog" persistent max-width="70%">
      <ValidationObserver
        ref="observer"
        v-slot="{ invalid }"
        tag="form"
        @submit.prevent="submit()"
      >
      <v-card>
        <v-card-title>
          <span class="headline">{{ isMissionEdition ? "Editar Misión" : "Agregar Misión" }}</span>
          <v-spacer></v-spacer>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="3">
                <ValidationProvider
                  v-slot="{ errors }"
                  name="Área de Fumigación"
                  rules="required"
                >
                  <v-text-field
                    label="Área de Fumigación *"
                    v-model="missionToAdd.name"
                    required
                    :error-messages="errors"
                  ></v-text-field>
                </ValidationProvider>
              </v-col>

              <v-col cols="12" sm="6" md="3">
                <ValidationProvider
                  v-slot="{ errors }"
                  name="Vuelos"
                  rules="required"
                >
                  <v-text-field
                    label="Vuelos *"
                    v-model="missionToAdd.flights"
                    :type="'number'"
                    required
                    :error-messages="errors"
                  ></v-text-field>
                </ValidationProvider>
              </v-col>

              <v-col cols="12" sm="6" md="3">
                <ValidationProvider
                  v-slot="{ errors }"
                  name="Extensión  del Terreno"
                  rules="required"
                >
                  <v-text-field
                    label="Extensión  del Terreno *"
                    v-model="missionToAdd.terrain"
                    :type="'number'"
                    required
                    :error-messages="errors"
                  ></v-text-field>
                </ValidationProvider>
              </v-col>

              <v-col cols="12" sm="6" md="3">
                <ValidationProvider
                  v-slot="{ errors }"
                  name="Tipo de Boquilla"
                  rules="required"
                >
                  <v-autocomplete
                    v-model="selectedNozzle"
                    :items="nozzles"
                    no-data-text="No hay datos"
                    prepend-icon="mdi-magnify"
                    item-text="name"
                    item-value="id"
                    placeholder="Escriba para buscar boquilla"
                    @change="onNozzleChange($event)"
                    :error-messages="errors"
                    required
                  ></v-autocomplete>
                </ValidationProvider>
              </v-col>

              <v-col cols="12" sm="6" md="3">
                <ValidationProvider
                  v-slot="{ errors }"
                  name="Buffer (m)"
                  rules="required"
                >
                  <v-text-field
                    label="Buffer (m) *"
                    v-model="missionToAdd.buffer"
                    :type="'number'"
                    hint="Ingrese el buffer en metros"
                    required
                    :error-messages="errors"
                  ></v-text-field>
                </ValidationProvider>
              </v-col>

              <v-col cols="12" sm="6" md="3">
                <ValidationProvider
                  v-slot="{ errors }"
                  name="Ángulo"
                  rules="required"
                >
                  <v-text-field
                    label="Ángulo *"
                    v-model="missionToAdd.angle"
                    :type="'number'"
                    required
                    :error-messages="errors"
                  ></v-text-field>
                </ValidationProvider>
              </v-col>

              <v-col cols="12" sm="6" md="3">
                <ValidationProvider
                  v-slot="{ errors }"
                  name="Altura (m)"
                  rules="required"
                >
                  <v-text-field
                    label="Altura (m)  *"
                    v-model="missionToAdd.height"
                    :type="'number'"
                    hint="Ingrese la altura en metros"
                    required
                    :error-messages="errors"
                  ></v-text-field>
                </ValidationProvider>
              </v-col>

              <v-col cols="12" sm="6" md="3">
                <ValidationProvider
                  v-slot="{ errors }"
                  name="Ancho de Aspersión (m)"
                  rules="required"
                >
                  <v-text-field
                    label="Ancho de Aspersión (m) *"
                    v-model="missionToAdd.aspersion"
                    :type="'number'"
                    hint="Ingrese el ancho de aspersión en metros"
                    required
                    :error-messages="errors"
                  ></v-text-field>
                </ValidationProvider>
              </v-col>

              <v-col cols="12" sm="6" md="3">
                <ValidationProvider
                  v-slot="{ errors }"
                  name="Velocidad (m/s)"
                  rules="required"
                >
                  <v-text-field
                    label="Velocidad (m) *"
                    v-model="missionToAdd.velocity"
                    :type="'number'"
                    hint="Ingrese la velocidad en metros por segundos"
                    required
                    :error-messages="errors"
                  ></v-text-field>
                </ValidationProvider>
              </v-col>

              <v-col cols="12" sm="6" md="3">
                <ValidationProvider
                  v-slot="{ errors }"
                  name="Modalidad de Aplicación"
                  rules="required"
                >
                  <v-text-field
                    label="Modalidad de Aplicación *"
                    v-model="missionToAdd.modality"
                    required
                    :error-messages="errors"
                  ></v-text-field>
                </ValidationProvider>
              </v-col>

              <v-col cols="12" sm="6" md="3">
                <ValidationProvider
                  v-slot="{ errors }"
                  name="Litros/ha"
                  rules="required"
                >
                  <v-text-field
                    label="Litros/ha  *"
                    v-model="missionToAdd.liters"
                    required
                    :error-messages="errors"
                  ></v-text-field>
                </ValidationProvider>
              </v-col>

              <v-col cols="12" sm="6" md="3">
                <ValidationProvider
                  v-slot="{ errors }"
                  name="Gotas/cm2*"
                  rules="required"
                >
                  <v-text-field
                    label="Gotas/cm2*"
                    v-model="missionToAdd.drops"
                    :type="'number'"
                    hint="Ingrese las gotas en CM2"
                    required
                    :error-messages="errors"
                  ></v-text-field>
                </ValidationProvider>
              </v-col>

              <v-col cols="12" sm="6" md="3">
                <ValidationProvider
                  v-slot="{ errors }"
                  name="Tiempo de Aplicación (min:ss)"
                  rules="required"
                >
                  <v-text-field
                    label="Tiempo de Aplicación (min:ss) *"
                    v-model="missionToAdd.time"
                    required
                    :error-messages="errors"
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
            @click="closeAddMissionDialog()"
          >Cerrar</v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="addMission()"
            v-if="!isMissionEdition"
            :disabled="invalid"
          >Crear</v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="updateMission()"
            v-if="isMissionEdition"
            :disabled="invalid"
          >Modificar</v-btn>
        </v-card-actions>
      </v-card>
      </ValidationObserver>
    </v-dialog>
    <!-- End dialog to add/modify Missions -->

    <!-- Dialog to confirm deletion -->
    <v-dialog v-model="deleteMissionDialog" persistent max-width="50%">
      <v-card>
        <v-card-title class="headline"
          >Confirme la eliminación de la Misión</v-card-title
        >
        <v-card-text>Esta acción no puede ser revertida</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="closeDeleteMissionDialog()"
            >Cancelar</v-btn
          >
          <v-btn color="green darken-1" text @click="removeMission()"
            >Eliminar</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- End Dialog to confirm deletion -->

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
export default {
  name: "missions",
  props: ['applicationId'],
  data: () => ({
    missionToAdd: {
      name: "",
      flights: "",
      terrain: "",
      nozzle: "",
      buffer: "",
      angle: "",
      height: "",
      aspersion: "",
      velocity: "",
      modality: "",
      liters: "",
      drops: "",
      time: ""
    },
    missionToUpdate: {
      name: "",
      flights: "",
      terrain: "",
      nozzle: "",
      buffer: "",
      angle: "",
      height: "",
      aspersion: "",
      velocity: "",
      modality: "",
      liters: "",
      drops: "",
      time: ""
    },
    addMissionDialog: false,
    snackbar: {
      color: null,
      icon: null,
      mode: 'multi-line',
      text: null,
      timeout: 2000,
      title: null,
      visible: false,
    },
    loaderActive: false,
    missionsHeaders: [
      {
        text: "Área de Fumigación",
        align: "start",
        sortable: true,
        value: "name",
      },
      { text: "Vuelos", value: "flights" },
      { text: "Extensión del Terreno", value: "terrain" },
      { text: "Tipo de Boquilla", value: "nozzle" },
      { text: "Buffer (m)", value: "buffer" },
      { text: "Ángulo (°)", value: "angle" },
      { text: "Altura (m)", value: "height" },
      { text: "Ancho de Asperción (m)", value: "aspersion" },
      { text: "Velocidad (m/s)", value: "velocity" },
      { text: "Modalidad de Aplicación", value: "modality" },
      { text: "Litros/ha", value: "liters" },
      { text: "Gotas/cm2*", value: "drops" },
      { text: "Tiempo de Aplicación (min:ss)", value: "time" },
      { text: "Acciones", value: "actions", sortable: false },
    ],
    missionsTableSearch: "",
    isMissionEdition: false,
    deleteMissionDialog: false,
    selectedNozzle: {}
  }),
  async fetch() {
    this.loaderActive = true;

    try {
      await this.$store.dispatch('applications/getApplications');
      await this.$store.dispatch('applications/getMissions', {
        currentApplication: this.currentApplication
      });
      await this.$store.dispatch('nozzles/getNozzles');
    } catch (error) {
      this.activateSnackbar("Obteniendo la información " + error, false);
    }

    this.loaderActive = false;
  },
  computed: {
    ...mapGetters({
      missions: 'applications/missions',
      nozzles: 'nozzles/nozzles',
      getNozzle: "nozzles/getNozzle",
    }),
    currentApplication() {
      return this.$store.getters["applications/getApplication"](this.applicationId);
    }
  },
  methods: {
    async removeMission() {
      this.loaderActive = true;

      await this.$fire.firestore
        .collection("applications")
        .doc(this.currentApplication.id)
        .update({
          'missions': this.$fireModule.firestore.FieldValue.arrayRemove({
              name: this.missionToUpdate.name,
              flights: this.missionToUpdate.flights,
              terrain: this.missionToUpdate.terrain,
              nozzle: this.selectedNozzle.id,
              buffer: this.missionToUpdate.buffer,
              angle: this.missionToUpdate.angle,
              height: this.missionToUpdate.height,
              aspersion: this.missionToUpdate.aspersion,
              velocity: this.missionToUpdate.velocity,
              modality: this.missionToUpdate.modality,
              liters: this.missionToUpdate.liters,
              drops: this.missionToUpdate.drops,
              time: this.missionToUpdate.time
            })
        })
        .then(() => {
          this.activateSnackbar("Missión removida correctamente", true);
          this.loaderActive = false;

          this.deleteMissionDialog = false;
          this.$fetch();
        })
        .catch((error) => {
          console.error("Error removing document: ", error);

          this.activateSnackbar("Error removiendo Misión", false);
          this.loaderActive = false;
        });
    },
    openAddMissionDialog() {
      this.isMissionEdition = false;
      if(this.currentApplication){
        this.missionToAdd = {
          name: "",
          flights: "",
          terrain: "",
          nozzle: "",
          buffer: "",
          angle: "",
          height: "",
          aspersion: "",
          velocity: "",
          modality: "",
          liters: "",
          drops: "",
          time: ""
        }
        this.addMissionDialog = true;
      } else {
        this.activateSnackbar("Para poder agregar una misión debe crear la aplicación primero", false);
      }
    },
    closeAddMissionDialog() {
      this.addMissionDialog = false;
    },
    async addMission() {
      const isValid = await this.$refs.observer.validate();

      if (isValid) {
        this.addMissionDialog = false;
        this.loaderActive = true;
        
        await this.$fire.firestore
          .collection("applications")
          .doc(this.currentApplication.id)
          .update({
            'missions': this.$fireModule.firestore.FieldValue.arrayUnion({
              name: this.missionToAdd.name,
              flights: this.missionToAdd.flights,
              terrain: this.missionToAdd.terrain,
              nozzle: this.selectedNozzle.id,
              buffer: this.missionToAdd.buffer,
              angle: this.missionToAdd.angle,
              height: this.missionToAdd.height,
              aspersion: this.missionToAdd.aspersion,
              velocity: this.missionToAdd.velocity,
              modality: this.missionToAdd.modality,
              liters: this.missionToAdd.liters,
              drops: this.missionToAdd.drops,
              time: this.missionToAdd.time
            })
          })
          .then(() => {
            this.activateSnackbar("Misión guardada correctamente", true);
            this.loaderActive = false;

            this.$refs.observer.reset();

            this.$fetch();
          })
          .catch((error) => {
            console.error("Error removing document: ", error);

            this.activateSnackbar("Error guardando misión", false);
            this.loaderActive = false;
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
    openUpdateMissionDialog(data){
      this.addMissionDialog = true;

      this.missionToAdd = {
        name: data.name,
        flights: data.flights,
        terrain: data.terrain,
        nozzle: data.nozzle,
        buffer: data.buffer,
        angle: data.angle,
        height: data.height,
        aspersion: data.aspersion,
        velocity: data.velocity,
        modality: data.modality,
        liters: data.liters,
        drops: data.drops,
        time: data.time
      };

      this.isMissionEdition = true;

      this.missionToUpdate = {
        name: data.name,
        flights: data.flights,
        terrain: data.terrain,
        nozzle: data.nozzle,
        buffer: data.buffer,
        angle: data.angle,
        height: data.height,
        aspersion: data.aspersion,
        velocity: data.velocity,
        modality: data.modality,
        liters: data.liters,
        drops: data.drops,
        time: data.time
      };

      this.selectedNozzle = this.getNozzle(data.nozzle);
    },
    async updateMission() {
      const isValid = await this.$refs.observer.validate();

      if (isValid) {
        await this.removeMission()
          .then(() => {
            this.addMission();
          });
      }
    },
    openDeleteMissionDialog(data){
      this.deleteMissionDialog = true;

      this.missionToUpdate = {
        name: data.name,
        flights: data.flights,
        terrain: data.terrain,
        nozzle: data.nozzle,
        buffer: data.buffer,
        angle: data.angle,
        height: data.height,
        aspersion: data.aspersion,
        velocity: data.velocity,
        modality: data.modality,
        liters: data.liters,
        drops: data.drops,
        time: data.time
      };
    },
    closeDeleteMissionDialog(){
      this.deleteMissionDialog = false;
    },
    loadSelectedNozzle(id) {
      if(id){
        const currentNozzle = this.nozzles.filter((item) => {
          return item.id == id.toString();
        }).shift();
        this.selectedNozzle = currentNozzle;
      } else {
        this.selectedNozzle = null;
      }
    },
    onNozzleChange(id) {
      this.loadSelectedNozzle(id);
    },
    getNozzleName(nozzleId){
      const nozzleObj = this.getNozzle(nozzleId);
      return nozzleObj ? nozzleObj.name : '';
    }
  }
};
</script>
