<template>
  <div class="flights-listItem">
    <div v-for="(item,index) in flightsFilter" :key="index">
      <div class="baseInfo" @click="handleShow(index)">
        <div class="flightName">{{item.airline_name}} {{item.flight_no}} <span class="size">--{{item.plane_size | hangleSize}}</span></div>
        <div class="depTime">
          <div class="time">{{item.dep_time}}</div>
          <span>{{item.org_airport_name}}{{item.org_airport_quay}}</span>
        </div>
        <div class="spendTime">{{spendTime(item.dep_datetime,item.arr_datetime)}}</div>
        <div class="arrTime">
          <div class="time">{{item.arr_time}}</div>
          <span>{{item.dst_airport_name}}{{item.dst_airport_quay}}</span>
        </div>
        <div class="price">
          ￥<span>{{item.base_price/2}}</span>起
        </div>
      </div>
      <div class="detail" v-show="showIndex==index">
        <div class="left">低价推荐</div>
        <div class="right">
          <div class="item" v-for="(item,index) in item.seat_infos" :key="index">
            <div class="name">
              <span class="seatName">{{item.name}}</span> |
              <span class="supperName">{{item.supplierName}}</span>
            </div>
            <div class="price">￥{{item.settle_price_coupon}}</div>
            <div class="selectSeat">
              <el-button type="warning" size="mini">选定</el-button>
              <span>剩余:{{item.discount}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="5"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      style="width:100%;display:flex;justify-content:center">
    </el-pagination>
  </div>
</template>

<script>
export default {
  props:{
    flights:{
      type: Array,
      default:[]
    }
  },
  data(){
    return {
      flightsFilter:[],
      showIndex: -1,
      total:0,
      currentPage:1,
      pageInfo:{
        size:5,
        page:1
      }
    }
  },
  methods:{
    getFlights(obj){
      this.total = this.flights.length
      this.flightsFilter=this.flights.slice(
        (obj.page-1)*obj.size,
        obj.page*obj.size
      )
    },
    handleShow(index){
      if(this.showIndex==index){
        this.showIndex = -1
      }else{
        this.showIndex=index
      }
    },
    spendTime(start,end){
      let startTime = new Date(start)
      let endTime = new Date(end)
      let spendTime = endTime - startTime
      let hour = parseInt(spendTime/1000/60/60)
      let minutes = (spendTime/1000/60)%60
      return `${hour}时${minutes}分`
    },
    handleSizeChange(val){
      this.pageInfo.size=val
      this.getFlights(this.pageInfo)
    },
    handleCurrentChange(val){
      this.pageInfo.page=val
      this.getFlights(this.pageInfo)
    },
  },
  mounted(){
    this.getFlights(this.pageInfo)
  },
  watch:{
    flights(){
      this.getFlights(this.pageInfo)
    }
  },
  filters:{
    hangleSize(size){
      let obj = {
        L: '大型机',
        M: '中型机',
        S: '小型机'
      }
      return obj[size]
    }
  }
}

</script>

<style lang="less" scoped>
.flights-listItem{
  > div{
    margin-bottom: 10px;
  }
  .baseInfo{
    height: 90px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    border: 1px solid rgb(221, 221, 221);
    position: relative;
    cursor: pointer;
    .flightName{
      font-style: heiti;
      .size{
        position: absolute;
        top:56%;
        left: 25%;
        color: #ccc;
        font-size: 12px;
      }
    }
    .time,.price>span{
      font-size: 20px;
      font-style: heiti;
    }
    .price>span{
      color: orange;
    }
    .depTime,.arrTime{
      text-align: center;
      > span{
        font-size: 12px;
        color: rgb(153, 153, 153);
      }
    }
    .spendTime{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-30%,-50%);
      font-size: 12px;
      color: rgb(153, 153, 153);
      padding-bottom: 10px;
      border-bottom: 1px solid rgb(238, 238, 238);
    }
  }
  .detail{
    display: flex;
    align-items: center;
    background-color: rgb(246, 246, 246);
    border: 1px solid rgb(228, 228, 228);
    border-top: none;
    .left{
      flex: 1;
      text-align: center;
    }
    .right{
      flex: 4;
      padding-right: 20px;
      font-size: 12px;
      .item{
        display: flex;
        height: 70px;
        align-items: center;
        border-bottom: 1px solid rgb(238, 238, 238);
        &:last-child{
          border-bottom: none;
        }
        .name{
          flex: 3;
          .seatName{
            color: green;
          }
        }
        .price{
          flex: 1;
          color: orange;
          font-size: 18px;
          font-style: heiti;
        }
        .selectSeat{
          width: 60px;
          display: flex;
          flex-direction: column;
          align-items: center;
          > span{
            color: rgb(105, 105, 105);
          }
        }
      }
    }
  }
}
</style>