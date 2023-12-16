import * as Cesium from 'cesium';

class CesiumPoint {
    static addPoint(viewer, longitude, latitude) {
        const billboardEntity = new Cesium.Entity({
            position: Cesium.Cartesian3.fromDegrees(longitude, latitude, 10),
            billboard: {
                image: "./image/1.png",
                scale: 0.15,
                horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                verticalOrigin: Cesium.VerticalOrigin.BOTTOM
            }
        });
        viewer.entities.add(billboardEntity);
    }

    static getReversePoint(longitude, latitude) {
        // 将经纬度转换为弧度
        const latRad = latitude * Math.PI / 180;
        const lonRad = longitude * Math.PI / 180;

        // 计算当前位置到地球中心的直角坐标
        const x = 6371 * Math.cos(latRad) * Math.cos(lonRad);
        const y = 6371 * Math.cos(latRad) * Math.sin(lonRad);
        const z = 6371 * Math.sin(latRad);

        // 取反方向坐标
        const newX = -x;
        const newY = -y;
        const newZ = -z;

        // 将反方向坐标转换为经纬度
        const newLon = (Math.atan2(newY, newX) * 180 / Math.PI + 180) % 360 - 180;
        const newLat = Math.atan2(newZ, Math.sqrt(newX ** 2 + newY ** 2)) * 180 / Math.PI;

        return { newLon, newLat };
    }

    static removePoint(viewer) {
        viewer.entities.removeAll();
    }

    static opintLocation(viewer, cb) {

        // 添加鼠标点击事件监听器
        viewer.screenSpaceEventHandler.setInputAction((movement) => {
            const pickedObject = viewer.scene.pick(movement.position);
            if (Cesium.defined(pickedObject) && Cesium.defined(pickedObject.id)) {
                // 实体被选中，执行相应的操作
                const selectedEntity = pickedObject.id;
                // 获取实体的笛卡尔坐标
                const cartesianPosition = selectedEntity.position.getValue(viewer.clock.currentTime);
                // 将笛卡尔坐标转换为经纬度坐标
                const cartographicPosition = Cesium.Cartographic.fromCartesian(cartesianPosition);
                // 将弧度转换为度
                const latitude = Cesium.Math.toDegrees(cartographicPosition.latitude);
                const longitude = Cesium.Math.toDegrees(cartographicPosition.longitude);

                cb(longitude, latitude);
            }
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    }
}

export default CesiumPoint;

