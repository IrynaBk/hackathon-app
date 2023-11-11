import MapBoxMap from './MapBoxMap'
import Point from './Point'
import Route from './Route'

const MODE = 'walking'

// Kyiv coordinates
const CENTER = [
    30.542721,
    50.447731
]

const START_LATITUDE = 50.434575600000
const START_LONGITUDE = 30.4080348

const ZOOM_LEVEL = 10;

const map = new MapBoxMap(CENTER, ZOOM_LEVEL);

const startPoint = new Point(
    'startPoint',
    START_LONGITUDE, START_LATITUDE,
    'red', 10
)

const middlePoint = new Point(
    'middlePoint',
    START_LONGITUDE + 0.05, START_LATITUDE + 0.05,
    'green', 10
)
map.mapObject.on('load', () => {
    map.drawPoint(startPoint)
    map.drawPoint(middlePoint)
    map.mapObject.on('click', async (event) => {
        const coords = Object.keys(event.lngLat).map((key) => event.lngLat[key]);
        const endPoint = new Point(
            'endPoint', ...coords, 'black', 10
        )
        map.drawPoint(endPoint);
        
        const route = new Route(
            'route', null,
            'black', 2, 0.75
        )    
        
        await route.build([startPoint, middlePoint, endPoint], MODE)
        
        map.drawRoute(route);
    })
})
