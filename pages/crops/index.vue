<template>
  <div>
    <h1 class="ma-10">Cultivos</h1>

    <!-- Crops -->

    <!-- Dialog to create/modify Crops -->

    <ValidationObserver
      ref="observer"
      v-slot="{ invalid }"
      tag="form"
      @submit.prevent="submit()"
    >
      <v-dialog v-model="cropDialog" persistent max-width="70%">
        <v-card>
          <v-card-title>
            <span class="headline">{{
              isEdition ? "Editar cultivo" : "Agregar cultivo"
            }}</span>
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
                      v-model="crop.type"
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
                    v-model="startDateModal"
                    :return-value.sync="crop.startDate"
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
                          v-model="crop.startDate"
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
                      v-model="crop.startDate"
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
                        @click="$refs.startDateDialog.save(crop.startDate)"
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
                    :return-value.sync="crop.harvestDate"
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
                          v-model="crop.harvestDate"
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
                      v-model="crop.harvestDate"
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
                        @click="$refs.harvestDateDialog.save(crop.harvestDate)"
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
                      v-model="crop.cycle"
                      :error-messages="errors"
                      required
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" sm="6" md="9">
                  <v-divider></v-divider>
                  <v-subheader>Aplicaciones</v-subheader>
                  <v-simple-table>
                    <template v-slot:default>
                      <thead>
                        <tr>
                          <th class="text-left">
                            Tipo de aplicación
                          </th>
                          <th class="text-left">
                            Fecha
                          </th>
                          <th class="text-left">
                            Hora
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="item in fakeAplications" :key="item.id">
                          <td>{{ item.type }}</td>
                          <td>{{ item.date }}</td>
                          <td>{{ item.time }}</td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </v-col>
              </v-row>
            </v-container>
            <small>*campos requeridos</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeCropDialog()"
              >Cerrar</v-btn
            >
            <v-btn
              color="blue darken-1"
              text
              @click="createCrop()"
              v-if="!isEdition"
              :disabled="invalid"
              >Crear</v-btn
            >
            <v-btn
              color="blue darken-1"
              text
              @click="updateCrop()"
              v-if="isEdition"
              :disabled="invalid"
              >Modificar</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </ValidationObserver>
    <!-- End dialog to create/modify client -->

    <!-- Dialog to confirm deletion -->
    <v-dialog v-model="deleteCropDialog" persistent max-width="50%">
      <v-card>
        <v-card-title class="headline"
          >Confirme la eliminación del cultivo</v-card-title
        >
        <v-card-text>Esta acción no puede ser revertida</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="closeDeleteCropDialog()"
            >Cancelar</v-btn
          >
          <v-btn color="green darken-1" text @click="deleteCrop()"
            >Eliminar</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- End Dialog to confirm deletion -->

    <v-card class="ma-10" elevation="2" outlined>
      <!-- Crops table -->
      <v-data-table
        :headers="filteredHeaders"
        :items="crops"
        :items-per-page="5"
        :search="cropsTableSearch"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Cultivos</v-toolbar-title>

            <v-divider class="mx-4" inset vertical></v-divider>

            <v-text-field
              v-model="cropsTableSearch"
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
              @click="openCreateCropDialog()"
              v-if="isEditor"
            >
              <v-icon left>mdi-plus</v-icon>Agregar</v-btn
            >
          </v-toolbar>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="openUpdateCropDialog(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="openDeleteCropDialog(item)">
            mdi-delete
          </v-icon>
        </template>
        <template v-slot:[`item.type`]="{ item }">
          {{ getCropTypeText(item.type) }}
        </template>
      </v-data-table>
      <!-- End Crops table -->
    </v-card>
    <!-- End Crops -->

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
        <v-btn icon @click="snackbar.visible = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-layout>
    </v-snackbar>
    <!-- End Snackbar -->
    <v-overlay :value="loaderActive" :z-index="203">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
export default {
  name: "crops",
  data: () => ({
    cropDialog: false,
    deleteCropDialog: false,
    currentCrop: null,
    crop: {
      type: 1,
      startDate: new Date().toISOString().substr(0, 10),
      harvestDate: new Date().toISOString().substr(0, 10),
      aplications: [],
      cycle: "",
    },
    cropTypeList: [
      { text: "Lechuga", value: 1 }, //TODO: implement a croptype module CRUD
      { text: "Chayote", value: 2 },
    ],
    cropsTableHeaders: [
      {
        text: "Tipo de cultivo",
        align: "start",
        sortable: true,
        value: "type",
      },
      { text: "Fecha de inicio", value: "startDate" },
      { text: "Fecha de cosecha", value: "harvestDate" },
      { text: "Ciclo de cultivo", value: "cycle" },
      { text: "Acciones", value: "actions", sortable: false },
    ],
    cropsTableSearch: "",
    snackbar: {
      color: null,
      icon: null,
      mode: "multi-line",
      text: null,
      timeout: 2000,
      title: null,
      visible: false,
    },
    loaderActive: false,
    isEdition: false,
    startDateMenu: false,
    startDateModal: false,
    harvestDateMenu: false,
    harvestDateModal: false,
    fakeAplications: [
      {
        id: 1,
        type: "Convencional",
        date: new Date().toISOString().substr(0, 10),
        time: "12:20",
      }, //TODO: implement aplications module
      {
        id: 2,
        type: "Convencional",
        date: new Date().toISOString().substr(0, 10),
        time: "12:20",
      }, //TODO: implement aplications module
    ],
  }),
  async fetch() {
    this.loaderActive = true;
    try {
      await this.$store.dispatch("crops/getCrops");
    } catch (error) {
      console.log(error);
      this.activateSnackbar("Obteniendo la información " + error, false);
    }
    this.loaderActive = false;
  },
  computed: {
    isEditor() {
      const filteredModules = this.$store.getters["authentication/currentUser"]
        .modules
        ? this.$store.getters["authentication/currentUser"].modules.filter(
            (item) => {
              return item.read && item.write;
            }
          )
        : [];
      return JSON.stringify(filteredModules).includes("crops");
    },
    filteredHeaders() {
      const readerHeaders = this.cropsTableHeaders.slice(
        0,
        this.cropsTableHeaders.length - 1
      );
      return this.isEditor ? this.cropsTableHeaders : readerHeaders;
    },
    crops() {
      return this.$store.getters["crops/crops"];
    },
  },
  methods: {
    openCreateCropDialog() {
      this.cropDialog = true;
      this.isEdition = false;
      this.crop = {
        type: 1,
        startDate: "",
        harvestDate: "",
        aplications: [],
        cycle: "",
      };
    },
    openUpdateCropDialog(data) {
      this.currentCrop = data;
      this.isEdition = true;
      this.cropDialog = true;

      this.crop = {
        type: data.type,
        startDate: data.startDate,
        harvestDate: data.harvestDate,
        aplications: data.aplications,
        cycle: data.cycle,
      };
    },

    closeCropDialog() {
      this.cropDialog = false;
      this.$refs.observer.reset();
    },

    openDeleteCropDialog(item) {
      this.deleteCropDialog = true;
      this.currentCrop = item;
    },

    closeDeleteCropDialog() {
      this.deleteCropDialog = false;
      this.currentCrop = null;
    },

    async createCrop() {
      const isValid = await this.$refs.observer.validate();

      console.log(isValid);
      console.log(this.crop);

      if (isValid) {
        this.loaderActive = true;
        await this.$fire.firestore
          .collection("crops")
          .add({
            type: this.crop.type,
            startDate: this.crop.startDate,
            harvestDate: this.crop.harvestDate,
            aplications: [],
            cycle: this.crop.cycle,
          })
          .then(() => {
            this.activateSnackbar("Cultivo creado.", true);
          })
          .catch((error) => {
            console.error(error);
            this.activateSnackbar("Creando cultivo", false);
          });

        this.loaderActive = false;
        this.$fetch();
        this.cropDialog = false;
        this.$refs.observer.reset();
      }
    },

    async updateCrop() {
      const isValid = await this.$refs.observer.validate();

      if (isValid) {
        this.loaderActive = true;
        await this.$fire.firestore
          .collection("crops")
          .doc(this.currentCrop.id)
          .update({
            type: this.crop.type,
            startDate: this.crop.startDate,
            harvestDate: this.crop.harvestDate,
            aplications: [],
            cycle: this.crop.cycle,
          })
          .then(() => {
            this.activateSnackbar("Cultivo modificado.", true);
          })
          .catch((error) => {
            console.error("Error updating document: ", error);
            this.activateSnackbar("Modificando cultivo", false);
          });

        this.loaderActive = false;
        this.$fetch();
        this.cropDialog = false;
        this.$refs.observer.reset();
      }
    },

    async deleteCrop() {
      this.loaderActive = true;
      await this.$fire.firestore
        .collection("crops")
        .doc(this.currentCrop.id)
        .delete()
        .then(() => {
          this.activateSnackbar("Cultivo borrado.", true);
          this.loaderActive = false;
        })
        .catch((error) => {
          console.error("Error borrando cultivo: ", error);
          this.activateSnackbar("Borrando cultivo", false);
          this.loaderActive = false;
        });
      this.$fetch();
      this.deleteCropDialog = false;
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

    getCropTypeText(type) {
      return this.cropTypeList.filter((item) => {
        return item.value == type;
      })[0].text;
    },
  },
};
</script>
