import { ref } from "vue"

export default function cropperInitFun(){
    const previews = ref({})
    const uploadLoading = ref(false)
    const imgLoad = function(){
        uploadLoading.value = false
    }
    const realTime = function(data){
        previews.value = data
    }
    return {
        previews,
        uploadLoading,
        imgLoad,
        realTime
    }
}