
export * from '@/store/state';
export * from '@/store/store';

// import Vue from "vue";
// import Vuex from "vuex";

// declare const __VERSION__: AppVersion;

// interface AppVersion {
//   hash: string;
//   major: number;
//   minor: number;
//   patch: number;
//   timestamp: string;
// }

// Vue.use(Vuex);

// export default new Vuex.Store({
// // TODO: use vue pathify

//   state: {
//     version: {
//       packageVersion: `v.${__VERSION__.major}.${__VERSION__.minor}.${__VERSION__.patch}` ,
//       packageHash: `[#${__VERSION__.hash.slice(0, 6)}]`,
//       packageTime: new Date(__VERSION__.timestamp).toLocaleDateString()
//     },
//     map: {},
//     mapStatus: 'pending'
//   },
//   mutations: {
//     updateMap: (state, payload) => {
//       (state as any).map[payload.id] = payload;
//     }
//   },
//   actions: {
//   },
//   modules: {},
//   getters: {
//     appVersion: (state) => {
//       return state.version.packageVersion;
//     },
//     appHash: (state) => {
//       return state.version.packageHash;
//     },
//     appTime: (state) => {
//       return state.version.packageTime;
//     },
//     map: (state) => {
//       return state.map;
//     },
//     mapStatus: (state) => { return state.mapStatus; }
//   }
// });
