import L from "leaflet";

// TODO: look at a bundler for esri-leaflet: https://github.com/esri/esri-leaflet-bundler
//const L2 = require('esri-leaflet');
import { featureLayer, dynamicMapLayer } from 'esri-leaflet';
import 'esri-leaflet-renderers';

export class Layer {
    // TODO: look at this plugin for support for more layer https://github.com/mapbox/leaflet-omnivore
    constructor() {
        console.log('layers');
    }

    // TODO: try to avoid getCapabilities for WMS. Use Web Presence metadata return info to store, legend image link, layer name, and other needed properties.
    addWMS(map: any, layer: LayerConfig) {
        let wms: any = {};
        wms =  L.tileLayer.wms(layer.url, {
            layers: layer.entries,
            format: 'image/png',
            transparent: true,
            id: crypto.getRandomValues(new Uint32Array(1)).join('-'),
            // TODO: may use class name instead of id because marker layer like esri feature will have to work with class
            // TODO may not need if we use opacity 0 for dislay one
            className: crypto.getRandomValues(new Uint32Array(1)).join('-'),
            attribution: ''
        });
        
        (wms as any).type = layer.type;

        wms.addTo(map);

        //wms.getContainer().setAttribute('id', (wms as any).options.id);

        return wms;
    }

    addEsriFeature(map: any, layer: LayerConfig) {
        // Hard way to do symbol. MAybe the good thing to do instead of eari-leaflet-renderer
        // https://esri.github.io/esri-leaflet/examples/styling-feature-layer-points.html
        const id = crypto.getRandomValues(new Uint32Array(1)).join('-');
        //map.createPane(id, map.getContainer().getElementsByClassName('leaflet-map-pane')[0]);

        const feat = featureLayer({
            url: layer.url,
        });

        (feat as any).type = layer.type;
        //(feat as any).pane = id;
        (feat as any).id = id;
        
        feat.addTo(map);

        // add the id to the panel so we can control it from the legend
        //map.getContainer().getElementsByClassName(`leaflet-${id}-pane`)[0].id = (feat as any).options.id

        return feat;
    }

    addEsriDynamic(map: any, layer: LayerConfig) {
        
        const id = crypto.getRandomValues(new Uint32Array(1)).join('-');
        //map.createPane(id, map.getContainer().getElementsByClassName('leaflet-map-pane')[0]);

        const feat = dynamicMapLayer({
            url: layer.url,
            layers: layer.entries.split(',').map((item: string) => {
                return parseInt(item, 10);
            }),
            attribution: ''
        });

        (feat as any).type = layer.type;
        //(feat as any).pane = id;
        (feat as any).id = id;

        feat.addTo(map);

        // add the id to the panel so we can control it from the legend
        //map.getContainer().getElementsByClassName(`leaflet-${id}-pane`)[0].id = (feat as any).options.id

        return feat;
    }

    // WCS https://github.com/stuartmatthews/Leaflet.NonTiledLayer.WCS
}

export interface LayerConfig {
    url: string,
    type: string,
    entries: string
}