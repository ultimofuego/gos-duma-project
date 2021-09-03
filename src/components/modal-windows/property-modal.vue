<template>
    <div class="modal-mask">
        <div class="modal-wrapper">
            <div class="modal-container">
                <div class="modal-header">
                    <h3>Окно настройки виджета {{widgetName}}</h3>
                    <button class="closeBtn" @click="closeModal(idx, false)">x</button>
                </div>
                <div class="modal-body">
                    <div v-for="(property) in $store.state.propertyList" :key="property.id">
                        <p>{{property.name}}</p>
                        <input type="text" v-model="property.value">
                        <button @click="submitProperty(property.id, property.value)">Сохранить</button>
                    </div>
                </div>
                <div class="modal-footer">
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import axios from 'axios'

export default defineComponent({
    props: ['idx', 'widgetName', 'wplaceholderId'],
    setup(props) {
        const store = useStore()
        const index = ref(props.idx)
        const wplaceholderId = ref(props.wplaceholderId)
        const widgetName = ref(props.widgetName)

        const closeModal = (idx: number) => {
            store.commit('changeFlag', {index: idx, value: false})
        }

        onMounted(() => {
            axios.get('/back/widget').then(res => {
                res.data.content.forEach((widget: any) => {
                    if(widget.component == widgetName.value) {
                        const id = widget.id
                        axios.get('/back/widgetproperty').then(res => {
                            const properties = [] as any
                            res.data.content.forEach((property: any) => {
                                if(property.widgetId == id) {
                                    properties.push(property)
                                }
                                store.commit('updatePropertyList', properties)
                            })
                        })
                    }
                })
            })
            console.log(store.state.propertyList)
        })

        const submitProperty = (item: any, value: any) => {
            console.log("Wplaceholder: ", wplaceholderId.value, "Id: ", item)
            const wsettings = reactive({
                id: null,
                wplaceholderId: wplaceholderId.value,
                propertyId: item,
                value: value
            })
            axios.post('/back/wsettings', wsettings).then(res => {
                console.log(res.data.content)
            })

        }

        return { store, closeModal, submitProperty }
    }
})
</script>

<style lang="scss" scoped>
$modalwindow-maincolor: #5A8AB8;
$modalwindow-secondcolor: #9CC2E6;
$modalwindow-textcolor: #749DC3;

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s ease;
}

.modal-container {
  width: 900px;
  margin: 40% auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
  font-size: 18px;
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;        
}

.modal-header h3 {
  margin-top: 0;
}

.modal-body {
  margin: 20px 0;
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
    
    .table-container {
        display: flex;
        background-color: #dae8f5;
        p {
            margin-right: 20px;
        }
    }
</style>