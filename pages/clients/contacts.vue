<template v-slot:default>
    <div>
    <ValidationObserver ref="observer" tag="form">
    <v-simple-table>
        <thead>
            <tr>
            <th class="text-left">
                Principal
            </th>
            <th class="text-left">
                Tipo
            </th>
            <th class="text-left">
                Nombre
            </th>
            <th class="text-left">
                Apellidos
            </th>
            <th class="text-left">
                email
            </th>
            <th class="text-left">
                Teléfono Principal
            </th>
            <th class="text-left">
                Teléfono Secundario
            </th>
            <th class="text-left">
                Señas
            </th>
            <th class="text-left">
                <v-icon small class="mr-2" @click="createContact()">
                mdi-plus
                </v-icon>
            </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in contacts" :key="item.id">
            <td>
                <v-edit-dialog
                :return-value="item.isPrincipal"
                @save="saveContact()"
                @cancel="cancelContact"
                @open="openContact"
                @close="closeContact"
                large
                cancel-text="Cancelar"
                save-text="Guardar"
                persistent
                > 
                <v-icon small class="mr-2" v-if="item.isPrincipal">
                    mdi-check
                </v-icon>
                <v-icon small class="mr-2" v-if="!item.isPrincipal">
                    mdi-close
                </v-icon>
                <template v-slot:input>
                    <v-container
                    class="px-0"
                    fluid
                    >
                    <v-checkbox
                        :value="item.isPrincipal"
                        @change="updateContact(item, $event, 'isPrincipal')"
                        :label="`Es Principal: ${item.isPrincipal ? 'Sí' : 'No'}`"
                    ></v-checkbox>
                    </v-container>
                </template>
                </v-edit-dialog>
            </td>
            <td>
                <v-edit-dialog
                :return-value="item.type"
                @save="saveContact()"
                @cancel="cancelContact"
                @open="openContact"
                @close="closeContact"
                large
                cancel-text="Cancelar"
                save-text="Guardar"
                persistent
                > {{ item.type }}
                <template v-slot:input>
                    <ValidationProvider v-slot="{ errors }" name="Tipo" rules="required">
                    <v-text-field
                        :value="item.type"
                        @change="updateContact(item, $event, 'type')"
                        label="Tipo *"
                        single-line
                        :error-messages="errors"
                        required
                    ></v-text-field>
                    </ValidationProvider>
                </template>
                </v-edit-dialog>
            </td>
            <td>
                <v-edit-dialog
                :return-value="item.name"
                @save="saveContact()"
                @cancel="cancelContact"
                @open="openContact"
                @close="closeContact"
                large
                cancel-text="Cancelar"
                save-text="Guardar"
                persistent
                > {{ item.name }}
                <template v-slot:input>
                    <ValidationProvider v-slot="{ errors }" name="Nombre" rules="required">
                    <v-text-field
                        :value="item.name"
                        @change="updateContact(item, $event, 'name')"
                        label="Nombre *"
                        single-line
                        :error-messages="errors"
                        required
                    ></v-text-field>
                    </ValidationProvider>
                </template>
                </v-edit-dialog>
            </td>
            <td>
                <v-edit-dialog
                :return-value="item.lastName"
                @save="saveContact()"
                @cancel="cancelContact"
                @open="openContact"
                @close="closeContact"
                large
                cancel-text="Cancelar"
                save-text="Guardar"
                persistent
                > {{ item.lastName }}
                <template v-slot:input>
                    <ValidationProvider v-slot="{ errors }" name="Apellidos" rules="required">
                    <v-text-field
                        :value="item.lastName"
                        @change="updateContact(item, $event, 'lastName')"
                        label="Apellidos *"
                        single-line
                        :error-messages="errors"
                        required
                    ></v-text-field>
                    </ValidationProvider>
                </template>
                </v-edit-dialog>
            </td>
            <td>
                <v-edit-dialog
                :return-value="item.email"
                @save="saveContact()"
                @cancel="cancelContact"
                @open="openContact"
                @close="closeContact"
                large
                cancel-text="Cancelar"
                save-text="Guardar"
                persistent
                > {{ item.email }}
                <template v-slot:input>
                    <ValidationProvider v-slot="{ errors }" name="Email" rules="required|email">
                    <v-text-field
                        :value="item.email"
                        @change="updateContact(item, $event, 'email')"
                        label="Email *"
                        single-line
                        :error-messages="errors"
                        required
                    ></v-text-field>
                    </ValidationProvider>
                </template>
                </v-edit-dialog>
            </td>
            <td>
                <v-edit-dialog
                :return-value="item.mobile"
                @save="saveContact()"
                @cancel="cancelContact"
                @open="openContact"
                @close="closeContact"
                large
                cancel-text="Cancelar"
                save-text="Guardar"
                persistent
                > {{ item.mobile }}
                <template v-slot:input>
                    <ValidationProvider v-slot="{ errors }" name="Teléfono Principal" rules="required|digits:8">
                    <v-text-field
                        :value="item.mobile"
                        @change="updateContact(item, $event, 'mobile')"
                        label="Teléfono Principal *"
                        single-line
                        :type="'number'"
                        hint="8 números"
                        required
                        :error-messages="errors"
                    ></v-text-field>
                    </ValidationProvider>
                </template>
                </v-edit-dialog>
            </td>
            <td>
                <v-edit-dialog
                :return-value="item.phone"
                @save="saveContact()"
                @cancel="cancelContact"
                @open="openContact"
                @close="closeContact"
                large
                cancel-text="Cancelar"
                save-text="Guardar"
                persistent
                > {{ item.phone }}
                <template v-slot:input>
                    <ValidationProvider v-slot="{ errors }" name="Teléfono Secundario" rules="digits:8">
                    <v-text-field
                        :value="item.phone"
                        @change="updateContact(item, $event, 'phone')"
                        label="Teléfono Secundario"
                        single-line
                        :type="'number'"
                        hint="8 números"
                        :error-messages="errors"
                    ></v-text-field>
                    </ValidationProvider>
                </template>
                </v-edit-dialog>
            </td>
            <td>
                <v-edit-dialog
                :return-value="item.signs"
                @save="saveContact()"
                @cancel="cancelContact"
                @open="openContact"
                @close="closeContact"
                large
                cancel-text="Cancelar"
                save-text="Guardar"
                persistent
                > {{ item.signs }}
                <template v-slot:input>
                    <ValidationProvider v-slot="{ errors }" name="Señas">
                    <v-text-field
                        :value="item.signs"
                        @change="updateContact(item, $event, 'signs')"
                        label="Señas *"
                        single-line
                        :error-messages="errors"
                        required
                    ></v-text-field>
                    </ValidationProvider>
                </template>
                </v-edit-dialog>
            </td>
            <td>
                <v-icon small @click="deleteContact(item.id)">
                mdi-delete
                </v-icon>
            </td>
            </tr>
        </tbody>
    </v-simple-table>
    </ValidationObserver>

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
    snackbar: {
      color: null,
      icon: null,
      mode: 'multi-line',
      text: null,
      timeout: 2000,
      title: null,
      visible: false,
    },
    loaderActive: false
  }),
  async fetch() {
    this.loaderActive = true;

    try {
      await this.$store.dispatch('contacts/getContacts', {
        currentClient: this.currentClient
      });
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
    async saveContact() {
      await this.$store.dispatch('contacts/saveContact', {
        currentContact: this.$store.getters['contacts/contact']
      });
      this.$fetch();
    },
    cancelContact() {
      this.$refs.observer.reset();
    },
    openContact() {
      this.$refs.observer.reset();
    },
    closeContact() {
      this.$refs.observer.reset();
    },
    async createContact() {
      this.loaderActive = true;

      if(this.currentClient){
        await this.$fire.firestore
        .collection("contacts")
        .add({
          email: 'editar@editar.com',
          isPrincipal: '',
          lastName: 'Seleccione...',
          mobile: '87654321',
          name: 'Seleccione...',
          phone: '45678909',
          signs: 'Seleccione...',
          type: 'Seleccione...',
          clientId: this.currentClient.id,
          timestamp: new Date()
        })
        .then(() => {
          this.$fetch();
          this.activateSnackbar("Contacto creado, proceda a editarlo", true);
          this.loaderActive = false;
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
          this.activateSnackbar("Error creando contacto", false);

          this.loaderActive = false;
        });
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
        .delete()
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
