<template>
  <div>
    <el-header>
      <div>
        <el-form ref="form" :model="form" label-width="80px">
          <el-row >
            <div class="grid-content bg-purple mydiv">
              <span class="mytitle">产线:</span>
              <el-select v-model="form.line_id" clearable filterable placeholder="请选择" style="width:6rem">
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
                  :value="item.device_no"/>
              </el-select>
            </div>
            <div class="grid-content bg-purple mydiv">
              <span class="mytitle">状态:</span>
              <el-select v-model="form.status" clearable filterable placeholder="请选择" style="width:6rem">
                <el-option
                  v-for="item in options3"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"/>
              </el-select>
            </div>
            <div class="grid-content bg-purple mydiv">
              <span class="mytitle">日期</span>
              <!--<p>组件值：{{ form.twotimes  | formatDate}}</p>-->
              <el-date-picker
                v-model="form.twotimes"
                :picker-options="pickerOptions2"
                :unlink-panels="true"
                clearable
                value-format="yyyy-MM-dd"
                format="yyyy-MM-dd"
                style="width:14.5rem"
                type="daterange"
                align="center"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                @change="chooseTimeRange" />
            </div>
            <div class="grid-content bg-purple mydiv">
              <el-checkbox v-model="form.abnormal">仅显示异常状态</el-checkbox>
            </div>
            <div class="grid-content bg-purple mydiv">
            <el-button @click="search">搜索</el-button>
            <el-button @click="handleDownload()">导出</el-button>
            </div>
          </el-row>
        </el-form>
      </div>
    </el-header>
    <el-main>
      <el-table
        v-loading="listLoading"
        :data="tableData"
        border
        @cell-click="edit"
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
          :formatter="formatDuring"
          prop="duration"
          label="持续时间"
        />
        <el-table-column
          prop="abnormal"
          label="是否异常"
        />
        <el-table-column
          prop="addon"
          label="异常原因">
          <!--<template slot-scope="scope">-->
          <!--<div class="grid-content bg-purple mydiv">-->
          <!--<div><el-input style="float:left;" v-model="scope.row.addon" :style="{ width: '90%' }"></el-input></div>-->
          <!--<span style="margin-left:10px;float:right"  class="cell-icon"  @click="handleSave(scope.row)">  <el-button class="el-icon-document" size="mini" round>保存</el-button> </span>-->
          <!--</div>-->
          <!--</template>-->
        </el-table-column>
        <el-table-column
          fixed="right"
          label="备注异常原因"
          width="">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleEdit(scope.$index, scope.row)">备注</el-button>
            <!--<el-button type="text" size="small" @click="handleClick">删除</el-button>-->
          </template>
        </el-table-column>
      </el-table>
      <el-dialog v-model="addFormVisible" :visible.sync="addFormVisible" :close-on-click-modal="false" :append-to-body="true" width="30%" title="原因填写" @close="closeDialog" >
        <el-form ref="addForm" :model="addForm" label-width="80px">
          <el-form-item label="备注">
            <el-input type="textarea" v-model="addForm.addon" :style="{ width: '90%' }"/>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="addFormVisible = false">取消</el-button>
          <el-button  type="primary" @click.native="addSubmit(addForm)">提交</el-button>
        </div>
      </el-dialog>
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
  import { getDeviceStatus, addonPut} from '@/api/device'
  import moment from 'moment'
  import axios from "axios"

  // 在月份、日期、小时等小于10前面补0
  var padDate = function(value) {
    return value < 10 ? '0' + value : value
  }
  export default {
    filters: {
      formatDate: function(value) {
        var date = new Date(value)
        var year = date.getFullYear()
        var month = padDate(date.getMonth() + 1)
        var day = padDate(date.getDate())
        var hours = padDate(date.getHours())
        var minutes = padDate(date.getMinutes())
        var seconds = padDate(date.getSeconds())
        return year + '-' + month + '-' + day + ' ' + ' ' + hours + ':' + minutes + ':' + seconds
      }
    },
    components: { ElHeader },
    data() {
      return {
        addFormVisible:false,
        addForm:{
          addon:''
        },
        listLoading: true,
        listQuery: {
          currentPage: 1,
          limit: 10,
          importance: undefined,
          title: undefined,
          type: undefined,
          sort: '+id'
        },
        options1: [],
        options2: [],
        options3: [{
          value: '0',
          label: '关机'
        }, {
          value: '1',
          label: '运行'
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
        form: {
          begin_time: '',
          end_time: '',
          line_id: '',
          device_no: '',
          status: '',
          abnormal: false,
          twotimes: []
        },
        value6: '',
        Line: '',
        Line2: '',
        Line3: '',
        tableData: [],
        inputColumn1:"",
        addon:null,
        total: null
      }
    },
    created() {
      // 处理默认时间控件的方法
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
      // 后台接收数据get得到表格数据
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
          const tHeader = ['产线', '工序', '设备名称','设备编号','状态','开始时间','结束时间','持续时间','是否异常','异常原因']
          const filterVal = ['line_id', 'process', 'name','device_no','statusname','started_time','stopped_time','duration','abnormal','addon']
          const list = this.tableData
          for(let i=0;i<list.length;i++){
            console.log(list[i].duration)
            list[i].duration= this.MillisecondToDate(list[i].duration)
          }
          const data = this.formatJson(filterVal, list)
          export_json_to_excel(tHeader, data, '运行记录列表'+moment(new Date()).format('YYYYMMDDHHmmss'))
          this.downloadLoading = false
        })
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      },
      cellPut(id,addon){
        addonPut(id,addon).then(
          response=>{
            console.log(response)
            this.search()
            this.addFormVisible = false
            this.$message('备注成功')
          }
        ).catch(
          error => {
            console.log(error)
            this.$message.error('网络错误，不能访问')
          }
        )

      },
      handleEdit: function(index, row) {
        console.log(row.id)
        this.addFormVisible = true
        this.rep = row.id
        this.addForm.addon = row.addon
      },
      addSubmit(addForm){
        this.cellPut(this.rep,this.addForm.addon)

      },

      chooseTimeRange(t) {
        console.log(t)// 结果为一个数组，如：["2018-08-04", "2018-08-06"]
      },
      dateFormat: function(row, column) {
        var date = row[column.property]
        if (date === undefined) {
          return ''
        }
        return moment(date).format('YYYY-MM-DD HH:mm:ss')
      },
      // 表格里面的时间格式转换
      formatDuring: function(row, column) {
        var msd = row[column.property]
        // if (msd === undefined) {
        //   return ''
        // }
        // return moment.duration(msd).hours()
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
            this.$message.error('网络错误，不能访问')
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
      fetchDeviceData(lineId, deviceNo, status, beginDate, endDate, abnormal, limit, offset) {
        getDeviceStatus(lineId, deviceNo, status, beginDate, endDate, abnormal, limit, ((offset - 1) * limit)).then(
          response => {
            console.log(response)
            this.listLoading = false
            this.tableData = response.data.rows
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
            this.tableData.forEach((item, index) => {
              switch (item.abnormal) {
                case false:
                  item['abnormal'] = '否'
                  break
                case true:
                  item['abnormal'] = '是'
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

            console.log(this.tableData)
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
        this.fetchDeviceData(this.form.line_id, this.form.device_no, this.form.status, moment(this.form.twotimes[0]).format('YYYY-MM-DD'), moment(this.form.twotimes[1]).format('YYYY-MM-DD'), this.form.abnormal, this.listQuery.limit, this.listQuery.currentPage)
      },
      getTotal() {
        getDeviceStatus().then(
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
      handleSizeChange(val) {
        this.fetchDeviceData(this.form.line_id, this.form.device_no, this.form.status, moment(this.form.twotimes[0]).format('YYYY-MM-DD'), moment(this.form.twotimes[1]).format('YYYY-MM-DD'), this.form.abnormal, val, this.listQuery.currentPage)
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange(val) {
        this.fetchDeviceData(this.form.line_id, this.form.device_no, this.form.status, moment(this.form.twotimes[0]).format('YYYY-MM-DD'), moment(this.form.twotimes[1]).format('YYYY-MM-DD'), this.form.abnormal, this.listQuery.limit, val)
        console.log(`当前页: ${val}`)
      },
      handle() {}
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
    margin-right: 0.1rem;
  }
</style>
