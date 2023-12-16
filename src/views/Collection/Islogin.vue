<template>
    <van-dialog></van-dialog>
    <van-toast></van-toast>
</template>

<script setup>
import { showConfirmDialog } from 'vant';
import useLayersStore from "@/store/layersStore"
const layersData = useLayersStore();

showConfirmDialog({
    title: '提示',
    message: '暂未登录，功能无法使用',
    confirmButtonText: "去登录"
})
    .then(() => {
        console.log("跳转登录");
    })
    .catch(() => {
        layersData.isLoginTip = false;
    });
</script>

<style scoped></style>