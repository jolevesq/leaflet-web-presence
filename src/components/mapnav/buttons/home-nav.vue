<template>
    <mapnav-button :onClickFunction="onClick">
        <template #icon>
            <v-icon>$vuetify.icons.home</v-icon>
        </template>
        <template #tooltip>{{ $vuetify.lang.t('$vuetify.mapnav.home') }}</template>
    </mapnav-button>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';

import { Get } from 'vuex-pathify';
import { MapStore } from '@/store/modules/map';

@Component
export default class HomeNavV extends Vue {
    @Get('map/getInitExtent') extent!: any;
    @Get('map/maps') maps!: any[];

    onClick() {
        const initExtent = this.extent();
        this.maps[0].setView(initExtent.center, initExtent.zoom);
    }
}
</script>

<style lang="scss" scoped></style>