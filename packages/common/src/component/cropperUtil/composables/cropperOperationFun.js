import { reactive,ref } from "vue";
export default function cropperOperationFun(emit,uploadLoading){
    const option = reactive({
        img: '',             //裁剪图片的地址
        outputSize: 1,       //裁剪生成图片的质量(可选0.1 - 1)
        outputType: 'jpeg',  //裁剪生成图片的格式（jpeg || png || webp）
        info: true,          //图片大小信息
        canScale: true,      //图片是否允许滚轮缩放
        autoCrop: true,      //是否默认生成截图框
        autoCropWidth: 280,  //默认生成截图框宽度
        autoCropHeight: 160, //默认生成截图框高度
        fixed: true,         //是否开启截图框宽高固定比例
        fixedNumber: [7, 4], //截图框的宽高比例
        full: true,         //false按原比例裁切图片，不失真
        fixedBox: true,      //固定截图框大小，不允许改变
        canMove: false,      //上传图片是否可以移动
        canMoveBox: true,    //截图框能否拖动
        original: false,     //上传图片按照原始比例渲染
        centerBox: false,    //截图框是否被限制在图片里面
        height: true,        //是否按照设备的dpr 输出等比例图片
        infoTrue: false,     //true为展示真实输出图片宽高，false展示看到的截图框宽高
        maxImgSize: 3000,    //限制图片最大宽度和高度
        enlarge: 1,          //图片根据截图框输出比例倍数
        mode: '280px 160px'  //图片默认渲染方式
    })
    const chooseImageType = ref('jpeg')
    const cropperInstance = ref(null) // 用于标识cropper组件实例  vue2.x 中的ref
    const uploadsFileInstall = ref(null) // 用于标识 file控件的 ref属性
    // 图片缩放
    const changeScale = function(num){
        num = num || 1
        cropperInstance.value.changeScale(num)
    }
    // 向左旋转
    const rotateLeft = function(){
        cropperInstance.value.rotateLeft()
    }
    // 向右旋转
    const rotateRight = function(){
        cropperInstance.value.rotateRight()
    }
    // 选择图片
    const selectImg = function(e){
        if(!e.target.files.length) return
        if (!/\.(jpg|jpeg|png|JPG|PNG)$/.test(e.target.value)) {
            alert('图片类型要求：jpeg、jpg、png')
            return false
        }
        let file = e.target.files[0]
        let strArr = file.name.split('.')
        chooseImageType.value = strArr[strArr.length-1]
        let reader = new FileReader()
        reader.onload = (e) => {
            let data
            if (typeof e.target.result === 'object') {
            data = window.URL.createObjectURL(new Blob([e.target.result]))
            } else {
            data = e.target.result
            }
            option.img = data
        }
        //转化为base64
        reader.readAsDataURL(file)
    }
    // 上传图片
    const uploadImg = function(type){
        if(type !== 'blob') return
        cropperInstance.value.getCropBlob(async (data)=>{
          // let formData = new FormData();
          // formData.append('file_data',data,`DX.${chooseImageType.value}`)
          // //调用axios上传   将请求地址改为自己图片上传的地址
          // uploadLoading.value = true
          // let res = await axios({method:'post',url:'http://localhost:8888/uploadCosFile',data:formData,headers:{'Content-Type':'multipart/form-data'}})
          // if(res.code === 0) {
          //     alert('上传成功!') // 此处可以换成  UI库内的提示
          //     emit('uploadImgSuccess',res.data)
          // }else{
          //     alert('文件服务异常，请联系管理员!') // 此处可以换成  UI库内的提示
          // }
            let reader = new FileReader();
            reader.readAsDataURL(data);
            reader.onload = function (e) {
                // console.log(e.target.result);
                emit('uploadImgSuccess',e.target.result)
            }
        })
    }
    return {
        option,
        chooseImageType,
        cropperInstance,
        uploadsFileInstall,
        changeScale,
        rotateLeft,
        rotateRight,
        selectImg,
        uploadImg
    }
}
