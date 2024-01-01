import hyRequest from "../request";

export function renamePoint(id, name) {
    return hyRequest.patch({
        url: `/collection/${id}`,
        data: {
            name
        }
    });
}