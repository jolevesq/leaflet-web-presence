<template>
  <div class="cgp-nav-bar">
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import L, { DomEvent } from 'leaflet';
import { findRealParent, propsBinder } from 'vue2-leaflet'

import { FullScreen } from "../controls/fullscreen";

@Component({
  name: "cgpNavBar",
  components: {}
})
export default class NavBar extends Vue {
    private mapObject: unknown;
    private parentContainer: unknown;

    created() {
        console.log('nav bar ok');
    }

    mounted() {
        this.parentContainer = findRealParent(this.$parent);
        new FullScreen((this as any).parentContainer.mapObject);
    
        this.mapObject = (L as any).control.fullscreen({});
        (this as any).mapObject.addTo((this as any).parentContainer.mapObject);
  }
}
</script>

<style lang="scss">

</style>