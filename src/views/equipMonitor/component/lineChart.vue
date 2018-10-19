
<template>
  <div id="app">
    <!--创建一个echarts的容器-->
    <div id="echartContainer" style="width:100%; height:500px"></div>
  </div>
</template>
<script>
  var echarts = require('echarts')
  export default {
    data(){

    },
    mounted(){
      var myChart = echarts.init(document.getElementById('echartContainer'));
// 绘制图表
      myChart.setOption({
        toolbox: {
          feature: {
            dataView: {show: true, readOnly: false},
            magicType: {show: true, type: ['line', 'bar']},
            restore: {show: true},
            saveAsImage: {show: true}
          }
        },
        xAxis: {
          type: 'category',
          data: ['2018/1/1 12:00', '2018/1/2 12:00', '2018/1/3 12:00', '2018/1/4 12:00', '2018/1/5 12:00',]
        },
        yAxis: {
          type: 'value',
          name: '值',
          min:98,
          max:106,
        },
        series: [{
          data: [100, 101, 102, 103, 104, 105, ],
          type: 'line'
        }]
      });


    }
  }
</script>
