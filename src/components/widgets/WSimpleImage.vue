<template>
    <div class="image_container">
        <img :src="getImagePath" alt="Картинки нет">
    </div>
    <button @click="openPropertyModal(true, index)">Настроить виджет</button>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
    emits: ['openModal'],
    props: ['index'],
    setup(props, {emit}) {
        const imagePath = ref('patrick.jpg');
        const isOpen = ref(false)
        const store = useStore()
        const index = ref(props.index)

        const getImagePath = computed(() => {
            console.log('@/assets/img/' + imagePath.value)
            return ('@/assets/img/' + imagePath.value)
        })

        //=======================================//

        const openPropertyModal = (value: boolean, index: number) => {
            store.commit('changeFlag', {index: index, value: value})
        }

        const onClosePropertyModal = (value: boolean) => {
            isOpen.value = value
        }

        //=======================================//

        return { store, imagePath, getImagePath, onClosePropertyModal, openPropertyModal }
    }
})
</script>

<style lang="scss" scoped>
    $modalwindow-maincolor: #5A8AB8;
    $modalwindow-secondcolor: #9CC2E6;
    $modalwindow-textcolor: #749DC3;

    .image_container {
        display: block;
        margin: 0 auto;
        width: 300px;
        height: 80%;
        img {
            display: block;
            width: 300px;
            height: 300px;
            z-index: 999;
            margin: 0 auto;
            margin-top: 40px;
        }
    }
    button {
        margin-top: 20px;
        display: inline-block;
        width: 30%;
        font-weight: 400;
        font-size: 12px;
        letter-spacing: 1px;
        text-transform: uppercase;
        padding-top: 10px;
        padding-bottom: 10px;
        color: rgba(255,255,255,.9);
        background: linear-gradient(45deg, $modalwindow-maincolor 0%, #578cc9 100%);
        outline: none;
        border-radius: 5px;
        border: 0;
        box-shadow: inset rgba(255,255,255,.5) 1px 1px;
        margin: 0 auto;
        &:hover {
            background: linear-gradient(45deg, $modalwindow-maincolor 10%, #4482c9 100%);
        }
    }
</style>
