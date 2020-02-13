
<template>
  <div class="editPersonage">
    <hm-header>编辑资料</hm-header>
    <div class="imgavatar">
      <img :src="avatar" alt />
      <van-uploader :after-read="afterRead" />
    </div>
    <div class="list">
      <hm-nav name="昵称" :desc="personage.nickname" @click="editNickname"></hm-nav>
      <hm-nav name="密码" desc="******" @click="editPassword"></hm-nav>
      <hm-nav name="性别" :desc="personage.gender === 1 ? '男':'女'" @click="editshowgender"></hm-nav>
    </div>
    <van-dialog v-model="showname" title="修改昵称" show-cancel-button @confirm="editname">
      <van-field v-model="nickname" />
    </van-dialog>
    <van-dialog v-model="showpassword" title="修改密码" show-cancel-button @confirm="editpass">
      <van-field v-model="password" />
    </van-dialog>
    <van-dialog v-model="showgender" title="修改性别" show-cancel-button @confirm="editgender">
      <van-radio-group v-model="gender">
        <van-cell-group>
          <van-cell title="男" clickable @click="gender =1">
            <van-radio slot="right-icon" :name="1" />
          </van-cell>
          <van-cell title="女" clickable @click="gender = 0">
            <van-radio slot="right-icon" :name="0" />
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </van-dialog>
    <div class="mask" v-show="isShowMask">
      <vueCropper
        ref="cropper"
        :img="option.imga"
        :info="option.info"
        :autoCropWidth="option.autoCropWidth"
        :autoCropHeight="option.autoCropHeight"
        :autoCrop="option.autoCrop"
      ></vueCropper>
      <van-button round type="danger" class="danger" @click="off">取消</van-button>
      <van-button round type="info" class="info" @click="clip">确定</van-button>
    </div>
    <van-loading type="spinner" v-show="isShow" class="loading" color="#1989fa" />
  </div>
</template>

<script>
import img from '../images/01.jpg'
import { VueCropper } from 'vue-cropper'
export default {
  components: {
    VueCropper
  },
  data () {
    return {
      personage: {},

      showname: false,
      nickname: '',

      showpassword: false,
      password: '',

      showgender: false,
      gender: '',

      option: {
        imga: '', // 这个img应该要是上传的那张图片，只不过现在我写死了
        info: true, // 裁剪框的大小信息
        autoCropWidth: 200, // 默认生成截图框宽度
        autoCropHeight: 200, // 默认生成截图框高度
        autoCrop: true // 是否默认生成截图框
      },
      isShowMask: false,
      isShow: false
    }
  },
  computed: {
    avatar () {
      if (this.personage.head_img) {
        return this.$axios.defaults.baseURL + this.personage.head_img
      } else {
        return img
      }
    }
  },
  created () {
    this.getPersonage()
  },

  methods: {
    // 获取个人信息
    async getPersonage () {
      const userId = localStorage.getItem('user_id')
      const res = await this.$axios.get(`/user/${userId}`)
      this.personage = res.data.data
    },
    // 编辑个人信息
    async editPersonage (data) {
      const id = localStorage.getItem('user_id')
      const res = await this.$axios.post(`/user_update/${id}`, data)
      // console.log(res.data.data)
      this.personage = res.data.data
      if (res.data.statusCode === 200) {
        // this.$toast.success(res.data.message)
        this.getPersonage()
      }
    },
    // 点击显示修改昵称弹框(回显)
    editNickname () {
      this.showname = true
      this.nickname = this.personage.nickname
    },
    // 确认修改昵称弹框
    editname () {
      this.editPersonage({ nickname: this.nickname })
    },
    // 点击显示修改密码弹框(回显)
    editPassword () {
      this.showpassword = true
      this.password = this.personage.password
    },
    // 确认修改密码弹框
    editpass () {
      // console.log(this.password)
      this.editPersonage({ password: this.password })
    },
    // 点击显示性别弹框(回显)
    editshowgender () {
      this.showgender = true
      this.gender = this.personage.gender
    },
    // 确认修改性别弹框
    editgender () {
      // console.log(this.password)
      this.editPersonage({ gender: this.gender })
    },
    // -------------------------------------------------------------
    async afterRead (file) {
      // 此时可以自行将文件上传至服务器
      // console.log(file)
      // console.log(file.file)
      this.isShowMask = true
      this.option.imga = file.content
    },
    // 确定
    clip () {
      // console.log('我要裁剪图片了')
      this.$refs.cropper.getCropData(async imgdata => {
        // console.log(imgdata)

        // 校验
        // if (file.file.size / 1024 >= 20) {
        //   this.$toast('上传的图片超过了20k')
        //   return
        // }
        // if (file.file.type !== 'image/jpeg') {
        //   this.$toast('必须上传jpg图片哟')
        //   return
        // }
        const file = this.convertBase64UrlToBlob(imgdata)

        const fd = new FormData()
        fd.append('file', file)
        const res = await this.$axios.post('/upload', fd)

        if (res.data.statusCode === 200) {
          this.editPersonage({ head_img: res.data.data.url })
        }
        this.isShowMask = false
        this.getPersonage()
      })
    },
    // -------------------------------------------------------------
    // async afterRead (file) {
    //   // 此时可以自行将文件上传至服务器
    //   // console.log(file)
    //   // console.log(file.file)
    //   this.isShowMask = true
    //   this.option.imga = file.content
    //   await this.clip()
    //   this.isShow = true
    //   await this.getPersonage()
    //   // this.isShow = false
    // },
    // // 确定
    // clip () {
    //   // console.log('我要裁剪图片了')
    //   this.$refs.cropper.getCropData(async imgdata => {
    //     const file = this.convertBase64UrlToBlob(imgdata)

    //     const fd = new FormData()
    //     fd.append('file', file)
    //     const res = await this.$axios.post('/upload', fd)

    //     if (res.data.statusCode === 200) {
    //       this.editPersonage({ head_img: res.data.data.url })
    //     }
    //     this.isShowMask = false
    //   })
    // },
    // -------------------------------------------------------------
    // 取消
    off () {
      this.isShowMask = false
    },
    // 将base64的图片转换为file文件
    convertBase64UrlToBlob (urlData) {
      let bytes = window.atob(urlData.split(',')[1]) // 去掉url的头，并转换为byte
      // 处理异常,将ascii码小于0的转换为大于0
      let ab = new ArrayBuffer(bytes.length)
      let ia = new Uint8Array(ab)
      for (var i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i)
      }
      return new Blob([ab], { type: 'image/jpeg' })
    }
  }
}
</script>

<style lang="less" scoped>
.editPersonage {
  border-top: 20px solid #555;
  .imgavatar {
    width: 80px;
    height: 80px;
    padding: 10px;
    margin: 10px auto;
    img {
      width: 100%;
      height: 100%;
      border-radius: 100%;
    }
    .van-uploader {
      opacity: 0;
      position: absolute;
      top: 65px;
      left: 50%;
      transform: translateX(-50%);
    }
  }
  .list {
    padding: 0 25px;
    .loginout {
      margin-top: 20px;
    }
  }
  .mask {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 999;
    top: 0;
    left: 0;
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
  .loading {
    text-align: center;
  }
}
.van-dialog {
  padding: 10px;
  .van-field {
    margin-top: 10px;
    border: 1px solid #ccc;
  }
}
</style>
