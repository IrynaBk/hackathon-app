// MAPBOX ACCEPTS COORDINATES IN FORMAT [LONGITUDE, LATITUDE]

const MAPBOX_TOKEN = ""
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
    }

    drawRoute(route) {
        const routeData = route.generateData();

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
