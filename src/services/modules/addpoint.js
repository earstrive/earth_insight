import hyRequest from "../request";

export function addPoint(pointName, lng, lat) {
    return hyRequest.post({
        url: "/collection",
        data: {
            pointName,
            lng,
            lat
        }
    });
}