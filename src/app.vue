<template>
    <v-app>
        <div class="cgp-leaflet-app">
            <cgp-map :id="mapId" :projection="config.projection" :zoomLevel="config.zoomLevel" :center="config.center" :language="config.language" :layers="config.layers"></cgp-map>
        </div>
    </v-app>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import MapV from './components/map.vue';
import { InlineMapConfig } from './common/common';

import L from 'leaflet';
import 'proj4leaflet';

@Component({
    components: {
        'cgp-map': MapV
    }
})
export default class AppV extends Vue {
    private maps: any[] = [];
    private config: InlineMapConfig;
    private mapId: string = '';

    // VUE Lifecycle: // https://www.digitalocean.com/community/tutorials/vuejs-component-lifecycle
    beforeMount() {
        // get the inline configuration
        // TODO: make it work with default config and  uuid from catalog
        // expression is not null or undefined, use the non-null assertion operator ! to coerce away those types
        const element = this.$parent.$el;
        this.config = JSON.parse(element.getAttribute('data-leaflet')!.replace(/'/g, '"'));
    }

    mounted() {
        // see on wich app it is linked
        this.mapId = this.$parent.$options.mapId!;

        // set language
        this.$vuetify.lang.current = this.config.language.split('-')[0];
        this.maps.push(this.config);
    }
}
</script>

<style lang="scss">
// APP-WIDE STYLES
@use 'styles/main';
.cpg-leaflet-app {
    height: 500px;
}
.v-application--wrap {
    min-height: auto !important;
}
</style>

<style lang="scss" scoped>
.cpg-leaflet-app {
}
</style>