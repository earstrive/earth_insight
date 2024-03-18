import * as Cesium from 'cesium';

class CesiumImageryLayer {
    // mapbox图层
    static addmapboxlayer(viewer, styleid = 0, showcredit = false) {
        // 定义了 Mapbox 的访问令牌
        const token =
            // 'pk.eyJ1IjoiY2hpbmFjb2RlZ2VhciIsImEiOiJjbDJhanJpN2owM2h0M2RudGprNGp1amlqIn0.GpmhHCF5izxP7Dg2Imkp6Q';
            // 'pk.eyJ1Ijoid2ViZ2lzNGRlbHBoaSIsImEiOiJjbGRiN3doMDMwcWZkM3lsaWdqM2xva3d4In0.d9v0S4tp2APHFLXirNecpw';
            "pk.eyJ1IjoiZWFyc3RyaXZlIiwiYSI6ImNsdHJlOG9pbDBlanQya3JtdTJqOHF0b2YifQ.JQOtAUhclckXgtcwaEz_Dg";
        // 定义了 Mapbox 样式的基础 URL
        const url = 'https://api.mapbox.com/styles/v1/';
        // 指定要加载的 Mapbox 样式
        const styles = ['satellite-v9', 'streets-v12', 'navigation-guidance-night-v2', 'navigation-guidance-day-v2',
            'navigation-preview-night-v2', 'navigation-preview-day-v2', 'bright-v9', 'dark-v11', 'light-v9',
            'basic-v9', 'navigation-night-v1',];
        const options = {
            "url": url,
            "styleId": styles[styleid],
            "username": 'mapbox',
            "accessToken": token,
            //  一个 Cesium.Credit 对象，用于显示 Mapbox 的信用信息
            credit: new Cesium.Credit('Mapbox', showcredit),
        };
        // 用于管理地图图层的集合
        const imageryLayers = viewer.imageryLayers;
        //  Cesium 提供的用于加载 Mapbox 样式的图层
        const layer = new Cesium.MapboxStyleImageryProvider(options);
        // 将新创建的 Mapbox 图层提供者添加到 Cesium Viewer 的图层管理器 (imageryLayers) 中
        imageryLayers.addImageryProvider(layer);
        // 返回当前图层管理器中的图层数量，用于确认成功加载了新的 Mapbox 图层
        return imageryLayers.length;
    }

    // openstreet图层
    static addopenstreetmaplayer(viewer, mapType = 0, showcredit = false) {
        // 每个URL对应不同的OpenStreetMap样式或图层
        const urlArr = ['https://tile-{s}.openstreetmap.fr/hot/{z}/{x}/{y}.png', 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
            'https://tile.openstreetmap.bzh/br/{z}/{x}/{y}.png', 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png']

        const options = {
            url: urlArr[mapType],
            // OpenStreetMap 服务器的子域名，通常包括 'a', 'b', 'c', 'd' 等子域名，用于负载均衡和分布式请求
            subdomains: ['a', 'b', 'c', 'd',],
            credit: new Cesium.Credit('OSM', showcredit),
        };
        const imageryLayers = viewer.imageryLayers;
        //  Cesium 提供的用于加载基于URL模板的图层
        const provider = new Cesium.UrlTemplateImageryProvider(options);
        imageryLayers.addImageryProvider(provider);
        return imageryLayers.length;
    }

    // 高德地图图层
    static addamaplayer(viewer, mapType = 0, showcredit = false) {
        const urlMap = [
            // 高德矢量地图数据图层
            'http://webrd02.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',
            //高德影像地图数据图层
            'https://webst02.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}'
        ];

        const options = {
            url: urlMap[mapType],
            credit: new Cesium.Credit('AMap', showcredit),
        };
        const imageryLayers = viewer.imageryLayers;
        const layer = new Cesium.UrlTemplateImageryProvider(options);
        imageryLayers.addImageryProvider(layer);
        return imageryLayers.length;
    }

    // 天地图图层
    static addtianditulayer(viewer, mapType = 0, showcredit = false) {
        const urlMap = [
            // 天地图矢量地图数据图层
            'https://t{s}.tianditu.gov.cn/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=58baf5241b758221a014a0a48c27d672'
        ];

        const options = {
            url: urlMap[mapType],
            subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
            maximumLevel: 18,
            credit: new Cesium.Credit('tianditu', showcredit),
        };
        const imageryLayers = viewer.imageryLayers;
        const layer = new Cesium.UrlTemplateImageryProvider(options);
        imageryLayers.addImageryProvider(layer);
        return imageryLayers.length;
    }

    // Arcgis图层
    static addarcgislayerbyurl(viewer, mapType = 0, picked = false, showcredit = false) {
        const urlMap = [
            'https://services.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer',
            'https://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetPurplishBlue/MapServer',
            'https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetGray/MapServer',
            'https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer',
            'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer'
        ];

        const options = {
            // 否启用地图要素拾取（pick features）。如果设置为 true，则允许用户在地图上选择要素以获取更多信息
            enablePickFeatures: picked,
            credit: new Cesium.Credit('ArcGIS', showcredit),
        };
        //  Cesium 提供的用于加载 ArcGIS 地图服务的图层
        const provider = Cesium.ArcGisMapServerImageryProvider.fromUrl(urlMap[mapType], options);
        // 将 ArcGIS 地图服务提供者与图层关联起来
        const layer = Cesium.ImageryLayer.fromProviderAsync(provider);
        const imageryLayers = viewer.imageryLayers;
        imageryLayers.add(layer);
        return imageryLayers.length;
    }

    //
    // static addgooglelayerbyurl(viewer, mapType = 0, showcredit = false) {
    //     const urlMap = [
    //         'http://www.google.cn/maps/vt?lyrs=s@800&x={x}&y={y}&z={z}'
    //     ];

    //     const options = {
    //         url: urlMap[mapType],
    //         subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
    //         minimumLevel: 1,
    //         maximumLevel: 20,
    //         credit: new Cesium.Credit('GoogleMap', showcredit),
    //         tilingScheme: new Cesium.WebMercatorTilingScheme()
    //     };
    //     const imageryLayers = viewer.imageryLayers;
    //     const layer = new Cesium.UrlTemplateImageryProvider(options);
    //     imageryLayers.addImageryProvider(layer);

    //     const terrain = new Cesium.createWorldTerrain({
    //         requestWaterMask: true,
    //         requestVertexNormals: true
    //     });
    //     viewer.terrainProvider = terrain;

    //     return imageryLayers.length;
    // }


    // 移除所有图层
    static removealllayer(viewer) {
        const imageryLayers = viewer.imageryLayers;
        imageryLayers.removeAll();
        return imageryLayers.length;
    }
}

export default CesiumImageryLayer;

