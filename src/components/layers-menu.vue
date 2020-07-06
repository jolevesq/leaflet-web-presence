<template>
    <v-card
      class="cgp-layers-menu"
      max-width="400"
      light>
      <!-- v-if="map-status === 'loaded'"> -->
        <span>Layers {{ this.thelayers.length }}</span>
        <v-list>
          <div v-for="(layer, idx) in thelayers" v-bind:key="idx">
            <template>
              <v-divider></v-divider>
              <div class="cgp-layer-line">

                  <v-row class="cgp-layer">
                      <v-hover class="cpg-layer-stack">
                        <template v-slot:default="{ hover }">
                          <v-card
                            :elevation="hover ? 12 : 6"
                            class="mx-auto transition-swing"
                            @click="layer.expand = !layer.expand"
                          >
                            <img class="cgp-symbol-small" v-if="layer.type !== 'ogcWMS'" v-bind:src="'data:image/png;base64,'+ layer.symbols[0]" />
                            <img class="cgp-symbol-small" v-if="layer.type === 'ogcWMS'" v-bind:src="layer._url + '?request=GetLegendGraphic&version=1.3.0&Service=WMS&SLD_VERSION=1.1.0&format=image/png&layer=' + layer.wmsParams.layers" />

                            
                          </v-card>
                        </template>
                      </v-hover>
                        <div class="cgp-layer-name">
                          <span>{{ layer.name }}</span>
                        </div>
                        <div class="cgp-layer-controls">
                          <v-slider
                            class="cgp-layer-opa"
                            v-model="layer.opacityLayer"
                            :thumb-size="24"
                            :max="100"
                            :min="0"
                            :thumb-label="true"
                            @change="setOpacity(layer)"></v-slider>
                          <v-checkbox
                            class="cgp-layer-vis align-center justify-center"
                            v-model="layer.visibleLayer"
                            @change="setVisibility(layer)"></v-checkbox>
                        </div>
                    </v-row>
                    <v-row class="cpg-row-symbol" v-show="layer.expand">
                          <v-card>
                              <div v-for="(img, idx) in layer.options.layers" v-bind:key="idx">
                                <img v-if="layer.type !== 'ogcWMS'" v-bind:src="'data:image/png;base64,'+ layer.symbols[idx]" />
                                <img v-if="layer.type === 'ogcWMS'" v-bind:src="layer._url + '?request=GetLegendGraphic&version=1.3.0&Service=WMS&SLD_VERSION=1.1.0&format=image/png&layer=' + layer.wmsParams.layers" />
                            </div>
                          </v-card>
                    </v-row>

              </div>
            </template>
          </div>
        </v-list>
    </v-card>
</template>

<script lang="ts">
import { Watch, Component, Vue } from "vue-property-decorator";
import { Layer, LayerConfig } from '../common/layers';

import L from "leaflet";

import axios from 'axios';

import { Get, Sync, Call } from 'vuex-pathify';
import { MapStore } from '@/store/modules/map';

@Component({
  name: "wpLayersMenu",
  components: {},
  props: []
})

export default class LayersMenu extends Vue {
  // @Watch('mapStatus', { deep: true }) 
  // onPropertyChanged(newValue: string, oldValue: string) {
  //   console.log(`Updating from ${oldValue} to ${newValue}`);
  // }

  // TODO not able to make it work woth decorator... use or not???
  //@Get('map/getMapById') getMapByid!: (id: string) => any | undefined;
  //this.getMapByid(this.$parent.$parent.$parent.$el.id)

  private thelayers: any[] = [];
  created() {
    console.log('layer menu component created');
    setTimeout(this.createLegend, 2000)
  }

  createLegend() {
    console.log('yes we will create it');
    const map = this.$store.get('map/getMapById', this.$parent.$parent.$parent.$el.id);
    const aaa = (map as any).wpLayers;
    aaa.forEach((item: any) => {
      Vue.set(item, 'name', "WMS")

      Vue.set(item, 'symbols', []);

      Vue.set(item, 'expand', false);
      
      if (typeof item.options.layers === "string") {
        Vue.set(item.options, 'layers', item.options.layers.split(','));
      }
      
      if (item.type !== 'ogcWMS') {
        item._url = item.options.url;

        item.metadata((error: any, metadata: any) => {
          const name = (typeof metadata.documentInfo !== 'undefined') ? metadata.documentInfo.Title : metadata.name;
          Vue.set(item, 'name', name);
        });
      }

      if (item.type === 'esriFeature') {
        Vue.set(item.options, 'layers', ['1']);

        axios
        .get(`${item._url}/legend?f=pjson`)
        .then(response => {
          if (typeof response.data.drawingInfo !== 'undefined' && item.type === 'esriFeature') {
            item.symbols.push(response.data.drawingInfo.renderer.symbol.imageData);
          }
        });
      } else if (item.type === 'esriDynamic') {
        axios
        .get(`${item._url}/legend?f=pjson`)
        .then(response => {
          const layers = response.data.layers;

          layers.forEach((layer: any) => {
            if (typeof (layer as any).legend !== 'undefined') {
              layer.legend.forEach((legItem: any) => {
                item.symbols.push(legItem.imageData);
              });
            }
          });
        });
      }

      item.visibleLayer = true;
      item.opacityLayer = 100;
      this.thelayers.push(item)
    });

    // Disable events on container
    const legendElem = (this.$el as HTMLElement);
    L.DomEvent.disableClickPropagation(legendElem);
    L.DomEvent.disableScrollPropagation(legendElem);
  }

  setVisibility(layer: any) {
    const opacity = layer.visibleLayer ? 1 : 0;
    this.setLayerStyle(layer, opacity);
  }

  setOpacity(layer: any) {
    this.setLayerStyle(layer, layer.opacityLayer / 100);
  }

  private setLayerStyle(layer: any, opacity: number) {
    if (layer.type === "esriFeature") {
      layer.eachFeature((feature: any) => {
        feature.setOpacity(opacity)
      });
    } else {
      layer.setOpacity(opacity);
    }
  }
}
</script>

<style lang="scss">
.cgp-layers-menu {
    height: calc(100% - 60px);
    z-index: 415;

    width: 400px!important;
    left: 10px;
    top: 10px;

    background: #f5f5f5!important;

    overflow: auto;

  .cgp-layer-line {
    padding: 10px 20px;
  }

    .cgp-layer {
      display: flex;
      flex-direction: row;
      align-items:  center;
      position: relative;
      padding: 5px;

      .cpg-layer-stack {
        height: 30px;
        width: 30px;
        display: flex;

        .cgp-symbol-small {
          width: 24px;
          height: 24px;
          
          margin-left: auto;
          margin-right: auto;
          margin-top: auto;
          margin-bottom: auto;
        }
      }

      .cgp-layer-name {
        display: flex;
        flex-direction: column;
        flex: 1;
        min-width: 0;
        margin: 0 10px 0 16px;
      }

      .cgp-layer-controls {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items:  center;

        width: 150px;

        .cgp-layer-opa {
          padding-left: 10px;
          padding-right: 10px;
          max-width: 100px;
        }

        .cgp-layer-vis {
          margin: 0;
          float: right;
        }
      }
    }

  .cpg-row-symbol {
    height: 100%;
  }
}
</style>