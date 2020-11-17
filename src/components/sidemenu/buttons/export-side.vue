<template>
    <side-button :onClickFunction="onClick">
        <template #icon>
            <v-icon>$vuetify.icons.home</v-icon>
        </template>
        <template #title>{{ $vuetify.lang.t('$vuetify.sidemenu.export') }}</template>
    </side-button>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class ExportSideV extends Vue {
    onClick() {
        console.log('export');
    }
}
</script>

<style lang="scss" scoped></style>