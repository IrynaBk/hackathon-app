import MapBoxMap from './MapBoxMap'
import Point from './Point'
import Route from './Route'

const MODE = 'walking'

// вул. Левка Лук’яненка, 3, 3-В
const testCenterPoint = locations.find(location => location.id === 30)

const CENTER = [
    testCenterPoint.longitude,
    testCenterPoint.latitude
]


const ZOOM_LEVEL = 13;

const map = new MapBoxMap(CENTER, ZOOM_LEVEL);

map.mapObject.on('load', () => {
    locations.forEach(location => {
        let point = new Point(location.id, location.address, location.longitude, location.latitude, 'blue', 8)
        map.drawPoint(point)
    });


    map.mapObject.on('click', async (event) => {
        // const coords = Object.keys(event.lngLat).map((key) => event.lngLat[key]);
        // const endPoint = new Point(
        //     'endPoint', ...coords, 'black', 10
        // )
        // map.drawPoint(endPoint);

        // const route = new Route(
        //     'route', null,
        //     'black', 2, 0.75
        // )    

        // await route.build([startPoint, middlePoint, endPoint], MODE)

        // map.drawRoute(route);
    })
})
