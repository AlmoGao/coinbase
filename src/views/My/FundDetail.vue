<!-- 基金明细 -->
<template>
    <div class="page-funddetail">
        <Top :bgColor="'#20222c'" :color="'#fff'" :title="_t('77')" />
        <div class="page-tabs">
            <div class="page-tab active-tab">{{ _t('78') }}</div>
            <div class="page-tab">{{ _t('79') }}</div>
            <div class="page-tab">{{ _t('80') }}</div>
        </div>
        <div class="list">

            <div class="nodata">{{ _t('81') }}</div>
        </div>
    </div>
</template>

<script setup>
import Top from '@/components/Top.vue';
import { _t } from '@/utils/utils'
</script>

<style lang="less" scoped>
.page-funddetail {
    height: 100vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    padding-top: 10vw;
    .page-tabs {
        background-color: #20222c;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 15vw;
        height: 10vw;
        .page-tab {
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 3.7vw;
        }
        .active-tab {
            color: #4677d7;
            border-bottom: 1px solid #4677d7;
        }
    }
    .list {
        flex: 1;
        overflow-y: auto;
        .nodata {
            line-height: 100vw;
            text-align: center;
        }
    }
}
</style>