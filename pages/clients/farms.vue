<template v-slot:default>
    <div>
    
    <v-simple-table>
        <thead>
            <tr>
            <th class="text-left">
                Finca
            </th>
            <th class="text-left">
                <v-icon small class="mr-2" @click="openAddFarmDialog()">
                mdi-plus
                </v-icon>
            </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in farmsByClient" :key="item.id">
            <td>{{ item.name }}</td>
            <td>
                <v-icon small @click="removeFarm(item.id)">
                mdi-delete
                </v-icon>
            </td>
            </tr>
        </tbody>
    </v-simple-table>

    <!-- Dialog to link farm -->
    <v-dialog v-model="addFarmDialog" persistent max-width="70%">
      <v-card>
        <v-card-title>
          <span class="headline">Agregar Finca</span>
          <v-spacer></v-spacer>
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
          ></v-autocomplete>
        </v-card-title>
        
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeAddFarmDialog()"
            >Cerrar</v-btn
          >
          <v-btn
            color="blue darken-1"
            text
            @click="addFarm()"
            >Agregar</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- End dialog to link farm -->

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
  name: "farms",
  props: ['currentClient'],
  data: () => ({
    addFarmDialog: false,
    selectedFarm: {},
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
    try {
      await this.$store.dispatch('farm/getFarmsByClient', {
        currentClient: this.currentClient
      });
      await this.$store.dispatch('farm/getFarms', {
        currentClient: this.currentClient
      });
    } catch (error) {
      this.activateSnackbar("Obteniendo la información " + error, false);
    }
  },
  computed: {
    farmsByClient(){
      return this.$store.getters['farm/farmsByClient'];
    },
    farms(){
      return this.$store.getters['farm/farms'];
    }
  },
  methods: {
    async removeFarm(farmId) {
      this.loaderActive = true;

      await this.$fire.firestore
        .collection("farms")
        .doc(farmId)
        .update({
          clientId: ""
        })
        .then(() => {
          this.$fetch();
          
          this.activateSnackbar("Finca agregada correctamente", true);
          this.loaderActive = false;
        })
        .catch((error) => {
          console.error("Error removing document: ", error);
          this.activateSnackbar("Error agregando finca", false);

          this.loaderActive = false;
        });
    },
    openAddFarmDialog() {
      if(this.currentClient){
        this.addFarmDialog = true;
      } else{
        this.activateSnackbar("Para poder agregar una finca debe crear el cliente primero", false);
      }
    },
    closeAddFarmDialog() {
      this.addFarmDialog = false;
    },
    async addFarm() {
      this.loaderActive = true;

      await this.$store.dispatch('farm/addFarmToClient', {
        farm: this.selectedFarm,
        currentClient: this.currentClient
      });
      this.$fetch();

      this.closeAddFarmDialog();

      this.loaderActive = false;
    },
    onFarmChange(id) {
      const currentFarm = this.farms.filter((item) => {
        return item.id == id.toString();
      })[0];
      this.selectedFarm = currentFarm;
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
