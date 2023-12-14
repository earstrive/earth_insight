import { defineStore } from "pinia";
import CesiumImageryLayer from "@/js/cesiumodules/cesiumimagerylayer.js";

const useCesiumStore = defineStore("cesium", {
    state: () => ({
        // viewer实例
        instance: null,
    }),

    getters: {

    },

    actions: {

    }
});

export default useCesiumStore;