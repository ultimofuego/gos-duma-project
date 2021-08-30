<template>
    <div class="main-container">
        <div class="background">
            <div class="btn-container">
                <span>Добавить пространство</span>
                <button @click="showModal">+</button>
            </div>
            <ul
                class="list-of-spaces"
                v-if="$store.state.workspaces.length != 0"
            >
                <li
                    v-for="(workspace, index) in $store.state.workspaces"
                    :key="workspace.id"
                >
                    <a @click="routeMeTo(workspace.id)">{{workspace.name}}</a>
                    <button class="btn" @click="removeWorkspace({id: workspace.id, idx: index})">x</button>
                </li>
            </ul>
            <div v-else><p>Пространств нет</p></div>
        </div>
    </div>
    <modal-window v-if="show" @closeModal="close"></modal-window>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import ModalWindow from './modal-window.vue'
import router from '@/router/index'
import axios from 'axios'

export default defineComponent({
    components: {
        ModalWindow
    },
    setup() {
        const show = ref(false)
        const store = useStore()
        const templatesName = ref('')

        onMounted(() => {
            store.dispatch('fetchWorkspaces')
            store.dispatch('fetchTemplates')
       
            axios.get('back/widget').then(res => store.commit('addWidget', res.data.content))
        })

        const routeMeTo = (workspace_id: string) => {
            console.log(workspace_id)
            router.push({
                name: 'template-store',
                path: `/${workspace_id}`,
                params: { id: workspace_id }
            })
        }

        const removeWorkspace = (obj: Record<string,unknown>) => {
            store.dispatch('removeWorkspace', obj)
        }

        const close = (val: boolean) => {
            show.value = val
        }
        const showModal = () => {
            show.value = true
        }

        return {
            templatesName, show, store, close, showModal, removeWorkspace, routeMeTo
        }
    },
})
</script>

<style scoped lang="scss">
    $admin-maincolor: #5A8AB8;
    $admin-secondcolor: #9CC2E6;
    $admin-textcolor: #749DC3;

    .main-container {
        width: 80%;
        position: absolute;
        height: 90%;
        margin-left: -10px;
        margin-top: 20px;
        font-size: 28px;
        padding: 0 10px;
        color: $admin-textcolor;
        font-weight: 500;
        .btn-container {
            font-size: 20px;
            display: flex;
            align-items: center;
            color: $admin-textcolor;
            margin-bottom: 20px;
            span {
                padding-right: 20px;
            }
            button {
                cursor: pointer;
                display: block;
                background-image: linear-gradient(45deg, $admin-maincolor 0%, #D7EDE1 100%);
                height: 28px;
                width: 28px;
                outline: 0;
                color: #fff;
                border-radius: 100%;
                border: 0;
                font-size: 20px;
                line-height: 1px;
                font-weight: 400;
                &:hover {
                    color: rgb(255,255,255);
                    background-image: linear-gradient(45deg, $admin-maincolor 20%, #D7EDE1 100%);
                }
            }
        }

        .background {
            border-radius: 10px;
            background-color: lighten($admin-secondcolor, 20%);
            margin-right: -20px;
            margin-top: 20px;
            padding-top: 20px;
            padding-left: 40px;
            height: 90%;
            display: inline-block;
            flex-direction: column;
            min-width: 100%;
            font-size: 20px;
            .list-of-spaces {
                border-radius: 10px;
                padding: 40px;
                background-color: white;
                font-size: 20px;
                list-style: none;
                font-weight: 400;
                display: inline-block;
                vertical-align: center;
                li {
                position: relative;
                padding-bottom: 14px;
                padding-right: 50px;
                display: flex;
                align-items: center;
                &:before {
                    display: block;
                    content: '';
                    background: #5486D1;
                    width: 10px;
                    height: 10px;
                    border-radius: 10px;
                    margin-right: 20px;
                    }
                }

                a {
                    text-decoration: none;
                    cursor: pointer;
                    &:visited {
                        color: rgb(36, 36, 36);
                    }
                    &:hover {
                        color: darken($admin-textcolor, 20%);
                    }
                }
            }
        }
    }

    .btn {
        position: absolute;
        right: 0;
        border: 0;
        cursor: pointer;
        display: block;
        background-color: lighten($admin-maincolor, 5%);
        height: 20px;
        width: 20px;
        outline: 0;
        color: #fff;
        border-radius: 100%;
        font-size: 10px;
        line-height: 2px;
        font-weight: 400;
    }
</style>
