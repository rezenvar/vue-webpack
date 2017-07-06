<template lang="pug">
div.field
    div( v-if='label' @click='$refs.input.focus()').field__label {{ label }}
    input(:type='type' ref='input' @input='onChange' :value='value' ).field__input
</template>

<script>


@Component({
    props: {
        type: { default: 'text' },
        id: {},
        value: {},
        label: { default: '' },
        placeholder: {},
        meta: {},
    },
})
export default class Field extends Vue {
    onChange(e) {
        this.$emit('change', {
            ...this._props,
            value: e.target.value
        });
    }
}
</script>