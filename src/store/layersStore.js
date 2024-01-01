import { defineStore } from "pinia";
import CesiumImageryLayer from "@/js/cesiumodules/cesiumimagerylayer.js";
import { adduser, userLogin, addPoint, readPoint, renamePoint, removePoint } from "@/services";

const useLayersStore = defineStore("layers", {
    state: () => ({
        // viewer实例
        viewer: null,
        // 图层弹出栏
        showBottom: false,
        // 未登录提醒
        isLoginTip: false,
        // 选择点的经纬度信息
        choosePoint: {
            lng: null,
            lat: null
        },
        // 当前位置
        userLocation: {
            lng: null,
            lat: null
        },
        // 收藏点时弹出输入收藏名
        collectionTip: false,
        // 鼠标事件实例
        cesiumMouse: null
    }),

    getters: {

    },

    actions: {
        swichLayers(maptype, num) {
            CesiumImageryLayer.removealllayer(this.viewer);
            switch (maptype) {
                case "mapbox":
                    CesiumImageryLayer.addmapboxlayer(this.viewer, num);
                    break;

                case "openstreet":
                    CesiumImageryLayer.addopenstreetmaplayer(this.viewer, num);
                    break;

                case "amap":
                    CesiumImageryLayer.addamaplayer(this.viewer, num);
                    break;

                case "tianditu":
                    CesiumImageryLayer.addtianditulayer(this.viewer, num);
                    break;

                case "arcgis":
                    CesiumImageryLayer.addarcgislayerbyurl(this.viewer, num);
                    break;

                default:
                    throw new Error("没有此图层");
            }
        },

        async register(username, password) {
            const res = await adduser(username, password);
            return res;
        },

        async login(username, password) {
            const res = await userLogin(username, password);
            return res;
        },

        async addPoint(pointName, lng, lat) {
            const res = await addPoint(pointName, lng, lat);
            return res;
        },

        async readPoint(offset, size) {
            const res = await readPoint(offset, size);
            return res;
        },

        async renamePoint(id, name) {
            const res = await renamePoint(id, name);
            return res;
        },

        async removePoint(id) {
            const res = await removePoint(id);
            return res;
        }
    }
});

export default useLayersStore;