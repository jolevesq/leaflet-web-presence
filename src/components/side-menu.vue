<template>
    <v-navigation-drawer class="cgp-side-menu" app :value="isOpen" @input="setState(isSideMenuOpen)" absolute temporary>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
              <v-btn class="cgp-close-btn mx-0 float-right" text rounded small color="primary" v-on="on" @click="setState(false)">
                  <v-icon>$vuetify.icons.closePanelLeft</v-icon>
              </v-btn>
          </template>
          <span>{{ $vuetify.lang.t('$vuetify.close') }}</span>
      </v-tooltip>
      <v-img :aspect-ratio="16/9" src="https://cdn.vuetifyjs.com/images/parallax/material.jpg">
          <v-row align="end" class="lightbox black--text pa-2 fill-height">
            <v-col>
              <div class="subheading">{{ $vuetify.lang.t('$vuetify.logoText') }}</div>
            </v-col>
          </v-row>
        </v-img>
        <v-list>
          <template v-for="(item, i) in items">
            <v-divider v-if="item.divider" :key="i"></v-divider>
            <v-list-item v-else :key="item.title" @click="doAction(item.title)">
              <v-list-item-action>
                <v-icon>{{ `$vuetify.icon.${item.icon}` }}</v-icon>
              </v-list-item-action>
              <v-list-item-title>{{ $vuetify.lang.t(`$vuetify.${item.title}`) }}</v-list-item-title>
            </v-list-item>
          </template>
        </v-list>

        <span style="flex: 1 1"></span>
        <v-divider></v-divider>
        <div class="cgp-version">
            <span class="cgp-version-number">{{ version }}<span class="cgp-version-hash"> {{ hash }}</span></span>
            <span class="cgp-version-timestamp">{{ timestamp }}</span>
            <div class="cgp-version-github">
                <a href="https://github.com/fgpv-vpgf/fgpv-vpgf" target="_parent">
                    <v-icon>$vuetify.icons.github</v-icon>fgpv-vpgf/fgpv-vpgf</a>
            </div>
        </div>
    </v-navigation-drawer>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import { Get, Sync, Call } from 'vuex-pathify';
import { MapStore } from '@/store/modules/map';

@Component({
  name: "wpSideMenu",
  components: {},
  props: ['isOpen']
})
export default class SideMenu extends Vue { 
    @Get(MapStore.getVersion) version: string;
    @Get(MapStore.getHash) hash: string;
    @Get(MapStore.getTimestamp) timestamp: string;

    // reactive property must be set even if not use in child component
    private isSideMenuOpen = null;

    // side menu items
    private items = [
      { divider: true },
      { icon: 'layers', title: 'layers' },
      { divider: true },
      { icon: 'fullScreen', title: 'fullScreen' },
      { icon: 'help', title: 'help' }
    ];
  
    // function to emit side menu state to parent
    setState(isOpen: boolean) {
        this.$emit('listenerSideMenuOpen', isOpen);
    }

    doAction(action: string) {
      console.log(action);
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
  z-index: 1500!important;
  height: 100%!important;

  &__content {
  display: flex;
  flex-direction: column;

    .cgp-close-btn {
      justify-content: flex-end;
    }
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
}
</style>