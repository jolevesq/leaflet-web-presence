// TODO: raw code, need refactor
class GetCapabilities {
    // private _map;

    // init() {
    //     // setup map
    //     const getCapabilitiesURL = 'https://geoappext.nrcan.gc.ca/arcgis/rest/services/BaseMaps/CBMT_CBCT_GEOM_3857/MapServer/WMTS/1.0.0/WMTSCapabilities.xml';
    //     const layerName = 'BaseMaps_CBMT_CBCT_GEOM_3857';
    //     this._map = L.map('mapWM').setView([47.579271, -75], 8);

    //     // add WMTS Layer
    //     const that = this
    //     this.parseGetCapabilitiesXML(getCapabilitiesURL, layerName, that.createLeafletLayer);
    // }

    // // parser function: load GetCapabilities XML from given URL
    // parseGetCapabilitiesXML(getCapabilitiesURL, layerName, callback) {
    //     const xhr = new XMLHttpRequest();
    //     xhr.open("GET", getCapabilitiesURL);
    //     const that = this;
    //     xhr.onload = function() {
    //         var getCapabilitiesXML = xhr.responseXML;
    //         (<any>that).getServiceURLTemplates(getCapabilitiesXML, layerName, callback);
    //     };
            
    //     xhr.send();
    // }

    // // XMLHttpRequest.onload function: extract <Style>, <TileMatrixSet> and <ressourceURL> values from parsed GetCapabilities XML
    // getServiceURLTemplates(getCapabilitiesXML, layerName, callback) {
    //     const layerNodes = getCapabilitiesXML.getElementsByTagName('Layer');

    //     for (let node of layerNodes) {
    //         let title = node.getElementsByTagName('ows:Title')[0].childNodes[0].nodeValue;
        
    //         if (title === layerName) {
    //             let style = node.getElementsByTagName('Style')[0].children[1].childNodes[0].nodeValue;
    //             let tileMatrixSet = node.getElementsByTagName('TileMatrixSetLink')[0].children[0].childNodes[0].nodeValue;   
    //             let serviceURLTemplates = node.getElementsByTagName('ResourceURL')[0].attributes.getNamedItem('template').nodeValue
                
    //             // add layer to map
    //             callback(serviceURLTemplates, tileMatrixSet, style, layerName).addTo(this._map);
    //         }
    //     }
    // }

    // // callback function: create Leaflet tileLayer when ready and add to map
    // createLeafletLayer(serviceURLTemplates, tileMatrixSet, style, layerName) {
    //     // NOTE: needed????
    //     const sharding = ['maps', 'maps1', 'maps2', 'maps3', 'maps4'];
        
    //     const baseURL = serviceURLTemplates.replace('maps', '{s}')
    //                                     .replace('{Style}', style)
    //                                     .replace('{TileMatrixSet}', tileMatrixSet)
    //                                     .replace('{TileMatrix}', '{z}')
    //                                     .replace('{TileRow}', '{y}')
    //                                     .replace('{TileCol}', '{x}');
        
    //     return L.tileLayer(baseURL, {
    //         id: layerName,
    //         subdomains: sharding
    //     });
    // }
}