<template>
    <div>
        <mapnav-button :onClickFunction="zoomIn">
            <template #icon>
                <v-icon>$vuetify.icons.zoomIn</v-icon>
            </template>
            <template #tooltip>{{ $vuetify.lang.t('$vuetify.mapnav.zoomIn') }}</template>
        </mapnav-button>
        <v-divider class="mapnav-divider border-b p-0 self-center w-2/3"></v-divider>
        <mapnav-button :onClickFunction="zoomOut">
            <template #icon>
                <v-icon>$vuetify.icons.zoomOut</v-icon>
            </template>
            <template #tooltip>{{ $vuetify.lang.t('$vuetify.mapnav.zoomOut') }}</template>
        </mapnav-button>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';

import { Get } from 'vuex-pathify';
import { MapStore } from '@/store/modules/map';

@Component
export default class FullscreenNavV extends Vue {
    private map: any;

    @Get('map/maps') maps!: any[];
    @Watch('maps')
    then(newValue: any[], oldValue: any[]) {
        this.map = newValue[0];
    }

    zoomIn(): void {
        this.map.zoomIn();
    }

    zoomOut(): void {
        this.map.zoomOut();
    }
}
</script>

<style lang="scss" scoped></style>