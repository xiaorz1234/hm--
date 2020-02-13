<template>
  <div class="box">
    <floor v-if="list.parent" :list="list.parent" @reply="reply"></floor>
    <div class="hm-floor">
      <!-- 追加楼层 -->
      <div class="info">
        <div class="left">
          <span class="name">{{list.user.nickname}}</span>
          <span class="time">{{list.create_date|time}}</span>
        </div>
        <div class="right">
          <div class="reply" @click="reply(list.id)">回复</div>
        </div>
      </div>
      <div class="content">{{list.content}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'floor',
  props: {
    list: Object
  },
  methods: {
    reply (id) {
      this.$emit('reply', id)
    }
  }
  // created () {
  //   console.log('我获取到list数据', this.list)
  // }
}
</script>

<style lang="less" scoped>
.hm-floor {
  padding: 10px 20px;
  border: 1px solid #ccc;
  font-size: 14px;
  background-color: #e8e2e2;
  .info {
    display: flex;
    .left {
      flex: 1;
      .time {
        font-size: 12px;
        color: #888;
        padding-left: 10px;
      }
    }
  }
  .content {
    padding: 10px 0;
  }
}
</style>
