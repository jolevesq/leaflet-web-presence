import Vue from 'vue';

// extend `ComponentOptions` to accept `mapId` as one of the component options
declare module 'vue/types/options' {
    interface ComponentOptions<V extends Vue> {
        /**
         * A reference to mapId.
         *
         * @type {String}
         * @memberof ComponentOptions
         */
        mapId?: string;
    }
}

// extend `Vue` to expose `$mapId` as the existing property
declare module 'vue/types/vue' {
    interface Vue {
        /**
         * A reference to mapId for this vue app.
         *
         * @type {String}
         * @memberof Vue
         */
        $mapId: string;
    }
}