const BASE_URL = 'https://api.mapbox.com/directions/v5/mapbox'

class Route {
    constructor(id, coordinates, color, width, opacity) {
        this.id = id;
        this.coordinates = coordinates;
        this.color = color;
        this.width = width;
        this.opacity = opacity;
    }

    async build(points, mode) {
        const pointsAsString = points.map(point => `${point.longitude}, ${point.latitude}`).join(';')
        const queryOptions = {
            steps: true,
            geometries: 'geojson',
            access_token: mapboxgl.accessToken
        }

        let queryOptionsForQuery = [];
        Object.keys(queryOptions).forEach(k => {
            queryOptionsForQuery.push(`${k}=${queryOptions[k]}`)
        })

        queryOptionsForQuery = queryOptionsForQuery.join('&')

        const fullURL = `${BASE_URL}/${mode}/${pointsAsString}?${queryOptionsForQuery}`
        const query = await fetch(
            fullURL, {
            method: 'GET'
        }
        );

        const json = await query.json();
        const data = json.routes[0];
        const coordinates = data.geometry.coordinates;

        this.coordinates = coordinates;
    }

    generateData() {
        return {
            type: 'Feature',
            properties: {},
            geometry: {
                type: 'LineString',
                coordinates: this.coordinates
            }
        };
    }
}

export default Route;
