<template>
    <v-navigation-drawer class="z-1100" :value="isOpen" @input="setState(isSideMenuOpen)" absolute temporary>
        <v-layout column fill-height>
            <v-tooltip bottom>
            <template v-slot:activator="{ on }">
                    <v-btn class="absolute right-0 top-0 z-40 text-gray-600 hover:text-black" text icon small v-on="on" @click="setState(false)">
                        <v-icon>$vuetify.icons.closePanelLeft</v-icon>
                    </v-btn>
            </template>
            <span>{{ $vuetify.lang.t('$vuetify.close') }}</span>
            </v-tooltip>
            <v-img :aspect-ratio="16/9" src="https://cdn.vuetifyjs.com/images/parallax/material.jpg">
                <v-row align="end" class="lightbox black--text pa-2 fill-height">
                    <v-col>
                    <div class="subheading">{{ $vuetify.lang.t('$vuetify.sidemenu.logotext') }}</div>
                    </v-col>
                </v-row>
            </v-img>

            <v-list>
                <template v-for="(item, i) in items">
                    <v-divider v-if="item.divider" :key="i"></v-divider>
                    <component v-else :is="item.id + '-side-button'" :key="item.id + 'button'"></component>
                </template>
            </v-list>

            <v-spacer></v-spacer>
            <v-divider></v-divider>
            <div class="cgp-version">
                <span class="cgp-version-number">{{ version }}<span class="cgp-version-hash"> {{ hash }}</span></span>
                <span class="cgp-version-timestamp">{{ timestamp }}</span>
                <div class="cgp-version-github">
                    <a href="https://github.com/jolevesq/leaflet-web-presence" target="_parent"><v-icon>$vuetify.icons.github</v-icon>cgpv-vpgc/cgpv-vpgc</a>
                </div>
            </div>
        </v-layout>
    </v-navigation-drawer>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

import { DomEvent } from 'leaflet';

import { Get } from 'vuex-pathify';
import { MapStore } from '@/store/modules/map';

import ExportSideV from './buttons/export-side.vue';
import FullscreenSideV from './buttons/fullscreen-side.vue';
import HelpSideV from './buttons/help-side.vue';
import LayersSideV from './buttons/layers-side.vue';
import ShareSideV from './buttons/share-side.vue';
import SideButtonV from './button.vue';

Vue.component('export-side-button', ExportSideV);
Vue.component('fullscreen-side-button', FullscreenSideV);
Vue.component('help-side-button', HelpSideV);
Vue.component('layers-side-button', LayersSideV);
Vue.component('share-side-button', ShareSideV);
Vue.component('side-button', SideButtonV);

@Component
export default class SideMenuV extends Vue { 
    @Get('map/getVersion') version: string;
    @Get('map/getHash') hash: string;
    @Get('map/getTimestamp') timestamp: string;

    @Prop() isOpen!: boolean;

    // reactive property must be set even if not use in child component
    private isSideMenuOpen: any = null;

    // side menu items
    private items = [
        { divider: true },
        { id: 'layers' },
        { divider: true },
        { id: 'fullscreen' },
        { id: 'help' }
    ];
  
    mounted() {
        // disable events on container
        DomEvent.disableClickPropagation(this.$el as HTMLElement);
        DomEvent.disableScrollPropagation(this.$el as HTMLElement);
    }

    // function to emit side menu state to parent
    setState(isOpen: boolean) {
        this.$emit('listenerSideMenuOpen', isOpen);
    }

    // TODO READ: https://stackoverflow.com/questions/40915436/vuejs-update-parent-data-from-child-component
    // https://codesandbox.io/s/update-parent-property-ufj4b?file=/src/components/Child.vue
    // https://vuejs.org/v2/guide/components.html#Organizing-Components
    // TODO... the way listerner works, it apply to all map when there is multimap... DO WE HAVE TO CHECK THIS????? Only when already open


    // defaut application...
    // https://vuetifyjs.com/en/components/application/
    // can we have appp bar, drawer, legend outside map div... TODO CHECK
}
</script>

<style lang="scss">
.v-navigation-drawer {
    .cgp-version {
        text-align: center;
        margin: rem(3.6) rem(1.2) rem(1.2) rem(1.2);
        &-number {
            font-weight: bold;
            display: block;
        }
        &-hash {
            margin-left: rem(0.3);
            font-weight: normal;
            font-size: smaller;
        }
        &-timestamp {
            font-size: smaller;
        }
        &-github {
            display: flex;
            justify-content: center;
            margin-top: rem(0.5);
            > a {
                display: flex;
                align-items: center;
                md-icon {
                    margin-right: rem(0.4);
                }
            }
        }
    }
}
</style>