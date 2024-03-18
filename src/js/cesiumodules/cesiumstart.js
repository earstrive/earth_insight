import * as Cesium from 'cesium';

const options = {
    /* 
        1. `infoBox`（信息框）: 这是一个布尔值，确定是否在单击Cesium地球上的对象或要素时显示默认的信息框。
        如果设置为 `false`，则不会显示有关所选对象的额外信息。

        2. `vrButton`（虚拟现实按钮）: 这是一个布尔属性，控制虚拟现实（VR）按钮的可见性。
        如果设置为 `false`，则不会显示一个按钮，允许用户进入VR模式，以获得更沉浸式的体验。

        3. `geocoder`（地理编码器）: 这是一个布尔值，确定地理编码搜索框是否可见。
        如果设置为 `false`，则不会启用搜索框，用户无法输入位置或地址以导航到该地点。

        4. `timeline`（时间轴）: 这是一个布尔属性，控制时间轴小部件的可见性。
        如果设置为 `false`，则不会在Cesium查看器底部显示一个时间轴，允许用户与与时间相关的数据交互。

        5. `animation`（动画控制）: 这是一个布尔属性，确定是否显示动画控件。
        如果设置为 `false`，则不会显示播放和操作基于时间的动画的控制。

        6. `homeButton`（主页按钮）: 这是一个布尔值，控制主页按钮的可见性。
        如果设置为 `true`，它会显示一个按钮，将视图返回到默认或主页位置。

        7. `scene3DOnly`（仅限3D场景）: 这是一个布尔属性，指定Cesium查看器是否应受限于3D场景模式。
        如果设置为 `true`，它将防止用户切换到其他场景模式，如2D或哥伦布视图。

        8. `shouldAnimate`（应动画）: 这是一个布尔属性，确定是否允许动画。
        如果设置为 `true`，它允许Cesium查看器中的动画。

        9. `imageryProvider`（影像提供者）: 这是一个布尔属性，控制影像提供者的可见性。
        如果设置为 `true`，它将显示地球上的默认影像图层。

        10. `baseLayerPicker`（底图选择器）: 这是一个布尔值，确定底图选择器是否可见。
        如果设置为 `true`，它允许用户在不同的底图图层之间切换。

        11. `sceneModePicker`（场景模式选择器）: 这是一个布尔属性，控制场景模式选择器的可见性。
        如果设置为 `true`，它允许用户在不同的场景模式之间切换（例如2D、3D）。

        12. `fullscreenButton`（全屏按钮）: 这是一个布尔属性，确定全屏按钮是否可见。
        如果设置为 `true`，它允许用户进入全屏模式。

        13. `selectionIndicator`（选择指示器）: 这是一个布尔值，确定在选择对象或要素时是否显示选择指示器。
        如果设置为 `true`，它会在选择对象或要素时显示一个视觉指示器。

        14. `navigationHelpButton`（导航帮助按钮）: 这是一个布尔属性，控制导航帮助按钮的可见性。
        如果设置为 `true`，它将显示一个按钮，提供有关如何导航和与Cesium查看器交互的指导。

        15. `sceneMode`（场景模式）: 此属性设置Cesium查看器的初始场景模式。在这种情况下，
        它设置为 `Cesium.SceneMode.SCENE3D`，使3D模式成为初始场景模式。

        16. `navigationInstructionsInitiallyVisible`（导航说明初始可见性）: 这是一个布尔属性，
        确定在启动Cesium查看器时导航说明是否初始可见。如果设置为 `true`，它会显示导航说明。
    */
    infoBox: false,
    vrButton: false,
    geocoder: false,
    timeline: false,
    animation: false,
    homeButton: false,
    scene3DOnly: false,
    shouldAnimate: false,
    imageryProvider: false,
    baseLayerPicker: false,
    sceneModePicker: false,
    fullscreenButton: false,
    selectionIndicator: true,
    navigationHelpButton: false,
    sceneMode: Cesium.SceneMode.SCENE3D,
    navigationInstructionsInitiallyVisible: false,
};



class CesiumStart {
    // 属性
    viewer;

    constructor(container) {
        // 创建viewer实例
        const viewer = new Cesium.Viewer(container, options);

        // 隐藏 Cesium Viewer 中的默认 Cesium 信用信息
        viewer.cesiumWidget.creditContainer.style.display = 'none';

        const scene = viewer.scene;
        // 场景的抗锯齿效果（FXAA），这有助于减少锯齿状边缘，使图像看起来更平滑
        scene.fxaa = true;
        // 隐藏了场景中的太阳
        scene.sun.show = false;
        // 隐藏了场景的天空盒子
        scene.skyBox.show = false;
        // 隐藏了场景的大气效果，包括大气散射和颜色渐变
        scene.skyAtmosphere.show = false;
        // 禁用了对半透明对象的拾取时的深度测试，（设置为false）还有防止快速转动地球报错问题
        scene.pickTranslucentDepth = false;
        // 启用了后处理阶段的抗锯齿效果（FXAA），与第上面fxaa相对应，确保抗锯齿在后处理中生效
        scene.postProcessStages.fxaa.enabled = true;
        // 禁用了屏幕空间相机控制器的碰撞检测，这意味着视图可以自由穿越地形，而不会受到碰撞的限制
        scene.screenSpaceCameraController.enableCollisionDetection = false;
        // 最小高度
        scene.screenSpaceCameraController.minimumZoomDistance = 100.0;

        const globe = scene.globe;
        // 确保地球可见
        globe.show = true;
        // 禁用了地球的半透明效果
        globe.translucency.enabled = false;
        // 启用了地球与地形的深度测试，确保地球不会被遮挡在地形之后
        // globe.depthTestAgainstTerrain = true;
        globe.depthTestAgainstTerrain = false;
        // 将地球的基本颜色设置为透明，这样地球不会显示颜色
        globe.baseColor = Cesium.Color.TRANSPARENT;

        // 根据浏览器是否支持像素化渲染来设置 Cesium Viewer 的分辨率比例，以适应不同设备的屏幕分辨率，以提供更好的图像质量
        if (Cesium.FeatureDetection.supportsImageRenderingPixelated()) {
            viewer.resolutionScale = window.devicePixelRatio;
        }

        this.viewer = viewer;
    }


    // 扩展/extend默认false
    extends(useExtend = false) {
        if (useExtend) {
            // 允许你从桌面或文件浏览器中将数据文件拖放到 Cesium Viewer 中
            this.viewer.extend(Cesium.viewerDragDropMixin);
            // 用于监视 Cesium Viewer 的性能，并在性能下降时提供警告或建议
            this.viewer.extend(Cesium.viewerPerformanceWatchdogMixin);
            // 启用了 Cesium Inspector 工具，它是一个浏览器内置的开发工具，用于调试和分析 Cesium 应用程序
            this.viewer.extend(Cesium.viewerCesiumInspectorMixin);
        }
    }

    // 相机位置
    setview(location = []) {
        // 经度、纬度、高度、偏航角（heading），和俯仰角（pitch）。这些值用于定义相机的初始位置和方向
        let [longitude = 119.215698337173, latitude = 34.6086520789146,
            height = 16000000, heading = 0, pitch = -90] = location;
        this.viewer.camera.setView({
            destination: Cesium.Cartesian3.fromDegrees(longitude, latitude, height),
            orientation: {
                heading: Cesium.Math.toRadians(heading),
                pitch: Cesium.Math.toRadians(pitch),
                roll: 0.0
            }
        });
    }

    // 飞行跳转
    flyto(location = [], duration = 2) {
        // 经度、纬度、高度、偏航角（heading），和俯仰角（pitch）。这些值用于定义默认的飞行位置和方向
        let [longitude = 119.215698337173, latitude = 34.6086520789146,
            height = 1800, heading = 0, pitch = -90] = location;
        // 获取了 Cesium Viewer 的相机对象
        const camera = this.viewer.camera;
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

    // home键
    home(location = []) {
        // home键的返回位置
        let [xmin = 119.065117829867,
            ymin = 45.8955968828478,
            xmax = 119.150342668864,
            ymax = 45.9698186561991] = location;

        // 设置了 Cesium Viewer 的默认视图矩形。视图矩形是指定了地理坐标范围的矩形区域，它定义了初始化视图的默认区域
        Cesium.Camera.DEFAULT_VIEW_RECTANGLE =
            Cesium.Rectangle.fromDegrees(xmin, ymin, xmax, ymax);
        // 设置了 Cesium Viewer 的默认视图因子。视图因子是一个控制摄像机视图范围的参数，它影响相机的视野和视图距离
        Cesium.Camera.DEFAULT_VIEW_FACTOR = 0.001;
    }
}

export default CesiumStart;