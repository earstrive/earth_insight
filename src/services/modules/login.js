import hyRequest from "../request"

export function userLogin(name, password) {
    return hyRequest.post({
        url: "/login",
        data: {
            name,
            password
        }
    });
}