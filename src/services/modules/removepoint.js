import hyRequest from "../request";

export function removePoint(id) {
    return hyRequest.delete({
        url: `/collection/${id}`
    });
}