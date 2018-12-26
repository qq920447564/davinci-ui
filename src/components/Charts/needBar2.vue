<template>
  <div :class="className" :id="id" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
import resize from './mixins/resize'
import moment from 'moment'

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
          this.ts.push(moment(item.stat_date).format('YYYY-MM-DD') + ' ' + item.plan_time_name)
          this.lineVal1.push(item.plan_cnt)
          this.lineVal2.push(item.cnt)
          this.lineVal3.push(item.diff_cnt)
          this.lineVal4.push(item.rate)
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
          data: ['计划生产', '实际生产', '生产差异', '达成率']
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
            name: '达成率',
            position: 'right',
            axisLabel: {
              formatter: '{value}%'
            }
          }
        ],
        series: [
          {
            name: '计划生产',
            type: 'bar',
            barWidth: 30,
            data: this.lineVal1
          },
          {
            name: '实际生产',
            type: 'bar',
            barWidth: 30,
            data: this.lineVal2
          },
          {
            name: '生产差异',
            type: 'bar',
            barWidth: 30,
            data: this.lineVal3
          },
          {
            name: '达成率',
            type: 'bar',
            yAxisIndex: 1,
            barWidth: 30,
            data: this.lineVal4
          }
        ]
      })
    }
  }
}
</script>
