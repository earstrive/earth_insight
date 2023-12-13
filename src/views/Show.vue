<template>
    <div class="show">
        <div class="content">
            <div class="earth" @click="earthClick">
            </div>
        </div>

        <div class="content2">
            <div class="box">
                <div ref="text" class="text">- EARTH - INSIGHT -</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const text = ref(null);

const router = useRouter();

const earthClick = () => {
    setTimeout(() => {
        router.push("/home");
    }, 500);
}

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
.show {
    height: 100vh;
    background-color: rgb(25, 25, 57);
    position: relative;
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
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
}

.earth {
    width: 340rem;
    height: 340rem;
    border-radius: 50%;
    background: url("@/assets/img/earth.png") no-repeat -10rem 0/cover;
    transition: all .5s;
}


.earth:hover {
    width: 750rem;
    height: 750rem;
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
</style>