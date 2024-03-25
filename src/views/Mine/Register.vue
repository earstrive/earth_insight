<template>
    <div class="register">
        <van-nav-bar title="注册" left-text="返回" left-arrow @click-left="onClickLeft" fixed />
        <div class="registerInfo">
            <div class="loginIcon">
                <img src="/image/login.png" alt="">
            </div>
            <van-form>
                <van-cell-group inset>
                    <van-field v-model="username" required label="用户名" placeholder="请输入用户名" />
                    <van-field v-model="password" required type="password" label="密码" placeholder="请输入密码" />
                    <van-field v-model="passwordAgain" required type="password" label="确认密码" placeholder="请确认密码" />
                </van-cell-group>
            </van-form>
            <div class="message">{{ message }}</div>
            <div class="btn">
                <div class="btnChild">
                    <van-button round type="primary" block @click="btn1">注册</van-button>
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

const username = ref("");
const password = ref("");
const passwordAgain = ref("");
const message = ref("");


const btn1 = async () => {
    if (username.value.length >= 5 && username.value.length <= 11 &&
        password.value.length <= 15 && password.value.length >= 6 &&
        passwordAgain.value.length <= 15 && passwordAgain.value.length >= 6) {
        if (password.value === passwordAgain.value) {
            const res = await layersData.register(username.value, password.value);
            if (res?.data?.affectedRows) {
                message.value = "注册成功";
                setTimeout(() => {
                    router.back();
                }, 1000);
            } else {
                message.value = res.message;
            }
        } else {
            message.value = "两次密码不一致";
        }
    } else {
        message.value = "用户名在5-11位，密码在6-15位";
    }
}

</script>

<style scoped>
.registerInfo {
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