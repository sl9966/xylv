<template>
  <div class="flights">
    <div class="left">
      <info :info='info' :options='options' @filtersChange="getFilters" />
      <listHead/>
      <listItem :flights="flightsFilter"  />
    </div>
    <div class="right">
    </div>
  </div>
</template>

<script>
import info from '@/components/air/flights_filter.vue'
import listHead from '@/components/air/flights_list_head.vue'
import listItem from '@/components/air/flights_list_item.vue'
export default {
  data(){
    return{
      info:{},
      options:{},
      flights:[],
      flightsFilter:[]
    }
  },
  components:{
    info, listHead ,listItem
  },
  async asyncData(context){
    let {data} = await context.$axios.get('/airs',{params:context.query})
    // console.log(data)
    return {
      info: data.info,
      flights: data.flights,
      options: data.options,
      flightsFilter: data.flights
    }
  },
  methods:{
    getFilters(content){
      console.log(this.flights)
      let obj = content
      console.log(obj)
      this.flightsFilter = this.flights.filter(v=>{
        let isOk1 = obj.airport === '' || obj.airport === v.org_airport_name
        let isOk2 = obj.company === '' || obj.company === v.airline_name
        let isOk3 = obj.size === '' || obj.size === v.plane_size
        let start = +obj.flightTimes.split('-')[0]
        let end = +obj.flightTimes.split('-')[1]
        let flagTime = (+v.dep_time.split(':')[0]) + (v.dep_time.split(':')[1]/60)
        let isOk4 = obj.flightTimes === '' || (flagTime>=start && flagTime<=end)
        return isOk1&&isOk2&&isOk3&&isOk4
      })
      console.log(this.flights)
    }
  }
}
</script>

<style lang="less" scoped>
  .flights{
    width: 1000px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    padding-top: 20px;
    font-size: 14px;
    .left{
      padding-right: 10px;
    }
    .right{
      width: 270px;
      border: 1px solid #ccc;
    }
  }
</style>