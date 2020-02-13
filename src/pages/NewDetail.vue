<template>
  <div class="NewsDetail" ref="NewsDetail">
    <div class="header">
      <div class="left" @click="$router.back()">
        <i class="iconfont iconjiantou2"></i>
        <i class="iconfont iconnew news"></i>
      </div>
      <div class="right">
        <div class="btn followed" v-if="list.has_follow" @click="followed">已关注</div>
        <div class="btn follow" v-else @click="follow">关注</div>
      </div>
    </div>
    <!-- 内容 -->
    <div class="content">
      <div class="title">{{list.title}}</div>
      <div class="info">
        <span>{{list.user.nickname}}</span>
        <span>{{list.create_date | time}}</span>
      </div>
      <!-- 普通内容 -->
      <div class="main" v-if="list.type!==2" v-html="list.content"></div>
      <!-- 视频 -->
      <div class="video" v-else>
        <video :src="list.content" controls></video>
      </div>
    </div>
    <!-- 点赞 -->
    <div class="liker">
      <div class="left" @click="like" :class="{like: list.has_like}">
        <i class="iconfont icondianzan"></i>
        <span>{{list.like_length}}</span>
      </div>
      <div class="right">
        <i class="iconfont iconweixin"></i>
        <span>微信</span>
      </div>
    </div>
    <!-- 精彩跟帖 -->
    <div class="follow">
      <div class="title" @click="$router.push({name:'follow', params: {id:list.id}})">精彩跟帖</div>
      <div class="main">
        <!-- 暂无跟帖,抢占沙发 -->
        <hm-comment @reply="reply" v-for="item in commentList" :key="item.id" :list="item"></hm-comment>
      </div>
    </div>
    <!-- 底部 -->
    <div class="footer" ref="footer">
      <!-- 评论 -->
      <div class="comment" v-if="isFocus">
        <input type="text" placeholder="写跟帖" @focus="handleFoucs" />
        <div class="icon-comment">
          <i class="iconfont iconpinglun-"></i>
          <span class="num">12</span>
        </div>
        <i class="iconfont iconshoucang" :class="{start:list.has_star}" @click="start"></i>
        <i class="iconfont iconfenxiang"></i>
      </div>
      <!-- 回复 -->
      <div class="respond" v-else>
        <textarea ref="textarea" rows="3" placeholder="回复@" @blur="handleBlur" v-model="main"></textarea>
        <div class="send" @click="send">发送</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      list: {
        user: {}
      },
      commentList: [],
      isFocus: true,
      replyId: '',
      main: ''
    }
  },
  created () {
    this.getList()
    this.getcomment()
  },
  methods: {
    // 获取列表
    async getList () {
      const id = this.$route.params.id
      const res = await this.$axios.get(`/post/${id}`)
      // console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.list = data

        const style = window.getComputedStyle(this.$refs.footer)
        this.$refs.NewsDetail.style.paddingBottom = style.height
        // 底部的高
        // console.log(style.height)
        // console.log(this.$refs.NewsDetail.style.paddingBottom)
      }
    },
    // 获取评论列表
    async getcomment () {
      const id = this.$route.params.id
      const res = await this.$axios.get(`/post_comment/${id}`)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.commentList = data
        console.log(this.commentList)
      }
    },
    // 关注
    async follow () {
      const id = this.list.user.id
      const res = await this.$axios.get(`/user_follows/${id}`)
      const { statusCode } = res.data
      if (statusCode === 200) {
        this.list.has_follow = true
        this.$toast.success('关注成功')
      }
    },
    // 取消关注
    async followed () {
      const id = this.list.user.id
      const res = await this.$axios.get(`/user_unfollow/${id}`)
      const { statusCode } = res.data
      if (statusCode === 200) {
        this.list.has_follow = false
        this.$toast.fail('取消关注成功')
      }
    },
    // 点赞
    async like () {
      const id = this.list.id
      const res = await this.$axios.get(`/post_like/${id}`)
      console.log(res)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.getList()
        this.$toast.success(message)
      }
    },
    // 获取焦点
    async handleFoucs () {
      console.log('获取了焦点')
      this.isFocus = false
      await this.$nextTick()
      this.$refs.textarea.focus()
      this.getList()
      // const style = window.getComputedStyle(this.$refs.footer)
      // this.$refs.NewsDetail.style.paddingBottom = style.height
    },
    // 失去焦点
    handleBlur () {
      if (this.main) {
        return
      }
      console.log('失去了焦点')
      this.isFocus = true
      this.getList()
    },
    async start () {
      const id = this.list.id
      const res = await this.$axios.get(`/post_star/${id}`)
      const { statusCode, message } = res.data
      console.log(res)
      if (statusCode === 200) {
        this.$toast.success(message)
        this.getList()
      }
    },
    // 回复--获取焦点
    async reply (id) {
      this.replyId = id
      this.isFocus = false
      console.log('回复了', id)
      await this.$nextTick()
      this.$refs.textarea.focus()
    },
    async send () {
      console.log('send文章ID', this.list.id)
      console.log('send回复ID', this.replyId)
      const id = this.list.id
      const res = await this.$axios.post(`/post_comment/${id}`, {
        content: this.main,
        parent_id: this.replyId
      })

      const { statusCode } = res.data
      if (statusCode === 200) {
        this.$toast.success('评论发布成功')
        this.isFocus = true
        this.main = ''
        this.replyId = ''
        this.getcomment()
      }
    }
  },
  watch: {
    $route () {
      this.getList()
      this.getcomment()
    }
  }
}
</script>

<style lang="less" scoped>
.NewsDetail {
  border-top: 20px solid #555;
  .header {
    height: 40px;
    line-height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    .left {
      display: flex;
      font-size: 24px;
      .news {
        font-size: 50px;
        color: red;
      }
    }
    .right {
      .btn {
        font-size: 11px;
        border: 1px solid #ccc;
        height: 25px;
        line-height: 25px;
        padding: 0 10px;
        border-radius: 20px;
      }
      .followed {
        border: #e43e3e;
        background-color: #e43e3e;
        color: #fff;
      }
    }
  }
  // 内容
  .content {
    font-size: 12px;
    padding: 0 10px;
    .title {
      font-size: 13px;
      font-weight: 700;
    }
    .info {
      font-size: 10px;
      padding: 8px 0;
      span:last-child {
        margin-left: 10px;
      }
    }
    video {
      width: 100%;
    }
  }
  // 点赞
  .liker {
    margin: 25px 0;
    height: 30px;
    line-height: 30px;
    display: flex;
    justify-content: space-around;
    .left,
    .right {
      border: 1px solid #555;
      font-size: 12px;
      border-radius: 20px;
      padding: 0 10px;
      i {
        margin-right: 5px;
      }
      .iconweixin {
        color: rgb(1, 200, 1);
      }
    }
    .like {
      color: #fff;
      border-color: #e43e3e;
      background-color: #e43e3e;
    }
  }
  .follow {
    border-top: 5px solid #ccc;
    border-bottom: 2px solid #ccc;
    padding-top: 20px;
    .title {
      font-size: 18px;
      font-weight: 700;
      padding: 15px 0;
      text-align: center;
    }
    .main {
      font-size: 12px;
    }
  }
  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 10px 0;
    background-color: #fff;
    font-size: 12px;
    .respond {
      display: flex;
      justify-content: space-around;
      align-items: flex-end;
      width: 100%;
      textarea {
        width: 240px;
        height: 70px;
        background-color: #ccc;
        border-radius: 20px;
        padding: 10px;
      }
      .send {
        width: 60px;
        height: 26px;
        line-height: 26px;
        color: #fff;
        background-color: #e43e3e;
        padding: 0 10px;
        text-align: center;
        border-radius: 10px;
        margin-left: 10px;
      }
    }
    .comment {
      display: flex;
      justify-content: space-around;
      align-items: center;
      input {
        width: 180px;
        height: 30px;
        background-color: #ddd;
        border-radius: 15px;
        padding-left: 20px;
      }
      .iconfont {
        font-size: 24px;
      }
      .icon-comment {
        position: relative;
        .num {
          position: absolute;
          background-color: #e43e3e;
          height: 20px;
          line-height: 20px;
          color: #fff;
          padding: 0 10px;
          border-radius: 10px;
          right: -20px;
          top: -4px;
        }
      }
      .start {
        color: #e43e3e;
      }
    }
  }
}
</style>
