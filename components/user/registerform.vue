<template>
  <div class="registerform">
    <el-form class="form" label-position="top" :model="formData" :rules="rules" ref="formData">
      <el-form-item prop="username">
        <el-input v-model="formData.username" placeholder="用户名/手机号"></el-input>
      </el-form-item>
      <el-form-item prop="captcha">
        <el-input v-model="formData.captcha" placeholder="验证码">
          <template slot="append">
            <div class="sendbtn" @click="sendCaptcha">发送验证码</div>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="nickname">
        <el-input v-model="formData.nickname" placeholder="你的名字"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="formData.password" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item prop="password2">
        <el-input v-model="formData.password2" placeholder="确认密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:100%" @click="handleRegister">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data(){
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.formData.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      formData: {
        username:'13800138000',
        nickname:'13800138000',
        captcha:'000000',
        password:'13800138000',
        password2:'13800138000'
      },
      rules:{
        username:[
          { required: true, message: '请输入手机号', trigger: 'blur' }
        ],
        nickname:[
          { required: true, message: '请输入名字', trigger: 'blur' }
        ],
        captcha:[
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ],
        password:[
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        password2:[
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    sendCaptcha(){
      this.$axios.post('/captchas',{tel:this.formData.username})
        .then(res=> {
        })
    },
    handleRegister(){
      this.$refs.formData.validate(valid=>{
        console.log(valid)
        if(valid){
          delete this.formData.password2
          // this.$axios.post('/accounts/register',this.formData)
          this.$axios({
            method:'post',
            url:'/accounts/register',
            // headers: {'Content-Type':'application/x-www-form-urlencoded'},
            data: this.formData
          })
            .then(res=>{
              console.log(res)
              if(res.data.token){
                this.$message.success('注册成功')
                setTimeout(()=>{
                  this.$router.push('/user/login/0')
                },2000)
              }
            })
        }else{
          this.$message({
            showClose: true,
            message: '请合法输入注册表中的数据',
            type: 'error'
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.sendbtn{
  cursor: pointer;
}
</style>