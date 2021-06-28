<template>
  <div>
    <h1 class="ma-5">Detalle de Finca</h1>
    <v-row>
      <v-col cols="12" sm="6" md="6">
        <v-card class="mx-10" elevation="0">
          <v-card-title class="headline">{{
            this.currentFarm.name
          }}</v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" sm="6" md="2">
                <v-text-field
                  label="Area"
                  v-model="this.currentFarm.area"
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="Dirección"
                  v-model="this.fullAddress"
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="Señas"
                  v-model="this.currentFarm.address"
                  readonly
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="6">
        <v-card class="mx-10" elevation="0">
          <v-card-title class="headline">{{ this.clientName }}</v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="Correo"
                  v-model="this.currentClient.email"
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="Télefono"
                  v-model="this.currentClient.phone"
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="Celular"
                  v-model="this.currentFarm.mobile"
                  readonly
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-divider class="mx-10"></v-divider>
    <v-row class="mt-10">
      <v-col cols="12" sm="6" md="4">
        <farm-detail-blocks-vue :currentFarm="currentFarm"></farm-detail-blocks-vue>
      </v-col>
      <v-col cols="12" sm="6" md="8">
        <farm-detail-crops-vue :currentFarm="currentFarm"></farm-detail-crops-vue>
      </v-col>
    </v-row>
    <v-row class="ma-10">
      <v-col cols="12" sm="12" md="12">
        <v-stepper v-model="currentApplicationNumber">
          <v-stepper-header>
            <template v-for="n in testingApplications.length">
              <v-stepper-step
                :key="`${n}-step`"
                :complete="currentApplicationNumber > n"
                :step="n"
                editable
              >
                Aplicación # {{ n }}
              </v-stepper-step>

              <v-divider
                v-if="n !== testingApplications.length"
                :key="n"
              ></v-divider>
            </template>
          </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content
            v-for="(step, index) in testingApplications"
            :key="`${index}-content`"
            :step="index"
          >
            <v-card
              color="grey lighten-3"
            >
              <v-row class="ma-10">
                <v-col cols="4" sm="4" md="3">
                  <v-list-item two-line>
                    <v-list-item-content>
                      <v-list-item-title class="text-h4">
                        {{step.area + " ha"}}
                      </v-list-item-title>
                      <v-list-item-subtitle>{{"Inicio: " + step.startDate}}</v-list-item-subtitle>
                      <v-list-item-subtitle>{{"Final:   " + step.startDate}}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
                <v-col cols="4" sm="4" md="3">
                  <v-card-text>
                    <v-row align="center">
                      <v-col
                        cols="6"
                      >
                        {{"Clima inicio"}}
                      </v-col>
                      <v-col cols="6">
                        <v-icon>mdi-white-balance-sunny</v-icon>
                      </v-col>
                    </v-row>
                    <v-row align="center">
                      <v-col
                        cols="6"
                      >
                        {{"Clima final"}}
                      </v-col>
                      <v-col cols="6">
                        <v-icon>mdi-weather-cloudy</v-icon>
                      </v-col>
                    </v-row>
                    <v-row align="center">
                      <v-col
                        cols="6"
                      >
                        {{"Temperatura final: " + step.temperatureAtStart}}
                      </v-col>
                      <v-col cols="6">
                        <v-icon>mdi-thermometer</v-icon>
                      </v-col>
                    </v-row>
                    <v-row align="center">
                      <v-col
                        cols="6"
                      >
                        {{"Temperatura final: " + step.temperatureAtEnd}}
                      </v-col>
                      <v-col cols="6">
                        <v-icon>mdi-thermometer</v-icon>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-col>
                <v-col cols="4" sm="4" md="6">
                  <v-card class="mr-10" elevation="2" outlined>
                    <v-data-table
                      :headers="provisionTableHeaders"
                      :items="step.provisions"
                      :items-per-page="10"
                      item-key="name"
                      sort-by="name"
                    >
                      <template v-slot:top>
                        <v-toolbar flat>
                          <v-toolbar-title>Aplicaciones</v-toolbar-title>
                        </v-toolbar>
                      </template>
                      <template v-slot:[`item.actions`]="{ item }">
                        <!-- change to go to aplications -->
                        <NuxtLink :to="`applications/${item.id}?client=${item.clientId}`" style="text-decoration: none;">
                          <v-icon small class="mr-2">
                            mdi-feature-search
                          </v-icon>
                        </NuxtLink>
                      </template>
                    </v-data-table>
                  </v-card>
                </v-col>
              </v-row>
            </v-card>

            <v-btn
              color="primary"
              @click="nextStep(index)"
            >
              Continue
            </v-btn>

            <v-btn text>
              Cancel
            </v-btn>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
      </v-col>
    </v-row>

    <!-- Snackbar -->
    <v-snackbar
      v-model="snackbar.visible"
      :color="snackbar.color"
      :multi-line=snackbar.multiline
      :timeout=snackbar.timeout
    >
      <v-layout align-center pr-4>
        <v-icon class="pr-3" dark large>{{ snackbar.icon }}</v-icon>
        <v-layout column>
          <div>
            <strong>{{ snackbar.title }}</strong>
          </div>
          <div>{{ snackbar.text }}</div>
        </v-layout>
        <v-btn icon @click="snackbar.visible = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-layout>
    </v-snackbar>
    <!-- End Snackbar -->
    <v-overlay :value="loaderActive" :z-index="203">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import FarmDetailBlocksVue from './blocks.vue'
import FarmDetailCropsVue from './crops.vue'
export default {
  name: 'Farm_Detail',
  components: {
    FarmDetailBlocksVue,
    FarmDetailCropsVue
  },
  data: () => ({
    snackbar: {
      color: null,
      icon: null,
      text: null,
      title: null,
      multiline: true,
      timeout: 2000,
      visible: false
    },
    loaderActive: false,
    currentModules: [],
    isEdition: false,
    blockHeaders: [
      {
        text: 'Nombre',
        align: 'start',
        sortable: true,
        value: 'name'
      },
      { text: 'Area', value: 'area' },
      { text: 'Acciones', value: 'actions', sortable: false }
    ],
    provisionTableHeaders: [
      { text: 'Nombre', align: 'start', value: 'name' },
      { text: 'Área', value: 'area' },
      { text: 'Dosis', value: 'dose' },
      { text: 'Tipo', value: 'type' },
      { text: 'Volumen', value: 'volume' },
      { text: 'Acciones', value: 'actions', sortable: false }
    ],
    testingApplications: [
      {
        area: 7.96,
        clientId: 'wVraObRlemixpqX1w10h',
        climateAtEnd: 'Nublado',
        climateAtStart: 'Soleado',
        cropType: 1,
        endDate: '5 de junio de 2021, 00:00:00 UTC-6',
        farmId: '7TSCR35DBV6louw96y48',
        startDate: '31 de mayo de 2021, 00:00:00 UTC-6',
        temperatureAtEnd: 19,
        temperatureAtStart: 18,
        provisions: [
          {
            area: 1.9,
            dose: 120,
            name: 'Maxicover',
            type: 'Adherente - Dispersante',
            volume: 3
          }
        ]
      },
      {
        area: 7.96,
        clientId: 'wVraObRlemixpqX1w10h',
        climateAtEnd: 'Nublado',
        climateAtStart: 'Soleado',
        cropType: 1,
        endDate: '5 de junio de 2021, 00:00:00 UTC-6',
        farmId: '7TSCR35DBV6louw96y48',
        startDate: '31 de mayo de 2021, 00:00:00 UTC-6',
        temperatureAtEnd: 19,
        temperatureAtStart: 18,
        provisions: [
          {
            area: 1.9,
            dose: 120,
            name: 'Maxicover',
            type: 'Adherente - Dispersante',
            volume: 3
          }
        ]
      },
      {
        area: 7.96,
        clientId: 'wVraObRlemixpqX1w10h',
        climateAtEnd: 'Nublado',
        climateAtStart: 'Soleado',
        cropType: 1,
        endDate: '5 de junio de 2021, 00:00:00 UTC-6',
        farmId: '7TSCR35DBV6louw96y48',
        startDate: '31 de mayo de 2021, 00:00:00 UTC-6',
        temperatureAtEnd: 19,
        temperatureAtStart: 18,
        provisions: [
          {
            area: 1.9,
            dose: 120,
            name: 'Maxicover',
            type: 'Adherente - Dispersante',
            volume: 3
          }
        ]
      },
      {
        area: 7.96,
        clientId: 'wVraObRlemixpqX1w10h',
        climateAtEnd: 'Nublado',
        climateAtStart: 'Soleado',
        cropType: 1,
        endDate: '5 de junio de 2021, 00:00:00 UTC-6',
        farmId: '7TSCR35DBV6louw96y48',
        startDate: '31 de mayo de 2021, 00:00:00 UTC-6',
        temperatureAtEnd: 19,
        temperatureAtStart: 18,
        provisions: [
          {
            area: 1.9,
            dose: 120,
            name: 'Maxicover',
            type: 'Adherente - Dispersante',
            volume: 3
          }
        ]
      },
      {
        area: 7.96,
        clientId: 'wVraObRlemixpqX1w10h',
        climateAtEnd: 'Nublado',
        climateAtStart: 'Soleado',
        cropType: 1,
        endDate: '5 de junio de 2021, 00:00:00 UTC-6',
        farmId: '7TSCR35DBV6louw96y48',
        startDate: '31 de mayo de 2021, 00:00:00 UTC-6',
        temperatureAtEnd: 19,
        temperatureAtStart: 18,
        provisions: [
          {
            area: 1.9,
            dose: 120,
            name: 'Maxicover',
            type: 'Adherente - Dispersante',
            volume: 3
          }
        ]
      }
    ],
    currentApplicationNumber: 1
  }),
  async fetch() {
    this.loaderActive = true
    try {
      await this.$store.dispatch('blocks/updateSelectedBlocks', {
        blocks: []
      })

      await this.$store.dispatch('crops/updateCropsBySelectedBlocks', {
        blocks: []
      })
    } catch (error) {
      console.log(error)
      this.activateSnackbar('Obteniendo la información ' + error, false)
    }
    this.loaderActive = false
  },
  computed: {
    ...mapGetters({
      getProvinciaText: 'locations/getProvinciaText',
      getCantonText: 'locations/getCantonText',
      getDistritoText: 'locations/getDistritoText',
      getBlockText: 'blocks/getBlockText'
    }),
    currentFarm() {
      return this.$store.getters['farms/getFarm'](this.$route.params.id)
    },
    currentClient() {
      return this.$store.getters['clients/getClient'](this.$route.query.client)
    },
    provincias() {
      return this.$store.getters['locations/provincias']
    },
    cantones() {
      return this.$store.getters['locations/cantones']
    },
    distritos() {
      return this.$store.getters['locations/distritos']
    },
    clientName() {
      const name =
        this.currentClient.type == 1
          ? this.currentClient.firstName +
            this.currentClient.secondName +
            this.currentClient.firsLastname +
            this.currentClient.secondLastname
          : this.currentClient.firstName
      return name
    },
    fullAddress() {
      const address =
        this.getDistritoText(this.currentFarm.distrito) +
        ' de ' +
        this.getCantonText(this.currentFarm.canton) +
        ', ' +
        this.getProvinciaText(this.currentFarm.provincia)
      return address
    },
    isEditor() {
      const filteredModules = this.$store.getters['authentication/currentUser']
        .modules
        ? this.$store.getters['authentication/currentUser'].modules.filter(
            item => {
              return item.read && item.write
            }
          )
        : []
      return JSON.stringify(filteredModules).includes('farms')
    }
  },
  methods: {
    nextStep(n) {
      if (n === this.steps) {
        this.currentApplicationNumber = 1
      } else {
        this.currentApplicationNumber = n + 1
      }
    },

    activateSnackbar(message, success) {
      this.snackbar.text = message
      this.snackbar.visible = true

      if (success) {
        this.snackbar.color = 'success'
        this.snackbar.icon = 'mdi-check-circle'
        this.snackbar.title = 'Acción exitosa'
      } else {
        this.snackbar.color = 'error'
        this.snackbar.icon = 'mdi-alert-circle'
        this.snackbar.title = 'Error'
      }
    }
  }
}
</script>
