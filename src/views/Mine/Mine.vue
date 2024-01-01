<template>
    <div class="mine">
        <van-dialog></van-dialog>
        <van-toast></van-toast>
        <van-nav-bar title="我的" left-text="返回" left-arrow @click-left="onClickLeft" />
        <div class="userInfo">
            <van-image round fit="cover" width="150rem" height="150rem" src="./image/earth.png" @click="touxiangClick" />
            <van-image-preview></van-image-preview>
            <div class="userInfo2" @click="toLogin">
                <div class="des">Earth Insight欢迎您</div>
                <div class="username">{{ username }}</div>
            </div>
        </div>
        <van-cell title="收藏" is-link @click="goToFavor" />
        <van-cell title="退出登录" is-link @click="logoff" />
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { showImagePreview } from 'vant';
import { ref } from 'vue';
import { onMounted } from 'vue';
import { showToast, showConfirmDialog } from 'vant';


const router = useRouter();

// 返回
const onClickLeft = () => {
    router.back();
}

// 头像放大
const touxiangClick = () => {
    showImagePreview(['./image/earth.png']);
}

// 用户名
const username = ref();

// 点击用户区域
const toLogin = () => {
    if (!localStorage.getItem("name")) router.push("/login");
}

// 收藏
const goToFavor = () => {
    if (localStorage.getItem("name")) {
        router.push("/favorites");
    } else {
        showToast('暂未登录');
    }
}

// 退出登录
const logoff = () => {
    if (localStorage.getItem("name")) {
        showConfirmDialog({
            title: '提示',
            message: '确定退出登录'
        })
            .then(() => {
                localStorage.clear();
                showToast('退出成功');
                location.reload();
            })
            .catch(() => { });
    } else {
        showToast('暂未登录');
    }
}

onMounted(() => {
    username.value = localStorage.getItem("name") ? localStorage.getItem("name") : "未登录，点击登录";
});
</script>

<style scoped>
.mine {
    height: 100vh;
    width: 100vw;
}

.userInfo {
    height: 200rem;
    display: flex;
    justify-content: center;
    align-items: center;
}

.userInfo2 {
    height: 200rem;
    width: 400rem;
}

.des {
    font-size: 30rem;
    height: 60rem;
    padding: 20rem 0 0 20rem;
}

.username {
    font-size: 40rem;
    height: 140rem;
    padding: 20rem;
}
</style>