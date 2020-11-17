<template>
    <side-button :onClickFunction="onClick">
        <template #icon>
            <v-icon>$vuetify.icons.fullScreen</v-icon>
        </template>
        <template #title>{{ $vuetify.lang.t('$vuetify.sidemenu.fullscreen') }}</template>
    </side-button>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { MapInstance } from '../../../common/common';

@Component
export default class FullscreenSideV extends Vue {
    onClick() {
        MapInstance.toggleFullscreen(this.$root.$el as HTMLElement);
    }
}
</script>

<style lang="scss" scoped></style>