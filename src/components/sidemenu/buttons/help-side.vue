<template>
    <side-button :onClickFunction="onClick">
        <template #icon>
            <v-icon>$vuetify.icons.help</v-icon>
        </template>
        <template #title>{{ $vuetify.lang.t('$vuetify.sidemenu.help') }}</template>
    </side-button>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class HelpSideV extends Vue {
    onClick() {
        console.log('help');
    }
}
</script>

<style lang="scss" scoped></style>