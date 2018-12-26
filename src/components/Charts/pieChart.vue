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
            restore: {},
            saveAsImage: {}
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          x: 'left',
          data: ['报警', '关机', '空闲', '其他', '正常运行']
        },
        color: ['rgba(204, 0, 0, 1)', 'rgba(121, 121, 121, 1)', 'rgba(250, 173, 20, 1)', 'blue', 'rgba(0, 128, 0, 1)'],
        title: {
          text: '设备效能分析',
          x: 'center'
        },
        series: [
          {
            name: '设备1',
            type: 'pie',
            radius: ['30%', '50%'],
            center: ['75%', '50%'],
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: 335, name: '报警' },
              { value: 310, name: '关机' },
              { value: 234, name: '空闲' },
              { value: 135, name: '其他' },
              { value: 1548, name: '正常运行' }
            ]
          },
          {
            name: '设备2',
            type: 'pie',
            radius: ['30%', '50%'],
            center: ['25%', '50%'],
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: 500, name: '报警' },
              { value: 310, name: '关机' },
              { value: 234, name: '空闲' },
              { value: 135, name: '其他' },
              { value: 1548, name: '正常运行' }
            ]
          }
        ]
      })
    }
  }
}
</script>
