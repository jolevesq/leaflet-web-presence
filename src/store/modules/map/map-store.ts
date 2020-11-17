import { ActionContext, Action } from 'vuex';
import { make } from 'vuex-pathify';

import { AppVersion } from '../../../common/common'
import { RootState } from '@/store';
import { MapState } from './map-state';

// use for actions
type MapContext = ActionContext<MapState, RootState>;

// get viewer version
declare const __VERSION__: AppVersion;

const getters = {
    getMapById: (state: MapState) => (id: string): any | undefined => {
        return state.maps.find((map: any) => map.id === id);
    },
    getInitExtent: (state: MapState) => (id: string): any | undefined => {
        return state.maps[0].initExtent;
    },
    getVersion: () => { return `v.${__VERSION__.major}.${__VERSION__.minor}.${__VERSION__.patch}` },
    getHash: () => { return `[#${__VERSION__.hash.slice(0, 6)}]` },
    getTimestamp: () => { return new Date(__VERSION__.timestamp).toLocaleDateString() },
};

const actions = {
    addMaps: (context: MapContext, map: any) => {
        map.initExtent = {
            center: map.getCenter(),
            zoom: map.getZoom()
        };

        context.commit('ADD_MAP', map);
    }
};

const mutations = {
    ADD_MAP: (state: MapState, value: any) => {
        // copy to new array so watchers will have a reference to the old value
        state.maps = [...state.maps, value]
    }
};

export enum MapStore {
    /**
     * (Getter) getMapById: (id: string) => Map | undefined
     */
    getMapById = 'map/getMapById',
    getVersion = 'map/getVersion',
    getHash = 'map/getHash',
    getTimestamp = 'map/getTimestamp',
    getInitExtent = 'map/getInitExtent',
    /**
     * (State) maps: Layer[]
     */
    maps = 'map/maps',
    /**
     * (Action) addLayers: (layerConfigs: RampLayerConfig[])
     */
    addMaps = 'map/addMaps!'
}

export function map() {
    const state = new MapState([]);

    return {
        namespaced: true,
        state,
        getters: { ...getters },
        actions: { ...actions, ...make.actions(state) },
        mutations: { ...mutations, ...make.mutations(state) }
    };
}