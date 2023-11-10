// const YOUR_START_LATITUDE = 50.447731
// const YOUR_START_LONGITUDE = 30.542721
// MAPBOX ACCEPTS COORDINATES IN FORMAT [LONGITUDE, LATITUDE]

// MAPBOX configurations

const MAPBOX_TOKEN = ""
if (!MAPBOX_TOKEN) alert('No token provided')
// Kyiv coordinates
const CENTER = [
    30.542721,
    50.447731
]

const ZOOM_LEVEL = 10;

const bounds = [
    // [-123.069003, 45.395273],
    // [-122.303707, 45.612333]s
];

const START_LATITUDE = 50.434575600000
const START_LONGITUDE = 30.4080348

const END_LATITUDE = 50.452172400000
const END_LONGITUDE = 30.3734857

mapboxgl.accessToken = MAPBOX_TOKEN;

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v12',
    center: CENTER,
    zoom: ZOOM_LEVEL,
    language: 'uk'
});

// set the bounds of the map !!!!!!!!!!!!!!!!!!!!!!!!!!!
// map.setMaxBounds(bounds);

// an arbitrary start will always be the same
// only the end or destination will change
const start = [START_LONGITUDE, START_LATITUDE];

// create a function to make a directions request
async function getRoute(end) {
    // make a directions request using cycling profile
    // an arbitrary start will always be the same
    // only the end or destination will change
    const query = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/walking/${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`,
        { method: 'GET' }
    );
    const json = await query.json();
    const data = json.routes[0];
    const route = data.geometry.coordinates;
    const geojson = {
        type: 'Feature',
        properties: {},
        geometry: {
            type: 'LineString',
            coordinates: route
        }
    };
    // if the route already exists on the map, we'll reset it using setData
    if (map.getSource('route')) {
        map.getSource('route').setData(geojson);
    }
    // otherwise, we'll make a new request
    else {
        map.addLayer({
            id: 'route',
            type: 'line',
            source: {
                type: 'geojson',
                data: geojson
            },
            layout: {
                'line-join': 'round',
                'line-cap': 'round'
            },
            paint: {
                'line-color': '#3887be',
                'line-width': 5,
                'line-opacity': 0.75
            }
        });
    }
    // get the sidebar and add the instructions
    // const instructions = document.getElementById('instructions');
    // const steps = data.legs[0].steps;

    // let tripInstructions = '';
    // for (const step of steps) {
    //     tripInstructions += `<li>${step.maneuver.instruction}</li>`;
    // }
    // instructions.innerHTML = `<p><strong>Trip duration: ${Math.floor(
    //     data.duration / 60
    // )} min 🚴 </strong></p><ol>${tripInstructions}</ol>`;
}

const addPointToMap = ((map) => {
    map.addLayer({
        id: 'point',
        type: 'circle',
        source: {
            type: 'geojson',
            data: {
                type: 'FeatureCollection',
                features: [
                    {
                        type: 'Feature',
                        properties: {},
                        geometry: {
                            type: 'Point',
                            coordinates: start
                        }
                    }
                ]
            }
        },
        paint: {
            'circle-radius': 10,
            'circle-color': '#3887be'
        }
    });
})
map.on('load', () => {
    // make an initial directions request that
    // starts and ends at the same location
    // getRoute(start);

    // Add starting point to the map
    addPointToMap(map)

    // map.addLayer({
    //     id: 'point',
    //     type: 'circle',
    //     source: {
    //         type: 'geojson',
    //         data: {
    //             type: 'FeatureCollection',
    //             features: [
    //                 {
    //                     type: 'Feature',
    //                     properties: {},
    //                     geometry: {
    //                         type: 'Point',
    //                         coordinates: start
    //                     }
    //                 }
    //             ]
    //         }
    //     },
    //     paint: {
    //         'circle-radius': 10,
    //         'circle-color': '#3887be'
    //     }
    // });

    map.on('click', (event) => {
        // const coords = [END_LONGITUDE, END_LATITUDE] //
        const coords = Object.keys(event.lngLat).map((key) => event.lngLat[key]);
        
        const end = {
            type: 'FeatureCollection',
            features: [
                {
                    type: 'Feature',
                    properties: {},
                    geometry: {
                        type: 'Point',
                        coordinates: coords
                    }
                }
            ]
        };

        if (map.getLayer('end')) {
            map.getSource('end').setData(end);
        } else {
            map.addLayer({
                id: 'end',
                type: 'circle',
                source: {
                    type: 'geojson',
                    data: {
                        type: 'FeatureCollection',
                        features: [
                            {
                                type: 'Feature',
                                properties: {},
                                geometry: {
                                    type: 'Point',
                                    coordinates: coords
                                }
                            }
                        ]
                    }
                },
                paint: {
                    'circle-radius': 10,
                    'circle-color': '#f30'
                }
            });
        }
        getRoute(coords);
    });
});

