<!-- 多语言 -->
<template>
    <div class="page-lang">
        <Top :bgColor="'#20222c'" :color="'#fff'" :title="_t('90')" />

        <div class="nav" @click="switchLanguage(item)" v-for="(item, i) in langs" :key="i">
            <van-icon class="icon" name="guide-o" />
            <div class="name">{{ item.name }}</div>
        </div>

    </div>
</template>

<script setup>
import Top from '@/components/Top.vue'
import { _t } from '@/utils/utils'
import router from '@/router'
import i18n from '@/lang'

const langs = [
    { name: '中文', val: 'zh' },
    { name: 'English', val: 'en' },
    { name: 'Việt Nam', val: 'vi' },
    { name: 'ไทย', val: 'th' },
    { name: 'Melayu', val: 'ms' },
]

const switchLanguage = item => {
    i18n.global.locale = item.val
    router.back()
    localStorage.setItem('lang', item.val)
}

</script>

<style lang="less" scoped>
.page-lang {
    padding-top: 13vw;

    .nav {
        display: flex;
        align-items: center;
        padding: 4vw;
        margin: 1px 4vw;
        background-color: #20222c;
        align-items: center;
        justify-content: space-between;
        .name {
            font-size: 3.7vw;
            color: #fff;
            flex: 1;
            margin: 0 3vw;
        }
        .icon {
            color: #4677d7;
            font-size: 4vw;
        }
    }

    .loginout {
        position: fixed;
        bottom: 0;
        left: 0;
        height: 15vw;
        background-color: #0f1118;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        .btn {
            width: 92vw;
            height: 10vw;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #4677d7;
            border: 1px solid #4677d7;
            border-radius: 1vw;
            font-size: 3.7vw;
        }
    }
}
</style>