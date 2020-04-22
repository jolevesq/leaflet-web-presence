import { Map, MapConfig, LayerConfig } from './map';
import { Basemap } from './basemap';
import { Layer } from './layer';
import { Legend } from './legend';
import { Identify } from './identify';

export default class LeafLetWB {
    
    init() {
        const basemap: Basemap = new Basemap();
        const layer: Layer = new Layer();

        // find LeafLet Web Presence map on the page and get configuration
        const maps: HTMLCollectionOf<Element> = document.getElementsByClassName('llwb-map');
        for (let map of (<any>maps)) {
            // create the map from configuration
            let mapId: string = map.getAttribute('id');
            let config: MapConfig = JSON.parse(map.getAttribute('data-leaflet').replace(/'/g, '"'));
            let llMap: Map = new Map(mapId, config);

            // add basemaps
            basemap.addCBMT(llMap);

            // add legend control
            const legendControl = new Legend(llMap);
            legendControl.add(llMap);

            // add layers
            for (let item of config.layers) {
                if (item.type === 'ogcWMS') {
                    let layerItem = layer.addWMS(llMap, item);
                    legendControl.addLegendItem(layerItem);
                } else if (item.type === 'esriFeature') {
                    let layerItem = layer.addEsriFeature(llMap, item);
                    legendControl.addLegendItem(layerItem);
                } else if (item.type === 'esriDynamic') {
                    let layerItem = layer.addEsriDynamic(llMap, item);
                    legendControl.addLegendItem(layerItem);
                }
            }

            // setup identify
            new Identify(llMap);
        }
    }
}

(<any>window).leafletWB = new LeafLetWB();
(<any>window).onload = (<any>window).leafletWB.init();