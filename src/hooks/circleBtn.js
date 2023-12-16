import { ref } from 'vue';

// 相对度数
const num = ref(0);
// 是否初始状态
const state = ref(false);
const outercircle = ref(null);

let initialAngle = 0;
let lastAngle = 0; // 保存上一次的角度
let degreeArr = [];

const setStyle = (item) => {
    if (state.value) {
        degreeArr[item] += num.value;
        return "rotate(" + degreeArr[item] + "deg)";
    } else {
        for (let i = 0; i < 10; i++) {
            degreeArr[i] = 45 * i - 84;
        }
        return "rotate(" + degreeArr[item] + "deg)";
    }
}

const outTouch = () => {
    lastAngle = 0;
};

const beginTouch = (event) => {
    const outercircleRect = outercircle.value.getBoundingClientRect();
    const touchX = event.touches[0].clientX - (outercircleRect.left + outercircleRect.width / 2);
    const touchY = event.touches[0].clientY - (outercircleRect.top + outercircleRect.height / 2);

    initialAngle = Math.atan2(touchY, touchX) * (180 / Math.PI);
};

const computeDeg = (event) => {
    const outercircleRect = outercircle.value.getBoundingClientRect();
    const touchX = event.touches[0].clientX - (outercircleRect.left + outercircleRect.width / 2);
    const touchY = event.touches[0].clientY - (outercircleRect.top + outercircleRect.height / 2);
    let angle = Math.atan2(touchY, touchX) * (180 / Math.PI);

    angle = (angle - initialAngle + 540) % 360 - 180;

    // 计算相对旋转度数
    const relativeRotation = angle - lastAngle;

    // 保存当前角度作为下一次的上一次角度
    lastAngle = angle;

    state.value = true;
    num.value = relativeRotation;
};

export { outercircle, beginTouch, computeDeg, outTouch, setStyle }