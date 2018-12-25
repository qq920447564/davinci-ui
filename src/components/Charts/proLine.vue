<template>
  <div :class="className" :id="id" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'line-chart'
    },
    id: {
      type: String,
      default: 'line-chart'
    },
    width: {
      type: String,
      default: '200px'
    },
    height: {
      type: String,
      default: '200px'
    },
    linedata: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      chart: null,
      ts: [],
      lineVal: []
    }
  },
  mounted() {
    this.initChart()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart(val) {
      this.ts = []
      this.lineVal1 = []
      this.lineVal2 = []
      if (val) {
        val.forEach((item, index) => {
          this.ts.push(item.ts)
          this.lineVal1.push(item.value)
          this.lineVal2.push(item.value)
        })
      }
      this.chart = echarts.init(document.getElementById(this.id))

      this.chart.setOption({
        toolbox: {
          show: true,
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            dataView: { readOnly: false },
            magicType: { type: ['line', 'bar'] },
            restore: {},
            saveAsImage: {}
          }
        },
        title: {
          text: '设备实时产量',
          x: 'center'
        },
        legend: {
          data: ['设备1', '设备2']
        },
        xAxis: {
          type: 'category',
          data: this.ts
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: this.lineVal1,
          type: 'line',
          smooth: true
        }, {
          data: this.lineVal2,
          type: 'line',
          smooth: true
        }]
      })
    }
  }
}
</script>
