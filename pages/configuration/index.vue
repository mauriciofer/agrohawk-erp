<template>
  <div>
    <h1 class="ma-10">Configuración</h1>

    <!-- Users -->

    <!-- Dialog to create/modify agrochemicals -->
    <ValidationObserver ref="agrochemicalsObserver" v-slot="{ invalid }" tag="form">
      <v-dialog v-model="agrochemicalsDialog" persistent max-width="50%">
        <v-card>
          <v-card-title>
            <span class="headline">{{
              isEdition ? "Editar agroquímico" : "Agregar agroquímico"
            }}</span>
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
                      v-model="agrochemical.name"
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
                      item-value="name"
                      :error-messages="errors"
                      label="Tipos"
                      v-model="agrochemical.type"
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
                      :items="actionModes"
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
              v-if="!isEdition"
              :disabled="invalid"
              >Crear</v-btn
            >
            <v-btn
              color="blue darken-1"
              text
              @click="updateAgrochemical()"
              v-if="isEdition"
              :disabled="invalid"
              >Modificar</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </ValidationObserver>
    <!-- End Dialog agrochemicals -->

    <!-- Dialog to create/modify product Type -->
    <ValidationObserver ref="productTypeObserver" v-slot="{ invalid }" tag="form">
      <v-dialog v-model="productDialog" persistent max-width="50%">
        <v-card>
          <v-card-title>
            <span class="headline">{{
              isEdition ? "Editar tipo de producto" : "Agregar tipo de producto"
            }}</span>
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
                      label="Nombre *"
                      v-model="productType.name"
                      :error-messages="errors"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="Variedad"
                    rules="required"
                  >
                    <v-text-field
                      label="Variedad *"
                      v-model="productType.variety"
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
            <v-btn color="blue darken-1" text @click="closeProductDialog()"
              >Cerrar</v-btn
            >
            <v-btn
              color="blue darken-1"
              text
              @click="createProductType()"
              v-if="!isEdition"
              :disabled="invalid"
              >Crear</v-btn
            >
            <v-btn
              color="blue darken-1"
              text
              @click="updateProductType()"
              v-if="isEdition"
              :disabled="invalid"
              >Modificar</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </ValidationObserver>
    <!-- End Dialog product Type -->

    <!-- Dialog to create/modify user -->
    <ValidationObserver ref="userObserver" v-slot="{ invalid }" tag="form">
      <v-dialog v-model="userDialog" persistent max-width="70%">
        <v-card>
          <v-card-title>
            <span class="headline">{{
              isEdition ? "Editar usuario" : "Agregar usuario"
            }}</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="3">
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="Nombre"
                    rules="required"
                  >
                    <v-text-field
                      label="Nombre *"
                      v-model="user.firstName"
                      :error-messages="errors"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field
                    label="Segundo nombre"
                    v-model="user.secondName"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="Primer apellido"
                    rules="required"
                  >
                    <v-text-field
                      label="Apellido *"
                      v-model="user.firstLastname"
                      required
                      :error-messages="errors"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field
                    label="Segundo Apellido"
                    v-model="user.secondLastname"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="Teléfono"
                    rules="required|digits:8"
                  >
                    <v-text-field
                      label="Télefono *"
                      v-model="user.phoneNumber"
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
                    name="Email"
                    rules="required|email"
                  >
                    <v-text-field
                      label="Email *"
                      v-model="user.email"
                      :error-messages="errors"
                      required
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="Password"
                    :rules="passwordRules"
                    ref="password"
                    :skipIfEmpty="true"
                  >
                    <v-text-field
                      label="Password **"
                      v-model="user.password"
                      :type="showPassword ? 'text' : 'password'"
                      :error-messages="errors"
                      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                      hint="8 caracteres mínimo"
                      counter
                      @click:append="showPassword = !showPassword"
                      :disabled="!isPasswordChange && isEdition"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="Confirmar Password"
                    :rules="confirmPasswordRules"
                    data-vv-as="password"
                  >
                    <v-text-field
                      label="Confirmar password **"
                      v-model="user.passwordConfirmation"
                      :type="'password'"
                      hint="8 caracteres mínimo"
                      :error-messages="errors"
                      required
                      :disabled="!isPasswordChange && isEdition"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="12"
                  class="d-flex justify-end"
                  v-if="isEdition"
                >
                  <v-checkbox
                    v-model="isPasswordChange"
                    :label="`Cambiar password`"
                    @change="onIsPasswordChangeChanged($event)"
                  ></v-checkbox>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="3">
                  <v-divider></v-divider>
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="Rol"
                    rules="required"
                  >
                    <v-select
                      :items="roles"
                      item-text="role"
                      item-value="role"
                      :error-messages="errors"
                      label="Roles"
                      v-model="user.role"
                      @change="onRoleChange($event)"
                    ></v-select>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" sm="6" md="9">
                  <v-divider></v-divider>
                  <v-subheader>Permisos</v-subheader>
                  <v-simple-table>
                    <template v-slot:default>
                      <thead>
                        <tr>
                          <th class="text-left">
                            Módulo
                          </th>
                          <th class="text-left">
                            Lectura
                          </th>
                          <th class="text-left">
                            Escritura
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="item in currentModules" :key="item.name">
                          <td>{{ item.displayName }}</td>
                          <td>
                            <v-icon small class="mr-2" v-if="item.read">
                              mdi-check
                            </v-icon>
                            <v-icon small class="mr-2" v-if="!item.read"
                              >> mdi-close
                            </v-icon>
                          </td>
                          <td>
                            <v-icon small class="mr-2" v-if="item.write">
                              mdi-check
                            </v-icon>
                            <v-icon small class="mr-2" v-if="!item.write"
                              >> mdi-close
                            </v-icon>
                          </td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </v-col>
              </v-row>
            </v-container>
            <small>*campos requeridos</small><br />
            <small
              >** Debe contener 1 mayúscula, 1 minúscula, 1 caracter especial y
              al menos un largo de 8 caracteres</small
            >
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeUserDialog()"
              >Cerrar</v-btn
            >
            <v-btn
              color="blue darken-1"
              text
              @click="createUser()"
              v-if="!isEdition"
              :disabled="invalid"
              >Crear</v-btn
            >
            <v-btn
              color="blue darken-1"
              text
              @click="updateUser()"
              v-if="isEdition"
              :disabled="invalid"
              >Modificar</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </ValidationObserver>
    <!-- End dialog to create/modify user -->

    <!-- Dialog to confirm deletion -->
    <v-dialog v-model="deleteUserDialog" persistent max-width="50%">
      <v-card>
        <v-card-title class="headline"
          >Confirme la eliminación del usuario</v-card-title
        >
        <v-card-text>Esta acción no puede ser revertida</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="closeDeleteUserDialog()"
            >Cancelar</v-btn
          >
          <v-btn color="green darken-1" text @click="deleteUser()"
            >Eliminar</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- End Dialog to confirm deletion -->

    <v-card class="ma-10" elevation="2" outlined>
      <!-- Users table -->
      <v-data-table
        :headers="usersTableHeaders"
        :items="users"
        :items-per-page="10"
        :search="usersTableSearch"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Usuarios</v-toolbar-title>

            <v-divider class="mx-4" inset vertical></v-divider>

            <v-text-field
              v-model="usersTableSearch"
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
              @click="openCreateUserDialog()"
            >
              <v-icon left>mdi-plus</v-icon>Agregar</v-btn>
          </v-toolbar>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="openUpdateUserDialog(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="openDeleteUserDialog(item)">
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
      <!-- End Users table -->
    </v-card>
    <!-- End Users -->
    <v-row class="ma-7">
      <v-col cols="12" sm="6" md="4">
        <v-card elevation="2" outlined>
          <v-data-table
            :headers="productTypeHeaders"
            :items="productTypes"
            :search="productTypeSearch"
          >
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>Productos</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-text-field
                v-model="productTypeSearch"
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
                @click="openProductTypeDialog()"
              > 
                mdi-plus-circle
              </v-icon>
            </v-toolbar>
          </template>
            <template v-slot:[`item.actions`]="{ item }">
              <div >
                <v-icon  small @click="openDeleteProductTypeDialog(item)">
                  mdi-delete
                </v-icon>
              </div>
            </template>                    
          </v-data-table>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="4">
        <v-card elevation="2" outlined>
          <v-data-table
            :headers="productTypeHeaders"
            :items="productTypes"
            :search="productTypeSearch"
          >
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>Productos</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-text-field
                v-model="productTypeSearch"
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
                @click="openProductTypeDialog()"
              > 
                mdi-plus-circle
              </v-icon>
            </v-toolbar>
          </template>
            <template v-slot:[`item.actions`]="{ item }">
              <div >
                <v-icon  small @click="openDeleteProductTypeDialog(item)">
                  mdi-delete
                </v-icon>
              </div>
            </template>                    
          </v-data-table>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="4">
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
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>

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

    <!-- Dialog to confirm deletion product type-->
    <v-dialog v-model="deleteProductTypeDialog" persistent max-width="50%">
      <v-card>
        <v-card-title class="headline"
          >Confirme la eliminación del tipo de producto</v-card-title
        >
        <v-card-text>Esta acción no puede ser revertida</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="closeDeleteProductTypeDialog()"
            >Cancelar</v-btn
          >
          <v-btn color="green darken-1" text @click="deleteProductType()"
            >Eliminar</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- End Dialog to confirm deletion -->

    <!-- Dialog to confirm agrochemical deletion -->
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
    <!-- End Dialog to confirm agrochemical deletion -->

    <v-overlay :value="loaderActive" :z-index="203">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>

    <!-- Mini-CRUD -->
    <!-- End Mini-CRUD -->    
  </div>
</template>

<!-- End Snackbars -->

<script>
export default {
  name: "configuration",
  data: () => ({
    userDialog: false,
    deleteUserDialog: false,
    currentUser: null,
    user: {
      firstName: "",
      secondName: "",
      firstLastname: "",
      secondLastname: "",
      email: "",
      phoneNumber: "",
      password: "",
      role: "",
    },
    usersTableHeaders: [
      {
        text: "Nombre",
        align: "start",
        sortable: false,
        value: "firstName",
      },
      { text: "Segundo Nombre", value: "secondName" },
      { text: "Primer Apellido", value: "firstLastname" },
      { text: "Segundo Apellido", value: "secondLastname" },
      { text: "Correo", value: "email" },
      { text: "Teléfono", value: "phoneNumber" },
      { text: "Rol", value: "role" },
      { text: "Acciones", value: "actions", sortable: false },
    ],
    usersTableSearch: "",
    currentModules: [],
    isEdition: false,
    isPasswordChange: true,
    showPassword: false,
    snackbar: {
      color: null,
      icon: null,
      mode: 'multi-line',
      text: null,
      timeout: 2000,
      title: null,
      visible: false,
    },
    currentProductType: null,
    deleteProductTypeDialog: false,
    productDialog: false,
    productTypeSearch: '',
    search: '',
    productType: {
      name: "",
      variety: "",
    },
    productTypeHeaders: [
      { text: 'Nombre',   value: 'name' },
      { text: 'Variedad', value: 'variety' },
      { text: "Acciones", value: "actions", sortable: false },
    ],
    agrochemicalsHeaders: [
      { text: 'Nombre',   value: 'name' },
      { text: 'Tipo', value: 'type' },
      { text: 'Modo de acción', value: 'actionMode' },
      { text: "Acciones", value: "actions", sortable: false },
    ],
    confirmPasswordRules:
      "required|password|min: 8|passwordConfirmation:@Password",
    passwordRules: "required|password|min: 8",
    loaderActive: false,
    agrochemicalsSearch: '',
    agrochemicalsDialog: false,
    deleteAgrochemicalDialog: false,
    agrochemical: {
      name: "",
      type: "",
      actionMode: ""
    },
  }),
  async fetch() {
    this.loaderActive = true;
    try {
      await this.$store.dispatch('configuration/getUsers');
      await this.$store.dispatch('configuration/getRoles');
      await this.$store.dispatch('productTypes/getProductTypes');
      await this.$store.dispatch('agrochemicals/getAgrochemicals');
      await this.$store.dispatch('agrochemicals/getAgrochemicalTypes');
      await this.$store.dispatch('agrochemicals/getActionModes');
    } catch (error) {
      console.log(error)
      this.activateSnackbar("Obteniendo la información " + error, false);
    }

    this.loaderActive = false;
  },
  computed:{
    users(){
      return this.$store.getters['configuration/users'];
    },
    roles(){
      return this.$store.getters['configuration/roles'];
    },
    productTypes(){
      return this.$store.getters['productTypes/productTypes'];
    },
    agrochemicals(){
      return this.$store.getters['agrochemicals/agrochemicals'];
    },
    agrochemicalTypes(){
      return this.$store.getters['agrochemicals/agrochemicalTypes'];
    },
    actionModes(){
      return this.$store.getters['agrochemicals/actionModes'];
    }

  },
  methods: {

    openProductTypeDialog() {
      this.productDialog = true;
      this.isEdition = false;
      this.productType = {
        name: "",
        variety: "",
      };
    },

    closeProductDialog() {
      this.productDialog = false;
      this.$refs.productTypeObserver.reset();
    },

    openAgrochemicalsDialog() {
      this.agrochemicalsDialog = true;
      this.agrochemical = {
        name: "",
        type: "",
        actionMode: ""
      };
    },

    closeAgrochemicalsDialog() {
      this.agrochemicalsDialog = false;
      this.$refs.agrochemicalsObserver.reset();
    },

    openDeleteAgrochemicalDialog(data) {
      this.deleteAgrochemicalDialog = true;
      this.agrochemical = data;
    },

    closeDeleteAgrochemicalDialog() {
      this.deleteAgrochemicalDialog = false;
      this.agrochemical = null;
    },   

    async createProductType() {
      if(!this.productDialog){
        this.activateSnackbar("Seleccione un tipo de producto", false);
        return false;
      }

      const isValid = await this.$refs.productTypeObserver.validate();  
      if (isValid) {
        this.loaderActive = true;

        this.$fire.firestore
          .collection("productTypes")
          .add({
            name: this.productType.name,
            variety: this.productType.variety,
          })
          .then(() => {
            this.activateSnackbar("Tipo de Producto creado correctamente", true);

            this.$fetch();

            this.$refs.productTypeObserver.reset();
            this.productDialog = false;
          })
          .catch((error) => {
            console.error(error);

            this.activateSnackbar("Error creando tipo de producto", false);
          });
        
        this.loaderActive = false;
      }
    },

    openUpdateProductTypeDialog(data) {
      this.currentProductType = data;
      this.isEdition = true;
      this.productDialog = true;
      this.productType = {
        name: data.name,
        variety: data.variety,
      };
    },    

    async updateProductType() {
      if(!this.productDialog){
        this.activateSnackbar("Seleccione un tipo de producto", false);
        return false;
      }

      const isValid = await this.$refs.productTypeObserver.validate();
      if (isValid) {
        this.loaderActive = true;

        this.$fire.firestore
          .collection("productTypes")
          .doc(this.currentProductType.id)
          .update({
            name: this.productType.name,
            variety: this.productType.variety,
          })
          .then(() => {
            this.activateSnackbar("Tipo de Producto modificado correctamente", true);

            this.$refs.productTypeObserver.reset();
            this.$fetch();

            this.productDialog = false;
          })
          .catch((error) => {
            console.error(error);

            this.activateSnackbar("Error modificando tipo de producto", false);
          });

        this.loaderActive = false;
      }
    },

    openDeleteProductTypeDialog(data) {
      this.deleteProductTypeDialog = true;
      this.currentProductType = data;
    },

    closeDeleteProductTypeDialog() {
      this.deleteProductTypeDialog = false;
      this.currentProductType = null;
    },

    async deleteProductType() {
      this.loaderActive = true;

      await this.$fire.firestore
        .collection("productTypes")
        .doc(this.currentProductType.id)
        .delete()
        .then(() => {
          this.activateSnackbar("Tipo de Producto borrado correctamente", true);

          this.$fetch();

          this.deleteProductTypeDialog = false;
        })
        .catch((error) => {
          console.error(error);

          this.activateSnackbar("Error borrando tipo de producto", false);
        });

      this.loaderActive = false;
    },

    openCreateUserDialog() {
      this.userDialog = true;
      this.isEdition = false;
      this.isPasswordChange = true;
      this.currentModules = [];
      this.user = {
        firstName: "",
        secondName: "",
        firstLastname: "",
        secondLastname: "",
        email: "",
        password: "",
        phoneNumber: "",
        role: "",
      };
    },

    openUpdateUserDialog(data) {
      this.currentUser = data;
      this.isEdition = true;
      this.userDialog = true;
      this.isPasswordChange = false;
      this.user = {
        firstName: data.firstName,
        secondName: data.secondName,
        firstLastname: data.firstLastname,
        secondLastname: data.secondLastname,
        email: data.email,
        password: "",
        phoneNumber: data.phoneNumber.replace("+506", ""),
        role: data.role,
      };
      this.onRoleChange(data.role);
      (this.passwordRules = ""), (this.confirmPasswordRules = "");
    },

    openDeleteUserDialog(data) {
      this.deleteUserDialog = true;
      this.currentUser = data;
    },

    closeDeleteUserDialog() {
      this.deleteUserDialog = false;
      this.currentUser = null;
    },

    closeUserDialog() {
      this.userDialog = false;
      this.$refs.userObserver.reset();
    },

    async createUser() {
      const isValid = await this.$refs.userObserver.validate();

      if (isValid) {
        this.loaderActive = true;
        const user = {
          firstName: this.user.firstName.trim(),
          secondName:
            this.user.secondName == undefined
              ? ""
              : this.user.secondName.trim(),
          firstLastname: this.user.firstLastname.trim(),
          secondLastname:
            this.user.secondLastname == undefined
              ? ""
              : this.user.secondLastname.trim(),
          displayName:
            this.user.firstName.trim() + " " + this.user.firstLastname.trim(),
          email: this.user.email.trim().toLowerCase(),
          phoneNumber: "+506" + this.user.phoneNumber.trim(), //Firebase expects an E.164 spec compliant phone
          password: this.user.password.trim(),
          role: this.user.role,
          customClaims: this.roles.find((rol) => rol.role === this.user.role),
        };

        //The function is instantiated and used
        const createUserWithRole = this.$fire.functions.httpsCallable(
          "createUserWithRole"
        );
        await createUserWithRole({ user: user })
          .then((result) => {
            if (result.data.success) {
              this.activateSnackbar("Usuario creado", true);
            } else {
              this.activateSnackbar("Creando usuario", false);
            }
            this.loaderActive = false;
          })
          .catch(function (error) {
            console.error(error);
            this.activateSnackbar("Creando usuario", false);
            this.loaderActive = false;
          });
        this.$fetch()
        this.userDialog = false;
        this.$refs.userObserver.reset();
      }
    },

    async updateUser() {
      const isValid = await this.$refs.userObserver.validate();
      if (isValid) {
        this.loaderActive = true;
        const user = {
          userId: this.currentUser.id,
          firstName: this.user.firstName.trim(),
          secondName:
            this.user.secondName == undefined
              ? ""
              : this.user.secondName.trim(),
          firstLastname: this.user.firstLastname.trim(),
          secondLastname:
            this.user.secondLastname == undefined
              ? ""
              : this.user.secondLastname.trim(),
          displayName:
            this.user.firstName.trim() + " " + this.user.firstLastname.trim(),
          email: this.user.email.trim().toLowerCase(),
          phoneNumber: "+506" + this.user.phoneNumber.trim(), //Firebase expects an E.164 spec compliant phone
          role: this.user.role,
          customClaims: this.roles.find((rol) => rol.role === this.user.role),
        };

        // Password is send only if the user checked the password change checkbox
        if (this.isPasswordChange) user.password = this.user.password;

        //The function is instantiated and used
        const updateUserWithRole = this.$fire.functions.httpsCallable(
          "updateUserWithRole"
        );
        await updateUserWithRole({ user: user })
          .then((result) => {
            if (result.data.success) {
              this.activateSnackbar("Usuario modificado", true);
            } else {
              this.activateSnackbar("Modificando usuario", false);
            }
            this.loaderActive = false;
          })
          .catch(function (error) {
            this.activateSnackbar("Modificando usuario", false);
            console.error(error);
            this.loaderActive = false;
          });
        this.$fetch()
        this.userDialog = false;
        this.$refs.userObserver.reset();
      }
    },

    async deleteUser() {
      if (this.currentUser.id) {
        this.loaderActive = true;
        //The function is instantiated and used
        const deleteUserData = this.$fire.functions.httpsCallable(
          "deleteUserData"
        );
        await deleteUserData({ userId: this.currentUser.id })
          .then((result) => {
            if (result.data.success) {
              this.activateSnackbar("Usuario borrado.", true);
              this.loaderActive = false;
            } else {
              this.activateSnackbar("Borrando usuario", false);
              this.loaderActive = false;
            }
          })
          .catch(function (error) {
            console.error(error);
            this.activateSnackbar("Borrando usuario", false);
          });
      } else {
        this.activateSnackbar("Borrando usuario", false);
      }
      this.$fetch()
      this.deleteUserDialog = false;
    },

    async createAgrochemical() {

      const isValid = await this.$refs.agrochemicalsObserver.validate();  
      if (isValid) {
        this.loaderActive = true;

        this.$fire.firestore
          .collection("agrochemicals")
          .add({
            name: this.agrochemical.name,
            type: this.agrochemical.type,
            actionMode: this.agrochemical.actionMode,
          })
          .then(() => {
            this.activateSnackbar("El agroquímico fue creado correctamente", true);

            this.$fetch();

            this.$refs.agrochemicalsObserver.reset();
            this.agrochemicalsDialog = false;
          })
          .catch((error) => {
            console.error(error);

            this.activateSnackbar("Error creando el agroquímico", false);
          });
        
        this.loaderActive = false;
      }
    },

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

    async onRoleChange(value) {
      this.currentModules = [];
      const role = this.roles.filter((item) => {
        return item.role == value;
      });
      this.currentModules = role[0].modules;
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

    onIsPasswordChangeChanged(event) {
      event
        ? (this.passwordRules = "required|password|min: 8")
        : (this.passwordRules = "");
      event
        ? (this.confirmPasswordRules =
            "required|password|min: 8|passwordConfirmation:@Password")
        : (this.confirmPasswordRulesnpm = "");
    },

  },
};
</script>
