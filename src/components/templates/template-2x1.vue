<template>
    <div class="grid2x2">
        <div class="box box1">
            <component :is="widgetName[0]" index="0"></component>
            <dropdown :code="'left'" :space_id="id" :selectOption="onSelectedOption"></dropdown>
            <property-modal v-if="$store.state.flag[0]" idx="0" :widgetName="widgetName[0]" :wplaceholderId="wplaceholderId[0]"></property-modal>
        </div>
        <div class="box box2">
            <dropdown :code="'right'" :space_id="id" :selectOption="onSelectedOption"></dropdown>
            <component :is="widgetName[1]" index="1"></component>
            <property-modal v-if="$store.state.flag[1]" idx="1" :widgetName="widgetName[1]" :wplaceholderId="wplaceholderId[1]"></property-modal>
        </div>
    </div>
    
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import Dropdown from '../AdminPageComponents/dropdown.vue'
import axios from 'axios'

import Red from '@/components/widgets/red.vue'
import WSimpleImage from '@/components/widgets/WSimpleImage.vue'
import PropertyModal from '../modal-windows/property-modal.vue'

export default defineComponent({
    name: 'template-2x2',
    components: { Dropdown, Red, WSimpleImage, PropertyModal },
    props: ['workspace_id', 'holders'],
    setup(props) {
        const id = ref(props.workspace_id)
        const store = useStore()
        const widgetName = ref(['', '']) as any
        const wplaceholderId = ref([null, null]) as any

        onMounted(() => {
            const tempWidgetIds = ref([]) as any
            const tempWplaceholderIds = ref([]) as any
            axios.get('/back/wplaceholder').then(res => {
                res.data.content.forEach((holder:any, index:number) => {
                    if(holder.workspaceId == id.value) {
                        tempWplaceholderIds.value[index] = holder.id
                        if(holder.code == "left") {
                            axios.get(`/back/widget/${holder.widgetId}`).then(response => {
                            tempWidgetIds.value[0] = response.data.component
                            })
                        } else if(holder.code == "right") {
                            axios.get(`/back/widget/${holder.widgetId}`).then(response => {
                            tempWidgetIds.value[1] = response.data.component
                            })
                        }
                    }
                })
            })
            widgetName.value = tempWidgetIds.value
            wplaceholderId.value = tempWplaceholderIds.value
        })

        const onSelectedOption = (widget_component: string, widget_id: number, code: string) => {
            const wplaceholders = store.state.wplaceholders.filter(item => {
                return item.code == code
            })
            wplaceholders[0].widgetId = widget_id
            axios.put('/back/wplaceholder', wplaceholders[0]).then(res => {
                if(res.data.code === "left") {
                    widgetName.value[0] = widget_component
                } else if(res.data.code === "right") {
                    widgetName.value[1] = widget_component
                }
            })
        }

        return { id, widgetName, wplaceholderId, onSelectedOption }
    }
})
</script>

<style scoped lang="scss">
    .grid2x2 {
        min-height: 100%;
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        min-height: 600px;

        & > div {
            display: flex; 
            flex-basis: calc(50% - 10px);  
            justify-content: center;
            flex-direction: column;

            & > div {
                display: flex;
                justify-content: center;
                flex-direction: row;
            }
        }

        .box { position: relative; margin: 5px; border-radius: 10px; }
        .box1 { background: linear-gradient(#9dc7e7, #74afdd 50%, #6d96b8); }
        .box2 { background: linear-gradient(#9dc7e7, #74afdd 50%, #6d96b8); }
        .box3 { background: linear-gradient(#9dc7e7, #74afdd 50%, #6d96b8); }
        .box4 { background: linear-gradient(#9dc7e7, #74afdd 50%, #6d96b8); }
    }

    
</style>
