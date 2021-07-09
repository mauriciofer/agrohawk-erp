<template>
  <div>
    <h1 class="ma-5">Detalle de Aplicación</h1>
    
    <!-- Dialog to create/update applications -->
    
    <v-expansion-panels
      v-model="panel"
      multiple
      focusable
    >
      <v-expansion-panel>
        <v-expansion-panel-header>
          Información General
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <information-vue :applicationId="this.$route.query.applicationId"></information-vue>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header>
          Disposiciones Ténicas de Aplicación
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <provisions-vue :applicationId="this.$route.query.applicationId"></provisions-vue>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
import InformationVue from './information.vue'
import ProvisionsVue from './provisions.vue'
export default {
  name: "currentApplication",
  components: {
    InformationVue,
    ProvisionsVue
  },
  data: () => ({
    panel: [0]
  })
};
</script>
