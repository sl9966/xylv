<template>
  <div class="flights_filter">
    <div class="top">
      <div class="flights_info">
        <div>单程 :  {{info.departCity}} - {{info.destCity}} / {{info.departDate}}</div>
      </div>
      <div class="select-input">
        <el-select v-model="searchInfo.airport" @change="hangleSelect" placeholder="起飞机场" size="mini">
          <el-option v-for="item in options.airport" 
          :key="item"
          :label="item"
          :value="item"
          >
          </el-option>
        </el-select>
        <el-select v-model="searchInfo.flightTimes" @change="hangleSelect" placeholder="起飞时间" size="mini">
          <el-option v-for="(item,index) in options.flightTimes" 
          :key="index"
          :label="flightTimesLabel(item)"
          :value="flightTimesValue(item)"
          >
          </el-option>
        </el-select>
        <el-select v-model="searchInfo.company" @change="hangleSelect" placeholder="航空公司" size="mini">
          <el-option v-for="item in options.company" 
          :key="item"
          :label="item"
          :value="item"
          >
          </el-option>
        </el-select>
        <el-select v-model="searchInfo.size" @change="hangleSelect" placeholder="机型" size="mini">
          <el-option v-for="(item,value) in {'L':'大','M':'中','S':'小'}" 
          :key="item"
          :label="item"
          :value="value"
          >
          </el-option>
        </el-select>
      </div>
    </div>
    <div>
      筛选 : <el-button type="primary" plain round size="mini">撤销</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props:['info','options'],
  data(){
    return {
      searchInfo:{
        airport:'',
        company:'',
        flightTimes:'',
        size:''
      }
    }
  },
  methods:{
    // 处理显示时间
    flightTimesLabel(obj){
      return `${obj.from<10?'0'+obj.from:obj.from}:00 - ${obj.to<10?'0'+obj.to:obj.to}:00`
    },
    // 处理时间，方便后期拆分数据
    flightTimesValue(obj){
      return `${obj.from}-${obj.to}`
    },
    hangleSelect(){
      this.$emit('filtersChange',this.searchInfo)
    }
  }
}
</script>

<style lang="less" scoped>
.flights_filter{
  .top{
    display: flex;
    justify-content: space-between;
    .flights_info{
      flex: 2;
    }
    .select-input{
      flex: 3;
      display: flex;
      > *{
        padding-left: 10px;
      }
    }
  }
}
</style>