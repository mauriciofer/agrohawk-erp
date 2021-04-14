<template>
  <div>
    <h1 class="ma-10">Cultivos</h1>

    <!-- Crops -->

    <!-- Dialog to create/modify Crops -->

    <!-- <ValidationObserver ref="observer" v-slot="{ invalid }" tag="form" @submit.prevent="submit()">
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
                  <ValidationProvider v-slot="{ errors }" name="Tipo de cultivo" rules="required">
                    <v-select
                      text="text"
                      :items="clientTypeList"
                      v-model="crop.clientType"
                      name="clientType"
                      label="Tipo de cliente *"
                      :error-messages="errors"
                      required
                    ></v-select>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <ValidationProvider v-slot="{ errors }" name="Cedula" rules="required">
                    <v-text-field
                      label="Cédula *"
                      v-model="client.identification"
                      required
                      :error-messages="errors"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <ValidationProvider v-slot="{ errors }" name="Nombre" rules="required">
                    <v-text-field
                      label="Nombre *"
                      v-model="client.firstName"
                      required
                      :error-messages="errors"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                
                <v-col cols="12" sm="6" md="3" v-if="client.clientType === 1">
                  <ValidationProvider v-slot="{ errors }" name="Segundo nombre">
                    <v-text-field
                      label="Segundo nombre"
                      v-model="client.secondName"
                      :error-messages="errors"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" sm="6" md="3" v-if="client.clientType === 1">
                  <ValidationProvider v-slot="{ errors }" name="Primer apellido">
                    <v-text-field
                      label="Apellido"
                      v-model="client.firstLastname"
                      :error-messages="errors"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" sm="6" md="3" v-if="client.clientType === 1">
                  <ValidationProvider v-slot="{ errors }" name="Segundo apellido">
                    <v-text-field
                      label="Segundo Apellido"
                      v-model="client.secondLastname"
                      :error-messages="errors"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>

                <v-col cols="12" sm="6" md="3">
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="Teléfono"
                    rules="required|digits:8"
                  >
                    <v-text-field
                      label="Teléfono *"
                      v-model="client.phone"
                      :type="'number'"
                      hint="8 números"
                      required
                      :error-messages="errors"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="Celular"
                    rules="required|digits:8"
                  >
                    <v-text-field
                      label="Celular *"
                      v-model="client.mobile"
                      :type="'number'"
                      hint="8 números"
                      required
                      :error-messages="errors"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <ValidationProvider v-slot="{ errors }" name="Email" rules="required|email">
                    <v-text-field
                      label="Email *"
                      v-model="client.email"
                      :error-messages="errors"
                      required
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>

                <v-col cols="12" sm="6" md="3">
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="Provincia"
                    rules="required"
                  >
                    <v-select
                      :items="provincias"
                      item-text="provincia"
                      item-value="id"
                      :error-messages="errors"
                      label="Provincias *"
                      v-model="client.provincia"
                      @change="getCantones($event)"
                    ></v-select>
                  </ValidationProvider>
                </v-col>

                <v-col cols="12" sm="6" md="3">
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="Cantón"
                    rules="required"
                  >
                    <v-select
                      :items="cantones"
                      item-text="canton"
                      item-value="id"
                      :error-messages="errors"
                      label="Cantones *"
                      v-model="client.canton"
                      @change="getDistritos($event)"
                    ></v-select>
                  </ValidationProvider>
                </v-col>

                <v-col cols="12" sm="6" md="3">
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="Distrito"
                    rules="required"
                  >
                    <v-select
                      :items="distritos"
                      item-text="distrito"
                      item-value="id"
                      :error-messages="errors"
                      label="Distritos *"
                      v-model="client.distrito"
                    ></v-select>
                  </ValidationProvider>
                </v-col>

                <v-col cols="12" sm="6" md="3">
                  <ValidationProvider v-slot="{ errors }" name="Dirección" rules="required">
                    <v-text-field
                      label="Dirección *"
                      v-model="client.address"
                      :error-messages="errors"
                      required
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>

              </v-row>

              <v-row>
                <v-col cols="12" sm="6" md="12">
                  <v-divider></v-divider>
                  <v-subheader>Contactos</v-subheader>
                  <v-simple-table>
                    <template v-slot:default>
                      <thead>
                        <tr>
                          <th class="text-left">
                            Principal
                          </th>
                          <th class="text-left">
                            Tipo
                          </th>
                          <th class="text-left">
                            Nombre
                          </th>
                          <th class="text-left">
                            Apellidos
                          </th>
                          <th class="text-left">
                            email
                          </th>
                          <th class="text-left">
                            Teléfono
                          </th>
                          <th class="text-left">
                            Celular
                          </th>
                          <th class="text-left">
                            Señas
                          </th>
                          <th class="text-left">
                            <v-icon small class="mr-2" @click="createContact(client.identification)">
                              mdi-plus
                            </v-icon>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="item in currentContacts" :key="item.id">
                          <td>
                            <v-edit-dialog
                              :return-value.sync="item.isPrincipal"
                              @save="saveContact(item.id)"
                              @cancel="cancelContact"
                              @open="openContact"
                              @close="closeContact"
                              large
                            > 
                              <v-icon small class="mr-2" v-if="item.isPrincipal">
                                mdi-check
                              </v-icon>
                              <v-icon small class="mr-2" v-if="!item.isPrincipal">
                                mdi-close
                              </v-icon>
                              <template v-slot:input>
                                <v-container
                                  class="px-0"
                                  fluid
                                >
                                  <v-checkbox
                                    v-model="item.isPrincipal"
                                    :label="`Es Principal: ${item.isPrincipal ? 'Sí' : 'No'}`"
                                  ></v-checkbox>
                                </v-container>
                              </template>
                            </v-edit-dialog>
                          </td>
                          <td>
                            <v-edit-dialog
                              :return-value.sync="item.type"
                              @save="saveContact(item.id)"
                              @cancel="cancelContact"
                              @open="openContact"
                              @close="closeContact"
                              large
                            > {{ item.type }}
                              <template v-slot:input>
                                <v-text-field
                                  v-model="item.type"
                                  label="Edit"
                                  single-line
                                ></v-text-field>
                              </template>
                            </v-edit-dialog>
                          </td>
                          <td>
                            <v-edit-dialog
                              :return-value.sync="item.name"
                              @save="saveContact(item.id)"
                              @cancel="cancelContact"
                              @open="openContact"
                              @close="closeContact"
                              large
                            > {{ item.name }}
                              <template v-slot:input>
                                <v-text-field
                                  v-model="item.name"
                                  label="Edit"
                                  single-line
                                ></v-text-field>
                              </template>
                            </v-edit-dialog>
                          </td>
                          <td>
                            <v-edit-dialog
                              :return-value.sync="item.lastName"
                              @save="saveContact(item.id)"
                              @cancel="cancelContact"
                              @open="openContact"
                              @close="closeContact"
                              large
                            > {{ item.lastName }}
                              <template v-slot:input>
                                <v-text-field
                                  v-model="item.lastName"
                                  label="Edit"
                                  single-line
                                ></v-text-field>
                              </template>
                            </v-edit-dialog>
                          </td>
                          <td>
                            <v-edit-dialog
                              :return-value.sync="item.email"
                              @save="saveContact(item.id)"
                              @cancel="cancelContact"
                              @open="openContact"
                              @close="closeContact"
                              large
                            > {{ item.email }}
                              <template v-slot:input>
                                <v-text-field
                                  v-model="item.email"
                                  label="Edit"
                                  single-line
                                ></v-text-field>
                              </template>
                            </v-edit-dialog>
                          </td>
                          <td>
                            <v-edit-dialog
                              :return-value.sync="item.phone"
                              @save="saveContact(item.id)"
                              @cancel="cancelContact"
                              @open="openContact"
                              @close="closeContact"
                              large
                            > {{ item.phone }}
                              <template v-slot:input>
                                <v-text-field
                                  v-model="item.phone"
                                  label="Edit"
                                  single-line
                                ></v-text-field>
                              </template>
                            </v-edit-dialog>
                          </td>
                          <td>
                            <v-edit-dialog
                              :return-value.sync="item.mobile"
                              @save="saveContact(item.id)"
                              @cancel="cancelContact"
                              @open="openContact"
                              @close="closeContact"
                              large
                            > {{ item.mobile }}
                              <template v-slot:input>
                                <v-text-field
                                  v-model="item.mobile"
                                  label="Edit"
                                  single-line
                                ></v-text-field>
                              </template>
                            </v-edit-dialog>
                          </td>
                          <td>
                            <v-edit-dialog
                              :return-value.sync="item.signs"
                              @save="saveContact(item.id)"
                              @cancel="cancelContact"
                              @open="openContact"
                              @close="closeContact"
                              large
                            > {{ item.signs }}
                              <template v-slot:input>
                                <v-text-field
                                  v-model="item.signs"
                                  label="Edit"
                                  single-line
                                ></v-text-field>
                              </template>
                            </v-edit-dialog>
                          </td>
                          <td>
                            <v-icon small @click="deleteContact(item.id, client.identification)">
                              mdi-delete
                            </v-icon>
                          </td>
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
            <v-btn color="blue darken-1" text @click="closeClientDialog()"
              >Cerrar</v-btn
            >
            <v-btn
              color="blue darken-1"
              text
              @click="createClient()"
              v-if="!isEdition"
              :disabled="invalid"
              >Crear</v-btn
            >
            <v-btn
              color="blue darken-1"
              text
              @click="updateClient()"
              v-if="isEdition"
              :disabled="invalid"
              >Modificar</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </ValidationObserver> -->
    <!-- End dialog to create/modify client -->

    <!-- Dialog to confirm deletion -->
    <v-dialog v-model="deleteCropDialog" persistent max-width="50%">
      <v-card>
        <v-card-title class="headline"
          >¿Esta segur@ que desea eliminar el cliente?</v-card-title
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
          <v-btn
            icon
            @click="snackbar.visible = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
      </v-layout>
    </v-snackbar>
    <!-- End Snackbar -->

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
      cropType: 1,
      startDate: "",
      harvestDate: "",
      aplications: [],
      cropCycle: ""
    },
    cropsTableHeaders: [
      {
        text: "Tipo de cultivo",
        align: "start",
        sortable: true,
        value: "cropType",
      },
      { text: "Fecha de inicio", value: "startDate" },
      { text: "Fecha de cosecha", value: "harvestDate" },
      { text: "Ciclo de cultivo", value: "cropCycle" }
    ],
    cropsTableSearch: "",
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
    isEdition: false,
  }),
  async fetch() {
    this.loaderActive = true;
    try {
      await this.$store.dispatch('crops/getCrops');
    } catch (error) {
      console.log(error)
      this.activateSnackbar("Obteniendo la información " + error, false);
    }
    this.loaderActive = false;
  },
  computed: {
    isEditor(){
      const filteredModules = (this.$store.getters['authentication/currentUser'].modules) ? this.$store.getters['authentication/currentUser'].modules.filter((item) => {
        return item.read && item.write;
      }) : [];
      return JSON.stringify(filteredModules).includes("crops");
    },
    filteredHeaders(){
      const readerHeaders = this.cropsTableHeaders.slice(0, this.cropsTableHeaders.length - 1);
      return (this.isEditor) ? this.cropsTableHeaders : readerHeaders
    },
    crops(){
      return this.$store.getters['crops/crops'];
    },
  },
  methods: {
    openCreateCropDialog() {
      this.cropDialog = true;
      this.isEdition = false;
      this.crop = {
        cropType: 1,
        startDate: "",
        harvestDate: "",
        aplications: [],
        cropCycle: "",
      };
    },

    // openUpdateClientDialog(data) {
    //   this.getProvincias();
    //   this.getCantones(data.provincia);
    //   this.getDistritos(data.canton);

    //   this.currentClient = data;
    //   this.isEdition = true;
    //   this.cropDialog = true;
    //   this.client = {
    //     clientType: data.clientType,
    //     identification: data.identification,
    //     firstName: data.firstName,
    //     secondName: data.secondName,
    //     firstLastname: data.firstLastname,
    //     secondLastname: data.secondLastname,
    //     email: data.email,
    //     phone: data.phone,
    //     mobile: data.mobile,
    //     provincia: data.provincia,
    //     canton: data.canton,
    //     distrito: data.distrito,
    //     address: data.address
    //   };

    //   this.loadContacts(data.identification);

    // },

    closeCropDialog() {
      this.cropDialog = false;
      this.$refs.observer.reset();
    },

    // openDeleteClientDialog(item) {
    //   this.deleteClientDialog = true;
    //   this.currentClient = item;
    // },

    // closeDeleteClientDialog() {
    //   this.deleteClientDialog = false;
    //   this.currentClient = null;
    // },

    async createCrop() {
      const isValid = await this.$refs.observer.validate();

      if (isValid) {
        this.loaderActive = true;
        this.$fire.firestore
          .collection("crops")
          .add({
            cropType: this.crop.cropType,
            startDate: this.crop.startDate,
            harvestDate: this.crop.harvestDate,
            aplications: this.crop.aplications,
            cropCycle: this.crop.cropCycle,
          })
          .then(() => {
            this.activateSnackbar("Cultivo creado", true);
          })
          .catch((error) => {
            console.error(error);
            this.activateSnackbar("Creando cultivo", false);
          });

          this.loaderActive = false;
          this.$fetch()
          this.cropDialog = false;
          this.$refs.observer.reset();
      }
    },

    // async updateClient() {
    //   const isValid = await this.$refs.observer.validate();

    //   if (isValid) {
    //     this.loaderActive = true;
    //     this.$fire.firestore
    //       .collection("crops")
    //       .doc(this.currentClient.id)
    //       .update({
    //         clientType: this.client.clientType,
    //         identification: this.client.identification,
    //         firstName: this.client.firstName,
    //         secondName: this.client.secondName,
    //         firstLastname: this.client.firstLastname,
    //         secondLastname: this.client.secondLastname,
    //         email: this.client.email,
    //         phone: this.client.phone,
    //         mobile: this.client.mobile,
    //         provincia: this.client.provincia,
    //         canton: this.client.canton,
    //         distrito: this.client.distrito,
    //         address: this.client.address
    //       })
    //       .then(() => {
    //         this.activateSnackbar("Cliente modificado correctamente", true);
    //         this.getClients();
    //         this.cropDialog = false;
    //         this.$refs.observer.reset();
    //         this.loaderActive = false;
    //       })
    //       .catch((error) => {
    //         console.error("Error updating document: ", error);
    //         this.activateSnackbar("Error modificando cliente", false);
    //         this.loaderActive = false;
    //       });
    //   }
    // },

    // async deleteClient() {
    //   this.loaderActive = true;
    //   await this.$fire.firestore
    //     .collection("crops")
    //     .doc(this.currentClient.id)
    //     .delete()
    //     .then(() => {
    //       this.activateSnackbar("Cliente borrado correctamente", true);
    //       this.getClients();
    //       this.deleteClientDialog = false;
    //       this.loaderActive = false;
    //     })
    //     .catch((error) => {
    //       console.error("Error removing document: ", error);
    //       this.activateSnackbar("Error borrando cliente", false);
    //       this.loaderActive = false;
    //     });
    // },

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
