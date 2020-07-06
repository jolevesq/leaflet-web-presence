<template>
  <v-app>
  <v-container>
    <div v-for="(map, idx) in maps" v-bind:key="idx">
      {{map.name}}
      <wp-map :id="map.id" :projection="map.projection" :zoomLevel="map.zoomLevel" :center="map.center" :language="map.language" :layers="map.layers"></wp-map>
    </div>
  </v-container>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import wpMap from "./components/map.vue";
import { MapDomConfig } from "./components/map.vue";

import L from "leaflet";
import "proj4leaflet";


@Component({
  name: "wp-leaflet-viewer",
  components: {
    wpMap
  }
})
export default class App extends Vue {
  private maps: any = [];
 
  beforeMount() {
    this.initMap();
  }

  // https://www.digitalocean.com/community/tutorials/vuejs-component-lifecycle
  private initMap() {
    const maps: HTMLCollectionOf<Element> = document.getElementsByClassName("llwb-map");
    for (let i = 0; i < maps.length; i++) {
      // create the map from configuration
      // TODO: here, check if it is from config or API and do the right call
      const myMap: any = maps[i];
      const config: MapDomConfig = JSON.parse(myMap.getAttribute('data-leaflet').replace(/'/g, '"'));

      myMap.id = maps[i].id
      myMap.name = config.name;
      myMap.projection = config.projection;
      myMap.zoomLevel = config.zoomLevel;
      myMap.center = config.center;
      myMap.language = config.language;
      myMap.layers = config.layers;
    
      // set language
      this.$vuetify.lang.current = myMap.language.split('-')[0];
      this.maps.push(maps[i]);
    }
  }
}

interface Map extends Element{
  name: string
}
</script>
