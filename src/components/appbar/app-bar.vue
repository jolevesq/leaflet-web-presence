<template>
    <div style="height: 100%; width:100%; z-index: 500">
        <v-app-bar dense floating class="wp-app-bar align-center">
        <v-tooltip bottom>
            <template v-slot:activator="{ on }">
                <v-btn class="mx-0" text rounded small color="primary" v-on="on" @click.stop="isSideMenuOpen = !isSideMenuOpen">
                    <v-icon>$vuetify.icons.sideMenu</v-icon>
                </v-btn>
            </template>
            <span>{{ $vuetify.lang.t('$vuetify.appbar.sidemenu') }}</span>
        </v-tooltip>

        <v-spacer></v-spacer>
        <v-layout align-center justify-end>
            <v-divider class="mx-2" inset vertical></v-divider>
            <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                <v-btn class="mx-0" text rounded small color="primary" v-on="on" @click.stop="isLayersMenuOpen = !isLayersMenuOpen">
                    <v-icon>$vuetify.icons.layers</v-icon>
                </v-btn>
            </template>
                <span>{{ $vuetify.lang.t('$vuetify.appbar.layers') }}</span>
            </v-tooltip>
            </v-layout>
        </v-app-bar>

        <side-menu-section v-bind:isOpen="isSideMenuOpen" @listenerSideMenuOpen="updateSideMenuState"></side-menu-section>
        <legend-section v-show="isLayersMenuOpen"></legend-section>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import { DomEvent } from 'leaflet';

import SideMenuV from '../sidemenu/side-menu.vue';
import LegendV from '../legend/legend.vue';

@Component({
    components: {
        'side-menu-section': SideMenuV,
        'legend-section': LegendV
    }
})
export default class AppBarV extends Vue {
    private isSideMenuOpen = false;
    private isLayersMenuOpen = true;

    updateSideMenuState(state: boolean) {
        this.isSideMenuOpen = state;
    }

    mounted() {
        // disable events on container
        DomEvent.disableClickPropagation(this.$el.children[0] as HTMLElement);
        DomEvent.disableScrollPropagation(this.$el.children[0] as HTMLElement);
    }
}
</script>

<style lang="scss">
.wp-app-bar {
    width: 400px!important;
    left: 10px!important;
    top: 10px!important;
    z-index: 425;
    position: relative;

    .v-overlay {
        z-index: 600!important;
    }

    .v-toolbar__content {
        width: 100%!important;
        padding: 0px 0px!important;
    }

    .layout {
        height: 100%!important;
    }
}
</style>