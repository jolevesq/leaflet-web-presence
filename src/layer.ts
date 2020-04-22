import { LayerConfig } from './map';

const L = require('leaflet');

// TODO: look at a bundler for esri-leaflet: https://github.com/esri/esri-leaflet-bundler
//const L2 = require('esri-leaflet');
import { featureLayer, dynamicMapLayer } from 'esri-leaflet';
import 'esri-leaflet-renderers';

export class Layer {
    // TODO: look at this plugin for support for more layer https://github.com/mapbox/leaflet-omnivore
    constructor() {
    }

    // TODO: try to avoid getCapabilities for WMS. Use Web Presence metadata return info to store, legend image link, layer name, and other needed properties.
    addWMS(map: any, layer: LayerConfig) {
        const wms =  L.tileLayer.wms(layer.url, {
            layers: layer.entries,
            format: 'image/png',
            transparent: true,
            id: crypto.getRandomValues(new Uint32Array(1)).join('-'),
            // TODO: may use class name instead of id because marker layer like esri feature will have to work with class
            className: crypto.getRandomValues(new Uint32Array(1)).join('-'),
            type: layer.type
        });
        
        wms.addTo(map);

        wms.getContainer().setAttribute('id', wms.options.id);

        return wms;
    }

    addEsriFeature(map: any, layer: LayerConfig) {
        // Hard way to do symbol. MAybe the good thing to do instead of eari-leaflet-renderer
        // https://esri.github.io/esri-leaflet/examples/styling-feature-layer-points.html
        const id = crypto.getRandomValues(new Uint32Array(1)).join('-');
        map.createPane(id, map.getContainer().getElementsByClassName('leaflet-map-pane')[0]);

        const feat = featureLayer({
            url: layer.url,
            type: layer.type,
            pane: id,
            id: id
        });
        
        feat.addTo(map);

        // add the id to the panel so we can control it from the legend
        map.getContainer().getElementsByClassName(`leaflet-${id}-pane`)[0].id = feat.options.id

        return feat;
    }

    addEsriDynamic(map: any, layer: LayerConfig) {
        
        const id = crypto.getRandomValues(new Uint32Array(1)).join('-');
        map.createPane(id, map.getContainer().getElementsByClassName('leaflet-map-pane')[0]);

        const feat = dynamicMapLayer({
            url: layer.url,
            type: layer.type,
            layers: layer.entries.split(',').map((item: string) => {
                return parseInt(item, 10);
            }),
            pane: id,
            id: id
        });
        
        feat.addTo(map);

        // add the id to the panel so we can control it from the legend
        map.getContainer().getElementsByClassName(`leaflet-${id}-pane`...)[0].id = feat.options.id

        return feat;
    }
}