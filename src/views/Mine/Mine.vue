<template>
    <div class="mine">
        <van-nav-bar title="我的" left-text="返回" left-arrow @click-left="onClickLeft" />
        <div class="userInfo">
            <van-image round fit="cover" width="150rem" height="150rem" src="http://localhost:8000/users/avatar/7"
                @click="touxiangClick" />
            <van-image-preview></van-image-preview>
            <div class="userInfo2" @click="toLogin">
                <div class="des">欢迎使用Earth Insight</div>
                <div class="username">{{ username }}</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { showImagePreview } from 'vant';
import { ref } from 'vue';
import { onMounted } from 'vue';

const router = useRouter();

const onClickLeft = () => {
    router.back();
}

const touxiangClick = () => {
    showImagePreview(['http://localhost:8000/users/avatar/7']);
}

const username = ref();

const toLogin = () => {
    if (!localStorage.getItem("name")) router.push("/login");
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