<template v-slot:default>
  <div>

  <!-- contacts table -->
  <v-data-table
    :headers="contactsTableHeaders"
    :items="this.contacts"
    :items-per-page="5"
    :search="contactsTableSearch"
    item-key="name"
    sort-by="name"
    :hide-default-footer="true"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-text-field
          v-model="contactsTableSearch"
          append-icon="mdi-magnify"
          label="Buscar"
          single-line
          hide-details
        ></v-text-field>
        <v-icon
          large
          class="ml-5"
          color="primary"
          @click="openAddContactDialog()"
        >
          mdi-plus-circle
        </v-icon>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <div >
        <v-icon  small @click="openDeleteContactDialog(item)">
          mdi-delete
        </v-icon>
      </div>
    </template>
    <template v-slot:[`item.isPrincipal`]="{ item }">
      <div >
        <v-icon small class="mr-2" v-if="item.isPrincipal">
          mdi-check
        </v-icon>
        <v-icon small class="mr-2" v-if="!item.isPrincipal">
          mdi-close
        </v-icon>
      </div>
    </template> 

    
  </v-data-table>
  <!-- End contacts table -->

  <!-- Dialog to link contact -->
  <v-dialog v-model="addContactDialog" persistent max-width="70%">
    <ValidationObserver
      ref="observer"
      v-slot="{ invalid }"
      tag="form"
      @submit.prevent="submit()"
    >
    <v-card>
      <v-card-title>
        <span class="headline">Agregar contacto</span>
        <v-spacer></v-spacer>
      </v-card-title>

      <v-card-text>
        <v-container fluid>
          <v-row>
            <v-col cols="12" sm="6" md="3">
              <ValidationProvider v-slot="{ errors }" name="Nombre" rules="required">
                <v-text-field
                  label="Nombre *"
                  v-model="contact.firstName"
                  required
                  :error-messages="errors"
                ></v-text-field>
              </ValidationProvider>
            </v-col>
            <v-col cols="12" sm="6" md="3">
              <ValidationProvider v-slot="{ errors }" name="Segundo nombre">
                <v-text-field
                  label="Segundo nombre"
                  v-model="contact.secondName"
                  :error-messages="errors"
                ></v-text-field>
              </ValidationProvider>
            </v-col>
            <v-col cols="12" sm="6" md="3">
              <ValidationProvider v-slot="{ errors }" name="Primer apellido">
                <v-text-field
                  label="Apellido"
                  v-model="contact.firstLastname"
                  :error-messages="errors"
                ></v-text-field>
              </ValidationProvider>
            </v-col>
            <v-col cols="12" sm="6" md="3">
              <ValidationProvider v-slot="{ errors }" name="Segundo apellido">
                <v-text-field
                  label="Segundo Apellido"
                  v-model="contact.secondLastname"
                  :error-messages="errors"
                ></v-text-field>
              </ValidationProvider>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6" md="3">
              <ValidationProvider v-slot="{ errors }" name="Tipo de contacto" rules="required">
                <v-text-field
                  label="Tipo *"
                  v-model="contact.type"
                  required
                  :error-messages="errors"
                ></v-text-field>
              </ValidationProvider>
            </v-col>
            <v-col cols="12" sm="6" md="3">
              <ValidationProvider v-slot="{ errors }" name="Teléfono Principal" rules="required|digits:8">
                <v-text-field
                  label="Teléfono Principal *"
                  v-model="contact.mobile"
                  :type="'number'"
                  hint="8 números"
                  required
                  :error-messages="errors"
                ></v-text-field>
              </ValidationProvider>
            </v-col>
            <v-col cols="12" sm="6" md="3">
              <ValidationProvider v-slot="{ errors }" name="Teléfono Secundario" rules="digits:8">
                <v-text-field
                  label="Teléfono Secundario"
                  v-model="contact.phone"
                  :type="'number'"
                  hint="8 números"
                  :error-messages="errors"
                ></v-text-field>
              </ValidationProvider>
            </v-col>
            <v-col cols="12" sm="6" md="3">
              <ValidationProvider v-slot="{ errors }" name="Email" rules="required|email">
                <v-text-field
                  label="Email *"
                  v-model="contact.email"
                  @keydown.space.prevent
                  :error-messages="errors"
                  required
                ></v-text-field>
              </ValidationProvider>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6" md="3">
              <ValidationProvider v-slot="{ errors }" name="Principal" rules="required">
                <v-checkbox
                  label="Principal *"
                  v-model="contact.isPrincipal"
                  required
                  :error-messages="errors"
                ></v-checkbox>
              </ValidationProvider>
            </v-col>
          </v-row>
        </v-container>
        <small>*campos requeridos</small><br />
      </v-card-text>
      
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="blue darken-1"
          text
          @click="closeAddContactDialog()"
        >Cerrar</v-btn>
        <v-btn
          color="blue darken-1"
          text
          @click="addContact()"
          :disabled="invalid"
        >Agregar</v-btn>
      </v-card-actions>
    </v-card>
    </ValidationObserver>
  </v-dialog>
  <!-- End dialog to link contact -->

    <!-- Dialog to confirm contact deletion -->
    <confirm-dialog ref="deleteContactDialog"></confirm-dialog>
    <!-- End Dialog to confirm contact deletion -->

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
  <!-- End Snackbars -->

  </div>
</template>

<script>
export default {
  name: "contacts",
  props: ['currentClient'],
  data: () => ({
    contact: {
      firstName: '',
      secondName: '',
      firstLastname: '',
      secondLastname: '',
      email: '',
      isPrincipal: false,
      phone: '',
      mobile: '',
      type: '',
      signs: ''
    },
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
    contactsTableHeaders: [
      { text: 'Principal', value: 'isPrincipal' },
      { text: 'Tipo', value: 'type' },
      { text: 'Nombre', value: 'firstName' },
      { text: 'Apellidos', value: 'firstLastname' },
      { text: 'Email', value: 'email' },
      { text: 'Teléfono principal', value: 'mobile' },
      { text: 'Teléfono secundario', value: 'phone' },
      { text: 'Señas', value: 'signs' },
      { text: 'Acciones', value: 'actions', sortable: false }
    ],
    contactsTableSearch: '',
    addContactDialog: false,
  }),
  async fetch() {
    this.loaderActive = true;

    try {
      await this.$store.dispatch('contacts/getContacts', {
        currentClient: this.currentClient
      });
      await this.$store.dispatch('contacts/getContacts', {
        currentClient: this.currentClient
      })
    } catch (error) {
      this.activateSnackbar("Obteniendo la información " + error, false);
    }
    this.loaderActive = false;
  },
  computed: {
    contacts(){
      return this.$store.getters['contacts/contacts'];
    }
  },
  methods: {
    openAddContactDialog() {
      if (this.currentClient) {
        this.addContactDialog = true
      } else {
        this.activateSnackbar(
          'Para poder agregar una finca debe crear el cliente primero',
          false
        )
      }
    },
    closeAddContactDialog() {
      this.contact = {
        firstName: '',
        secondName: '',
        firstLastname: '',
        secondLastname: '',
        email: '',
        isPrincipal: false,
        phone: '',
        mobile: '',
        type: '',
        signs: ''
      };
      this.$refs.observer.reset()
      this.addContactDialog = false
    },

    async openDeleteContactDialog(contact) {

      const message = 'Esta acción no puede ser revertida.'
      const ok = await this.$refs.deleteContactDialog.show({
        title: `Confirme la eliminación del contacto: ${contact.firstName} ${contact.secondName} ${contact.firstLastname} ${contact.secondLastname}`,
        message: message,
        okButton: 'Eliminar'
      })
      if (ok) {
        this.deleteContact(contact.id)
      } else {
        this.contact = {
          firstName: '',
          secondName: '',
          firstLastname: '',
          secondLastname: '',
          email: '',
          isPrincipal: false,
          phone: '',
          mobile: '',
          type: '',
          signs: ''
        }
      }
    },

    async updateContact(contact, newValue, field) {
      const isValid = await this.$refs.observer.validate();
      if (isValid) {
        let newContact = JSON.parse(JSON.stringify(contact));
        newContact[field] = newValue;

        await this.$store.dispatch('contacts/updateContact', {
          newContact: newContact
        });
        this.$refs.observer.reset();
      }
    },
    async addContact() {
      this.loaderActive = true;

      if(this.currentClient){
        await this.$fire.firestore
        .collection("contacts")
        .add({
          firstName: this.contact.firstName,
          secondName: this.contact.secondName,
          firstLastname: this.contact.firstLastname,
          secondLastname: this.contact.secondLastname,
          email: this.contact.email,
          isPrincipal: this.contact.isPrincipal,
          mobile: this.contact.mobile,
          phone: this.contact.phone,
          signs: this.contact.signs,
          type: this.contact.type,
          clientId: this.currentClient.id,
          active: true
        })
        .then(() => {
          this.$fetch();
          this.activateSnackbar("Contacto creado correctamente", true);
          this.$refs.observer.reset()
          this.addContactDialog = false
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
          this.activateSnackbar("Error creando contacto", false);
        });
        this.loaderActive = false;
      } else {
        this.activateSnackbar("Para poder crear un contacto debe crear el cliente primero", false);
        this.loaderActive = false;
      }
    },
    async deleteContact(contactId) {
      this.loaderActive = true;

      await this.$fire.firestore
        .collection("contacts")
        .doc(contactId)
        .update({
          active: false,
        })
        .then(() => {
          this.$fetch();
          this.activateSnackbar("Contacto borrado correctamente", true);
          this.loaderActive = false;
        })
        .catch((error) => {
          console.error("Error removing document: ", error);
          this.activateSnackbar("Error borrando contacto", false);

          this.loaderActive = false;
        });
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
    }
  }
};
</script>
