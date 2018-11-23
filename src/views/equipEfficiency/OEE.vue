<template>
  <el-container>
    <el-header>
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple mydiv">
            <span class="mytitle">产线</span>
            <el-select v-model="Line" filterable clearable placeholder="请选择" style="width: 130px">
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.name"
                :value="item.id"/>
            </el-select>
          </div>
          <div class="grid-content bg-purple mydiv">
            <span class="mytitle">日期</span>
            <el-date-picker
              v-model="towtimes"
              :picker-options="pickerOptions2"
              style="width: 390px"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
          </div>
          <div class="grid-content bg-purple mydiv">
            <el-button @click="search">搜索</el-button>
            <el-button @click="handleDownload">导出</el-button>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <el-table
        v-loading="listLoading"
        :data="tableData"
        border
        fit
        highlight-current-row
        style="width: 100%">
        <el-table-column align="center" label="日期" >
          <template slot-scope="scope">
            <span>{{ scope.row.stat_date }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="实际生产" >
          <template slot-scope="scope">
            <span>{{ scope.row.cnt }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="不合格产品数" >
          <template slot-scope="scope">
            <span>{{ scope.row.unqualified_cnt }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="合格产品数" >
          <template slot-scope="scope">
            <span>{{ scope.row.qualified_cnt }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="正常运行时间" >
          <template slot-scope="scope">
            <span>{{ scope.row.normal_duration | MillisecondToDate }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="OEE" >
          <template slot-scope="scope">
            <span>{{ scope.row.oee }}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-footer>
      <el-pagination
        :current-page="listQuery.currentPage"
        :page-sizes="[10,20,30, 50]"
        :page-size="listQuery.limit"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange" />
    </el-footer>
  </el-container>
</template>

<script>
import { getLines } from '@/api/line'
import { getOEE } from '@/api/table'
import moment from 'moment'

var padDate = function(value) {
  return value < 10 ? '0' + value : value
}

export default {
  name: 'OEE',
  filters: {
    MillisecondToDate(msd) {
      var time = parseFloat(msd) / 1000
      if (time != null && time !== '') {
        if (time > 60 && time < 60 * 60) {
          time = '00:' + padDate(parseInt(time / 60.0)) + ':' + padDate(parseInt((parseFloat(time / 60.0) -
            parseInt(time / 60.0)) * 60))
        } else if (time >= 60 * 60 && time < 60 * 60 * 24) {
          time = padDate(parseInt(time / 3600.0)) + ':' + padDate(parseInt((parseFloat(time / 3600.0) -
            parseInt(time / 3600.0)) * 60)) + ':' +
            padDate(parseInt((parseFloat((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60) -
              parseInt((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60)) * 60))
        } else {
          time = '00:00:' + padDate(parseInt(time))
        }
      }
      return time
    }
  },
  data() {
    return {
      listLoading: true,
      options1: [],
      pickerOptions2: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      tableData: [],
      listQuery: {
        currentPage: 1,
        limit: 10,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      towtimes: [new Date(), new Date()],
      Line: '',
      production: '',
      total: null
    }
  },
  created() {
    this.fetchDataLine()
  },
  mounted() {
    this.chooseTimeRange()
  },
  methods: {
    handleDownload() {
      console.log(1)
      this.downloadLoading = true
      require.ensure([], () => {
        const { export_json_to_excel } = require('@/vendor/Export2Excel')
        const tHeader = ['日期','实际生产', '不合格产品数', '合格产品数', '正常运行时间', 'OEE']
        const filterVal = ['stat_date', 'cnt', 'unqualified_cnt','qualified_cnt','normal_duration','oee']
        const list = this.tableData
        const data = this.formatJson(filterVal, list)
        export_json_to_excel(tHeader, data, '产线OEE列表excel')
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
    chooseTimeRange(t) {
      console.log(t)// 结果为一个数组，如：["2018-08-04", "2018-08-06"]
    },
    fetchDataLine() {
      getLines().then(response => {
        this.options1 = response.data
        this.Line = response.data[0].id
        this.fetchDataOEE(this.Line, moment(this.towtimes[0]).format('YYYY-MM-DD'), moment(this.towtimes[1]).format('YYYY-MM-DD'), this.listQuery.limit, this.listQuery.currentPage)
        this.getTotal()
      }).catch(
        error => {
          console.log(error)
          alert('网络错误，不能访问')
        }
      )
    },
    fetchDataOEE(lineId, beginTime, EndTime, limit, offset) {
      getOEE(lineId, beginTime, EndTime, limit, ((offset - 1) * limit)).then(response => {
        this.listLoading = false
        this.tableData = response.data.rows
        this.tableData.forEach((item, index) => {
          if (item.oee || item.oee === 0) {
            item['oee'] = (Number(item.oee) * 100).toFixed(2) + '%'
          }
        })
      }).catch(
        error => {
          console.log(error)
          alert('网络错误，不能访问')
        }
      )
    },
    handleSizeChange(val) {
      this.fetchDataOEE(this.Line, moment(this.towtimes[0]).format('YYYY-MM-DD'), moment(this.towtimes[1]).format('YYYY-MM-DD'), val, this.listQuery.currentPage)
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      this.fetchDataOEE(this.Line, moment(this.towtimes[0]).format('YYYY-MM-DD'), moment(this.towtimes[1]).format('YYYY-MM-DD'), this.listQuery.limit, val)
      console.log(`当前页: ${val}`)
    },
    search() {
      this.listLoading = true
      if (!this.towtimes) {
        this.towtimes = []
      }
      this.getTotal()
      this.fetchDataOEE(this.Line, moment(this.towtimes[0]).format('YYYY-MM-DD'), moment(this.towtimes[1]).format('YYYY-MM-DD'), this.listQuery.limit, this.listQuery.currentPage)
    },
    getTotal() {
      getOEE(this.Line, moment(this.towtimes[0]).format('YYYY-MM-DD'), moment(this.towtimes[1]).format('YYYY-MM-DD')).then(response => {
        this.total = response.data.total
      })
    }
  }
}
</script>

<style scoped>
  .el-header, .el-footer {
    line-height: 60px;
  }

  .el-aside {
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    text-align: center;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }

  .el-row {
    margin-bottom: 20px;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .mytitle{
    font-size: .9rem;
    margin-right: 5px;
  }
  .mydiv{
    display: inline;
    margin-right: 15px;
  }
</style>
