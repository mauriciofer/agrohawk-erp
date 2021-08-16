<template v-slot:default>
    <div>

    <!-- Dialog to create/modify nozzles -->
    <ValidationObserver ref="nozzlesObserver" v-slot="{ invalid }" tag="form">
      <v-dialog v-model="addNozzleDialog" persistent max-width="50%">
        <v-card>
          <v-card-title>
            <span class="headline">Agregar Boquilla</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="Boquilla"
                    rules="required"
                  >
                    <v-text-field
                      label="Boquilla*"
                      v-model="nozzle.name"
                      :error-messages="errors"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="Tipo de Asperción"
                    rules="required"
                  >
                    <v-text-field
                      label="Tipo de Aspersión*"
                      v-model="nozzle.aspersionType"
                      :error-messages="errors"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="Clasificación de la Gota"
                    rules="required"
                  >
                    <v-text-field
                      label="Clasificación de la Gota*"
                      v-model="nozzle.dropClasification"
                      :error-messages="errors"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="Tamaño de Gota (Micras)"
                    rules="required"
                  >
                    <v-text-field
                      label="Tamaño de Gota (Micras)*"
                      v-model="nozzle.dropSize"
                      :error-messages="errors"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="Coloración"
                    rules="required"
                  >
                    <v-text-field
                      label="Coloración*"
                      v-model="nozzle.coloration"
                      :error-messages="errors"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="Funcionaidad aplicación de agroquímicos"
                    rules="required"
                  >
                    <v-text-field
                      label="Funcionaidad aplicación de agroquímicos*"
                      v-model="nozzle.functionality"
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
            <v-btn color="blue darken-1" text @click="closeNozzlesDialog()"
              >Cerrar</v-btn
            >
            <v-btn
              color="blue darken-1"
              text
              @click="createNozzle()"
              :disabled="invalid"
              >Crear</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </ValidationObserver>
    <!-- End Dialog nozzles -->

    <!-- Nozzles table -->
    <v-card elevation="2" outlined>
      <v-data-table
        :headers="nozzlesHeaders"
        :items="nozzles"
        :search="nozzlesSearch"
      >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Nozzles</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-text-field
            v-model="nozzlesSearch"
            append-icon="mdi-magnify"
            label="Buscar"
            single-line
            hide-details
          ></v-text-field>
          <v-spacer></v-spacer>
          <v-icon 
            large
            class="mr-2"
            color="primary"
            @click="openNozzlesDialog()"
          > 
            mdi-plus-circle
          </v-icon>
        </v-toolbar>
      </template>
        <template v-slot:[`item.actions`]="{ item }">
          <div >
            <v-icon  small @click="openDeleteNozzleDialog(item)">
              mdi-delete
            </v-icon>
          </div>
        </template>                    
      </v-data-table>
    </v-card>
    <!-- End Nozzles table -->

    <!-- Dialog to confirm deletion -->
    <v-dialog v-model="deleteNozzleDialog" persistent max-width="50%">
      <v-card>
        <v-card-title class="headline"
          >Confirme la eliminación de la boquilla</v-card-title
        >
        <v-card-text>Esta acción no puede ser revertida</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="closeDeleteNozzleDialog()"
            >Cancelar</v-btn
          >
          <v-btn color="green darken-1" text @click="deleteNozzle()"
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
  name: "nozzles",
  data: () => ({
    nozzle: {
      aspersionType: "",
      coloration: "",
      dropClasification: "",
      dropSize: "",
      functionality: "",
      name: ""
    },
    nozzlesSearch: '',
    addNozzleDialog: false,
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
    nozzlesHeaders: [
      {
        text: "Boquilla",
        align: "start",
        sortable: true,
        value: "name",
      },
      { text: "Tipo de Asperción", value: "aspersionType" },
      { text: "Clasificación de la Gota", value: "dropClasification" },
      { text: "Tamaño de Gotas (Micras)", value: "dropSize" },
      { text: "Coloración", value: "coloration" },
      { text: "Funcionalidad aplicación de agroquímicos", value: "functionality" },
      { text: "Acciones", value: "actions", sortable: false }
    ],
    nozzlesTableSearch: "",
    deleteNozzleDialog: false
  }),
  async fetch() {
    this.loaderActive = true;

    try {
      await this.$store.dispatch('nozzles/getNozzles');
    } catch (error) {
      this.activateSnackbar("Obteniendo la información " + error, false);
    }

    this.loaderActive = false;
  },
  computed: {
    ...mapGetters({
      nozzles: 'nozzles/nozzles'
    })
  },
  methods: {
    async deleteNozzle() {
      this.loaderActive = true;

      await this.$fire.firestore
        .collection("nozzles")
        .doc(this.nozzle.id)
        .delete()
        .then(() => {
          this.activateSnackbar("Boquilla borrada correctamente", true)

          this.$fetch();
          
          this.deleteNozzleDialog = false;
        })
        .catch((error) => {
          console.error(error);

          this.activateSnackbar("Error borrando la boquilla", false);
        });

      this.loaderActive = false;
    },
    openNozzlesDialog() {
      this.nozzle = {
        aspersionType: "",
        coloration: "",
        dropClasification: "",
        dropSize: "",
        functionality: "",
        name: ""
      };
      this.addNozzleDialog = true;
    },
    closeAddNozzleDialog() {
      this.addNozzleDialog = false;
    },
    async createNozzle() {
      const isValid = await this.$refs.nozzlesObserver.validate();

      if (isValid) {
        this.addNozzleDialog = false;
        this.loaderActive = true;
        
        await this.$fire.firestore
          .collection("nozzles")
          .add({
            aspersionType: this.nozzle.aspersionType,
            coloration: this.nozzle.coloration,
            dropClasification: this.nozzle.dropClasification,
            dropSize: this.nozzle.dropSize,
            functionality: this.nozzle.functionality,
            name: this.nozzle.name
          })
          .then(() => {
            this.activateSnackbar("Boquilla guardada correctamente", true);
            this.loaderActive = false;

            this.$refs.nozzlesObserver.reset();

            this.$fetch();
          })
          .catch((error) => {
            console.error("Error saving document: ", error);

            this.activateSnackbar("Error guardando boquilla", false);
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
    openDeleteNozzleDialog(data) {
      this.deleteNozzleDialog = true;
      this.nozzle = data;
    },
    closeDeleteNozzleDialog(){
      this.deleteNozzleDialog = false;
      this.nozzle = null;
    }
  }
};
</script>
