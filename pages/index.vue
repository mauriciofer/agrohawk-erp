<template>
  <v-app>
    <v-main>
      <v-container class="fill-height" fluid>
        <span class="bg"></span>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title style="width: 300px;" class="ml-0 mt-2 pl-4">
                  <img src="~/assets/agrohawk_logo.png" />
                </v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Login"
                    name="login"
                    prepend-icon="mdi-account"
                    type="text"
                    v-model="username"
                  ></v-text-field>

                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="mdi-lock"
                    v-model="password"
                    :type="showPassword ? 'text' : 'password'"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="showPassword = !showPassword"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="login" color="primary">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>

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

      </v-container>
      <v-overlay :value="loaderActive" :z-index="203">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
    </v-main>
  </v-app>
</template>

<script>
export default {
  layout: "login_layout",
  name: "login",
  data: () => ({
    username: "",
    password: "",
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
    loaderActive: false,
  }),
  async mounted() {
  },
  methods: {
    async login() {
    this.loaderActive = true;
      this.$store
        .dispatch('authentication/login', {
          email: this.username,
          password: this.password,
        })
        .then(async () => {
          this.email = "";
          this.password = "";
          await this.$store.dispatch("locations/getProvincias");
          await this.$store.dispatch("locations/getCantones");
          await this.$store.dispatch("locations/getDistritos");
          await this.$store.dispatch("productTypes/getProductTypes");
          await this.$nuxt.$router.replace({ path: "/clients" });

          this.loaderActive = false;
        })
        .catch((error) => {
          this.snackbar.color = "error";
          this.snackbar.icon = "mdi-alert-circle";
          this.snackbar.title = "Error";
          this.snackbar.visible = true;
          if (error.code === "auth/wrong-password" || error.code === "auth/user-not-found") {
            this.snackbar.text = "Credenciales inválidas";
          } else {
            this.snackbar.text = "Error de autenticación";
          }

          this.loaderActive = false;
        });
    },
  },
};
</script>
<style scoped>
.bg {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: url("~/assets/login_bg.jpg") no-repeat center center;
  background-size: cover;
  filter: blur(3px);
  -webkit-filter: blur(3px);
}
</style>
