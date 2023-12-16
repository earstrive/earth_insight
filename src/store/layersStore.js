import { defineStore } from "pinia";
import CesiumImageryLayer from "@/js/cesiumodules/cesiumimagerylayer.js";

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
        }
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
    }
});

export default useLayersStore;