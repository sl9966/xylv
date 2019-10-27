<template>
  <div class="xyly">
    <Header/>
    <nuxt class="content"/>
    <Footer/>
  </div>
</template>

<script>
import Header from "@/components/Header.vue"
import Footer from "@/components/Footer.vue"
export default {
  components: {
    Header, Footer
  }
}
</script>

<style lang="less" scoped>
.content{
  height: 700px;
  min-width: 1000px;
}
</style>