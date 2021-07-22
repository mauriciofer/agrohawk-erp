<template v-slot:default>
    <div>
    
    <v-simple-table>
        <thead>
            <tr>
              <th class="text-left">
                Nombre Comercial
              </th>
              <th class="text-left">
                Tipo de Agroquímico
              </th>
              <th class="text-left">
                Área de Aplicación
              </th>
              <th class="text-left">
                Dosis Utilizadda
              </th>
              <th class="text-left">
                Volúmen de Agua utilizado (L)
              </th>
              <th class="text-left">
                  <v-icon small class="mr-2" @click="openAddProvisionDialog()">
                  mdi-plus
                  </v-icon>
              </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in provisions" :key="item.name">
            <td>{{ item.name }}</td>
            <td>{{ item.type }}</td>
            <td>{{ item.area }}</td>
            <td>{{ item.dose }}</td>
            <td>{{ item.volume }}</td>
            <td>
                <v-icon small @click="removeProvision(item)">
                mdi-delete
                </v-icon>
            </td>
            </tr>
        </tbody>
    </v-simple-table>

    <!-- Dialog to add Provision -->
    <v-dialog v-model="addProvisionDialog" persistent max-width="70%">
      <ValidationObserver
        ref="observer"
        v-slot="{ invalid }"
        tag="form"
        @submit.prevent="submit()"
      >
      <v-card>
        <v-card-title>
          <span class="headline">Agregar Disposición</span>
          <v-spacer></v-spacer>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="3">
                <ValidationProvider
                  v-slot="{ errors }"
                  name="Nombre Comercial"
                  rules="required"
                >
                  <v-text-field
                    label="Nombre Comercial *"
                    v-model="provisionToAdd.name"
                    required
                    :error-messages="errors"
                  ></v-text-field>
                </ValidationProvider>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <ValidationProvider
                  v-slot="{ errors }"
                  name="Tipo de Agroquimico"
                  rules="required"
                >
                  <v-text-field
                    label="Tipo de Agroquimico *"
                    v-model="provisionToAdd.type"
                    required
                    :error-messages="errors"
                  ></v-text-field>
                </ValidationProvider>
              </v-col>

              <v-col cols="12" sm="6" md="3">
                <ValidationProvider
                  v-slot="{ errors }"
                  name="Área de Aplicación (ha)"
                  rules="required"
                >
                  <v-text-field
                    label="Area de Aplicación (ha) *"
                    v-model="provisionToAdd.area"
                    :type="'number'"
                    hint="Ingrese el area en hectáreas"
                    required
                    :error-messages="errors"
                  ></v-text-field>
                </ValidationProvider>
              </v-col>

              <v-col cols="12" sm="6" md="3">
                <ValidationProvider
                  v-slot="{ errors }"
                  name="Dosis Utilizada"
                  rules="required"
                >
                  <v-text-field
                    label="Dosis Utilizada"
                    v-model="provisionToAdd.dose"
                    :type="'number'"
                    hint="Ingrese la dosis en mililitros"
                    required
                    :error-messages="errors"
                  ></v-text-field>
                </ValidationProvider>
              </v-col>

              <v-col cols="12" sm="6" md="3">
                <ValidationProvider
                  v-slot="{ errors }"
                  name="Volumen de agua utilizado (L)"
                  rules="required"
                >
                  <v-text-field
                    label="Volumen de agua utilizado (L)"
                    v-model="provisionToAdd.volume"
                    :type="'number'"
                    hint="Ingrese la el volumen en litros"
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
            @click="closeAddProvisionDialog()"
          >Cerrar</v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="addProvision()"
            :disabled="invalid"
          >Agregar</v-btn>
        </v-card-actions>
      </v-card>
      </ValidationObserver>
    </v-dialog>
    <!-- End dialog to add Provision -->

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
  name: "provisions",
  props: ['applicationId'],
  data: () => ({
    provisionToAdd: {
      name: "",
      type: "",
      area: "",
      dose: "",
      volume: ""
    },
    addProvisionDialog: false,
    snackbar: {
      color: null,
      icon: null,
      mode: 'multi-line',
      text: null,
      timeout: 2000,
      title: null,
      visible: false,
    },
    loaderActive: false
  }),
  async fetch() {
    this.loaderActive = true;

    try {
      await this.$store.dispatch('applications/getApplications');
      await this.$store.dispatch('applications/getProvisions', {
        currentApplication: this.currentApplication
      });
    } catch (error) {
      this.activateSnackbar("Obteniendo la información " + error, false);
    }

    this.loaderActive = false;
  },
  computed: {
    currentApplication() {
      return this.$store.getters["applications/getApplication"](this.applicationId);
    },
    provisions(){
      return this.$store.getters['applications/provisions'];
    }
  },
  methods: {
    async removeProvision(provision) {
      this.loaderActive = true;

      await this.$fire.firestore
        .collection("applications")
        .doc(this.currentApplication.id)
        .update({
          'provisions': this.$fireModule.firestore.FieldValue.arrayRemove({
              name: provision.name,
              type: provision.type,
              area: provision.area,
              dose: provision.dose,
              volume: provision.volume
            })
        })
        .then(() => {
          this.activateSnackbar("Disposición removida correctamente", true);
          this.loaderActive = false;

          this.$fetch();
        })
        .catch((error) => {
          console.error("Error removing document: ", error);

          this.activateSnackbar("Error removiendo disposición", false);
          this.loaderActive = false;
        });
    },
    openAddProvisionDialog() {
      if(this.applicationId){
        this.addProvisionDialog = true;
      } else {
        this.activateSnackbar("Para poder agregar una disposición debe crear la aplicación primero", false);
      }
    },
    closeAddProvisionDialog() {
      this.addProvisionDialog = false;
    },
    async addProvision() {
      const isValid = await this.$refs.observer.validate();
      if (isValid) {
        this.addProvisionDialog = false;
        this.loaderActive = true;
        
        await this.$fire.firestore
          .collection("applications")
          .doc(this.currentApplication.id)
          .update({
            'provisions': this.$fireModule.firestore.FieldValue.arrayUnion({
              name: this.provisionToAdd.name,
              type: this.provisionToAdd.type,
              area: this.provisionToAdd.area,
              dose: this.provisionToAdd.dose,
              volume: this.provisionToAdd.volume
            })
          })
          .then(() => {
            this.activateSnackbar("Disposición creada correctamente", true);
            this.loaderActive = false;

            this.$refs.observer.reset();

            this.$fetch();
          })
          .catch((error) => {
            console.error("Error removing document: ", error);

            this.activateSnackbar("Error creando disposición", false);
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
    }
  }
};
</script>
