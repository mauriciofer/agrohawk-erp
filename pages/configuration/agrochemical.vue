<template v-slot:default>
    <div>

    <!-- Dialog to create/modify agrochemicals -->
    <ValidationObserver ref="agrochemicalsObserver" v-slot="{ invalid }" tag="form">
      <v-dialog v-model="addAgrochemicalDialog" persistent max-width="50%">
        <v-card>
          <v-card-title>
            <span class="headline">Agregar agroquímico</span>
          </v-card-title>
          <v-card-text>
            
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="Nombre comercial"
                    rules="required"
                  >
                    <v-text-field
                      label="Nombre comercial*"
                      v-model="agrochemical.commercialName"
                      :error-messages="errors"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="Tipo"
                    rules="required"
                  >
                    <v-select
                      :items="agrochemicalTypes"
                      item-text="name"
                      item-value="id"
                      :error-messages="errors"
                      label="Tipos"
                      v-model="agrochemical.type"
                      @change="onAgrochemicalTypeChange()"
                    ></v-select>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="Modo de acción"
                    rules="required"
                  >
                    <v-select
                      :items="currentActionModes"
                      item-text="name"
                      item-value="name"
                      :error-messages="errors"
                      label="Modo de acción"
                      v-model="agrochemical.actionMode"
                    ></v-select>
                  </ValidationProvider>
                </v-col>
              </v-row>
            </v-container>
            <small>*campos requeridos</small><br />
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeAgrochemicalsDialog()"
              >Cerrar</v-btn
            >
            <v-btn
              color="blue darken-1"
              text
              @click="createAgrochemical()"
              :disabled="invalid"
              >Crear</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </ValidationObserver>
    <!-- End Dialog agrochemicals -->

    <!-- Agrochemicals table -->
    <v-card elevation="2" outlined>
      <v-data-table
        :headers="agrochemicalsHeaders"
        :items="agrochemicals"
        :search="agrochemicalsSearch"
      >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Agroquímicos</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-text-field
            v-model="agrochemicalsSearch"
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
            @click="openAgrochemicalsDialog()"
          > 
            mdi-plus-circle
          </v-icon>
        </v-toolbar>
      </template>
        <template v-slot:[`item.actions`]="{ item }">
          <div >
            <v-icon  small @click="openDeleteAgrochemicalDialog(item)">
              mdi-delete
            </v-icon>
          </div>
        </template>     
        <template v-slot:[`item.type`]="{ item }">
          {{ getAgrochemicalTypeText(item.type) }}
        </template>               
      </v-data-table>
    </v-card>
    <!-- End Agrochemicals table -->

    <!-- Dialog to confirm deletion -->
    <v-dialog v-model="deleteAgrochemicalDialog" persistent max-width="50%">
      <v-card>
        <v-card-title class="headline"
          >Confirme la eliminación del agroquímico</v-card-title
        >
        <v-card-text>Esta acción no puede ser revertida</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="closeDeleteAgrochemicalDialog()"
            >Cancelar</v-btn
          >
          <v-btn color="green darken-1" text @click="deleteAgrochemical()"
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
  name: "agrochemicals",
  data: () => ({
    agrochemical: {
      commercialName: "",
      type: "",
      actionMode: "",
    },
    agrochemicalsSearch: '',
    addAgrochemicalDialog: false,
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
    agrochemicalsHeaders: [
      {
        text: "Nombre comercial",
        align: "start",
        sortable: true,
        value: "commercialName",
      },
      { text: "Tipo", value: "type" },
      { text: "Modo de acción", value: "actionMode" },
      { text: "Acciones", value: "actions", sortable: false }
    ],
    currentActionModes: [],
    agrochemicalsTableSearch: "",
    deleteAgrochemicalDialog: false
  }),
  async fetch() {
    this.loaderActive = true;

    try {
      await this.$store.dispatch('agrochemicals/getAgrochemicals');
      await this.$store.dispatch('agrochemicals/getAgrochemicalTypes');
      await this.$store.dispatch('agrochemicals/getActionModes');
    } catch (error) {
      this.activateSnackbar("Obteniendo la información " + error, false);
    }

    this.loaderActive = false;
  },
  computed: {
    ...mapGetters({
      getAgrochemicalTypeText: 'agrochemicals/getAgrochemicalTypeText',
      agrochemicals: 'agrochemicals/agrochemicals',
      agrochemicalTypes: 'agrochemicals/agrochemicalTypes',
      actionModes: 'agrochemicals/actionModes'
    })
  },
  methods: {
    async deleteAgrochemical() {
      this.loaderActive = true;

      await this.$fire.firestore
        .collection("agrochemicals")
        .doc(this.agrochemical.id)
        .delete()
        .then(() => {
          this.activateSnackbar("Agroquímico borrado correctamente", true)

          this.$fetch();
          
          this.deleteAgrochemicalDialog = false;
        })
        .catch((error) => {
          console.error(error);

          this.activateSnackbar("Error borrando el agroquímico", false);
        });

      this.loaderActive = false;
    },
    openAgrochemicalsDialog() {
      this.agrochemical = {
        commercialName: "",
        type: "",
        actionMode: "",
        dropSize: "",
        functionality: "",
        name: ""
      };
      this.addAgrochemicalDialog = true;
    },
    closeAgrochemicalsDialog() {
      this.addAgrochemicalDialog = false;
    },
    async createAgrochemical() {
      const isValid = await this.$refs.agrochemicalsObserver.validate();

      if (isValid) {
        this.addAgrochemicalDialog = false;
        this.loaderActive = true;
        
        await this.$fire.firestore
          .collection("agrochemicals")
          .add({
            commercialName: this.agrochemical.commercialName,
            type: this.agrochemical.type,
            actionMode: this.agrochemical.actionMode,
            dropSize: this.agrochemical.dropSize,
            functionality: this.agrochemical.functionality,
            name: this.agrochemical.name
          })
          .then(() => {
            this.activateSnackbar("Agroquímico guardado correctamente", true);
            this.loaderActive = false;

            this.$refs.agrochemicalsObserver.reset();

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
    openDeleteAgrochemicalDialog(data) {
      this.deleteAgrochemicalDialog = true;
      this.agrochemical = data;
    },
    closeDeleteAgrochemicalDialog(){
      this.deleteAgrochemicalDialog = false;
      this.agrochemical = {
        commercialName: "",
        type: "",
        actionMode: "",
        dropSize: "",
        functionality: "",
        name: ""
      };
    },

    onAgrochemicalTypeChange() {
      this.currentActionModes = []
      this.currentActionModes = this.actionModes.filter(
        mode => mode.type === this.agrochemical.type
      )
    },
  }
};
</script>
