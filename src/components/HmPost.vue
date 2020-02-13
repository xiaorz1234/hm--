<template>
  <div class="hm-post" @click="$router.push(`/newdetail/${list.id}`)">
    <!-- 视频 -->
    <div class="video-post" v-if="list.type === 2">
      <div class="title">{{list.title}}</div>
      <div class="video">
        <img :src="list.cover[0].url" alt />
        <!-- 播放按钮 -->
        <i class="iconfont iconshipin"></i>
      </div>
      <div class="botton">
        <span>{{list.user.nickname}}</span>
        <span>{{list.comment_length}}跟帖</span>
      </div>
    </div>
    <!-- 单张 -->
    <div class="single-post" v-else-if="list.cover.length<3">
      <div class="info">
        <p class="title">{{list.title}}</p>
        <p class="botton">
          <span>{{list.user.nickname}}</span>
          <span>{{list.comment_length}}跟帖</span>
        </p>
      </div>
      <img :src="list.cover[0].url" alt />
    </div>
    <!-- 多张 -->
    <div class="multiple-post" v-else>
      <div class="title">{{list.title}}</div>
      <div class="imgs">
        <img v-for="item in list.cover" :key="item.id " :src="item.url" alt />
      </div>
      <div class="botton">
        <span>{{list.user.nickname}}</span>
        <span>{{list.comment_length}}跟帖</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: Object
  }
}
</script>

<style lang="less" scoped>
.hm-post {
  .single-post {
    padding: 10px;
    border-bottom: 1px solid #ccc;
    display: flex;
    justify-content: space-between;
    .info {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      font-size: 13px;
      .botton {
        color: #888;
        span:last-child {
          margin-left: 20px;
        }
      }
    }
    img {
      width: 120px;
      height: 75px;
      object-fit: cover;
    }
  }
  .multiple-post {
    padding: 10px;
    border-bottom: 1px solid #ccc;
    font-size: 13px;
    .imgs {
      display: flex;
      justify-content: space-around;
      padding: 10px 0;
      img {
        width: 112px;
        height: 74px;
        object-fit: cover;
      }
    }
    .botton {
      color: #888;
      span:last-child {
        margin-left: 20px;
      }
    }
  }
  .video-post {
    padding: 10px;
    border-bottom: 1px solid #ccc;
    font-size: 13px;
    .video {
      position: relative;
      margin: 10px 0;
      img {
        width: 100%;
      }
      .iconshipin {
        width: 50px;
        height: 50px;
        background-color: rgba(0, 0, 0, 0.5);
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 50%;
        color: #fff;
        font-size: 30px;
        line-height: 50px;
        text-align: center;
      }
    }
    .botton {
      color: #888;
      span:last-child {
        margin-left: 20px;
      }
    }
  }
}
</style>
