<template>
  <div>
    <el-header>
      <div>

        <el-form ref="form" :model="form" label-width="80px">
          <el-row >
            <div class="grid-content bg-purple mydiv">
              <span class="mytitle">产线:</span>
              <el-select v-model="form.line_id" clearable filterable placeholder="请选择" style="width: 6rem">
                <el-option
                  v-for="item in options1"
                  :key="item.value"
                  :label="item.name"
                  :value="item.id"/>
              </el-select>
            </div>
            <div class="grid-content bg-purple mydiv">
              <span class="mytitle">设备编号:</span>
              <el-select v-model="form.device_no" clearable filterable placeholder="请选择" style="width: 6rem">
                <el-option
                  v-for="item in options2"
                  :key="item.value"
                  :label="item.name"
                  :value="item.id"/>
              </el-select>
            </div>
            <div class="grid-content bg-purple mydiv">
              <span class="mytitle">日期</span>
              <el-date-picker
                v-model="form.twotimes"
                :picker-options="pickerOptions2"
                :unlink-panels="true"
                clearable
                value-format="yyyy-MM-dd"
                format="yyyy-MM-dd"
                style="width: 16rem"
                type="daterange"
                align="center"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                @change="chooseTimeRange" />
            </div>
            <div class="grid-content bg-purple mydiv">
              <el-checkbox v-model="form.is_clear">仅显示未消除报警</el-checkbox>
            </div>
            <el-button @click="search">搜索</el-button>
            <el-button @click="handleDownload">导出</el-button>
          </el-row>
        </el-form>
      </div>
    </el-header>
    <el-main>
      <el-table
        v-loading="listLoading"
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          fixed
          prop="line_id"
          label="产线"
        />
        <el-table-column
          prop="process"
          label="工序"
        />
        <el-table-column
          prop="name"
          label="设备名称"
        />
        <el-table-column
          prop="device_no"
          label="设备编号"
        />
        <el-table-column
          prop="alarm_type"
          label="报警类型"
        />
        <el-table-column
          prop="alarm_no"
          label="报警编号"
        />
        <el-table-column
          prop="alarm_msg"
          label="报警信息"
        />
        <el-table-column
          :formatter="dateFormat"
          prop="started_time"
          label="开始时间"
        />
        <el-table-column
          :formatter="dateFormat"
          prop="stopped_time"
          label="结束时间"
        />
        <el-table-column
          :formatter="formatDuring"
          prop="duration"
          label="持续时间"
        />
        <el-table-column
          prop="cleared"
          label="是否消除"
        />
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
  </div>
</template>

<script>
import ElHeader from 'element-ui/packages/header/src/main'
import { getLines } from '@/api/line'
import { getDevices } from '@/api/device'
import { getDeviceAlarm } from '@/api/device'
import moment from 'moment'
var padDate = function(value) {
  return value < 10 ? '0' + value : value
}
export default {
  components: { ElHeader },

  data() {
    return {
      listLoading: true,
      listQuery: {
        currentPage: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      options1: [],
      options2: [],
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
      value: '',
      value6: '',
      form: {
        line_id: '',
        device_no: '',
        twotimes: [],
        is_clear: ''
      },
      tableData: [],
      total: null
    }
  },
  created() {
    function dateFormatter(str) { // 默认返回yyyy-MM-dd HH-mm-ss
      var hasTime = arguments[1] !== false// 可传第二个参数false，返回yyyy-MM-dd
      var d = new Date(str)
      var year = d.getFullYear()
      var month = (d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1)
      var day = d.getDate() < 10 ? '0' + d.getDate() : d.getDate()
      // var hour = d.getHours()<10 ? '0'+d.getHours() : d.getHours();
      // var minute = d.getMinutes()<10 ? '0'+d.getMinutes() : d.getMinutes();
      // var second = d.getSeconds()<10 ? '0'+d.getSeconds() : d.getSeconds();
      if (hasTime) {
        return [year, month, day].join('-')
      } else {
        return [year, month, day].join('-')
      }
    }
    const start = dateFormatter(new Date())
    const end = dateFormatter(new Date())
    this.form.twotimes = [start, end]
  },
  mounted() {
    this.chooseTimeRange()
    this.fetchLines()
  },
  methods: {
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
    },
    handleDownload() {
      this.downloadLoading = true
      require.ensure([], () => {
        const { export_json_to_excel } = require('@/vendor/Export2Excel')
        // const tHeader = ['工序', '设备名称','设备编号','程序名称','产量计数','达成时间]
        // const filterVal = [ 'process', 'name','device_no','statusname','started_time','stopped_time']
        const tHeader = [ '产线','工序', '设备名称','设备编号','报警类型','报警编号','报警信息','开始时间','结束时间','持续时间','是否消除']
        const filterVal = ['line_id','process', 'name','device_no','alarm_type','alarm_no','alarm_msg','started_time','stopped_time','duration','cleared']
        const list = this.tableData
        for(let i=0;i<list.length;i++){
          console.log(list[i].duration)
          list[i].duration= this.MillisecondToDate(list[i].duration)
        }
        const data = this.formatJson(filterVal, list)
        export_json_to_excel(tHeader, data, '报警记录列表'+moment(new Date()).format('YYYYMMDDHHmmss'))
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
    handleSizeChange(val) {
      this.fetchData(this.form.line_id, this.form.device_no, moment(this.form.twotimes[0]).format('YYYY-MM-DD'), moment(this.form.twotimes[1]).format('YYYY-MM-DD'), this.judg(this.form.is_clear), val, this.listQuery.currentPage)
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      this.fetchData(this.form.line_id, this.form.device_no, moment(this.form.twotimes[0]).format('YYYY-MM-DD'), moment(this.form.twotimes[1]).format('YYYY-MM-DD'), this.judg(this.form.is_clear), this.listQuery.limit, val)
      console.log(`当前页: ${val}`)
    },
    fetchLines() {
      getLines().then(
        response => {
          this.options1 = response.data
          this.form.line_id = this.options1[0].id
          this.fetchDevices()
        }
      ).catch(
        error => {
          console.log(error)

        }
      )
    },
    fetchDevices() {
      getDevices().then(
        response => {
          console.log(response)
          this.options2 = response.data
          this.search()

        }
      ).catch(
        error => {
          console.log(error)
          this.$message.error('网络错误，不能访问')
        }
      )
    },
    fetchData(lineId, deviceNo, beginDate, endDate, cleared, limit, offset) {
      getDeviceAlarm(lineId, deviceNo, beginDate, endDate, this.judg(cleared), limit, ((offset - 1) * limit)).then(
        response => {
          this.listLoading = false
          console.log(response)
          this.tableData = response.data.rows
          this.tableData.forEach((item, index) => {
            switch (item.cleared) {
              case false:
                item['cleared'] = '否'
                break
              case true:
                item['cleared'] = '是'
                break
            }
          })
          this.tableData.forEach((item, index) => {
            switch (item.line_id) {
              case 10000:
                item['line_id'] = '康明斯'
                break
            }
          })
        }
      ).catch(
        error => {
          console.log(error)
          this.$message.error('网络错误，不能访问')
        }
      )
    },
    search() {
      this.listLoading = true
      if (!this.form.twotimes) {
        this.form.twotimes = []
      }
      this.getTotal()
      this.fetchData(this.form.line_id, this.form.device_no, moment(this.form.twotimes[0]).format('YYYY-MM-DD'), moment(this.form.twotimes[1]).format('YYYY-MM-DD'), this.form.is_clear, this.listQuery.limit, this.listQuery.currentPage)
    },
    getTotal() {
      getDeviceAlarm(this.form.line_id, this.form.device_no, moment(this.form.twotimes[0]).format('YYYY-MM-DD'), moment(this.form.twotimes[1]).format('YYYY-MM-DD'), this.judg(this.form.is_clear)).then(
        response => {
          console.log(response)
          this.total = response.data.total
        }
      ).catch(
        error => {
          console.log(error)
          this.$message.error('网络错误，不能访问')
        }
      )
    },
    // 表格时间格式转换
    dateFormat: function(row, column) {
      var date = row[column.property]
      if (date === undefined) {
        return ''
      }
      return moment(date).format('YYYY-MM-DD HH:mm:ss')
    },
    formatDuring: function(row, column) {
      var msd = row[column.property]
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
          time = padDate(parseInt(time / 3600.0)) + ':' + padDate(parseInt((parseFloat(time / 3600.0) -
            parseInt(time / 3600.0)) * 60)) + ':' +
            padDate(parseInt((parseFloat((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60) -
              parseInt((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60)) * 60))
        }
      }
      return time
    },
    // 时间选择框格式转换
    chooseTimeRange(t) {
      console.log(t)// 结果为一个数组，如：["2018-08-04", "2018-08-06"]
    },
    judg(val) {
      switch (val) {
        case true:
          return false
        case false:
          return null
      }
    },
    handle() {}
  }
}
</script>
<style>
  header.el-header{
    padding-top:20px;
  }
  .el-date-editor--datetimerange.el-input, .el-date-editor--datetimerange.el-input__inner{
    width:220px!important;
  }
  .mytitle{
    font-size: .8rem;
    margin-right: 5px;
    font-weight: 600;
  }
  .mydiv{
    display: inline;
    margin-right: 0.5rem;
  }
</style>
