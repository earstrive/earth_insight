import * as Cesium from 'cesium';

class CesiumCamera {
    static flyto(viewer, location = [], duration = 2) {
        // 经度、纬度、高度、偏航角（heading），和俯仰角（pitch）。这些值用于定义默认的飞行位置和方向
        let [longitude = 119.215698337173, latitude = 34.6086520789146,
            height = 1800, heading = 0, pitch = -90] = location;
        // 获取了 Cesium Viewer 的相机对象
        const camera = viewer.camera;
        // 使用 camera.flyTo 方法来实现相机的平滑过渡动画，将相机移动到指定的位置和方向
        camera.flyTo({
            // 建一个 3D 笛卡尔坐标，将相机定位到指定的经度、纬度和高度的位置
            destination: Cesium.Cartesian3.fromDegrees(longitude, latitude, height),
            // 这是一个包含相机方向信息的对象
            orientation: {
                // 设置相机的水平偏航角，Cesium.Math.toRadians(heading) 是将给定的度数转换为弧度
                heading: Cesium.Math.toRadians(heading),
                // 设置相机的俯仰角
                pitch: Cesium.Math.toRadians(pitch),
                // roll 属性通常保持为 0，以确保相机在飞行过程中不会滚动
                roll: 0.0
            },
            // 飞行的持续时间，以秒为单位。可以控制飞行的速度
            duration
        });
    }
}

export default CesiumCamera;

