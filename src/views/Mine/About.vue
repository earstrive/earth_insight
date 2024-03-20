<template>
    <div class="about">
        <van-nav-bar title="关于" left-text="返回" left-arrow @click-left="onClickLeft" />
        <div class="aboutInfo">
            <div class="show">
                <div class="content">
                    <div class="earth">
                    </div>
                </div>

                <div class="content2">
                    <div class="box">
                        <div ref="text" class="text">- EARTH - INSIGHT -</div>
                    </div>
                </div>
            </div>
            <van-cell-group inset>
                <van-cell title="软件名称" value="澈地 Earth Insight" />
                <van-collapse v-model="activeNames">
                    <van-collapse-item title="软件简介" name="1">
                        <p>
                            我们的软件，中文名称之“澈地”，英文名唤作“Earth
                            Insight。“澈”在古汉语中通“彻”，乃“穿过”，亦有“透明”之意。“澈地”是将地球视为清澈透明的球体，突破地表的阻隔进行观察。“澈地Earth
                            Insight”可“澈”查地下，查看另外一端当地的详细地理信息，确定向往之地穿过地表的精准视线。
                        </p>
                    </van-collapse-item>
                </van-collapse>
                <van-cell title="版本信息" value="v1.1.1" />
                <van-collapse v-model="activeNames">
                    <van-collapse-item title="开发人员" name="2">
                        <div class="devInfo">
                            <div class="avatar">
                                <img src="http://8.130.168.215/img/logo.svg" alt="头像">
                                <span>崔雨晴</span>
                            </div>
                            <div class="email">earstrive@gmail.com</div>
                        </div>
                        <div class="devInfo">
                            <div class="avatar">
                                <img src="http://8.130.168.215/img/logo.svg" alt="头像">
                                <span>耳朵Strive</span>
                            </div>
                            <div class="email">earstrive@gmail.com</div>
                        </div>
                        <div class="devInfo">
                            <div class="avatar">
                                <img src="http://8.130.168.215/img/logo.svg" alt="头像">
                                <span>阚雨露</span>
                            </div>
                            <div class="email">earstrive@gmail.com</div>
                        </div>
                        <div class="devInfo">
                            <div class="avatar">
                                <img src="http://8.130.168.215/img/logo.svg" alt="头像">
                                <span>李国旺</span>
                            </div>
                            <div class="email">earstrive@gmail.com</div>
                        </div>
                        <div class="devInfo">
                            <div class="avatar">
                                <img src="http://8.130.168.215/img/logo.svg" alt="头像">
                                <span>陶洋</span>
                            </div>
                            <div class="email">earstrive@gmail.com</div>
                        </div>
                        <div class="rank">以上排名按照名称排序</div>
                    </van-collapse-item>
                </van-collapse>
            </van-cell-group>
            <div class="copyright">Copyright © {{ new Date().getFullYear() }} Earch Insight</div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const activeNames = ref([]);

// 返回
const onClickLeft = () => {
    router.back();
}

const text = ref(null);

onMounted(() => {
    const span = text.value.innerHTML.split("").map((item, i) => {
        // 返回切割好的文字标签
        return `
            <span style="transform:rotate(${i * 20}deg);font-size: 40rem;transform-origin: 0 200rem;position: absolute;left: 50%;">
              ${item}
            </span>
        `;
    });
    text.value.innerHTML = span.join("");
});
</script>

<style scoped>
.about {
    height: 100vh;
}


.show {
    height: 40vh;
    background-color: rgba(25, 25, 57, .5);
    position: relative;
    margin-bottom: 20rem;
}

.content {
    position: relative;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
}

.content2 {
    position: absolute;
    width: 100vw;
    height: 40vh;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
}

.earth {
    width: 300rem;
    height: 300rem;
    border-radius: 50%;
    background: url("@/assets/img/earth.png") no-repeat 0 0/cover;
    transition: all 2s ease-in;
}


.box {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 400rem;
    height: 400rem;
    border-radius: 50%;
    position: relative;
    color: white;
}

.box .text {
    width: 100%;
    height: 100%;
    position: absolute;
    animation: animate 20s linear infinite;

}

@keyframes animate {
    0% {
        transform: rotate(0);
    }

    100% {
        transform: rotate(-360deg);
    }
}

.devInfo {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 20rem 0;
}

.devInfo .avatar {
    display: flex;
    align-items: center;
}

.devInfo .avatar img {
    width: 50rem;
    margin-right: 10rem;
}

.rank {
    text-align: center;
}

.copyright {
    margin: 10rem;
    text-align: center;
    font-size: 20rem;
    font-weight: lighter;
}
</style>