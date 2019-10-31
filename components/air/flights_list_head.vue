<template>
  <div class="flights-listHead">
    <div>航空信息</div>
    <div>起飞时间</div>
    <div>到达时间</div>
    <div>价格</div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
  .flights-listHead{
    display: flex;
    margin: 20px 0 10px;
    height: 40px;
    background-color: rgb(246, 246, 246);
    border: 1px solid rgb(228, 228, 228);
    justify-content: space-evenly;
    align-items: center;
    font-size: 12px;
  }
</style>