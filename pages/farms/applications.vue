<template v-slot:default>
  <div>
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
  </div>
</template>
<script>

export default {
  name: 'farm-detail-applications',
  props: ['currentFarm'],
  data: () => ({
    isEdition: false,
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
    currentApplicationNumber: 1,
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
  }),
  async fetch() {
    this.loaderActive = true

    this.loaderActive = false
  },
  computed: {

  },
  methods: {

  }
}
</script>
