<template>
  <!--跳转后要使用keep-alive才能使整个系统依旧可以活动-->
  <keep-alive>
<line-chart></line-chart>
  </keep-alive>
</template>

<script>
  import lineChart from '@/views/equipMonitor/component/lineChart'
    export default {
        name: "historical-line",
      components:{lineChart}
    }
</script>

<style scoped>

</style>
