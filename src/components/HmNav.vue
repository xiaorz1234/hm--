<template>
  <div class="hmnav" @click="go">
    <div class="left" :name="name">{{name}}</div>
    <div class="center" :desc="desc">{{desc}}</div>
    <div class="right">
      <i class="iconfont iconjiantou1"></i>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    desc: {
      type: String
    }
  },
  methods: {
    go () {
      this.$emit('click')
    }
  }
}
</script>

<style lang="less" scoped>
.hmnav {
  display: flex;
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #ccc;
  font-size: 12px;
  color: #999;
  .left {
    color: #000;
    text-align: center;
  }
  .center {
    flex: 1;
    text-align: right;
  }
}
</style>
