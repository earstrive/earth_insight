<template>
    <Tip></Tip>
    <Islogin v-if="layersData.isLoginTip"></Islogin>
    <Layers></Layers>
    <div class="outer">
        <Btn class="circleBtn"></Btn>
    </div>
    <Cesium></Cesium>
</template>

<script setup>
import Cesium from './Cesium.vue';
import Btn from './Btn.vue';
import Layers from "@/views/Layers/Layers.vue";
import Islogin from "@/views/Collection/Islogin.vue";
import Tip from '../Collection/Tip.vue';

import useLayersStore from "@/store/layersStore"
const layersData = useLayersStore();
</script>

<style scoped>
.outer {
    width: 420rem;
    height: 210rem;
    display: flex;
    justify-content: center;
    position: fixed;
    z-index: 1;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    overflow: hidden;
}

.circleBtn {
    margin-top: 10rem;
}
</style>