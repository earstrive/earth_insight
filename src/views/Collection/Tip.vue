<template>
    <van-popup v-model:show="layersData.collectionTip" round>
        <van-cell-group inset>
            <van-field v-model="nameValue" label="收藏点：" placeholder="请输入此点的点名" :error-message="errorMsg" required />
        </van-cell-group>
        <div style="margin: 16px;">
            <van-button round block type="primary" @click="collectBtn">确定</van-button>
        </div>
    </van-popup>
</template>

<script setup>
import useLayersStore from '@/store/layersStore';
import { ref } from 'vue';
import { showToast } from 'vant';

const layersData = useLayersStore();

const nameValue = ref("");
const errorMsg = ref("");

const collectBtn = async () => {
    if (!nameValue.value) {
        errorMsg.value = "请输入点名"
    } else {
        const res = await layersData.addPoint(nameValue.value, layersData.choosePoint.lng, layersData.choosePoint.lat);
        if (res.code === 0) {
            layersData.collectionTip = false;
            showToast('收藏成功');
        } else {
            layersData.collectionTip = false;
            showToast(res.message + "，请重新登录");
        }
    }
}
</script>

<style scoped></style>