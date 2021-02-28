import Vue from 'vue'
import { ValidationProvider, extend, ValidationObserver, setInteractionMode } from "vee-validate";
import { required, email} from "vee-validate/dist/rules";

setInteractionMode('eager')

extend('required', {
  ...required,
  message: '{_field_} no puede ser vacío',
})

extend('email', {
  ...email,
  message: 'Correo tiene que ser válido',
})

// Vue.use(ValidationProvider, ValidationObserver);

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);
