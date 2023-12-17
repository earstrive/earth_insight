import hyRequest from "../request"

export function adduser(name, password) {
    return hyRequest.post({
        url: "/users",
        data: {
            name,
            password
        }
    });
}