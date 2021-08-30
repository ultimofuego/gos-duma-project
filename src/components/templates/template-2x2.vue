<template>
    <div class="grid2x2">
        <div class="box box1">
            <dropdown index="0"></dropdown>
        </div>
        <div class="box box2">
            <dropdown index="1"></dropdown>
        </div>
        <div class="box box3">
            <dropdown index="2"></dropdown>
        </div>
        <div class="box box4">
            <dropdown index="3"></dropdown>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent} from 'vue'
import Dropdown from '../AdminPageComponents/dropdown.vue'


export default defineComponent({
    name: 'template-2x2',
    components: { Dropdown },
    setup() {

        /*const placeholders = ref([])
        const store = useStore()
        const widgets : Widget[] = []

        onMounted(() => {
            getItem('widget').then((response: ResponseData) => {
                widgets.push(response.data)
            })
        })

        const flagComponentName = (index: number) => {
            if(typeof store.getters.all_workspaces[store.getters.all_list_items[0]].placeholders[index].component == "undefined") {
                return false
            }
            else { return true }
        }

        const getComponentName = (index: number) => {
            return store.getters.all_workspaces[store.getters.all_list_items[0]].placeholders[index].component
        }
    
        return {
            placeholders, store, getComponentName, flagComponentName
        }*/
    }
})
</script>

<style scoped lang="scss">
    $template-maincolor: #E89E58;
    $template-secondcolor: #EBA96C;
    $template-textcolor: #749DC3;

    .grid2x2 {
        min-height: 100%;
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        height: 1200px;

        & > div {
            display: flex; 
            flex-basis: calc(50% - 150px);  
            justify-content: center;
            flex-direction: column;

            & > div {
                display: flex;
                justify-content: center;
                flex-direction: row;
            }
        }

        .box { position: relative; margin: 5px; border-radius: 10px; }
        .box1 { background: linear-gradient(0deg, $template-maincolor, $template-secondcolor 50%); }
        .box2 { background: linear-gradient(0deg, $template-maincolor, $template-secondcolor 50%); }
        .box3 { background: linear-gradient(0deg, $template-maincolor, $template-secondcolor 50%); }
        .box4 { background: linear-gradient(0deg, $template-maincolor, $template-secondcolor 50%); }
    }

    
</style>
