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
            <span class="mytitle">统计方式</span>
            <el-select v-model="statistical" filterable placeholder="请选择" style="width: 130px">
              <el-option
                v-for="item in options3"
                :key="item.value"
                :label="item.label"
                :value="item.value"/>
            </el-select>
          </div>
          <div class="grid-content bg-purple mydiv">
            <span class="mytitle">日期</span>
            <el-date-picker
              v-model="twotimes"
              :picker-options="pickerOptions2"
              style="width: 16rem"
              type="daterange"
              align="center"
              unlink-panels
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期" />
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
            <span>{{ scope.row.stat_date | formatDate }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="时间区间" >
          <template slot-scope="scope">
            <span>{{ scope.row.plan_time_name }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="计划生产" >
          <template slot-scope="scope">
            <span>{{ scope.row.plan_cnt }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="实际生产" >
          <template slot-scope="scope">
            <span>{{ scope.row.cnt }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="生产差异" >
          <template slot-scope="scope">
            <span>{{ scope.row.diff_cnt }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="达成率" >
          <template slot-scope="scope">
            <span>{{ scope.row.rate }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" >
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleClick(scope.row)">查看当班人员</el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" label="备注" >
          <template slot-scope="scope">
            <span>{{ scope.row.addon }}</span>
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
    <el-dialog :visible.sync="dialogTableVisible" title="当班人员信息">
      <el-table :data="gridData">
        <el-table-column property="user.realname" label="姓名" />
        <el-table-column property="clockin_time" label="上班时间" />
        <el-table-column property="clockout_time" label="下班时间"/>
      </el-table>
    </el-dialog>
  </el-container>
</template>

<script>
import { getLines } from '@/api/line'
import { getPlanResult } from '@/api/table'
import { getWorkTime } from '@/api/table'
import moment from 'moment'

var padDate = function(value) {
  return value < 10 ? '0' + value : value
}

export default {
  name: 'Plan',
  filters: {
    formatDate: function(value) {
      var date = new Date(value)
      var year = date.getFullYear()
      var month = padDate(date.getMonth() + 1)
      var day = padDate(date.getDate())
      return year + '-' + month + '-' + day
    }
  },
  data() {
    return {
      listLoading: true,
      options1: [],
      options3: [{
        value: 'DAILY',
        label: '按天'
      }, {
        value: 'HOURLY',
        label: '按小时'
      }],
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
      listQuery: {
        currentPage: 1,
        limit: 10,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      gridData: null,
      tableData: [],
      dialogTableVisible: false,
      twotimes: [new Date(), new Date()],
      statistical: '',
      Line: '',
      production: '',
      str: [],
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
      this.downloadLoading = true
      require.ensure([], () => {
        const { export_json_to_excel } = require('@/vendor/Export2Excel')
        const tHeader = ['日期','时间区间', '计划生产', '实际生产', '生产差异', '达成率','备注']
        const filterVal = ['stat_date', 'plan_time_name', 'cnt','diff_cnt','rate','addon']
        const list = this.tableData
        const data = this.formatJson(filterVal, list)
        export_json_to_excel(tHeader, data, '计划达成列表'+moment(new Date()).format('YYYYMMDDHHmmss'))
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
        this.statistical = this.options3[1].value
        this.fetchDataPlan(this.Line, this.statistical, moment(this.twotimes[0]).format('YYYY-MM-DD'), moment(this.twotimes[1]).format('YYYY-MM-DD'), this.listQuery.limit, this.listQuery.currentPage)
        this.getTotal()
      }).catch(
        error => {
          console.log(error)
          this.$message.error('网络错误，不能访问')
        }
      )
    },
    fetchDataPlan(lineId, statType, beginTime, EndTime, limit, offset) {
      getPlanResult(lineId, beginTime, EndTime, statType, limit, ((offset - 1) * limit)).then(response => {
        this.listLoading = false
        this.tableData = response.data.pagination.rows
        this.tableData.forEach((item, index) => {
          if (item.rate) {
            item['rate'] = (Number(item.rate) * 100).toFixed(2) + '%'
          }
        })
      }).catch(
        error => {
          console.log(error)
          this.$message.error('网络错误，不能访问')
        }
      )
    },
    handleSizeChange(val) {
      this.fetchDataPlan(this.Line, this.statistical, moment(this.twotimes[0]).format('YYYY-MM-DD'), moment(this.twotimes[1]).format('YYYY-MM-DD'), val, this.listQuery.currentPage)
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      this.fetchDataPlan(this.Line, this.statistical, moment(this.twotimes[0]).format('YYYY-MM-DD'), moment(this.twotimes[1]).format('YYYY-MM-DD'), this.listQuery.limit, val)
      console.log(`当前页: ${val}`)
    },
    handleClick(row) {
      if (row.plan_time_name) {
        this.str = row.plan_time_name.split('-')
        if (this.str[0] === '24:00') {
          this.str[0] = moment(row.stat_date).format('YYYY-MM-DD') + ' ' + '23:59:59'
        } else {
          this.str[0] = moment(row.stat_date).format('YYYY-MM-DD') + ' ' + this.str[0] + ':00'
        }
        if (this.str[1] === '24:00') {
          this.str[1] = moment(row.stat_date).format('YYYY-MM-DD') + ' ' + '23:59:59'
        } else {
          this.str[1] = moment(row.stat_date).format('YYYY-MM-DD') + ' ' + this.str[1] + ':00'
        }
      }
      getWorkTime(this.str[0], this.str[1], this.Line, null).then(response => {
        this.gridData = response.data.rows
        this.gridData.forEach((item, index) => {
          if (item.clockin_time) {
            item['clockin_time'] = moment(this.gridData.clockin_time).format('YYYY-MM-DD hh:mm:ss')
          }
          if (item.clockout_time) {
            item['clockout_time'] = moment(this.gridData.clockout_time).format('YYYY-MM-DD hh:mm:ss')
          }
        })
      })
      this.dialogTableVisible = true
    },
    search() {
      this.listLoading = true
      if (!this.twotimes) {
        this.twotimes = []
      }
      this.getTotal()
      this.fetchDataPlan(this.Line, this.statistical, moment(this.twotimes[0]).format('YYYY-MM-DD'), moment(this.twotimes[1]).format('YYYY-MM-DD'), this.listQuery.limit, this.listQuery.currentPage)
    },
    getTotal() {
      getPlanResult(this.Line, moment(this.twotimes[0]).format('YYYY-MM-DD'), moment(this.twotimes[1]).format('YYYY-MM-DD'), this.statistical).then(response => {
        this.total = response.data.pagination.total
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
