<template>
  <div style="display: none;">
    <slot v-if="ready"></slot>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import L, { DomEvent } from 'leaflet';
import { findRealParent, propsBinder } from 'vue2-leaflet'

import 'leaflet-mouse-position';

@Component({
  name: "wpMousePosition",
  components: {}
})
export default class MousePosition extends Vue {
  private parentContainer: unknown;
  private mapObject: unknown;
  private ready = false;

  // get values once to reuse in private functions (cardinal points and degree symbol)
  // need to set in function because $translate.instant does not work at this point
  private cardinal: Cardinal = {
      deg: String.fromCharCode(176),
      east: '',
      west: '',
      north: '',
      south: ''
  };

  created() {
    this.loadCardinality('fr-CA');
  }
  
  mounted() {
    this.mapObject = (L as any).control.mousePosition({
            separator: ' | ',
            lngFormatter: (val: number) => { return this.coordFormnat(val, this.cardinal.deg, this.cardinal.north) },
            latFormatter: (val: number) => { return this.coordFormnat(val, this.cardinal.deg, this.cardinal.west) },
            emptyString: '-- | --',
            position: 'bottomright'
        });

    this.ready = true;
    this.parentContainer = findRealParent(this.$parent);
    (this as any).mapObject.addTo((this as any).parentContainer.mapObject);
  }

  private loadCardinality(lang: string) {
    // get values once to reuse in private functions (cardinal points and degree symbol)
    this.cardinal.east = 'E';
    this.cardinal.west = (lang === 'en-CA') ? 'W' : 'O';
    this.cardinal.north = 'N';
    this.cardinal.south = 'S';
  }

  private coordFormnat(value: number, deg: string, card: string): string {
    const d = Math.floor(Math.abs(value)) * ((value < 0) ? -1 : 1);
    const m = Math.floor(Math.abs((value - d) * 60));
    const s = Math.round((Math.abs(value) - Math.abs(d) - m / 60) * 3600);
    return `${Math.abs(d)}${deg} ${(m >= 10) ? `${m}` : `0${m}`}' ${(s >= 10) ? `${s}` : `0${s}`} ${card}"`;
  }
}

interface Cardinal {
    deg: string,
    east: string,
    west: string,
    north: string,
    south: string
}
</script>

<style lang="scss">
  .leaflet-control-mouseposition {
      position: absolute !important;
      right: 115px!important;
      width: 160px;
      text-align: center;
      bottom: 1px;
      margin-bottom: 0px!important;
      padding: 2px;
      display: flex!important;
      flex-direction: column;
      font-size: 11px;
      font-weight: 500;
      background-color: hsla(0,0%,100%,.62);
  }
</style>