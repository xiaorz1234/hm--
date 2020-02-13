<template>
  <div class="hm-comment">
    <div class="title">
      <img :src="$axios.defaults.baseURL +list.user.head_img" alt />
      <div class="info">
        <div class="name">{{list.user.username}}</div>
        <div class="time">{{list.create_date | time('YYYY-MM-DD HH:mm:ss')}}</div>
      </div>
      <div class="reply" @click="reply(list.id)">回复</div>
    </div>
    <!-- 递归楼层组件 -->
    <hm-floor v-if="list.parent" :list="list.parent" @reply="reply"></hm-floor>
    <div class="content">{{list.content}}</div>
  </div>
</template>

<script>
export default {
  props: {
    list: Object
  },
  methods: {
    reply (id) {
      this.$emit('reply', id)
    }
  }
}
</script>

<style lang="less" scoped>
.hm-comment {
  padding: 10px 20px;
  border-bottom: 1px solid #ccc;
  font-size: 14px;
  .title {
    display: flex;
    padding-bottom: 10px;
    img {
      width: 35px;
      height: 35px;
      border-radius: 50%;
    }
    .info {
      flex: 1;
      padding-left: 10px;
      .time {
        font-size: 12px;
        color: #888;
      }
    }
  }
  .content {
    padding-top: 10px;
  }
}
</style>
