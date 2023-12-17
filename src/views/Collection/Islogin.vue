<template>
    <van-dialog></van-dialog>
    <van-toast></van-toast>
</template>

<script setup>
import { showConfirmDialog } from 'vant';
import useLayersStore from "@/store/layersStore"
import { useRouter } from 'vue-router';

const layersData = useLayersStore();
const router = useRouter();

showConfirmDialog({
    title: '提示',
    message: '暂未登录，功能无法使用',
    confirmButtonText: "去登录"
})
    .then(() => {
        layersData.isLoginTip = false;
        router.push("login");
    })
    .catch(() => {
        layersData.isLoginTip = false;
    });
</script>

<style scoped></style>