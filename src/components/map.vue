<template>
  <div class="basic-example">
    <l-map ref="myMap" style="height: 100%;" @ready="mapReady()" :zoom="zoomLevel" :center="center" :crs="crs" :options="mapOptions">
      <l-tile-layer v-for="(basemap, idx) in basemaps" v-bind:key="idx" :url="basemap.url" :options="basemap.options"></l-tile-layer>
      <l-control-scale position="bottomright" :imperial="true" :metric="true"></l-control-scale>
      <l-control-attribution position="bottomleft"></l-control-attribution>
      <l-control-zoom position="bottomright"></l-control-zoom>
      <cgp-nav-bar></cgp-nav-bar>
      <wp-mouse-position></wp-mouse-position>
      <wp-app-bar></wp-app-bar>
    </l-map>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import L from "leaflet";
import { LMap, LTileLayer, LControlScale, LControlAttribution, LControlZoom, LMarker } from "vue2-leaflet";

import wpMousePosition from "./mouse-position.vue";
import wpAppBar from "./app-bar.vue";
import cgpNavBar from "./nav-bar.vue"

import { Basemap, BasemapOptions, Attribution } from "../common/basemaps";
import { Layer, LayerConfig } from '../common/layers';

import { MapStore } from '@/store/modules/map';
import { Get, Sync, Call } from 'vuex-pathify';


@Component({
  name: "wpMap",
  components: {
    LMap,
    LTileLayer,
    LControlScale,
    LControlAttribution,
    LControlZoom,
    LMarker,
    cgpNavBar,
    wpMousePosition,
    wpAppBar
  },
  props: []
})
export default class Map extends Vue {
  private zoomLevel: number;
  private center: unknown;
  private url: string;
  private attribution: string;
  private marker: unknown = L.latLng(47.41322, -1.219482);
  private basemaps: BasemapOptions[];
  private crs: unknown;

  private layers: LayerConfig[];
  //private baseOptions: object;

  private mapOptions = {
    attributionControl: false,
    zoomControl: false
  }

  $refs!: {
    myMap: HTMLFormElement
  }

  created() {  
    // get the needed projection. Web Mercator is out of the box but we need to create LCC
    // the projection will work with CBMT basemap. If another basemap would be use, update...
    this.crs = (String(this.$attrs.projection) === "3857") ? (L as any).CRS[`EPSG${this.$attrs.projection}`] : this.getLCCProjection();

    // init when class is created
    const basemap: Basemap = new Basemap();
    this.basemaps = (String(this.$attrs.projection) === "3857") ? basemap.wmCBMT : basemap.lccCBMT;
    //this.baseOptions = this.basemaps[0].options;

    this.layers = (this as any).$attrs.layers;

    this.center = this.$attrs.center;
    this.zoomLevel = Number(this.$attrs.zoomLevel);
  }

  mounted() {
    // init when component is mounted
    this.$nextTick(() => {
      const map = this.$refs.myMap.mapObject;
      L.marker([47.41322, -1.219482]).addTo(map);

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

      const basemap: Basemap = new Basemap();
      setTimeout(() => {
        // to remove the ESI added automatically attrbution feature layer
        map.attributionControl.initialize();
        map.attributionControl.setPrefix('');
        map.attributionControl.addAttribution((this.$attrs.language === "en-CA") ? basemap.attribution["en-CA"] : basemap.attribution["fr-CA"]);
      }, 2000);
      map.attributionControl.setPosition('bottomleft');

      map.wpLayers = createdLayers;
      this.$store.set('map/addMaps!', map)
    });
  }

  public mapReady(): void {
    const mapObject = this.$refs.myMap.mapObject;
    mapObject.language = this.$attrs.language;
    mapObject.id = this.$attrs.id;
  }

  private getLCCProjection(): object {
    // tile layer extent, expressed in local projection
    const bbox = [-4282638.061501402, -5153821.09213678, 4852210.175566408, 4376714.442097411];

    // tile layer scale and resolution
    const scale = [145000000, 85000000, 50000000, 30000000, 17500000, 10000000, 6000000, 3500000, 2000000, 1200000, 700000, 420000, 250000, 145000, 85000, 50000, 30000, 17500, 10000, 6000]
    const resolutions = [38364.660062653464, 22489.62831258996, 13229.193125052918, 7937.5158750317505, 4630.2175937685215, 2645.8386250105837, 1587.5031750063501, 926.0435187537042, 529.1677250021168, 317.50063500127004, 185.20870375074085, 111.12522225044451, 66.1459656252646, 38.36466006265346, 22.48962831258996, 13.229193125052918, 7.9375158750317505, 4.6302175937685215, 2.6458386250105836, 1.5875031750063502]

    // transformation matrix
    const transformation = new L.Transformation(1, -bbox[0], -1, bbox[3]);

    const p1 = L.point(4376714.442097411, -4282638.061501402);
    const p2 = L.point(-5153821.09213678, 4852210.175566408);

    // LCC projection
    const crs = new (L as any).Proj.CRS('EPSG:3978', '+proj=lcc +lat_1=49 +lat_2=77 +lat_0=49 +lon_0=-95 +x_0=0 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs', {
          resolutions: resolutions,
          origin: [-3.46558E7, 3.931E7],
          bounds: L.bounds(p1, p2),
          transformation: transformation,
          scale: scale
        }
      );

      return crs;
  }
}

export interface MapDomConfig {
    name?: string;
    projection: number,
    zoomLevel: number,
    center: number[],
    layers: LayerConfig[],
    language: string
}

export interface MapApiConfig {
    projection: number,
    zoomLevel: number,
    center: number[],
    layers: LayerConfig[],
    language: string
}
</script>

<style lang="scss">
  .basic-example {
    width: 100%;
    height: 500px;
  }

  .leaflet-control-scale {
    z-index: 30;
    position: absolute;
    width: 120px;
    height: 40px;
    padding-left: 2px;
    font-size: 11px;
    font-weight: 500;
    background-color: hsla(0,0%,100%,.62);
    right: 0px;
    bottom: 0px;
    margin-bottom: 0px!important;
    margin-right: 0px!important;

    .leaflet-control-scale-line:first-child {
        border: 1px solid #000!important;
        border-left: none!important;
        border-right: none!important;
        border-top: none!important;
        background-color: none!important;
        background: none!important;
    }

    .leaflet-control-scale-line:not(:first-child) {
        border: 1px solid #000!important;
        border-left: none!important;
        border-right: none!important;
        border-bottom: none!important;
        margin-top: 4px;
        background-color: none!important;
        background: none!important;
    }
  }
</style>
