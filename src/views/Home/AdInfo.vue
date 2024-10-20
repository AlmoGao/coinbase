<!-- 广告详情 -->
 <template>
    <div class="page-adinfo">
        <Top :bgColor="'#20222c'" :color="'#fff'" :title="title" />
        <div class="content" v-html="content"></div>
    </div>
 </template>

<script setup>
import Top from '@/components/Top.vue';
import { useRoute } from 'vue-router';
import {ref} from "vue"

const route = useRoute()
const title = ref(route.query.name)
const content = ref('')
try {
    content.value = localStorage.getItem('description')
} catch {
    content.value = ''
}
console.error(content.value)
</script>

<style lang="less">
.page-adinfo {
    padding-top: 12vw;
    min-height: 100vh;
    background-color: #111723;
    color: #fff;
    .content {
        padding: 0 2vw 2vw 2vw;
        img {
            max-width: 100%!important;
        }
    }
}
</style>