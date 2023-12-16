<template>
    <div>
        <van-popup v-model:show="layersData.showBottom" closeable position="bottom" :style="{ height: '60%' }">
            <div class="layers">
                <div>
                    <div class="title">Mapbox图层：</div>
                    <div class="divBox">
                        <template v-for="(item, index) in mapboxLayers">
                            <van-button class="vanBtn" type="primary" size="small"
                                @click="layersData.swichLayers('mapbox', index)">{{ item
                                }}</van-button>
                        </template>
                    </div>
                </div>
                <div>
                    <div class="title">ArcGIS图层：</div>
                    <div class="divBox">
                        <template v-for="(item, index) in arcgisLayers">
                            <van-button class="vanBtn" type="primary" size="small"
                                @click="layersData.swichLayers('arcgis', index)">{{ item
                                }}</van-button>
                        </template>
                    </div>
                </div>
                <div>
                    <div class="title">OpenStreetMap图层：</div>
                    <div class="divBox">
                        <template v-for="(item, index) in openStreetLayers">
                            <van-button class="vanBtn" type="primary" size="small"
                                @click="layersData.swichLayers('openstreet', index)">{{ item
                                }}</van-button>
                        </template>
                    </div>
                </div>
                <div>
                    <div class="title">高德图层：</div>
                    <div class="divBox">
                        <template v-for="(item, index) in amapLayers">
                            <van-button class="vanBtn" type="primary" size="small"
                                @click="layersData.swichLayers('amap', index)">{{ item
                                }}</van-button>
                        </template>

                    </div>
                </div>
                <div>
                    <div class="title">天地图图层：</div>
                    <div class="divBox">
                        <template v-for="(item, index) in tiandituLayers">
                            <van-button class="vanBtn" type="primary" size="small"
                                @click="layersData.swichLayers('tianditu', index)">{{ item
                                }}</van-button>
                        </template>
                    </div>
                </div>
            </div>
        </van-popup>
    </div>
</template>

<script setup>
import useLayersStore from "@/store/layersStore"

const layersData = useLayersStore();

const mapboxLayers = ['satellite-v9', 'streets-v12', 'navigation-guidance-night-v2', 'navigation-guidance-day-v2',
    'navigation-preview-night-v2', 'navigation-preview-day-v2', 'bright-v9', 'dark-v11', 'light-v9',
    'basic-v9', 'navigation-night-v1',];
const arcgisLayers = ['NatGeo-World-Map', 'Street-PurplishBlue', 'Street-Gray', 'Community', 'Imagery'];
const openStreetLayers = ["OpenStreetVector", "black-style", "traffic-map", "topographic-map"];
const amapLayers = ["高德矢量图层", "高德影像图层"];
const tiandituLayers = ["天地图影像图层"];
</script>

<style scoped>
.layers {
    display: flex;
    height: 100%;
    background: linear-gradient(to bottom, #a1c4fd, #c2e9fb);
    flex-flow: column;
    overflow: auto;
}

.layers>div {
    flex: auto;
    padding: 20rem 30rem;
}

.title {
    font-size: 35rem;
    padding: 10rem 0;
    font-weight: 600;
}

.divBox {
    display: flex;
    flex-flow: wrap;
}

.divBox .vanBtn {
    margin: 5rem 5rem;
}
</style>