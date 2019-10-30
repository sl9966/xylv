<template>
  <div class="air">
    <div class="ticket-search">
      <div class="ticket-search-title">
        <span class="iconfont iconfeiji"></span>
        <span>国内机票</span>
      </div>
      <div class="ticket-search-contain">
        <div class="left">
          <div class="left-top">
            <div :class="index===0?'active':''" v-for="(item,index) in ['单程','往返']" :key="index">
              <i :class="index===1?'iconfont icondancheng':'iconfont iconshuangxiang'"></i>
              <span>{{item}}</span>
            </div>
          </div>
          <div class="left-bottom">
            <div class="change">
              <span @click="change">换</span>
            </div>
            <el-form label-width="80px" :model="airs" :rules="rules" ref="ruleForm">
              <el-form-item label="出发城市" prop="departCity">
                <el-autocomplete
                  class="inline-input"
                  v-model="airs.departCity"
                  :fetch-suggestions="querySearch"
                  placeholder="请搜索出发城市"
                  style="width:100%"
                  :trigger-on-focus="false"
                  @select="handleSelectDepartCity"
                ></el-autocomplete>
              </el-form-item>
              <el-form-item label="抵达城市" prop="destCity">
                <el-autocomplete
                  class="inline-input"
                  v-model="airs.destCity"
                  :fetch-suggestions="querySearch"
                  placeholder="请搜索抵达城市"
                  style="width:100%"
                  :trigger-on-focus="false"
                  @select="handleSelectDestCity"
                ></el-autocomplete>
              </el-form-item>
              <el-form-item label="出发日期" prop="departDate">
                <el-form-item>
                  <el-date-picker
                    type="date"
                    placeholder="选择日期" 
                    v-model="airs.departDate" 
                    value-format="yyyy-MM-dd" 
                    style="width: 100%;"
                    ></el-date-picker>
                </el-form-item>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm" style="width:100%">搜索</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <img src="http://157.122.54.189:9093/images/pic_sale.jpeg" alt="" class="right">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      allCity:[],
      airs:{
        departCity:'广州',
        departCode:'CAN',
        destCity:'上海',
        destCode:'SHA',
        departDate:'2019-10-30'
      },
      rules:{
        departCity:[
          { required: true, message: '请输入出发城市', trigger: 'blur' }
        ],
        destCity:[
          { required: true, message: '请输入抵达城市', trigger: 'blur' }
        ],
        departDate:[
          { required: true, message: '请输入出发日期', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    querySearch(query,callback){
      this.$axios.get('/airs/city',{ params:{name:query} })
      .then(res=>{
        if(res.status==200){
          this.allCity = [...res.data.data]
          this.allCity.forEach(element => {
            element.value = element.name.replace('市','')
          });
          console.log(this.allCity)
          callback(this.allCity )
        }
      })
      callback([1])
    },
    handleSelectDepartCity(item){
      this.airs.departCode = item.sort
      console.log(this.airs)
    },
    handleSelectDestCity(item){
      this.airs.destCode = item.sort
      console.log(this.airs)
    },
    change(){
      [this.airs.departCity,this.airs.departCode,this.airs.destCity,this.airs.destCode]=
      [this.airs.destCity,this.airs.destCode,this.airs.departCity,this.airs.departCode]
    },
    submitForm(){
      this.$refs.ruleForm.validate(valid=>{
        if(valid){
          this.$router.push({path:'/air/flights',query:this.airs})
        }else{
          return false;
        }
      })
      // this.$axios.get('/airs',{params:this.airs})
      // .then(res=>{
      //   console.log(res)
      // })
    }
  }
}
</script>

<style lang="less" scoped>
.air{
  width: 1000px;
  margin: 0 auto;
  .ticket-search{
    padding-bottom: 20px;
    .ticket-search-title{
      font-size: 20px;
      color: orange;
      padding: 20px 0;
      :nth-child(1){
        font-weight: 600;
        font-size: 22px;
        margin-right: 10px;
      }
    }
    .ticket-search-contain{
      display: flex;
      justify-content: space-between;
      .left{
        border: 1px solid rgb(221, 221, 221);
        border-top: none;
        .left-top{
          height: 55px;
          display: flex;
          align-items: stretch;
          > div{
            cursor: pointer;
            flex: 1;
            background-color: rgb(238, 238, 238);
            position: relative;
            text-align: center;
            line-height: 55px;
            &.active{
              background-color: #fff;
              &::after{
                content: '';
                width: 100%;
                height: 3px;
                background-color: orange;
                position: absolute;
                top: 0;
                left: 0;
              }
            }
          }
        }
        .left-bottom{
          padding: 15px 50px 0 5px;
          position: relative;
          .change{
            width: 30px;
            height: 62px;
            border: 1px solid rgb(204, 204, 204);
            border-left: none;
            position: absolute;
            top: 35px;
            right: 19px;
            span{
              padding: 2px;
              font-size: 12px;
              color: #fff;
              background-color: rgb(153, 153, 153);
              position: absolute;
              top: 50%;
              right: 0;
              transform: translate(50%,-50%);
              cursor: pointer;
            }
          }
        }
      }
    }
  } 
}
</style>