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
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
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
      this.lineVal = []
      if (val) {
        val.forEach((item, index) => {
          this.ts.push(item.ts3)
          this.lineVal.push(item.value)
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
        xAxis: {
          type: 'category',
          data: this.ts
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: this.lineVal,
          type: 'line',
          smooth: true
        }]
      })
    }
  }
}
</script>
