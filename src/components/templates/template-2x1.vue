<template>
    <div class="grid2x2">
        <div class="box box1">
            <dropdown :code="'left_window'" :space_id="id" :selectOption="onSelectedOption"></dropdown>
        </div>
        <div class="box box2">
            <dropdown :code="'right_window'" :space_id="id" :selectOption="onSelectedOption"></dropdown>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref} from 'vue'
import { useStore } from 'vuex'
import Dropdown from '../AdminPageComponents/dropdown.vue'

export default defineComponent({
    name: 'template-2x2',
    components: { Dropdown },
    props: ['workspace_id', 'holders'],
    setup(props) {
        const component_name = ref('')
        const id = ref(props.workspace_id)
        //const store = useStore()
        //const wplaceholders = ref(props.holders)

        const onSelectedOption = (widget_id: number, code: string) => {
            console.log(widget_id, " ", code)
            /*wplaceholders.value.workspaceId = id.value
            wplaceholders.value.widgetId = widget_id
            wplaceholders.value.id = wplaceholder_id

            store.dispatch('fetchWplaceholders').then(response => {
                store.commit('updateWplaceholders', response.data.content)
                console.log(store.state.wplaceholders)
            })

            store.dispatch('pushToDB_wplaceholders', wplaceholders.value).then(response => {
                console.log(response.data)
            })*/

        }

        return { component_name, id, onSelectedOption }
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
