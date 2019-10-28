export const state = () => ({
  userInfo:{
    token: '',
    user:{}
  }
})

export const mutations = {
  handleLogin(state,payload){
    state.userInfo = payload;
    localStorage.setItem('xy_userInfo',JSON.stringify(payload))
    console.log(state.userInfo)
  },
  handleExit(state){
    state.userInfo = { token: '', user:{}}
    localStorage.removeItem('xy_userInfo')
  }
}

export const actions = {
  userLogin(context,data){
    this.$axios.post('/accounts/login',data).then(res=>{
      if(res.data.token){
        context.commit('handleLogin',res.data)
      }
    })
  }
}
