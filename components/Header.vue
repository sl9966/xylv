<template>
  <div class="xyly_header">
    <div class="header_main">
      <div class="main_pages">
        <nuxt-link class="pages_logo" to="/"><img src="http://157.122.54.189:9093/images/logo.jpg" alt=""></nuxt-link>
        <nuxt-link class="pages_item" to="/">首页</nuxt-link>
        <nuxt-link class="pages_item" to="/post">旅游攻略</nuxt-link>
        <nuxt-link class="pages_item" to="/hotel">酒店</nuxt-link>
        <nuxt-link class="pages_item" to="/air">国内机票</nuxt-link>
      </div>
      <div class="main_login">
        <el-dropdown>
          <span class="el-dropdown-link">
            <i class="el-icon-bell"></i>
            &nbsp;消息&nbsp;
            <i class="el-icon-caret-bottom"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>消息</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        &nbsp;<nuxt-link to="/user/login">登录 / 注册</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>

.xyly_header{
  border-bottom: 1px solid #ccc;
  a{
    text-decoration: none;
    color: inherit;
  }
  .header_main{
    width: 1000px;
    height: 60px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .main_pages{
      display: flex;
      height: 100%;
      align-items: center;
      .pages_logo{
        img{
          width: 160px;
          margin-right: 20px;
        }
      }
      .pages_item{
        height: 100%;
        display: flex;
        align-items: center;
        padding: 0 20px;
        font-weight: 600;
        &:hover{
          color: #0094ff;
          position: relative;
          &::before{
            content: '';
            position: absolute;
            width: 100%;
            height: 5px;
            bottom: 0;
            left: 0;
            // background-color: currentcolor;
            background-color: #0094ff;
          }
        }
      }
      .nuxt-link-exact-active{
        color: #fff!important;
        background-color: #0094ff!important;
        // &::before{
        //   background-color: #0094ff!important;
        // }
      }
      .pages_logo{
        background-color: #fff!important;
      }
    }
    .main_login{
      color: rgb(96, 98, 102);
      font-size: 14px;
      display: flex;
      align-items: center;
      .el-icon-bell{
        font-size: 18px;
      }
      .el-dropdown-link{
        display: flex;
        align-items: center;
      }
    }
  }
}

</style>