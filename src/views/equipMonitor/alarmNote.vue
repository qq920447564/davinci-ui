<template>
  <div>
    <el-header :height="300">
      <div>

        <el-form ref="form" :model="form" label-width="80px">
          <el-row >
            <div class="grid-content bg-purple mydiv">
              <span class="mytitle">产线:</span>
              <el-select v-model="Line" filterable placeholder="请选择" style="width: 130px">
                <el-option
                  v-for="item in options1"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"/>
              </el-select>
            </div>
            <div class="grid-content bg-purple mydiv">
              <span class="mytitle">设备编号:</span>
              <el-select v-model="Line2" filterable placeholder="请选择" style="width: 130px">
                <el-option
                  v-for="item in options2"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"/>
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
                end-placeholder="结束日期" />
            </div>
            <div class="grid-content bg-purple mydiv">
              <el-checkbox v-model="checked">是否异常</el-checkbox>
            </div>
            <el-button type="primary" @click="search">搜索</el-button>
            <el-button type="primary" @click="handle">导出</el-button>
          </el-row>
        </el-form>
      </div>
    </el-header>
    <el-main>
      <el-table
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
          prop="duration"
          label="持续时间"
        />
        <el-table-column
          prop="is_clear"
          label="是否消除"
        />
      </el-table>
    </el-main>
  </div>
</template>

<script>
import ElHeader from 'element-ui/packages/header/src/main'
import axios from 'axios'
import moment from 'moment'

export default {
  components: { ElHeader },

  data() {
    return {
      options1: [{
        value: '选项1',
        label: '康明斯'
      }],
      options2: [{
        value: '选项1',
        label: 'OP10-1'
      }, {
        value: '选项2',
        label: 'OP10-2'
      }, {
        value: '选项3',
        label: 'OP10-3'
      }, {
        value: '选项4',
        label: 'OP10-4'
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
      value: '',
      value6: '',
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      towtimes: [new Date(), new Date()],
      Line: '',
      Line2: '',
      tableData: []
    }
  },
  created() {
    axios({
      method: 'get',
      baseURL: '/api',
      url: 'devices/alarm_stat'
    }).then(
      response => {
        console.log(response)
        this.tableData = response.data.data.rows
      }
    ).catch(
      error => {
        console.log(error)
        alert('网络错误，不能访问')
      }
    )
  },
  methods: {
    search: function() {
      axios({
        method: 'get',
        baseURL: '/api',
        url: 'devices/alarm_stat',
        params: {
          lineId: this.form.line_id,
          deviceNo: this.form.device_no,
          process: this.form.process,
          beginDate: this.form.begin_time,
          endDate: this.form.endDate,
          isCleared: this.form.is_clear
        }
      }).then(
        response => {
          console.log(response)
          this.tableData = response.data.data.rows
        }
      ).catch(
        error => {
          console.log(error)
          alert('网络错误，不能访问')
        }
      )
    },
    // 表格时间格式转换
    dateFormat: function(row, column) {
      var date = row[column.property]
      if (date == undefined) {
        return ''
      }
      return moment(date).format('YYYY-MM-DD HH:mm:ss')
    },
    // 时间选择框格式转换
    chooseTimeRange(t) {
      console.log(t)// 结果为一个数组，如：["2018-08-04", "2018-08-06"]
    }
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
    margin-right: 15px;
  }
</style>
