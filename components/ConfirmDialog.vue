<template>
  <popup-modal ref="popup">
    <v-card>
      <v-card-title class="headline"
        >{{ title }}</v-card-title
      >
      <v-card-text>{{ message }}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="_cancel"
          >{{ cancelButton }}</v-btn
        >
        <v-btn color="green darken-1" :disabled="okButton === null" text @click="_confirm"
          >{{ okButton }}</v-btn
        >
      </v-card-actions>
    </v-card>
  </popup-modal>
</template>

<script>
import PopupModal from './PopupModal.vue'

export default {
  name: 'ConfirmDialogue',

  components: { PopupModal },

  data: () => ({
    // Parameters that change depending on the type of dialogue
    title: undefined,
    message: undefined, // Main text content
    okButton: 'Confirmar', // Text for confirm button, if null si sent we don't show it
    cancelButton: 'Cancelar', // text for cancel button

    // Private variables
    resolvePromise: undefined,
    rejectPromise: undefined
  }),

  methods: {
    show(opts = {}) {
      this.title = opts.title
      this.message = opts.message
      this.okButton = opts.okButton
      if (opts.cancelButton) {
        this.cancelButton = opts.cancelButton
      }
      // Once we set our config, we tell the popup modal to open
      this.$refs.popup.open()
      // Return promise so the caller can get results
      return new Promise((resolve, reject) => {
        this.resolvePromise = resolve
        this.rejectPromise = reject
      })
    },

    _confirm() {
      this.$refs.popup.close()
      this.resolvePromise(true)
    },

    _cancel() {
      this.$refs.popup.close()
      this.resolvePromise(false)
    }
  }
}
</script>
