<template>
    <l-control position="topright" style="width: 200px; height: 200px" class="w-200 h-200" disableClickPropagation disableScrollPropagation>
        <l-map ref="myMap" style="height: 100%;" @ready="mapReady()" :zoom="zoom" :center="center" :crs="crs" :options="mapOptions">
            <l-tile-layer v-for="(basemap, idx) in _basemaps" v-bind:key="idx" :url="basemap.url" :options="basemap.options"></l-tile-layer>
        </l-map>
    </l-control>
</template>

<script lang="ts">
import { Vue, Component, Prop, PropSync, Watch, Ref } from 'vue-property-decorator';

import L from 'leaflet';
import { LMap, LTileLayer, LControl } from 'vue2-leaflet';

import { Basemap, BasemapOptions } from '../../common/basemap';
import { Projection } from '../../common/projection';

import { Get } from 'vuex-pathify';
import { MapStore } from '@/store/modules/map';
@Component({
    components: {
        LMap,
        LTileLayer,
        LControl
    }
})
export default class OverviewMapV extends Vue {
    private _mainMap: any;
    @Watch('maps')
    updateMap(newValue: any[], oldValue: any[]) {
        this._mainMap = newValue[0];
    }

    private _overMap: any;
    @Ref('overMap') readonly button!: any

    private _basemaps: BasemapOptions[] = [];
    private crs: any = this.$attrs.crs;
    //@PropSync('crs', Object) crs1!: Object;

    private _center: Array<number>;
    private _zoom: number;
    get center(): Array<number> {
        return this._center;
    }
    set center(value: Array<number>) {
        this._center = value;
    }
    get zoom(): number {
        return this._zoom;
    }
    set zoom(value: number) {
        this._zoom = value;
    }

    private mapOptions = {
        attributionControl: false,
        zoomControl: false
    }

    created() {
        // get the needed projection. Web Mercator is out of the box but we need to create LCC
        // the projection will work with CBMT basemap. If another basemap would be use, update...
        //this.crs1 = this.$attrs.crs; //(String((this.$attrs.crs as any).code) === 'EPSG:3857') ? (L as any).CRS[`EPSG${this.$attrs.projection}`] : Projection.getProjection(this.$attrs.projection);
        this.zoom = (Number(this.$attrs.zoom) - 3);
        const center = String(this.$attrs.center).split(',').map(function(item) { return Number(item) });
        this.center = [center[0], center[1]];
        const basemap: Basemap = new Basemap();
        this._basemaps = (String((this.crs as any).code) === 'EPSG:3857') ? basemap.wmCBMT : basemap.lccCBMT;
    }

    public mapReady(): void {
        this.$nextTick(() => {
            this._overMap = this.$refs.overMap;
        });
    }
}
</script>

<style lang="scss">
</style>