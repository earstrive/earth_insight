<template>
    <div ref="box" class="box" @touchstart="fn2" @touchmove="fn3">
        <div ref="box2" class="box2" @touchmove.stop="fn1"></div>
        <div ref="text" class="text">
            <template v-for="item in 10">
                <div :style="{ transform: style1(item) }">{{ item }}</div>
            </template>

        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const num = ref(0);
const state = ref(false);
// const isInside = ref(false);

// let count;
// let arr = [0];
// let count2 = 0;

const style1 = (item) => {
    // if (state.value) {
    //     if (isInside.value) {
    //         count2 = arr[0] % 36;
    //         console.log(count2);
    //     }
    //     count = 36 * item + count2;
    //     count += num.value;
    //     arr[item - 1] = count;
    //     return "rotate(" + count + "deg)";
    // } else {
    //     count = 36 * item;
    //     return "rotate(" + count + "deg)";
    // }
    let count = 36 * item;
    count += num.value;
    return "rotate(" + count + "deg)";
}


const box = ref(null);
const text = ref(null);
const box2 = ref(null);


let initialAngle = 0;

const fn1 = () => {
    console.log("橙色圆");
}


const fn2 = (event) => {
    const boxRect = box.value.getBoundingClientRect();
    const touchX = event.touches[0].clientX - (boxRect.left + boxRect.width / 2);
    const touchY = event.touches[0].clientY - (boxRect.top + boxRect.height / 2);

    initialAngle = Math.atan2(touchY, touchX) * (180 / Math.PI);
};

const fn3 = (event) => {
    const boxRect = box.value.getBoundingClientRect();
    const touchX = event.touches[0].clientX - (boxRect.left + boxRect.width / 2);
    const touchY = event.touches[0].clientY - (boxRect.top + boxRect.height / 2);
    let angle = Math.atan2(touchY, touchX) * (180 / Math.PI);

    // Check if the touch is inside the orange circle
    // isInside.value = Math.sqrt(touchX ** 2 + touchY ** 2) <= boxRect.width / 2;

    // console.log("Is inside: ", isInside.value);

    // Adjust the angle to be between -180 and 180
    angle = (angle - initialAngle + 540) % 360 - 180;
    state.value = true;
    num.value = angle;
};

</script>

<style scoped>
.box {
    width: 400rem;
    height: 400rem;
    margin: 300rem auto;
    border-radius: 50%;
    background-color: orange;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
}

.box2 {
    position: relative;
    width: 200rem;
    height: 200rem;
    border-radius: 50%;
    background-color: skyblue;
    z-index: 1;
}

.box .text {
    width: 100%;
    height: 100%;

    position: absolute;
}

.box .text div {
    width: 70rem;
    height: 70rem;
    border-radius: 50%;
    background-color: red;

    transform-origin: 0 200rem;

    /* 整体定位在中间 */
    position: absolute;
    left: 50%;
}
</style>