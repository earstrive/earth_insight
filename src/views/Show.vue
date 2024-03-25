<template>
    <div class="show" @click="toMine">
        <div class="earthBox">
            <div class="back" :class="{ active: isActive }">
                <img src="/image/back.png" alt="">
            </div>
            <div class="earth">
                <img src="/image/earth.png" alt="">
            </div>
        </div>
        <div class="info">
            <div class="infoTxt">{{ infoTxt }}</div>
            <van-loading v-show="loadShow" class="loading" color="#1989fa" />
        </div>
        <div class="text">
            <img src="/image/text.png" alt="">
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import useLayersStore from "@/store/layersStore";

const layersData = useLayersStore();

const router = useRouter();

// 背景渐变
const isActive = ref(false);

setInterval(() => {
    isActive.value = !isActive.value;
}, 1500);

// 文字提示
const infoTxt = ref("点击进入");
const loadShow = ref(false);



// 路由跳转
const toMine = () => {
    infoTxt.value = "加载中";
    loadShow.value = true;
    router.replace({ path: '/home' });
}

// 暴露方法
const forSetLoaction = (lng, lat) => {
    layersData.userLocation.lng = lng;
    layersData.userLocation.lat = lat;
}
window.setLocation = forSetLoaction;
</script>

<style scoped>
.show {
    height: 100vh;
    background-color: rgb(23, 15, 87);
}

.earthBox {
    position: relative;
}

.earthBox img {
    width: 600rem;
}

.back {
    width: 100vw;
    position: absolute;
    display: flex;
    justify-content: center;
    filter: blur(500rem);
    top: 200rem;
    z-index: 1;
    transition: all 1.5s;
}

.earth {
    width: 100vw;
    position: absolute;
    display: flex;
    justify-content: center;
    top: 200rem;
    z-index: 2;
}

.text {
    position: absolute;
    width: 100vw;
    display: flex;
    justify-content: center;
    bottom: 100rem;
}

.text img {
    width: 500rem;
}

.info {
    position: absolute;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    bottom: 500rem;
    flex-flow: column;
}

.info .infoTxt {
    width: 500rem;
    text-align: center;
    font-size: 25rem;
    font-weight: bold;
    color: rgb(63, 97, 192);
}

.info .loading {
    width: 25rem;
}

.active {
    filter: blur(50rem);
}
</style>