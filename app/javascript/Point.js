class Point {
    constructor(id, address, longitude, latitude, color, size) {
        this.id = id.toString();
        this.address = address;
        this.longitude = longitude;
        this.latitude = latitude;
        this.color = color;
        this.size = size;
    }

    composePopupHTML() {
        return (
            `<div>
                <h3>${this.address}</h3>
            </div>`
        )
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
