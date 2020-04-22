const L = require('leaflet');

export class Identify {
    constructor(map: any) {
        var format = { func: this.formatContent };
        map.addEventListener('click', (evt: any) => { this.identify(evt, format) }, false);
    }

    private identify(evt: any, format: any) {
        // get the map
        const map = evt.sourceTarget;

        // set parameters needed for GetFeatureInfo WMS request
        const sw: Point = map.options.crs.project(map.getBounds().getSouthWest());
        const ne: Point = map.options.crs.project(map.getBounds().getNorthEast());
        const BBOX: string = `${sw.x},${sw.y},${ne.x},${ne.y}`;
        const WIDTH: number = map.getSize().x;
        const HEIGHT: number = map.getSize().y;

        const X: number = Math.trunc(map.layerPointToContainerPoint(evt.layerPoint).x);
        const Y: number = Math.trunc(map.layerPointToContainerPoint(evt.layerPoint).y);

        // loop trought the layers and get the WMS to grab the url
        // TODO: make it work with more then 1 WMS!!!!!
        let url: string = '';
        let entries: string = '';
        evt.sourceTarget.eachLayer((layer: any) => {
            if (layer.hasOwnProperty('wmsParams')) {
                url = layer._url;
                entries = layer.options.layers;
            }
        });

        // compose the URL for the request
        const crs: string = map.options.crs.code;
        url = `${url}?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetFeatureInfo&LAYERS=0&QUERY_LAYERS=${entries}&BBOX=${BBOX}&HEIGHT=${HEIGHT}&WIDTH=${WIDTH}&INFO_FORMAT=application/geojson&TILED=false&CRS=${crs}&I=${X}&J=${Y}`;

        // send GetFeatureInfo as asynchronous HTTP request using jQuery $.ajax
        $.ajax({
            url: url,
            dataType: 'json',
            type: 'GET',
            success: (data: any) => {
                // at least one feature returned in response
                if (data.features.length !== 0) {
                    // first feature from response
                    const returnedFeature = data.features[0];
                        
                    // set up popup for clicked feature and open it
                    var popup = new L.Popup({ maxWidth: 500 });

                    // set content and open
                    popup.setContent((<any>this).formatContent(returnedFeature));
                    popup.setLatLng(evt.latlng);
                    map.openPopup(popup);
                }
            }
        });
    }

    private formatContent(feature: any): string {
        let value: string = '';
        for (var prop in feature.properties) {
            value += `<b>${prop}: ${feature.properties[prop]}</b><br />`;
        }

        return value;
    }
}

interface Point {
    x: number,
    y: number
}