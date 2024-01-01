import axios from "axios";
import { BASE_URL, TIMEOUT } from "./config";

class HYRequest {
    instance;
    constructor(baseURL, timeout = 1000) {
        this.instance = axios.create({
            baseURL,
            timeout
        })
    }
    request(config) {
        return new Promise((resolve, reject) => {
            this.instance.interceptors.request.use((config) => {
                config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
                return config;
            });
            this.instance.request(config).then(res => {
                resolve(res.data);
            }).catch(err => reject(err));

        });
    }

    get(config) {
        return this.request({ ...config, method: "get" });
    }

    post(config) {
        return this.request({ ...config, method: "post" });
    }

    patch(config) {
        return this.request({ ...config, method: "patch" });
    }

    delete(config) {
        return this.request({ ...config, method: "delete" });
    }
}

export default new HYRequest(BASE_URL, TIMEOUT);