import { DomUtil } from 'leaflet';

import screenfull from 'screenfull';

import { LayerConfig } from './layer';

export class MapInstance {
    /**
     * Toggles fullscreen for the app.
     *
     * @memberof MapInstance
     */
    static toggleFullscreen(element: HTMLElement): void {
        const mapElem: HTMLElement= element.getElementsByClassName('cgp-leaflet-app')[0] as HTMLElement;
        if (screenfull.isEnabled) {
            // TODO: check if needed
            // DomUtil.hasClass(mapElem, 'leaflet-pseudo-fullscreen') ? DomUtil.removeClass(mapElem, 'leaflet-pseudo-fullscreen') : DomUtil.addClass(mapElem, 'leaflet-pseudo-fullscreen');
            // DomUtil.hasClass(mapElem, 'leaflet-fullscreen-on') ? DomUtil.removeClass(mapElem, 'leaflet-fullscreen-on') : DomUtil.addClass(mapElem, 'leaflet-fullscreen-on');

            // toogle fullscreen
            screenfull.toggle(mapElem);
        }
    }
}

/**
 * An object containing version information.
 *
 * @export
 * @interface AppVersion
 */
export interface AppVersion {
    hash: string;
    major: number;
    minor: number;
    patch: number;
    timestamp: string;
}

// TODO: need to revisit when we have final spec. May want to put it inside his own claff of configuration
/**
 * An object containing inline map configuration.
 *
 * @export
 * @interface InlineMapConfig
 */
export interface InlineMapConfig {
    name?: string,
    mapId: string,
    projection: number,
    zoomLevel: number,
    center: number[],
    layers: LayerConfig[],
    language: string
}

/**
 * An object containing API map configuration.
 *
 * @export
 * @interface ApiMapConfig
 */
export interface ApiMapConfig {
    mapId: string,
    projection: number,
    zoomLevel: number,
    center: number[],
    layers: LayerConfig[],
    language: string
}