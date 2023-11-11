// MAPBOX ACCEPTS COORDINATES IN FORMAT [LONGITUDE, LATITUDE]

// const MAPBOX_TOKEN = process.env.API_KEY;
if (!MAPBOX_TOKEN) alert('No token provided')

class MapBoxMap {
    constructor(center, zoomLevel) {
        mapboxgl.accessToken = MAPBOX_TOKEN;

        this.mapObject = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v12',
            center: center,
            zoom: zoomLevel,
            language: 'uk'
        });
    }

    drawPoint(point) {
        const pointData = point.generateData();
        try {
            this.mapObject.removeSource(point.id)

        }
        catch {
        }

        if (this.mapObject.getLayer(point.id)) {
            this.mapObject.getSource(point.id).setData(pointData);
        } else {
            this.mapObject.addLayer({
                id: point.id,
                type: 'circle',
                source: {
                    type: 'geojson',
                    data: pointData
                },
                paint: {
                    'circle-radius': point.size,
                    'circle-color': point.color
                }
            });
        }

        // popup
        point.popup = null;
        this.mapObject.on('mouseenter', point.id, () => {
            this.mapObject.getCanvas().style.cursor = 'pointer';

            point.popup = new mapboxgl.Popup()
                .setLngLat([point.longitude, point.latitude])
                .setHTML(point.composePopupHTML())
                .addTo(this.mapObject);
        });

        this.mapObject.on('mouseleave', point.id, () => {
            this.mapObject.getCanvas().style.cursor = '';
            point.popup.remove();
        });
    }

    drawRoute(route) {
        const routeData = route.generateData();
        try {
            this.mapObject.removeSource(route.id)

        }
        catch {
        }

        if (this.mapObject.getSource(route.id)) {
            this.mapObject.getSource(route.id).setData(routeData);
        }
        else {
            this.mapObject.addLayer({
                id: 'route',
                type: 'line',
                source: {
                    type: 'geojson',
                    data: routeData
                },
                layout: {
                    'line-join': 'round',
                    'line-cap': 'round'
                },
                paint: {
                    'line-color': route.color,
                    'line-width': route.width,
                    'line-opacity': route.opacity
                }
            });
        }
    }
}

export default MapBoxMap;
