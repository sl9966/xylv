<template>
  <div class="index">
    <el-carousel height="700px" :interval="5000">
      <el-carousel-item v-for="(item,index) in lunBoImgs" :key="index">
        <!-- <img :src="'http://157.122.54.189:9093'+item.url" :alt="item.desc"> -->
        <div class="lunbo_img" :style='"background:url(http://157.122.54.189:9095"+item.url+") center center"'></div>
      </el-carousel-item>
    </el-carousel>
    <div class="search">
      <div class="nav">
        <div class="nav_item"  @click="handleClick(index)" :class="placeholderIndex===index?'active':''" v-for="(item,index) in nav" :key="index">{{item}}</div>
      </div>
      <el-input
      :placeholder="placeholder[placeholderIndex]"
      suffix-icon="el-icon-search">
      </el-input>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      lunBoImgs: [],
      nav: [
        '攻略',
        '酒店',
        '机票'
      ],
      placeholder:[
        '搜索城市',
        '请输入城市搜索酒店',
        '请输入目的地'
      ],
      placeholderIndex: 0
    }
  },
  asyncData(context){
    return context.$axios.get('/scenics/banners')
      .then(res=>{
        return {lunBoImgs: res.data.data}
      })
  },
  methods: {
    handleClick(index){
      this.placeholderIndex=index
      if(index===2){
        this.$router.push('air')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.index{
  height: 700px;
  position: relative;
  .lunbo_img{
    width: 100%;
    height: 100%;
  }
  .search{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 550px;
    z-index: 2;
    .nav{
      display: flex;
      .nav_item{
        height: 40px;
        line-height: 40px;
        padding: 0 15px;
        background-color: rgba(0,0,0,.8);
        color: #fff;
        margin-right: 13px;
        position: relative;
        z-index: 2;
        &::after{
          content: '';
          position: absolute;
          top: 0;
          right: -12.4px;
          width: 0;
          height: 0;
          border-left-width: 10px;
          border-top-width: 40px;
          border-bottom-width: 0px;
          border-style: solid;
          border-left-color: rgba(0,0,0,.8);
          border-top-color: transparent;
          border-right-color: transparent;
          border-bottom-color: transparent;
        }
        &:hover{
          cursor: pointer;
        }
      }
      .active{
        color: #000;
        background-color: rgb(238, 238, 238);
        &::after{
          border-left-color: rgb(238, 238, 238);
        }
      }
    }
  }
}
</style>
