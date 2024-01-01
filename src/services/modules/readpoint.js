import hyRequest from "../request";

export function readPoint(offset, size) {
    return hyRequest.get({
        url: "/collection",
        params: {
            offset,
            size
        },
    });
}