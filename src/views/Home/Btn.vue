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
            <div :style="{ transform: setStyle(5) }">搜索</div>
            <div :style="{ transform: setStyle(6) }">取点器</div>
            <div :style="{ transform: setStyle(7) }">视角切换</div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { outercircle, beginTouch, computeDeg, outTouch, setStyle } from "@/hooks/circleBtn";
import useLayersStore from '@/store/layersStore';
import CesiumPoint from '@/js/cesiumodules/cesiumpoint';
import { showToast } from 'vant';
import CesiumCamera from '@/js/cesiumodules/cesiumcamera';
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

.active2 {
    opacity: 0;
}
</style>