<template>
    <side-button :onClickFunction="onClick">
        <template #icon>
            <v-icon>$vuetify.icons.layers</v-icon>
        </template>
        <template #title>{{ $vuetify.lang.t('$vuetify.sidemenu.layers') }}</template>
    </side-button>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class LayersSideV extends Vue {
    onClick() {
        console.log('layer')
    }
}
</script>

<style lang="scss" scoped></style>