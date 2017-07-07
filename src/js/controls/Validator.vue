<template lang="pug">
div(:class='{ "validator--error": error }').validator
    slot
    div(v-if='error').validator__error {{ error }}
</template>

<script>


@Component({
    props: {
        rules: {}
    }
})
export default class Validator extends Vue {
    error = '';
    get child() { return this.$children[0]; }
    mounted() {
        let index = Utils.validators.indexOf(this);
        if (index == -1) Utils.validators.push(this);
    }
    beforeDestroy() {
        let index = Utils.validators.indexOf(this);
        if (index > -1) Utils.validators.splice(index, 1);
    }



    validate() {
        if (!this.rules) return true;
        let childValue = this.child._props.value, rules = this.rules, error = '';
        rules.map(({ name, value, message }) => {
            if (error) return;
            if (name == 'email') {
                if (childValue) {
                    if (!childValue.toString().match(/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/)) error = message
                } else {
                    error = message;
                }
            }

            if (name == 'lengthGreater') {
                if (childValue.toString().length < Number(value)) error = message;
            }
            if (name == 'lengthLess') {
                if (childValue.toString().length > Number(value)) error = message;
            }
            if (name == 'isNumber') {
                if (!isNaN(Number(childValue))) error = message;
            }
            if (name == 'numberGreater') {
                if (Number(childValue) < Number(value)) error = message;
            }
            if (name == 'numberLess') {
                if (Number(childValue) > Number(value)) error = message;
            }
            if (name == 'isTrue') {
                if (!childValue) error = message;
            }
            if (name == 'isFalse') {
                if (childValue) error = message;
            }

            if (name == 'equal') {
                if (childValue) {
                    if (value.toString() != childValue.toString()) error = message;
                } 
                if (!childValue && value) error = message;
            }
            if (name == 'required') {
                if (childValue != '0' && (!childValue || childValue == '')) error = message;
            }
            if (name == 'phone') {
                if (!`${childValue}`.match( /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/)) error = message;
            }
        });
        this.error = error;
        if (error) return false;
        else return true;
    }

}
</script>