import L from "leaflet";

export class FullScreen {

    constructor(map: any) {
        // create control
        this.createControl(map);
        this.addMapInclude({});

        (L as any).control.fullscreen = function (options: any) {
            return new (L as any).Control.Fullscreen(options);
        };
    }

    add(map: any) {
        (L as any).control.fullscreen().addTo(map);
    }

    private createControl(map: any) {
        (L as any).Control.Fullscreen = L.Control.extend({
            options: {
                position: 'bottomright',
                title: {
                    'false': 'View Fullscreen',
                    'true': 'Exit Fullscreen'
                }
            },
    
            onAdd: function(map: any) {
                const container = L.DomUtil.create('div', 'leaflet-control-fullscreen leaflet-bar leaflet-control');
    
                (this as any).link = L.DomUtil.create('a', 'leaflet-control-fullscreen-button leaflet-bar-part', container);
                (this as any).link.href = '#';
    
                (this as any)._map = map;
                (this as any)._map.on('fullscreenchange', this._toggleTitle, this);
                (this as any)._toggleTitle();
    
                L.DomEvent.on((this as any).link, 'click', this._click, this);
    
                return container;
            },
    
            _click: function(e: any) {
                L.DomEvent.stopPropagation(e);
                L.DomEvent.preventDefault(e);
                (this as any)._map.toggleFullscreen(this.options);
            },
    
            _toggleTitle: function() {
                (this as any).link.title = (this as any).options.title[(this as any)._map.isFullscreen()];
            }
        });
    }

    private addMapInclude(options: any) {
        L.Map.include({
            isFullscreen: function () {
                return this._isFullscreen || false;
            },
    
            toggleFullscreen: function (options: any) {
                const container = this.getContainer();

                if (this.isFullscreen()) {
                    if (options && options.pseudoFullscreen) {
                        this._disablePseudoFullscreen(container);
                    } else if (document.exitFullscreen) {
                        document.exitFullscreen();
                    } else if (document.mozCancelFullScreen) {
                        document.mozCancelFullScreen();
                    } else if (document.webkitCancelFullScreen) {
                        document.webkitCancelFullScreen();
                    } else if (document.msExitFullscreen) {
                        document.msExitFullscreen();
                    } else {
                        this._disablePseudoFullscreen(container);
                    }
                } else {
                    if (options && options.pseudoFullscreen) {
                        this._enablePseudoFullscreen(container);
                    } else if (container.requestFullscreen) {
                        container.requestFullscreen();
                    } else if (container.mozRequestFullScreen) {
                        container.mozRequestFullScreen();
                    } else if (container.webkitRequestFullscreen) {
                        container.webkitRequestFullscreen((Element as any).ALLOW_KEYBOARD_INPUT);
                    } else if (container.msRequestFullscreen) {
                        container.msRequestFullscreen();
                    } else {
                        this._enablePseudoFullscreen(container);
                    }
                }
    
            },
    
            _enablePseudoFullscreen: function(container: any) {
                L.DomUtil.addClass(container, 'leaflet-pseudo-fullscreen');
                this._setFullscreen(true);
                this.fire('fullscreenchange');
            },
    
            _disablePseudoFullscreen: function(container: any) {
                L.DomUtil.removeClass(container, 'leaflet-pseudo-fullscreen');
                this._setFullscreen(false);
                this.fire('fullscreenchange');
            },
    
            _setFullscreen: function(fullscreen: any) {
                this._isFullscreen = fullscreen;
                const container = this.getContainer();
                if (fullscreen) {
                    L.DomUtil.addClass(container, 'leaflet-fullscreen-on');
                } else {
                    L.DomUtil.removeClass(container, 'leaflet-fullscreen-on');
                }
                this.invalidateSize();
            },
    
            _onFullscreenChange: function(e: any) {
                const fullscreenElement =
                    document.fullscreenElement ||
                    document.mozFullScreenElement ||
                    document.webkitFullscreenElement ||
                    document.msFullscreenElement;
    
                if (fullscreenElement === this.getContainer() && !this._isFullscreen) {
                    this._setFullscreen(true);
                    this.fire('fullscreenchange');
                } else if (fullscreenElement !== this.getContainer() && this._isFullscreen) {
                    this._setFullscreen(false);
                    this.fire('fullscreenchange');
                }
            }
        });
    
        L.Map.mergeOptions({
            fullscreenControl: false
        });
    
        L.Map.addInitHook(this.addInitHook);
    }

    private addInitHook() {

            if ((this as any).options.fullscreenControl) {
                (this as any).fullscreenControl = new (L as any).Control.Fullscreen((this as any).options.fullscreenControl);
                (this as any).addControl((this as any).fullscreenControl);
            }
    
            let fullscreenchange = '';
    
            if ('onfullscreenchange' in document) {
                fullscreenchange = 'fullscreenchange';
            } else if ('onmozfullscreenchange' in document) {
                fullscreenchange = 'mozfullscreenchange';
            } else if ('onwebkitfullscreenchange' in document) {
                fullscreenchange = 'webkitfullscreenchange';
            } else if ('onmsfullscreenchange' in document) {
                fullscreenchange = 'MSFullscreenChange';
            }
    
            if (fullscreenchange) {
                const onFullscreenChange = (L as any).bind((this as any)._onFullscreenChange, this);
    
                (this as any).whenReady(function () {
                    L.DomEvent.on((document.getElementsByTagName('body')[0] as HTMLElement), fullscreenchange, onFullscreenChange);
                });
    
                (this as any).on('unload', function () {
                    L.DomEvent.off((document.getElementsByTagName('body')[0] as HTMLElement), fullscreenchange, onFullscreenChange);
                });
            }
    }
}
declare global {
    interface Document {
        mozCancelFullScreen?: () => Promise<void>;
        msExitFullscreen?: () => Promise<void>;
        webkitExitFullscreen?: () => Promise<void>;
        webkitCancelFullScreen?: () => Promise<void>;
        mozFullScreenElement?: Element;
        msFullscreenElement?: Element;
        webkitFullscreenElement?: Element;
    }

    interface HTMLElement {
        msRequestFullscreen?: () => Promise<void>;
        mozRequestFullscreen?: () => Promise<void>;
        webkitRequestFullscreen?: () => Promise<void>;
    }
}
