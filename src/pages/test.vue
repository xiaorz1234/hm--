<template>
  <div class="test">
    <vueCropper
      ref="cropper"
      :img="option.img"
      :info="option.info"
      :autoCropWidth="option.autoCropWidth"
      :autoCropHeight="option.autoCropHeight"
      :autoCrop="option.autoCrop"
    ></vueCropper>
    <van-button round type="danger" class="danger">取消</van-button>
    <van-button round type="info" class="info" @click="clip">确定</van-button>
  </div>
</template>

<script>
import { VueCropper } from 'vue-cropper'
import img from '../images/01.jpg'
export default {
  components: {
    VueCropper
  },
  data () {
    return {
      option: {
        img: img, // 这个img应该要是上传的那张图片，只不过现在我写死了
        info: true, // 裁剪框的大小信息
        autoCropWidth: 200, // 默认生成截图框宽度
        autoCropHeight: 200, // 默认生成截图框高度
        autoCrop: true // 是否默认生成截图框
      }
    }
  },
  methods: {
    clip () {
      console.log('我要裁剪图片了')
      this.$refs.cropper.getCropData(data => {
        console.log(data)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.test {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 999;
  .van-button {
    bottom: 50px;
  }
  .info {
    position: absolute;
    left: 60%;
  }
  .danger {
    position: absolute;
    right: 60%;
  }
}
</style>
