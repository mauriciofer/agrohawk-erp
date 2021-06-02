<template>
  <div>
    <h1 class="ma-5">Detalle de Finca</h1>
    <v-row>
      <v-col cols="12" sm="6" md="6">
        <v-card class="mx-10" elevation="0">
          <v-card-title class="headline">{{
            this.currentFarm.name
          }}</v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" sm="6" md="2">
                <v-text-field
                  label="Area"
                  v-model="this.currentFarm.area"
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="Dirección"
                  v-model="this.fullAddress"
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="Señas"
                  v-model="this.currentFarm.address"
                  readonly
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="6">
        <v-card class="mx-10" elevation="0">
          <v-card-title class="headline">{{ this.clientName }}</v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="Correo"
                  v-model="this.currentClient.email"
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="Télefono"
                  v-model="this.currentClient.phone"
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="Celular"
                  v-model="this.currentFarm.mobile"
                  readonly
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-divider class="mx-10"></v-divider>
    <v-row class="mt-10">
      <v-col cols="12" sm="6" md="4">
        <v-card class="ml-10" elevation="2" outlined>
          <!-- Blocks table -->
          <v-data-table
            :headers="blockHeaders"
            :items="this.blocks"
            :items-per-page="10"
            :search="blocksTableSearch"
          >
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title>Bloques</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-text-field
                  v-model="blocksTableSearch"
                  append-icon="mdi-magnify"
                  label="Buscar"
                  single-line
                  hide-details
                ></v-text-field>
                <v-icon
                  large
                  class="ml-5"
                  color="primary"
                  @click="openAddBlockDialog()"
                >
                  mdi-plus-circle
                </v-icon>
              </v-toolbar>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
              <v-icon small class="mr-2" @click="openUpdateBlockDialog(item)">
                mdi-pencil
              </v-icon>
              <v-icon small @click="openDeleteBlockDialog(item)">
                mdi-delete
              </v-icon>
            </template>
          </v-data-table>
          <!-- End blocks table -->
        </v-card>
      </v-col><v-col cols="12" sm="6" md="8">
        <v-card class="mr-10" elevation="2" outlined>
          <!-- Crops table -->
          <v-data-table
            :headers="blockHeaders"
            :items="this.blocks"
            :items-per-page="10"
            :search="blocksTableSearch"
          >
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title>Cultivos</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-text-field
                  v-model="blocksTableSearch"
                  append-icon="mdi-magnify"
                  label="Buscar"
                  single-line
                  hide-details
                ></v-text-field>
                <v-icon
                  large
                  class="ml-5"
                  color="primary"
                  @click="openCreateBlockDialog()"
                >
                  mdi-plus-circle
                </v-icon>
              </v-toolbar>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
              <v-icon small class="mr-2" @click="openUpdateBlockDialog(item)">
                mdi-pencil
              </v-icon>
              <v-icon small @click="openDeleteBlockDialog(item)">
                mdi-delete
              </v-icon>
            </template>
          </v-data-table>
          <!-- End crops table -->
        </v-card>
      </v-col>
    </v-row>
    <!-- Dialog to create/modify block -->

    <ValidationObserver ref="observer" v-slot="{ invalid }" tag="form">
      <v-dialog v-model="addBlockDialog" persistent max-width="50%">
        <v-card>
          <v-card-title>
            <span class="headline">{{
              isEdition ? "Editar bloque" : "Agregar bloque"
            }}</span>
            <v-spacer></v-spacer>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="6">
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="Nombre"
                    rules="required"
                  >
                    <v-text-field
                      label="Nombre del bloque"
                      v-model="block.name"
                      :error-messages="errors"
                      required
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="Área del bloque"
                    rules="required"
                  >
                    <v-text-field
                      label="Área del bloque"
                      type="number"
                      v-model="block.area"
                      suffix="ha"
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
            <v-btn color="blue darken-1" text @click="closeAddBlockDialog()"
              >Cerrar</v-btn
            >
            <v-btn
              color="blue darken-1"
              text
              @click="addBlock()"
              v-if="!isEdition"
              :disabled="invalid"
              >Agregar</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </ValidationObserver>
    <!-- End dialog to create/modify block -->

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
import { mapGetters } from "vuex";
export default {
  name: "Farm_Detail",
  data: () => ({
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
    currentModules: [],
    isEdition: false,
    addBlockDialog: false,
    blocksTableSearch: "",
    blockHeaders: [
      {
        text: "Nombre",
        align: "start",
        sortable: true,
        value: "name",
      },
      { text: "Area", value: "area" },
      { text: "Acciones", value: "actions", sortable: false },
    ],
    block: {
      name: "",
      area: 0,
    },
  }),
  async fetch() {
    this.loaderActive = true;
    try {
      await this.$store.dispatch("blocks/getFarmBlocks", {
        farmId: this.$route.params.id
      });
    } catch (error) {
      console.log(error);
      this.activateSnackbar("Obteniendo la información " + error, false);
    }
    this.loaderActive = false;
  },
  computed: {
    ...mapGetters({
      getProvinciaText: "locations/getProvinciaText",
      getCantonText: "locations/getCantonText",
      getDistritoText: "locations/getDistritoText",
    }),
    currentFarm() {
      return this.$store.getters["farm/getFarm"](this.$route.params.id);
    },
    blocks() {
      return this.$store.getters["blocks/farmBlocks"];
    },
    currentClient() {
      return this.$store.getters["clients/getClient"](this.$route.query.client);
    },
    provincias(){
      return this.$store.getters['locations/provincias'];
    },
    cantones(){
      return this.$store.getters['locations/cantones'];
    },
    distritos(){
      return this.$store.getters['locations/distritos'];
    },
    clientName() {
      const name =
        this.currentClient.type == 1
          ? this.currentClient.firstName +
            this.currentClient.secondName +
            this.currentClient.firsLastname +
            this.currentClient.secondLastname
          : this.currentClient.firstName;
      return name;
    },
    fullAddress() {
      const address = this.getDistritoText(this.currentFarm.distrito) +
        " de " +
        this.getCantonText(this.currentFarm.canton) +
        ", " +
        this.getProvinciaText(this.currentFarm.provincia);
        return address;
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
  },
  methods: {
    openAddBlockDialog() {
      this.addBlockDialog = true;
      this.isEdition = false;
      this.block = {
        name: "",
        area: "",
      };
    },

    closeAddBlockDialog() {
      this.addBlockDialog = false;
      this.$refs.observer.reset();
    },

    async addBlock() {
      const isValid = await this.$refs.observer.validate();
      if (isValid) {
        this.loaderActive = true;

        this.$fire.firestore
          .collection("blocks")
          .add({
            farmId: this.currentFarm.id,
            name: this.block.name,
            area: this.block.area
          })
          .then(() => {
            this.activateSnackbar("Bloque agregado correctamente", true);

            this.$fetch();

            this.$refs.observer.reset();
            this.addBlockDialog = false;
          })
          .catch((error) => {
            console.error(error);
            this.activateSnackbar("Error agregando bloque", false);
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
    },
  },
};
</script>
