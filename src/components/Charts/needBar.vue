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
      lineVal1: [],
      lineVal2: [],
      lineVal3: [],
      lineVal4: [],
      lineVal5: []
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
      this.lineVal3 = []
      this.lineVal4 = []
      this.lineVal5 = []
      if (val) {
        val.forEach((item, index) => {
          this.ts.push(item.stat_date)
          this.lineVal1.push(item.cnt)
          this.lineVal2.push(item.unqualified_cnt)
          this.lineVal3.push(item.qualified_cnt)
          this.lineVal4.push(item.normal_duration / (3600 * 1000))
          this.lineVal5.push(item.oee)
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
            magicType: { type: ['line', 'bar'] },
            restore: {},
            saveAsImage: {}
          }
        },
        legend: {
          data: ['实际生产', '不合格产品数', '合格产品数', '正常运行时间', 'OEE']
        },
        xAxis: [
          {
            type: 'category',
            data: this.ts,
            axisPointer: {
              type: 'shadow'
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '数量',
            position: 'left',
            axisLabel: {
              formatter: '{value}'
            }
          },
          {
            type: 'value',
            name: '时间',
            position: 'right',
            axisLine: {
              lineStyle: {
                color: '#d14a61'
              }
            },
            axisLabel: {
              formatter: '{value}h'
            }
          },
          {
            type: 'value',
            name: 'OEE',
            position: 'right',
            axisLine: {
              lineStyle: {
                color: '#675bba'
              }
            },
            offset: 80,
            axisLabel: {
              formatter: '{value}%'
            }
          }
        ],
        series: [
          {
            name: '实际生产',
            type: 'bar',
            barWidth: 30,
            data: this.lineVal1
          },
          {
            name: '不合格产品数',
            type: 'bar',
            barWidth: 30,
            data: this.lineVal2
          },
          {
            name: '合格产品数',
            type: 'bar',
            barWidth: 30,
            data: this.lineVal3
          },
          {
            name: '正常运行时间',
            type: 'bar',
            yAxisIndex: 1,
            barWidth: 30,
            data: this.lineVal4
          },
          {
            name: 'OEE',
            type: 'bar',
            yAxisIndex: 2,
            barWidth: 30,
            data: this.lineVal5
          }
        ]
      })
    }
  }
}
</script>
