import Vue from 'vue'
import { ValidationProvider, extend, ValidationObserver, setInteractionMode } from "vee-validate";
import { required, email, min, digits} from "vee-validate/dist/rules";

setInteractionMode('eager')

extend('required', {
  ...required,
  message: '{_field_} no puede ser vacío',
})

extend('email', {
  ...email,
  message: 'Correo tiene que ser válido',
})

extend('digits', {
  ...digits,
  message: '{_field_} no tiene la cantidad de caracteres necesaria',
})

extend('min', {
  ...min,
  message: 'El campo no tiene el mínimo de caracteres requerido',
})

extend('passwordConfirmation', {
  params: ['target'],
  validate(value, { target }) {
    return value === target;
  },
  message: 'Los passwords no coinciden'
});

extend('password', {
  message: 'El password debe de contener al menos 1 número, una letra mayúscula, una letra minúscula y un caracter especial',
  validate: value => {
      var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])");
      return strongRegex.test(value);
  }
})

// Vue.use(ValidationProvider, ValidationObserver);

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);
