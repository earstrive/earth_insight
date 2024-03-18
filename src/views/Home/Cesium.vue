<template>
    <section id="idcomcesium">
    </section>
</template>

<script setup>
import 'cesium/Build/Cesium/Widgets/widgets.css';
import CesiumStart from "@/js/cesiumodules/cesiumstart.js";
import CesiumImageryLayer from "@/js/cesiumodules/cesiumimagerylayer.js";
import CesiumPoint from "@/js/cesiumodules/cesiumpoint.js";
import CesiumMouseEvents from "@/js/cesiumodules/cesiummouse";
import useCesiumStore from '@/store/cesiumStore';
import useLayersStore from "@/store/layersStore"
import { onMounted } from 'vue';
import { showToast } from 'vant';

const cesiumData = useCesiumStore();
const layersData = useLayersStore()

/*-- events --*/
onMounted(() => {
    window.CESIUM_BASE_URL = './assets/Cesium/';
    const instance = new CesiumStart("idcomcesium");
    instance.setview();

    cesiumData.viewer = instance.viewer;
    layersData.viewer = instance.viewer;

    CesiumImageryLayer.addmapboxlayer(cesiumData.viewer);
    // 点击事件方法
    layersData.cesiumMouse = new CesiumMouseEvents(layersData.viewer);

    // 向外部暴露方法
    const forSetLoaction = (lng, lat) => {
        layersData.userLocation.lng = lng;
        layersData.userLocation.lat = lat;
        CesiumPoint.addPoint(cesiumData.viewer, lng, lat);
    }
    window.setLocation = forSetLoaction;

    // 暂时定位
    forSetLoaction(119.215698337173, 34.6086520789146);

    // 选择点
    CesiumPoint.opintLocation(layersData.viewer, (lng, lat) => {
        layersData.choosePoint.lng = lng;
        layersData.choosePoint.lat = lat;
        showToast('已选择此点');
    });
});
</script>

<style scoped>
#idcomcesium {
    height: 100vh;
    width: 100vw;
}
</style>