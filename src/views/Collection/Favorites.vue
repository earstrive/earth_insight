<template>
    <div class="favorites">
        <van-dialog></van-dialog>
        <van-toast></van-toast>
        <van-popup v-model:show="renameTip" round>
            <van-cell-group inset>
                <van-field v-model="nameValue" label="收藏点：" placeholder="对此点进行重命名" :error-message="errorMsg" required />
            </van-cell-group>
            <div style="margin: 16px;">
                <van-button round block type="primary" @click="rename2">确定</van-button>
            </div>
        </van-popup>

        <van-nav-bar title="收藏" left-text="返回" left-arrow @click-left="onClickLeft" />
        <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <template v-for="(item, index) in list" :key="item.id">
                <div class="box">
                    <div class="info">
                        <div class="infochild1">
                            <div>序号：{{ index + 1 }}</div>
                            <div>名称：{{ item.name }}</div>
                        </div>
                        <div class="infochild2">
                            <div>位置信息:</div>
                            <div>
                                <div>经度：{{ item.lng }}</div>
                                <div>纬度：{{ item.lat }}</div>
                            </div>
                        </div>

                    </div>
                    <div class="btnlist">
                        <div class="btn" @click="location(item.lng, item.lat)">
                            <van-icon name="location" />
                        </div>
                        <div class="btn" @click="rename(item.id)">
                            <van-icon name="setting" />
                        </div>
                        <div class="btn" @click="remove(item.id)">
                            <van-icon name="clear" />
                        </div>
                    </div>
                </div>
            </template>
        </van-list>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import useLayersStore from '@/store/layersStore';
import CesiumPoint from '@/js/cesiumodules/cesiumpoint';
import CesiumCamera from '@/js/cesiumodules/cesiumcamera';
import { showToast, showConfirmDialog } from 'vant';

const layersData = useLayersStore();

const router = useRouter();

// 返回
const onClickLeft = () => {
    router.back();
}

// 数据加载
const list = ref([]);
const loading = ref(false);
const finished = ref(false);

const onLoad = async () => {
    // 异步更新数据
    const res = await layersData.readPoint();
    for (const item of res.data) {
        list.value.push(item);
    }
    finished.value = true;
};

// 定位到cesium
const location = (lng, lat) => {
    router.push("/home");
    CesiumPoint.addPoint(layersData.viewer, +lng, +lat);
    CesiumCamera.flyto(layersData.viewer, [+lng, +lat, 2000000]);
}

// 修改名称
const renameTip = ref(false);

const nameValue = ref("");
const errorMsg = ref("");
const pointId = ref();

const rename = (id) => {
    pointId.value = id;
    renameTip.value = true;
}

const rename2 = async () => {
    if (!nameValue.value) {
        errorMsg.value = "请输入点名";
    } else {
        const res = await layersData.renamePoint(pointId.value, nameValue.value);
        nameValue.value = "";
        if (res.code === 0) {
            list.value = [];
            onLoad();
            renameTip.value = false;
            showToast('修改成功');
        } else {
            renameTip.value = false;
            showToast(res.message + "，请重新登录");
        }
    }
}

// 删除点
const remove = (id) => {
    showConfirmDialog({
        title: '提示',
        message: '确定删除此点'
    })
        .then(async () => {
            const res = await layersData.removePoint(id);
            if (res.code === 0) {
                list.value = [];
                onLoad();
                showToast('删除成功');
            } else {
                showToast(res.message + "，请重新登录");
            }
        })
        .catch(() => { });
}

</script>

<style scoped>
.favorites {
    height: 100vh;
}

.box {
    background-color: rgb(184, 223, 236);
    width: 90vw;
    height: 200rem;
    margin: 3vw 5vw;
    border-radius: 20rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.info {
    font-size: 30rem;
    margin: 10rem 20rem;
}

.infochild1 {
    display: flex;
    justify-content: space-between;
}

.infochild2 {
    display: flex;
    justify-content: space-between;
}

.btnlist {
    font-size: 40rem;
    display: flex;
    flex-flow: column;
    width: 100rem;
    align-items: center;
}

.btnlist .btn {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60rem;
    width: 60rem;
}
</style>