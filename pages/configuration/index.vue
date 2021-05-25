<template>
  <div>
    <h1 class="ma-10">Configuración</h1>

    <!-- Users -->


    <!-- Dialog to create/modify product Type -->
    <ValidationObserver ref="observer2" v-slot="{ invalid }" tag="form">
      <v-dialog v-model="productDialog" persistent max-width="70%">
        <v-card>
          <v-card-title>
            <span class="headline">{{
              isEdition ? "Editar tipo de producto" : "Agregar tipo de producto"
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
                      v-model="productType.name"
                      :error-messages="errors"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="Varieda"
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

    <ValidationObserver ref="observer" v-slot="{ invalid }" tag="form">
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
        :items-per-page="5"
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

    <v-overlay :value="loaderActive" :z-index="203">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>


      <template>
        <v-container class="grey lighten-5">
          <v-row no-gutters>
            <v-col order="last">
              <v-card
                class="pa-2"
                outlined
                tile
              >
                <v-card>
                  <v-card-title>
                    <v-text-field
                      v-model="search"
                      append-icon="mdi-magnify"
                      label="Search"
                      single-line
                      hide-details
                    ></v-text-field>
                  </v-card-title>
                  <v-data-table
                    :headers="headers"
                    :items="desserts"
                    :search="search"
                  ></v-data-table>
                </v-card>

              </v-card>
            </v-col>
            <v-col>
              <v-card
                class="pa-2"
                outlined
                tile
              >
                <v-card>
                  <v-card-title>
                    <v-btn
                      absolute
                      right
                      tile
                      color="primary"
                      @click="openProductTypeDialog()"
                    >
                      <v-icon left>mdi-plus</v-icon></v-btn>  
                  </v-card-title>  
                  <v-card-title>
                    <v-text-field
                      v-model="search"
                      append-icon="mdi-magnify"
                      label="Search"
                      hide-details
                    >
                    </v-text-field>


                  </v-card-title>
                  <v-data-table
                    :headers="headersType"
                    :items="productTypes"
                    :search="search"
                  >
                    <template v-slot:[`item.actions`]="{ item }">
                        <v-icon small class="mr-2" @click="openUpdateProductTypeDialog(item)">
                         mdi-pencil
                        </v-icon>
                        <v-icon small @click="openDeleteProductTypeDialog(item)">
                         mdi-delete
                        </v-icon>
                    </template>                    
                  
                  </v-data-table>
                </v-card>
              </v-card>
              
            </v-col>
            <v-col order="first">
              <v-card
                class="pa-2"
                outlined
                tile
              >
                <v-card>
                  Campo
                </v-card>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </template>
    
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
        search: '',
        productType: {
          name: "",
          variety: "",
        },
        headersType: [
          {text: 'Nombre',   value: 'name' },
          { text: 'Variedad', value: 'variety' },
          { text: "Acciones", value: "actions", sortable: false },
        ],

        headers: [
          {
            text: 'Dessert (100g serving)',
            align: 'start',
            filterable: false,
            value: 'name',
          },
          { text: 'Calories', value: 'calories' },
          { text: 'Fat (g)', value: 'fat' },
          { text: 'Carbs (g)', value: 'carbs' },
          { text: 'Protein (g)', value: 'protein' },
          { text: 'Iron (%)', value: 'iron' },
        ],
        desserts: [
          {
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
            iron: '1%',
          },
          {
            name: 'Ice cream sandwich',
            calories: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3,
            iron: '1%',
          },
          {
            name: 'Eclair',
            calories: 262,
            fat: 16.0,
            carbs: 23,
            protein: 6.0,
            iron: '7%',
          },
          {
            name: 'Cupcake',
            calories: 305,
            fat: 3.7,
            carbs: 67,
            protein: 4.3,
            iron: '8%',
          },
          {
            name: 'Gingerbread',
            calories: 356,
            fat: 16.0,
            carbs: 49,
            protein: 3.9,
            iron: '16%',
          },
          {
            name: 'Jelly bean',
            calories: 375,
            fat: 0.0,
            carbs: 94,
            protein: 0.0,
            iron: '0%',
          },
          {
            name: 'Lollipop',
            calories: 392,
            fat: 0.2,
            carbs: 98,
            protein: 0,
            iron: '2%',
          },
          {
            name: 'Honeycomb',
            calories: 408,
            fat: 3.2,
            carbs: 87,
            protein: 6.5,
            iron: '45%',
          },
          {
            name: 'Donut',
            calories: 452,
            fat: 25.0,
            carbs: 51,
            protein: 4.9,
            iron: '22%',
          },
          {
            name: 'KitKat',
            calories: 518,
            fat: 26.0,
            carbs: 65,
            protein: 7,
            iron: '6%',
          },
        ],



    confirmPasswordRules:
      "required|password|min: 8|passwordConfirmation:@Password",
    passwordRules: "required|password|min: 8",
    loaderActive: false,
  }),
  async fetch() {
    this.loaderActive = true;
    try {
      await this.$store.dispatch('configuration/getUsers');
      await this.$store.dispatch('configuration/getRoles');
      await this.$store.dispatch('productType/getproductTypes');
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
      return this.$store.getters['productType/productTypes'];
    },

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
      this.$refs.observer2.reset();
    },    

    async createProductType() {
      if(!this.productDialog){
        this.activateSnackbar("Seleccione un tipo de producto", false);
        return false;
      }

      const isValid = await this.$refs.observer2.validate();  
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

            this.$refs.observer2.reset();
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

      const isValid = await this.$refs.observer2.validate();
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

            this.$refs.observer.reset();
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
      this.$refs.observer.reset();
    },

    async createUser() {
      const isValid = await this.$refs.observer.validate();

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
        this.$refs.observer.reset();
      }
    },

    async updateUser() {
      const isValid = await this.$refs.observer.validate();
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
        this.$refs.observer.reset();
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
