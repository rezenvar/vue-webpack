

let controls = {
    'field': require('./Field.vue'),
    'validator': require('./Validator.vue'),
}


Object.keys(controls).forEach(tag =>  { Vue.component(tag, controls[tag])  });



