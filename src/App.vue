<template>
    <div>
        <router-view v-slot="{ Component }">
            <keep-alive :include="['Home']">
                <component :is="Component" />
            </keep-alive>
        </router-view>
        <van-config-provider :theme="layersData.theme.color"></van-config-provider>
    </div>
</template>

<script setup>
import useLayersStore from '@/store/layersStore';

const layersData = useLayersStore();
</script>

<style scoped></style>