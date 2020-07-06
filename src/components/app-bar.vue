<template>
  <div style="height: 100%; width:100%; z-index: 500">
    <v-app-bar dense floating class="wp-app-bar align-center">
      <v-tooltip bottom>
          <template v-slot:activator="{ on }">
              <v-btn class="mx-0" text rounded small color="primary" v-on="on" @click.stop="isSideMenuOpen = !isSideMenuOpen">
                  <v-icon>$vuetify.icons.sideMenu</v-icon>
              </v-btn>
          </template>
          <span>{{ $vuetify.lang.t('$vuetify.sideMenu') }}</span>
      </v-tooltip>

      <v-spacer></v-spacer>
      <v-layout align-center justify-end>
          <span>{{ $vuetify.lang.t('$vuetify.layers') }}</span>
          <span>{{ $vuetify.lang.locales[mapLang]['layers'] }}</span>
          <v-divider class="mx-2" inset vertical></v-divider>
          <v-tooltip bottom>
              <template v-slot:activator="{ on }">
              <v-btn class="mx-0" text rounded small color="primary" v-on="on" @click.stop="isLayersMenuOpen = !isLayersMenuOpen">
                  <v-icon>$vuetify.icons.layers</v-icon>
              </v-btn>
          </template>
              <span>{{ $vuetify.lang.t('$vuetify.layers') }}</span>
          </v-tooltip>
        </v-layout>
    </v-app-bar>

    <wpSideMenu v-bind:isOpen="isSideMenuOpen" @listenerSideMenuOpen="updateSideMenuState"></wpSideMenu>
    <wpLayersMenu v-show="isLayersMenuOpen"></wpLayersMenu>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import L, { DomEvent } from "leaflet";
import { findRealParent, propsBinder } from "vue2-leaflet";

import wpSideMenu from "./side-menu.vue";
import wpLayersMenu from "./layers-menu.vue";

@Component({
  name: "wpAppBar",
  components: { wpSideMenu, wpLayersMenu },
  props: []
})
export default class AppBar extends Vue {

  private isSideMenuOpen = false;
  private isLayersMenuOpen = true;

  private mapLang: string;

  updateSideMenuState(state: boolean) {
    this.isSideMenuOpen = state;
  }

  created() {
      console.log('app bar created')

       const mapDiv = this.$parent.$el.closest('div[language]');
    let lang = 'en'
    if (mapDiv !== null) {
      const langT = (mapDiv.getAttribute('language'));
      if (langT !== null) {
        lang = langT.split('-')[0]
      }
    }
    
    this.mapLang = lang;
  }
  
  mounted() {
    console.log('app bar mounted');

    // Disable events on container
    const appBarElem = (this.$el.getElementsByClassName('wp-app-bar')[0] as HTMLElement);
    L.DomEvent.disableClickPropagation(appBarElem);
    L.DomEvent.disableScrollPropagation(appBarElem);

    // Disable events on container
    const sideMenu = (this.$el.getElementsByClassName('cgp-side-menu')[0] as HTMLElement);
    L.DomEvent.disableClickPropagation(sideMenu);
    L.DomEvent.disableScrollPropagation(sideMenu);
  }
}

</script>

<style lang="scss">
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

.wp-app-bar {
    width: 400px!important;
    left: 10px!important;
    top: 10px!important;

    //margin-top: 0px!important;
    //margin-left: 0px!important;

    // pointer-events: all;
    // box-sizing: border-box;
     z-index: 425;
    // background: #fff;
    // align-items: center;
    // padding: 4px 10px;
    //display: flex;
     position: relative;
     //flex: 1;
    // width: 100%;
    // transition: flex .1s cubic-bezier(.35,0,.25,1);

    // border-radius: 2px;

    // .wp-control-legend-button {

    //     transition: background-color .13s ease-in;
    //     margin: 2px 0;
    //     position: relative;
    //     border-radius: 2px;
    //     padding: 0;

    //     background: url(./content/images/fullscreen.png) no-repeat 0 0;
    //     background-size:32px 60px;

    //     a {
    //         width: 32px;
    //         height: 32px;
    //         line-height: 32px;
    //         color: #607d8b;
    //         opacity: .62;
    //     }

    //     a:hover {
    //         color: #666;
    //     }
    // }
}
</style>