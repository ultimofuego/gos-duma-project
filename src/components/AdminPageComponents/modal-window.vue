<template>
    <div class="modal-backdrop" @click.self="closeModal">
        <div class="modal">
            <slot name="header" class="header">
                <button class="closeBtn" @click="closeModal">x</button>
            </slot>
            <slot name="body">
                <form class="modalForm" @submit.prevent="addSpaceName">
                    <label>Введите название пространства</label>
                    <input type="string" v-model="workspace.name" placeholder="Workspace name" required>
                    <label>Выберите шаблон</label>
                    <select v-model="template_name">
                        <option v-for="(template,index) in $store.state.template" :key="index">{{template.name}}</option>
                    </select>
                    <button type="submit" class="addBtn">Добавить</button>
                </form>
            </slot>
            <slot name="footer">
            </slot>
        </div>
    </div>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
    name: 'modal-window',
    emits: ['closeModal'],
    setup(props, {emit}) {

        const workspace = reactive({
            name: '',
            templateId: '',
            id: ''
        })
        const template_name = ref('')
        const store = useStore()

        const addSpaceName = () => {
            store.state.template.forEach((item) => {
                if(item.name == template_name.value) {
                    workspace.templateId = item.id
                    store.dispatch('pushToDB', workspace)
                }
            })
            closeModal()
        }
    
        const closeModal = () => {
            emit('closeModal', false);
        }

        return {
            workspace,
            template_name,
            all_list_items: store.getters.all_list_items,
            all_workspaces: store.getters.all_workspaces,
            addSpaceName,
            closeModal
        }

    }
})
</script>

<style scoped lang="scss">
    $modalwindow-maincolor: #5A8AB8;
    $modalwindow-secondcolor: #9CC2E6;
    $modalwindow-textcolor: #749DC3;

    .modal-backdrop {
        background: rgba(0, 0, 0, 0.567);
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        right: 0;
        left: 0;
        top: 0;
        bottom: 0;
        z-index: 10;
        .modal {
            padding: 16px;
            position: fixed;
            width: 500px;
            background: rgb(230, 230, 230);
            border-radius: 10px;
            color: $modalwindow-textcolor;
            font-weight: 500;
            .header { 
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
        }
    }

    .modalForm {
        font-size: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 100%;
        label {
            margin-bottom: 20px;
        }
        input {
            width: 80%;
            margin-bottom: 20px;
            border-radius: 10px;
            padding-left: 10px;
            border: 1px solid $modalwindow-maincolor;
            outline-color: $modalwindow-maincolor;
            font-weight: 300;
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
            background: linear-gradient(45deg, $modalwindow-maincolor 0%, #D7EDE1 100%);
            outline: none;
            border-radius: 20px;
            border: 0;
            box-shadow: inset rgba(255,255,255,.5) 1px 1px;
            &:hover {
                background: linear-gradient(45deg, $modalwindow-maincolor 20%, #D7EDE1 100%);
            }
        }
    }

    .closeBtn {
        cursor: pointer;
        display: block;
        background-color: lighten($modalwindow-maincolor, 5%);
        height: 25px;
        width: 25px;
        outline: 0;
        color: #fff;
        border-radius: 100%;
        border: 0;
        font-size: 12px;
        line-height: 2px;
        font-weight: 400;
        &:hover {
            background: $modalwindow-maincolor;
        }
    }

    select {
        font-weight: 200;
        border: 1px solid $modalwindow-maincolor;
        outline-color: $modalwindow-maincolor;
        background-color: #fff;
        border-radius: 10px;
        padding: 2px 5px;
        option {
            font-weight: 200;
        }
    }

</style>
