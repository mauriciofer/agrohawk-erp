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
          :multi-line="snackbar.mode === 'multi-line'"
          :timeout="snackbar.timeout"
          :top="snackbar.position === 'bottom'"
        >
          <v-layout align-center pr-4>
            <v-icon class="pr-3" dark large>{{ snackbar.icon }}</v-icon>
            <v-layout column>
              <div>
                <strong>{{ snackbar.title }}</strong>
              </div>
              <div>{{ snackbar.text }}</div>
            </v-layout>
          </v-layout>
          <v-btn
            v-if="snackbar.timeout === 0"
            icon
            @click="snackbar.visible = false"
          >
            <v-icon>clear</v-icon>
          </v-btn>
        </v-snackbar>
      </v-container>
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
      mode: null,
      position: "top",
      text: null,
      timeout: 7500,
      title: null,
      visible: false,
    },
  }),
  async mounted() {
    this.error = "";
    try {
      await this.$store.dispatch("login");
    } catch (e) {
      this.error = e;
    }
    this.loading = false;
  },
  methods: {
    login() {
      this.$store
        .dispatch("login", {
          email: this.username,
          password: this.password,
        })
        .then(() => {
          this.email = "";
          this.password = "";
          this.$nuxt.$router.replace({ path: "/dashboard" });
        })
        .catch((error) => {
          if (
            error.code === "auth/wrong-password" ||
            error.code === "auth/user-not-found"
          ) {
            //TODO: change snackbars in other componenents and/or move this to a component
            this.snackbar = {
              color: "error",
              icon: "mdi-exclamation",
              mode: "multi-line",
              position: "top",
              timeout: 2000,
              title: "Success",
              text: "Credenciales inválidas",
              visible: true,
            };
          } else {
            this.snackbar = {
              color: "error",
              icon: "mdi-exclamation",
              mode: "multi-line",
              position: "top",
              timeout: 2000,
              title: "Success",
              text: "Error de autenticación",
              visible: true,
            };
          }
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
