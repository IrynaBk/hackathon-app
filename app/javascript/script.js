import MapBoxMap from './MapBoxMap'
import Point from './Point'
import Route from './Route'

const MODE = 'walking'

// вул. Левка Лук’яненка, 3, 3-В
// const testCenterPoint = locations[0]//.find(location => location.id)

const CENTER = [
    30.48825808474481,
    50.50826373625383
]


const ZOOM_LEVEL = 13;

const map = new MapBoxMap(CENTER, ZOOM_LEVEL);
var startPoint = null;
var endPoint = null;
var points = [];

map.mapObject.on('load', () => {
    locations.forEach(location => {
        let point = new Point(location.id, location.address, location.longitude, location.latitude, 'green', 8)
        map.drawPoint(point)
    });


    map.mapObject.on('click', (event) => {
        const coords = Object.keys(event.lngLat).map((key) => event.lngLat[key]);
        startPoint = new Point(
            'startPoint', 'Точка відправлення', ...coords, 'red', 10
        )
        map.drawPoint(startPoint);
    })

    map.mapObject.on('contextmenu', async (event) => {
        const coords = Object.keys(event.lngLat).map((key) => event.lngLat[key]);
        endPoint = new Point(
            'endPoint', 'Точка прибуття', ...coords, 'blue', 10
        )
        map.drawPoint(endPoint);

        // points[points.length] = endPoint;
        // alert(points)
        const pointsForRoute = [startPoint, ...points, endPoint]
        if (pointsForRoute.length >= 2) {

            const route = new Route(
                'route', null,
                'black', 2, 0.75
            )
            
            await route.build(pointsForRoute, MODE)

            map.drawRoute(route);
        }
    })

})

