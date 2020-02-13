<template>
   <div class="hmheader">
      <div class="left"  @click="$router.back()">
        <i class="iconfont iconjiantou2"></i>
      </div>
      <div class="center"><slot></slot></div>
      <div class="right"></div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.hmheader {
    height: 40px;
    line-height: 40px;
    display: flex;
    text-align: center;
    .center {
      flex: 1;
      font-weight: 700;
      font-size: 14px;
    }
    .left,
    .right {
      width: 40px;
    }
  }
</style>
