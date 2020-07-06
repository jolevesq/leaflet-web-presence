import Vue from 'vue';
import Vuex from 'vuex';
import pathify from 'vuex-pathify';

import { map } from '@/store/modules/map';
import { RootState } from '@/store/state';

Vue.use(Vuex);

export const createStore = () =>
    new Vuex.Store<RootState>({
        plugins: [pathify.plugin],
        modules: {
            map: map()
        }
    });

declare module 'vuex' {
    // declare augmentation for Vuex store for Pathify
    interface Store<S> {
        set: <T>(path: string, value: any) => Promise<T> | undefined;
        get: <T>(path: string, ...args: any) => T | undefined;
        copy: <T>(path: string, ...args: any) => T | undefined;
    }
}
