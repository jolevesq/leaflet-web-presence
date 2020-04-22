const L = require('leaflet');

export class Legend {

    private _mapId: string;
    private _legendPanel: any;
    private _legendControl: any;

    private _map: any;

    constructor(map: any) {
        this._map = map;
        this._mapId = map.options.id;

        const that = this;
        L.Control.Legend = L.Control.extend({

            onAdd: function(map: any) {
                const legendBar = L.DomUtil.create('div', 'wp-legend leaflet-bar');
                const legendCtrl = L.DomUtil.create('a', 'wp-control-legend-button', legendBar);
                that._legendPanel = L.DomUtil.create('div', 'wp-legend-panel', legendBar);
                legendCtrl.id = `${that._mapId}LegendCtrl`;
                that._legendPanel.id = `${that._mapId}LegendPanel`;

                // Disable events on container
                L.DomEvent.disableClickPropagation(legendBar);
                L.DomEvent.disableScrollPropagation(legendBar);
                L.DomEvent.disableClickPropagation(that._legendPanel);
                L.DomEvent.disableScrollPropagation(that._legendPanel);

                return legendBar;
            },
        
            onRemove: function(map: any) {
                // Nothing to do here
            }
        });
        
        L.control.legend = function(opts: any) {
            return new L.Control.Legend(opts);
        }
    }

    add(map: any) {
        // add main bar
        this._legendControl = L.control.legend({ position: 'topleft' });
        this._legendControl.addTo(map);

        // set toggle panel event
        const legendCtrl = <HTMLElement>document.getElementById(`${this._mapId}LegendCtrl`);

        const stop = L.DomEvent.stopPropagation;
        
        L.DomEvent
            .on(legendCtrl, 'click', stop)
            .on(legendCtrl, 'mousedown', stop)
            .on(legendCtrl, 'dblclick', stop)
            .on(legendCtrl, 'click', L.DomEvent.preventDefault)
            .on(legendCtrl, 'click', this.toggleLegend, this);
    }

    toggleLegend() {
        const panel = <HTMLElement>document.getElementById(`${this._mapId}LegendPanel`);
        panel.style.visibility = (panel.style.visibility === 'hidden') ? 'visible' : 'hidden';
    }

    addLegendItem(layerItem: any) {
        const item = L.DomUtil.create('div', 'wp-legend-item', this._legendPanel);

        const visibility = L.DomUtil.create('div', 'command', item);
        visibility.innerHTML = `<input id="${layerItem.options.id}-vis" type="checkbox" checked/>Get from WB api - ${layerItem.options.type}`;
        L.DomEvent.on(visibility, 'click', this.toggleVis);

        const opacity = L.DomUtil.create('div', 'command', item);
        opacity.innerHTML = `<input id="${layerItem.options.id}-opa" type="range" value="100"/>`;
        opacity.min = 0;
        opacity.max = 100;
        opacity.style.width = '50px';
        L.DomEvent.on(opacity, 'click', this.toggleOpa);
    }

    toggleVis(value: any) {
        const layerDiv: any = document.getElementById(value.target.id.split('-')[0]);
        layerDiv.style.display = (value.target.checked) ? 'block' : 'none';
    }

    toggleOpa(value: any) {
        const layerDiv: any = document.getElementById(value.target.id.split('-')[0]);

        layerDiv.style.opacity = parseFloat(value.target.value) / 100;
    }
}