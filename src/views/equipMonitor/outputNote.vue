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
            <!--<div class="grid-content bg-purple mydiv">-->
              <!--<span class="mytitle">状态:</span>-->
              <!--<el-select v-model="form.status" clearable="true" filterable placeholder="请选择" style="width: 130px">-->
                <!--<el-option-->
                  <!--v-for="item in options3"-->
                  <!--:key="item.value"-->
                  <!--:label="item.label"-->
                  <!--:value="item.value"/>-->
              <!--</el-select>-->
            <!--</div>-->
            <div class="grid-content bg-purple mydiv">
              <span class="mytitle">达成日期</span>
              <el-date-picker
                v-model="form.twotimes" clearable="true"
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
            <!--<div class="grid-content bg-purple mydiv">-->
              <!--<el-checkbox  v-model="form.abnormal">是否异常</el-checkbox>-->
            <!--</div>-->
            <el-button @click="search">搜索</el-button>
            <el-button  @click="handle">导出</el-button>
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
          prop="name"
          label="程序名称"
        />
        <el-table-column
          prop="cnt"
          label="产量计数"
        />
        <el-table-column
          :formatter="dateFormat"
          prop="stop_cnt_time"
          label="达成时间"
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
import axios from 'axios'
import moment from 'moment'

export default {
  components: { ElHeader },

  data() {
    return {
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
      value6: '',
      form: {
      },
      towtimes: [new Date(), new Date()],
      tableData: []
    }
  },

  created(index) {
    function dateFormatter(str){//默认返回yyyy-MM-dd HH-mm-ss
      var hasTime = arguments[1] != false ? true : false;//可传第二个参数false，返回yyyy-MM-dd
      var d = new Date(str);
      var year = d.getFullYear();
      var month = (d.getMonth()+1)<10 ? '0'+(d.getMonth()+1) : (d.getMonth()+1);
      var day = d.getDate()<10 ? '0'+d.getDate() : d.getDate();
      // var hour = d.getHours()<10 ? '0'+d.getHours() : d.getHours();
      // var minute = d.getMinutes()<10 ? '0'+d.getMinutes() : d.getMinutes();
      // var second = d.getSeconds()<10 ? '0'+d.getSeconds() : d.getSeconds();
      if(hasTime){
        return [year, month, day].join('-');
      }else{
        return [year, month, day].join('-');
      }
    }
    let start =dateFormatter(new Date())
    let end = dateFormatter(new Date())
    this.form.twotimes = [start, end];
    axios({
      method: 'get',
      baseURL: '/api',
      url: 'devices/output_stat'
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
  mounted(){
    this.chooseTimeRange()
    axios({
      method: 'get',
      baseURL: '/api',
      url: 'lines'
    }).then(
      response => {
        this.options1 = response.data.data
        this.form.line_id = this.options1[0].id
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
        this.options2 = response.data.data
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
      if (!this.form.twotimes){
        this.form.twotimes = []
      }
      axios({
        method: 'get',
        baseURL: '/api',
        url: 'devices/output_stat',
        params: {
          lineId: this.form.line_id,
          deviceNo: this.form.device_no,
          beginDate: moment(this.towtimes[0]).format('YYYY-MM-DD'),
          endDate: moment(this.towtimes[1]).format('YYYY-MM-DD')
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
    chooseTimeRange(t) {
      console.log(t)// 结果为一个数组，如：["2018-08-04", "2018-08-06"]
    },
    dateFormat: function(row, column) {
      var date = row[column.property]
      if (date === undefined) {
        return ''
      }
      return moment(date).format('YYYY-MM-DD HH:mm:ss')
    }
  }

}
</script>
<style>
  header.el-header{
    padding-top:20px;
  }
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
