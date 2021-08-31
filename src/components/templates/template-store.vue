<template>
    <div class="main_container">
        <component :holders="wplaceholders" :is="templatesName" :workspace_id="id"></component>
    </div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import Template2x2 from './template-2x2.vue'
import Template2x1 from './template-2x1.vue'
import { useStore } from 'vuex'
import axios from 'axios'

export default defineComponent({
    props: ['id'],
    components: {
        Template2x1, Template2x2
    },
    setup(props) {
        const store = useStore()
        const id = ref(props.id)
        const templatesName = ref('')
        const wplaceholders = ref([])
        const templateId = ref(null)
        
        onMounted(() => {
            axios.get(`/back/workspace/${id.value}`).then(response => {
                //получить все wp для ws, потом передать в component
                axios.get(`/back/template/${response.data.templateId}`).then(res => {
                    templatesName.value = res.data.component
                    templateId.value = res.data.templateId
                })
            })

            axios.get('/back/wplaceholder').then(res => {
                res.data.content.forEach(item => {
                    if(item.workspaceId == id.value) {
                        wplaceholders.value.push(item)
                    }
                })
                store.commit('updateWplaceholders', wplaceholders)
                console.log(store.state.wplaceholders)
            })
        })

        return { store, templatesName, wplaceholders }
    }
    
})
</script>

<style scoped lang="scss">
$templatestore-maincolor: #5A8AB8;
$templatestore-secondcolor: #9CC2E6;
$templatestore-textcolor: #749DC3;

.main_container {
    width: 80%;
    position: absolute;
    height: 90%;
    margin-left: -15px;
    margin-top: 33px;
    font-size: 28px;
    padding: 0 10px;
    color: $templatestore-textcolor;
    font-weight: 500;
}



</style>
