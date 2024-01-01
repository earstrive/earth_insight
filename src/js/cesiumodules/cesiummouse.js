import * as Cesium from 'cesium';



class CesiumMouseEvents {
    handler;
    constructor(viewer) {
        // 在构造函数中，创建一个 Cesium.ScreenSpaceEventHandler 对象，关联到 Cesium 的 viewer.scene.canvas上
        this.handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
    }

    // 添加点击事件处理程序
    addLeftClickHandler(cb) {
        // 添加一个左键点击事件处理程序，当左键被点击时调用传入的 "callback" 函数
        this.handler.setInputAction(cb, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    }

    // 清除所有事件处理程序
    removeAllHandlers() {
        this.handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
    }
}

export default CesiumMouseEvents;
