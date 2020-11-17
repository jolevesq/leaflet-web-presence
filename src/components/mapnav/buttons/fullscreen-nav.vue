<template>
    <mapnav-button :onClickFunction="onClick">
        <template #icon>
            <v-icon>$vuetify.icons.fullScreen</v-icon>
        </template>
        <template #tooltip>{{ $vuetify.lang.t('$vuetify.mapnav.fullscreen') }}</template>
    </mapnav-button>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { MapInstance } from '../../../common/common';

@Component
export default class FullscreenNavV extends Vue {
    onClick() {
        MapInstance.toggleFullscreen(this.$root.$el as HTMLElement);
    }
}
</script>

<style lang="scss" scoped></style>
