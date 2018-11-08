<template>
  <div>
    <el-header :height="300">
      <div>
        <el-form ref="form" :model="form" label-width="80px">
          <el-row >
            <div class="grid-content bg-purple mydiv">
              <span class="mytitle">产线:</span>
              <el-select v-model="form.line_id" clearable="true" filterable placeholder="请选择" style="width: 130px">
                <el-option
                  v-for="item in options1"
                  :key="item.value"
                  :label="item.name"
                  :value="item.id"/>
              </el-select>
            </div>
            <div class="grid-content bg-purple mydiv">
              <span class="mytitle">设备编号:</span>
              <el-select v-model="form.device_no" clearable="true" filterable placeholder="请选择" style="width: 130px">
                <el-option
                  v-for="item in options2"
                  :key="item.value"
                  :label="item.name"
                  :value="item.device_no"/>
              </el-select>
            </div>
            <div class="grid-content bg-purple mydiv">
              <span class="mytitle">状态:</span>
              <el-select v-model="form.status" clearable="true" filterable placeholder="请选择" style="width: 130px">
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
                v-model="form.twotimes"
                :picker-options="pickerOptions2"
                value-format="yyyy-MM-dd"
              format="yyyy-MM-dd"
                @change="chooseTimeRange"
              style="width: 280px"
                type="daterange"
                align="right"
                unlink-panels
                start-placeholder="开始日期"
                end-placeholder="结束日期" />
            </div>
            <div class="grid-content bg-purple mydiv">
              <el-checkbox :true-label="1" :false-label="0" v-model="form.isAbnormal">是否异常</el-checkbox>
            </div>
            <el-button type="primary" @click="search">搜索</el-button>
            <!--<el-button type="primary" @click="handle">导出</el-button>-->
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
          prop="statusname"
          label="状态"
        />
        <el-table-column
          :formatter="dateFormat"
          prop="started_time"
          width="170"
          label="开始时间"
        />
        <el-table-column
          :formatter="dateFormat"
          prop="stopped_time"
          width="170"
          label="结束时间"
        />
        <el-table-column
          prop="duration"
          label="持续时间"
        />
        <el-table-column
          prop="is_abnormal"
          label="是否异常"
        />
        <el-table-column
          prop="addon"
          label="异常原因"
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
      options1: [],
      options2: [],
      options3: [{
        value: '0',
        label: '关机'
      }, {
        value: '1',
        label: '加工'
      }, {
        value: '2',
        label: '空闲'
      }, {
        value: '3',
        label: '报警'
      }, {
        value: '4',
        label: '其他'
      }],
      pickerOptions2: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date(YYYY-MM-DD)
            const start = new Date(YYYY-MM-DD)
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date(YYYY-MM-DD)
            const start = new Date(YYYY-MM-DD)
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
      form: {
        begin_time: '',
        end_time: '',
        line_id: '',
        device_no: '',
        status: '',
        isAbnormal: 0,
        twotimes: [],
      },
      value6: '',
      towtimes: [new Date(), new Date()],
      Line: '',
      Line2: '',
      Line3: '',
      tableData: []
    }
  },
  created() {

    axios({
      method: 'get',
      baseURL: '/api',
      url: 'devices/status_stat'
    }).then(
      response => {
        console.log(response)
        this.tableData = response.data.data.rows
        this.tableData.forEach((item, index) => {
          switch (item.status) {
            case 0:
              item['statusname'] = '关机'
              break
            case 1:
              item['statusname'] = '运行'
              break
            case 2:
              item['statusname'] = '空闲'
              break
            case 3:
              item['statusname'] = '报警'
              break
            case 4:
              item['statusname'] = '其它'
              return
          }
        })
        console.log(this.tableData)
      }
    ).catch(
      error => {
        console.log(error)
        alert('网络错误，不能访问')
      }
    )
  },
  mounted(){
    this.chooseTimeRange()
    axios({
      method: 'get',
      baseURL: '/api',
      url: 'lines'
    }).then(
      response => {
        console.log(response)
        // this.tableData = response.data.data.rows
        // this.tableData.forEach((item, index) => {
        //   switch (item.status) {
        //     case 0:
        //       item['statusname'] = '关机'
        //       break
        //     case 1:
        //       item['statusname'] = '运行'
        //       break
        //     case 2:
        //       item['statusname'] = '空闲'
        //       break
        //     case 3:
        //       item['statusname'] = '报警'
        //       break
        //     case 4:
        //       item['statusname'] = '其它'
        //       return
        //   }
        // })
        // console.log(this.tableData)
        console.log(response)
        this.options1=response.data.data
      }
    ).catch(
      error => {
        console.log(error)
        alert('网络错误，不能访问')
      }
    )
    axios({
      method: 'get',
      baseURL: '/api',
      url: 'devices'
    }).then(
      response => {
        console.log(response)
        this.options2=response.data.data
      }
    ).catch(
      error => {
        console.log(error)
        alert('网络错误，不能访问')
      }
    )
  },
  methods: {
    chooseTimeRange(t) {
      console.log(t)// 结果为一个数组，如：["2018-08-04", "2018-08-06"]
    },
    dateFormat: function(row, column) {
      var date = row[column.property]
      if (date == undefined) {
        return ''
      }
      return moment(date).format('YYYY-MM-DD HH:mm:ss')
    },
    search: function() {
      // alert(this.form.twotimes)
      axios({
        method: 'get',
        baseURL: '/api',
        url: 'devices/status_stat',
        params: {
          lineId: this.form.line_id,
          deviceNo: this.form.device_no,
          status: this.form.status,
          isAbnormal: this.form.isAbnormal,
          beginDate: this.form.twotimes[0],
          endDate:this.form.twotimes[1]
        }
      }).then(
        response => {
          console.log(response)
          this.tableData = response.data.data.rows
          this.tableData.forEach((item, index) => {
            switch (item.status) {
              case 0:
                item['statusname'] = '关机'
                break
              case 1:
                item['statusname'] = '运行'
                break
              case 2:
                item['statusname'] = '空闲'
                break
              case 3:
                item['statusname'] = '报警'
                break
              case 4:
                item['statusname'] = '其它'
                return
            }
          })
          console.log(this.tableData)
        }
      ).catch(
        error => {
          console.log(error)
          alert('网络错误，不能访问')
        }
      )
    }
  }
}
</script>
<style>
  header.el-header{
    padding-top: 20px;
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
