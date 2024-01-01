<template>
    <div ref="outercircle" class="outercircle" @touchstart="beginTouch" @touchmove="computeDeg" @touchend="outTouch">
        <div class="innercircle" @touchmove.stop="" :style="{ backgroundPositionX: imgsrc }" @click="changeShow">
        </div>
        <div class="btn" :class="{ active2: circleShow }">
            <div class="layer" :style="{ transform: setStyle(0) }" @click="showLayers"></div>
            <div class="collection" :style="{ transform: setStyle(1) }" @click="isLogin"></div>
            <div class="duituodian" :style="{ transform: setStyle(2) }" @click="duituodian"></div>
            <div class="dingwei" :style="{ transform: setStyle(3) }" @click="dingwei"></div>
            <div class="mine" :style="{ transform: setStyle(4) }" @click="mine"></div>
            <div class="qudian" :style="{ transform: setStyle(5) }" @click="qudian"></div>
            <div class="qingchu" :style="{ transform: setStyle(6) }" @click="qingchu"></div>
            <div class="shijiao" :style="{ transform: setStyle(7) }" @click="shijiao"></div>
        </div>
    </div>
</template>

<script setup>
import * as Cesium from 'cesium';
import CesiumCamera from '@/js/cesiumodules/cesiumcamera';
import CesiumPoint from '@/js/cesiumodules/cesiumpoint';
import CesiumMouseEvents from "@/js/cesiumodules/cesiummouse";
import { ref } from 'vue';
import { outercircle, beginTouch, computeDeg, outTouch, setStyle } from "@/hooks/circleBtn";
import useLayersStore from '@/store/layersStore';
import { showToast } from 'vant';
import { useRouter } from 'vue-router';

const router = useRouter();
const layersData = useLayersStore();

/* 开关圆环 */
const circleShow = ref(false);
const imgsrcArr = ['-200rem', '-1rem'];
const imgsrc = ref('-200rem');
const changeShow = () => {
    circleShow.value = !circleShow.value;
    imgsrc.value = imgsrcArr[+circleShow.value];
}

/* 图层 */
const showLayers = () => {
    layersData.showBottom = !layersData.showBottom;
}

/* 收藏 */
const isLogin = () => {
    if (!localStorage.getItem("name")) {
        layersData.isLoginTip = true;
    } else {
        if (!layersData.choosePoint.lng) {
            showToast('未选择点，请在屏幕上选点');
        } else {
            CesiumCamera.flyto(layersData.viewer, [layersData.choosePoint.lng, layersData.choosePoint.lat, 8000000], 1.4);
            setTimeout(() => {
                layersData.collectionTip = true;
            }, 1500);
        }
    }
}

/* 对拓点 */
const duituodian = () => {
    if (!layersData.choosePoint.lng) {
        showToast('未选择点，请在屏幕上选点');
    } else {
        const { newLon, newLat } = CesiumPoint.getReversePoint(layersData.choosePoint.lng, layersData.choosePoint.lat);
        CesiumPoint.addPoint(layersData.viewer, newLon, newLat);
        CesiumCamera.flyto(layersData.viewer, [newLon, newLat, 1000000]);
    }
}

/* 当前位置 */
const dingwei = () => {
    if (!layersData.userLocation.lng) {
        showToast('未获取到位置，请打开定位功能');
    } else {
        CesiumCamera.flyto(layersData.viewer, [layersData.userLocation.lng, layersData.userLocation.lat, 100000]);
    }
}

/* 我的 */
const mine = () => {
    router.push("mine");
}

/* 地图取点 */
let state = false;

const lngLatCb = (event) => {
    const clickPosition = new Cesium.Cartesian2();

    // 获取鼠标单击点的屏幕坐标
    clickPosition.x = event.position.x;
    clickPosition.y = event.position.y;

    // 获取鼠标单击点的地理坐标
    const ellipsoid = layersData.viewer.scene.globe.ellipsoid;
    const position = layersData.viewer.camera.pickEllipsoid(clickPosition, ellipsoid);

    if (Cesium.defined(position)) {
        // 获取地理坐标的经度和纬度
        const cartographic = ellipsoid.cartesianToCartographic(position);
        const longitude = Cesium.Math.toDegrees(cartographic.longitude);
        const latitude = Cesium.Math.toDegrees(cartographic.latitude);

        CesiumPoint.addPoint(layersData.viewer, longitude, latitude);
    }
}

const qudian = () => {
    if (!state) {
        state = true;
        layersData.cesiumMouse.addLeftClickHandler(lngLatCb);
        showToast('取点器已打开，再次点击关闭此功能');
    } else {
        state = false;
        layersData.cesiumMouse.removeAllHandlers();
        showToast('取点器已关闭');
    }
}

/* 清除点 */
const qingchu = () => {
    CesiumPoint.removePoint(layersData.viewer);
    showToast('所有点位已移除');
}

/* 视角切换 */
let viewState = false;
const shijiao = () => {
    if (!viewState) {
        layersData.viewer.scene.mode = Cesium.SceneMode.COLUMBUS_VIEW;
        viewState = true;
    } else {
        layersData.viewer.scene.mode = Cesium.SceneMode.SCENE3D;
        viewState = false;
    }
}
</script>

<style scoped>
.outercircle {
    width: 400rem;
    height: 400rem;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
}

.innercircle {
    position: relative;
    width: 200rem;
    height: 200rem;
    border-radius: 50%;
    background-color: skyblue;
    z-index: 1;
    background: url("@/assets/img/2.png") no-repeat 0 0/cover;
}

.outercircle .btn {
    width: 100%;
    height: 100%;
    position: absolute;
    transition: all 1s;
}

.outercircle .btn div {
    width: 90rem;
    height: 90rem;
    border-radius: 50%;
    background-color: rgb(204, 204, 204);
    transform-origin: 0 200rem;
    position: absolute;
    left: 50%;
    font-size: 20rem;
    display: flex;
    justify-content: center;
    align-items: center;
}

.outercircle .btn .layer {
    background: url("@/assets/img/图层.png") no-repeat 0 0/cover;
}

.outercircle .btn .collection {
    background: url("@/assets/img/收藏.png") no-repeat 0 0/cover;
}

.outercircle .btn .duituodian {
    background: url("@/assets/img/对拓点.png") no-repeat 0 0/cover;
}

.outercircle .btn .dingwei {
    background: url("@/assets/img/定位.png") no-repeat 0 0/cover;
}

.outercircle .btn .mine {
    background: url("@/assets/img/我的.png") no-repeat 0 0/cover;
}

.outercircle .btn .qudian {
    background: url("@/assets/img/取点.png") no-repeat 0 0/cover;
}

.outercircle .btn .qingchu {
    background: url("@/assets/img/清除.png") no-repeat 0 0/cover;
}

.outercircle .btn .shijiao {
    background: url("@/assets/img/视角.png") no-repeat 0 0/cover;
}

.active2 {
    opacity: 0;
}
</style>