<template>
  <div class="login" style="background:url(http://157.122.54.189:9095/assets/images/th03.jfif) center center">
    <div class="login_main">
      <div class="main_title">
        <div :class="activeIndex==index?'active':''" v-for="(item,index) in ['登录','注册']" @click="handleActiveIndex(index)" :key="index">{{item}}</div>
      </div>
      <div class="form">
        <register v-if="activeIndex==1"></register>
        <login v-else></login>
      </div>
    </div>
  </div>
</template>

<script>
import register from '@/components/user/registerform.vue'
import login from '@/components/user/loginform.vue'
export default {
  data(){
    return {
      activeIndex: this.$route.params.id
    }
  },
  components: {
    register, login
  },
  methods:{
    handleActiveIndex(index){
      this.$router.push('/user/login/'+index)
    }
  }
}
</script>

<style lang="less" scoped>
.login{
  position: relative;
  .login_main{
    position: absolute;
    background-color: #fff;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 400px;
    .main_title{
      height: 50px;
      display: flex;
      > div{
        flex: 1;
        text-align: center;
        line-height: 50px;
        background-color: rgb(238, 238, 238);
        &:hover{
          cursor: pointer;
        }
      }
      .active{
        background-color: #fff;
        color: rgb(255, 165, 0);
        position: relative;
        &::after{
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background-color: currentcolor;
        }
      }
    }
    .form{
      padding: 20px 20px 0;
    }
  }
}
</style>
