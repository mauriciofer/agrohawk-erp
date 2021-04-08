<template>
  <div>
    <h1 class="ma-10">Configuración</h1>

    <!-- Users -->

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
              <v-icon left>mdi-plus</v-icon>Agregar</v-btn
            >
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
    actionSuccess: false,
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
    },
  methods: {
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
