<template>
    <l-control position="bottomright" class="mapnav absolute right-0 bottom-0 pb-32 pr-4" disableClickPropagation disableScrollPropagation>
        <div class="flex flex-col">
            <zoom-nav-section class="mapnav-section bg-white-75 hover:bg-white"></zoom-nav-section>
            <span class="py-1"></span>
            <div class="mapnav-section bg-white-75 hover:bg-white">
                <template v-for="(button, index) in buttons">
                    <component :is="button.id + '-nav-button'" :key="button.id + 'button'"></component>
                    <v-divider class="mapnav-divider border-b p-0 self-center w-2/3" v-if="index !== buttons.length - 1" :key="button.id + 'spacer'"></v-divider>
                </template>
            </div>
        </div>
    </l-control>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import { Get } from 'vuex-pathify';

import { LControl } from 'vue2-leaflet';

import FullscreenNavV from './buttons/fullscreen-nav.vue';
import HomeNavV from './buttons/home-nav.vue';
import ZoomNavV from './buttons/zoom-nav.vue';
import MapnavButtonV from './button.vue';

Vue.component('fullscreen-nav-button', FullscreenNavV);
Vue.component('home-nav-button', HomeNavV);
Vue.component('mapnav-button', MapnavButtonV);

@Component({
    components: {
        LControl,
        'zoom-nav-section': ZoomNavV
    }
})
export default class MapNav extends Vue {
    //@Get('mapnav/visible') visible!: any[];
    private buttons: any[] = [
        { id: 'fullscreen' },
        { id: 'home' }
    ]
}
</script>

<style lang="scss" scoped>
.mapnav-section {
    @apply flex-col flex pointer-events-auto;

    .focused {
        @apply text-black;
    }
}
</style>