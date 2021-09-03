<template>
    <div class="dropdown">
        <button class="btn" type="button" @click="toggleDropdown(indexOfDropdown)">
            Добавить виджет
        </button>
        <div v-if="isOpen[indexOfDropdown]" class="dropdown-menu">
            <button
            class="dropdown-item"
            type="button"
            v-for="(widget, index) in store.state.widgets"
            :key="index"
            @click="onOptionClick(widget.component ,widget.id, code)">
                {{widget.name}}
            </button>
        </div>
    </div>
</template>

<script>
import { defineComponent, onMounted, reactive } from 'vue'
import { ref } from 'vue'
import { useStore } from 'vuex'
import axios from 'axios'

export default defineComponent({
    name: 'dropdown',
    props: {
        id: {
            type: Number,
            defalut: 0
        },
        wplaceholder_id: {
            type: Number,
            default: 0
        },
        code: {
            type: String,
            default: ''
        },
        selectOption: {
            type: Function,
            default: function() {
                return
            }
        }
    },
    setup(props) {
        const indexOfDropdown = ref(props.id)
        const code = ref(props.code)
        const isOpen = ref([false, false, false, false])
        const store = useStore()

        onMounted(() => {
            axios.get('back/widget').then(res => {
                store.commit('updateWidgets', res.data.content)
            })
        })

        const toggleDropdown = (index) => {
            isOpen.value[index] = !isOpen.value[index]
        }

        const onOptionClick = (widget_component ,widget_id, code) => {
            props.selectOption(widget_component ,widget_id, code)
        }

        return {
            indexOfDropdown, isOpen, store, toggleDropdown, onOptionClick
        }
    }
})
</script>

<style scoped lang="scss">
    .btn {
        display: block;
        width: 30px;
        height: 30px;
        font-size: 10px;
        min-width: 150px;
        border-radius: 5px;
        border: none;
        position: absolute;
        top: 10px;
        left: 10px;

        &:hover {
            background-color: rgb(219, 217, 217);
        }
    }

    .dropdown-menu {
        font-size: 10px;
        display: flex;
        flex-direction: column;
        position: absolute;
        background-color: #fff;
        width: 21%;
        margin-top: 1px;
        box-shadow: 0 1px 2px rgb(204,204,204);
        border-radius: 10px;
        overflow: hidden;
        max-height: 144px;
        overflow-y: auto;
        z-index: 1;
        top: 50px;
        left: 10px;
        

        .dropdown-item {
            padding: 10px;
            transition: all .2s ease-in-out;
            cursor: pointer;
            border: 0;
            &:hover {
                background: rgb(212, 212, 212);
            }
        }
    }
</style>
