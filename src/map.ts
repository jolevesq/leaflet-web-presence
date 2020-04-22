import { FullScreen } from './controls/fullScreen';

const L = require('leaflet');
import 'proj4leaflet';
import 'leaflet-mouse-position';

export class Map {

    // get values once to reuse in private functions (cardinal points and degree symbol)
    // need to set in function because $translate.instant does not work at this point
    private cardinal: Cardinal = {
        deg: String.fromCharCode(176),
        east: '',
        west: '',
        north: '',
        south: ''
    };

    constructor(mapId: string, config: MapConfig) {
        // get the neede projection. Web Mercator is out of the box but we need to create LCC
        // the projection will work with CBMT basemap. If another basemap would be use, update...
        const crs = (config.projection === 3857) ? L.CRS[`EPSG${config.projection}`] : this.getLCCProjection();

        const map = L.map(mapId, {
            id: mapId,
            crs: crs,
            center: config.center,
            zoom: config.zoomLevel,
            continuousWorld: true,
            worldCopyJump: false
        });

        // add language and set cardinality
        map.language = config.language;
        this.loadCardinality(map.language);

        // add controls
        this.addScale(map);
        this.addMouseCoord(map);

        // position zoom control
        map.zoomControl.setPosition('bottomright');

        // add fullscreen
        const fsControl = new FullScreen(map);
        fsControl.add(map);

        return map;
    }

    private loadCardinality(lang: string) {
        // get values once to reuse in private functions (cardinal points and degree symbol)
        this.cardinal.east = 'E';
        this.cardinal.west = (lang === 'en-CA') ? 'W' : 'O';
        this.cardinal.north = 'N';
        this.cardinal.south = 'S';
    }

    private getLCCProjection(): object {
        // tile layer extent, expressed in local projection
        const bbox = [-4282638.061501402, -5153821.09213678, 4852210.175566408, 4376714.442097411];

        // tile layer scale and resolution
        const scale = [145000000, 85000000, 50000000, 30000000, 17500000, 10000000, 6000000, 3500000, 2000000, 1200000, 700000, 420000, 250000, 145000, 85000, 50000, 30000, 17500, 10000, 6000]
        const resolutions = [38364.660062653464, 22489.62831258996, 13229.193125052918, 7937.5158750317505, 4630.2175937685215, 2645.8386250105837, 1587.5031750063501, 926.0435187537042, 529.1677250021168, 317.50063500127004, 185.20870375074085, 111.12522225044451, 66.1459656252646, 38.36466006265346, 22.48962831258996, 13.229193125052918, 7.9375158750317505, 4.6302175937685215, 2.6458386250105836, 1.5875031750063502]

        // transformation matrix
        const transformation = new L.Transformation(1, -bbox[0], -1, bbox[3]);

        // LCC projection
        const crs = new L.Proj.CRS('EPSG:3978', '+proj=lcc +lat_1=49 +lat_2=77 +lat_0=49 +lon_0=-95 +x_0=0 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs', {
                resolutions: resolutions,
                origin: [-3.46558E7, 3.931E7],
                bounds: L.bounds(bbox),
                transformation: transformation,
                scale: scale
            }
        );

        return crs;
    }

    private addScale(map: any) {
        L.control.scale({ position: 'bottomright' }).addTo(map);
    }

    private addMouseCoord(map: any) {
        L.control.mousePosition({
            separator: ' | ',
            lngFormatter: (val: number) => { return this.coordFormnat(val, this.cardinal.deg, this.cardinal.north) },
            latFormatter: (val: number) => { return this.coordFormnat(val, this.cardinal.deg, this.cardinal.west) },
            emptyString: '-- | --',
            position: 'bottomright'
        }).addTo(map);
    }

    private coordFormnat(value: number, deg: string, card: string): string {
        const d = Math.floor(Math.abs(value)) * ((value < 0) ? -1 : 1);
        const m = Math.floor(Math.abs((value - d) * 60));
        const s = Math.round((Math.abs(value) - Math.abs(d) - m / 60) * 3600);

        return `${Math.abs(d)}${deg} ${(m >= 10) ? `${m}` : `0${m}`}\' ${(s >= 10) ? `${s}` : `0${s}`} ${card}\"`;
    }
}

export interface MapConfig {
    projection: number,
    zoomLevel: number,
    center: number[],
    layers: LayerConfig[],
    language: string
}

export interface LayerConfig {
    url: string,
    type: string,
    entries: string
}

interface Cardinal {
    deg: string,
    east: string,
    west: string,
    north: string,
    south: string
}