<template>
  <div class="loginform">
    <el-form class="form" label-position="top" :model="formData" :rules="rules" ref="formData">
      <el-form-item prop="username">
        <el-input v-model="formData.username" placeholder="用户名/手机号"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="formData.password" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:100%" @click="handleLogin">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data(){
    return {
      formData:{
        username:'13800138000',
        password:'13800138000'
      },
      rules:{
        username:[
          { required: true, message: '请输入手机号', trigger: 'blur' }
        ],
        password:[
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods:{
    handleLogin(){
      this.$refs.formData.validate(valid=>{
        if(valid){
          this.$store.dispatch('user/userLogin',this.formData)
            .then(res=>{
              this.$message.success('登录成功')
              setTimeout(() => {
                this.$router.push('/')
              }, 2000);
            })
        }else{
          this.$message.error('请正确输入表单信息')
        }
      })
    }
  }
}
</script>

<style>

</style>