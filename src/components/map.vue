<template>
    <l-map ref="myMap" style="height: 100%;" @ready="mapReady()" :zoom="zoomLevel" :center="center" :crs="crs" :options="mapOptions">
        <l-tile-layer v-for="(basemap, idx) in basemaps" v-bind:key="idx" :url="basemap.url" :options="basemap.options"></l-tile-layer>
        <l-control-scale position="bottomright" :imperial="false" :metric="true"></l-control-scale>
        <l-control-attribution position="bottomleft"></l-control-attribution>
        <overview-map :center="String(center)" :zoom="zoomLevel" :crs="crs"></overview-map>
        <mouse-position></mouse-position>
        <map-nav-section></map-nav-section>
        <app-bar-section></app-bar-section>
    </l-map>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import L from 'leaflet';
import { LMap, LTileLayer, LControlScale, LControlAttribution, LControlZoom, LMarker } from 'vue2-leaflet';
const MiniMap = require('leaflet-minimap');

import MousePositionV from './mapctrl/mouse-position.vue';
import OverviewMapV from './mapctrl/overview-map.vue';
import AppBarV from './appbar/app-bar.vue';
import MapNavV from './mapnav/mapnav.vue';

import { Basemap, BasemapOptions, Attribution } from '../common/basemap';
import { Projection } from '../common/projection';
import { Layer, LayerConfig } from '../common/layer';

import { MapStore } from '@/store/modules/map';
import { Get, Sync, Call } from 'vuex-pathify';

@Component({
    components: {
        LMap,
        LTileLayer,
        LControlScale,
        LControlAttribution,
        LControlZoom,
        LMarker,
        'map-nav-section': MapNavV,
        'overview-map': OverviewMapV,
        'mouse-position': MousePositionV,
        'app-bar-section': AppBarV
    }
})
export default class MapV extends Vue {
    private zoomLevel: number;
    private center: unknown;
    private url: string;
    private attribution: string;
    private marker: unknown = L.latLng(47.41322, -1.219482);
    private basemaps: BasemapOptions[];
    private crs: unknown;
    private id: string;

    private layers: LayerConfig[];

    private mapOptions = {
        attributionControl: false,
        zoomControl: false
    }

    $refs!: {
        myMap: HTMLFormElement
    }

    beforeMount() {  
        // get the needed projection. Web Mercator is out of the box but we need to create LCC
        // the projection will work with CBMT basemap. If another basemap would be use, update...
        this.crs = (String(this.$attrs.projection) === '3857') ? (L as any).CRS[`EPSG${this.$attrs.projection}`] : Projection.getProjection(this.$attrs.projection);

        // init when class is created
        const basemap: Basemap = new Basemap();
        this.basemaps = (String(this.$attrs.projection) === '3857') ? basemap.wmCBMT : basemap.lccCBMT;

        this.layers = (this as any).$attrs.layers;

        // info to set default extent and zoom level
        this.center = this.$attrs.center;
        this.zoomLevel = Number(this.$attrs.zoomLevel);

        this.id = this.$attrs.mapId;
    }

    mounted() {
        // init when component is mounted
        this.$nextTick(() => {
            const map = this.$refs.myMap.mapObject;

            // TODO: remove, it is just a test to add a custom marker
            L.marker([45.41322, -75.219482]).addTo(map);

            // add layers
            const layer = new Layer();
            const layers = (this.layers as any);
            const createdLayers = [];
            for (const item of layers) {
                if (item.type === 'ogcWMS') {
                    createdLayers.push(layer.addWMS(map, item));
                } else if (item.type === 'esriFeature') {
                    createdLayers.push(layer.addEsriFeature(map, item));
                } else if (item.type === 'esriDynamic') {
                    createdLayers.push(layer.addEsriDynamic(map, item));
                }
            }

            map.cpgLayers = createdLayers;

            // TODO: does not handle well LCC projection, will have to implementent one 
            // remove + dependency
            const baseOver = L.tileLayer(this.basemaps[0].url, (this.basemaps[0].options as unknown as L.TileLayerOptions));
            const minimapOptions = {
                position: 'topright',
                zoomLevelOffset: -5,
                zoomAnimation: true,
                toggleDisplay: true
            }

            //new MiniMap(baseOver, minimapOptions).addTo(map);
        });
    }

    public mapReady(): void {
        const mapObject = this.$refs.myMap.mapObject;
        mapObject.language = this.$attrs.language;
        mapObject.id = this.$attrs.id;
        
        const basemap: Basemap = new Basemap();
        setTimeout(() => {
            // to remove the ESRI added automatically attribution feature layer
            mapObject.attributionControl.initialize();
            mapObject.attributionControl.setPrefix('');
            mapObject.attributionControl.addAttribution((this.$attrs.language === 'en-CA') ? basemap.attribution['en-CA'] : basemap.attribution['fr-CA']);
        }, 2000); // TODO: use event instead of tieout
        mapObject.attributionControl.setPosition('bottomleft');

        this.$store.set('map/addMaps!', mapObject);
    }
}
</script>

<style lang="scss">
// TODO: clean and/or put inside a specific vendors overwrite
// TODOL: make it work with scoped style
.leaflet-control-scale {
    z-index: 30;
    position: absolute;
    width: 120px;
    height: 20px;
    padding-left: 2px;
    font-size: 11px;
    font-weight: 500;
    background-color:rgba(255, 255, 255, 0.80);
    right: 0px;
    bottom: 0px;
    margin-bottom: 0px!important;
    margin-right: 0px!important;

    .leaflet-control-scale-line {
        background-color: rgba(255, 255, 255, 0.80);
        border: 1px solid #000!important;
        border-left: none!important;
        border-right: none!important;
        border-top: none!important;
        margin: auto!important;
    }
}

.leaflet-control-attribution {
    font-size: 11px;
    font-weight: 500;
    background-color: rgba(255, 255, 255, 0.80)!important;
    height: 20px!important;
}
</style>