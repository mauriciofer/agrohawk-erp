<template>
  <v-dialog v-model="isVisible" persistent max-width="40%">    
    <slot></slot>
  </v-dialog>
</template>

<script>
export default {
  name: 'ConfirmationModal',

  data: () => ({
    isVisible: false
  }),

  methods: {
    open() {
      this.isVisible = true
    },

    close() {
      this.isVisible = false
    }
  }
}
</script>
