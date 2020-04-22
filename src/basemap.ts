const L = require('leaflet');

export class Basemap {
    private _lccCBMT: BasemapOptions[] = [
        {
            url: 'https://geoappext.nrcan.gc.ca/arcgis/rest/services/BaseMaps/CBMT3978/MapServer/WMTS/tile/1.0.0/BaseMaps_CBMT3978/default/default028mm/{z}/{y}/{x}.jpg',
            options: {
                tms: false,
                maxZoom: 20,
                tileSize: 256,
                attribution: false,
                continuousWorld: true
            }
        }];
    private _wmCBMT: BasemapOptions[] = [
        {
            url: 'https://geoappext.nrcan.gc.ca/arcgis/rest/services/BaseMaps/CBMT_CBCT_GEOM_3857/MapServer/WMTS/tile/1.0.0/BaseMaps_CBMT_CBCT_GEOM_3857/default/default028mm/{z}/{y}/{x}.jpg',
            options: {
                tms: false,
                maxZoom: 20,
                tileSize: 256,
                attribution: false,
                continuousWorld: true
            }
        }, {
            url: 'https://geoappext.nrcan.gc.ca/arcgis/rest/services/BaseMaps/CBMT_TXT_3857/MapServer/WMTS/tile/1.0.0/BaseMaps_CBMT_TXT_3857/default/default028mm/{z}/{y}/{x}.png',
            options: {
                tms: false,
                maxZoom: 20,
                tileSize: 256,
                attribution: false,
                continuousWorld: true
            }
        }];

    private attribution: Attribution = {
        'en-CA': '&copy Her Majesty the Queen in Right of Canada, as represented by the Minister of Natural Resources',
        'fr-CA': '&copy Sa Majesté la Reine du Chef du Canada, représentée par le ministre des Ressources naturelles'
    }

    get lccCBMT (): BasemapOptions[] {
        return this._lccCBMT;
    }

    get wbCBMT(): BasemapOptions[] {
        return this._wmCBMT;
    }

    constructor() {
    }

    addCBMT(map: any) {
        // get basemap from EPSG code
        const basemaps = (map.options.crs.code === 'EPSG:3857') ? this.wbCBMT : this.lccCBMT; 

        for (let basemap of basemaps) {
            L.tileLayer(basemap.url, basemap.options).addTo(map);
        }

        // set attribution
        const value = map.language === 'en-CA' ? this.attribution['en-CA'] : this.attribution['fr-CA'];
        map.attributionControl.addAttribution(value);
        map.attributionControl.setPosition('bottomleft');  
    }
}

interface BasemapConfig {
    tms: boolean,
    maxZoom: number,
    tileSize: number,
    attribution: boolean,
    continuousWorld: boolean
}

interface BasemapOptions {
    url: string,
    options: BasemapConfig
}

interface Attribution {
    'en-CA': string,
    'fr-CA': string
}