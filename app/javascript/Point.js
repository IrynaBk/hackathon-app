class Point {
    constructor(id, longitude, latitude, color, size) {
        this.id = id;
        this.longitude = longitude;
        this.latitude = latitude;
        this.color = color;
        this.size = size;
    }

    generateData() {
        return {
            type: 'FeatureCollection',
            features: [
                {
                    type: 'Feature',
                    properties: {},
                    geometry: {
                        type: 'Point',
                        coordinates: [this.longitude, this.latitude]
                    }
                }
            ]
        }
    }
}

export default Point;
