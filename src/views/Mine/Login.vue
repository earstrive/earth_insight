<template>
    <div class="login">
        <van-nav-bar title="登录" left-text="返回" left-arrow @click-left="onClickLeft" fixed />
        <div class="loginInfo">
            <div class="loginIcon">
                <img src="/image/login.png" alt="">
            </div>
            <van-form>
                <van-cell-group inset>
                    <van-field v-model="username" required label="用户名" placeholder="请输入用户名" />
                    <van-field v-model="password" required type="password" label="密码" placeholder="请输入密码" />
                </van-cell-group>
            </van-form>
            <div class="message">{{ message }}</div>
            <div class="btn">
                <div class="btnChild">
                    <van-button round type="primary" block @click="loginBtn">登录</van-button>
                </div>
                <div class="btnChild">
                    <van-button round type="primary" block @click="toRegister">注册</van-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import useLayersStore from "@/store/layersStore";

const layersData = useLayersStore();

const router = useRouter();

const onClickLeft = () => {
    router.back();
}

const toRegister = () => {
    router.push("/register");
}


const username = ref('');
const password = ref('');
const message = ref('');

const loginBtn = async () => {
    if (username.value.length >= 5 && username.value.length <= 11 && password.value.length <= 16 && password.value.length >= 6) {
        const res = await layersData.login(username.value, password.value);
        if (res.code === 0) {
            message.value = "登录成功";
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("name", res.data.name);
            router.back();
        } else {
            message.value = res.message;
        }
    } else {
        message.value = "用户名或密码位数不正确";
    }
}
</script>

<style scoped>
.loginInfo {
    height: 100vh;
    background: linear-gradient(to bottom, rgba(161, 196, 253, .8), rgba(194, 233, 251, .2));
}

.loginIcon {
    height: 40vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
}

.loginIcon img {
    width: 250rem;
    margin-top: 5vh;
}

.message {
    display: flex;
    justify-content: center;
    font-size: 25rem;
    color: red;
}

.btn {
    display: flex;
    justify-content: center;
    flex-flow: wrap;
    margin-top: 20rem;
}

.btnChild {
    width: 80vw;
    margin: 10rem 0;
}
</style>