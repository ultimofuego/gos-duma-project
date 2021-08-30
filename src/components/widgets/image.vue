<template>
    <div class="container">
        <img :src="currentUrl" alt="">
        <input type="text" v-model="currentUrl">
        <button @click="addUrl">Add</button>
    </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
    props: ['url', 'index'],
    setup(props) {
        const currentUrl = ref('')
        const store = useStore()
        const idx = ref(props.index)

        const addUrl = () => {
            const rv = store.getters.all_workspaces[store.getters.all_list_items[0]].placeholders[idx].properties[0]
            console.log(rv)
            store.commit('updateWorkspaces', store.getters.all_workspaces[store.getters.all_list_items[0]].placeholders[idx].properties[0].url = currentUrl)
        }

        return { currentUrl, store, addUrl }
    },
})
</script>

<style scoped lang="scss">

img {
    width: 200px;
    margin: 0 auto;
    padding-bottom: 50px;
}

</style>
