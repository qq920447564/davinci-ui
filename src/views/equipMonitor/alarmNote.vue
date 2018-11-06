<template>
  <div>
    <el-header :height="300">
      <div>

        <el-form ref="form" :model="form" label-width="80px">
          <el-row >
            <el-col :span="4">
              <el-form-item label="产线:">
                <el-input v-model="form.line_id"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="工序:">
                <el-input v-model="form.process"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="开始时间:">
                <el-date-picker
                  v-model="form.begin_time"  @change="chooseTimeRange"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="4" :push="3">
              <el-form-item label="结束时间:">
                <el-date-picker
                  v-model="form.end_time" @change="chooseTimeRange"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4">
              <el-form-item label="是否消除:">
                <el-input v-model="form.is_clear"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="4" :push="2">
              <!--<el-button  type="primary" @click="quickaddFormVisible = true">快速创建</el-button>-->
              <!--<el-button  type="primary" @click="addFormVisible = true">新增</el-button>-->
              <el-button  type="primary" @click="search">搜索</el-button>
              <el-button  type="primary" @click="handle">导出</el-button>
            </el-col>
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
        >
        </el-table-column>
        <el-table-column
          prop="process"
          label="工序"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="设备名称"
        >
        </el-table-column>
        <el-table-column
          prop="device_no"
          label="设备编号"
        >
        </el-table-column>
        <el-table-column
          prop="alarm_type"
          label="报警类型"
        >
        </el-table-column>
        <el-table-column
          prop="alarm_no"
          label="报警编号"
        >
        </el-table-column>
        <el-table-column
          prop="alarm_msg"
          label="报警信息"
        >
        </el-table-column>
        <el-table-column
          prop="started_time" :formatter="dateFormat"
          label="开始时间"
        >
        </el-table-column>
        <el-table-column
          prop="stopped_time" :formatter="dateFormat"
          label="结束时间"
        >
        </el-table-column>
        <el-table-column
        prop="duration"
        label="持续时间"
      >
      </el-table-column>
        <el-table-column
          prop="is_clear"
          label='是否消除'
        >
        </el-table-column>
      </el-table>
    </el-main>
  </div>
</template>

<script>
  import ElHeader from "element-ui/packages/header/src/main";
  import axios from 'axios'
  import moment from 'moment'
  
  export default {
    components: {ElHeader},
    created(){
      axios({
        method:'get',
        baseURL:'/api',
        url:'devices/alarm_stat',
      }).then(
        response=>{
          console.log(response);
          this.tableData=response.data.data.rows;
        }
      ).catch(
        error=>{
          console.log(error);
          alert('网络错误，不能访问');
        }
      )

    },

    data() {
      return {
        options: [{
          value: '选项1',
          label: '是'
        }, {
          value: '选项2',
          label: '否'
        }, ],
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
        tableData: []
      }
    },
    methods:{
      search:function(){
        axios({
          method:'get',
          baseURL:'/api',
          url:'devices/alarm_stat',
          params:{
            lineId:this.form.line_id,
            deviceNo:this.form.device_no,
            process:this.form.process,
            beginDate:this.form.begin_time,
            endDate:this.form.endDate,
            isCleared:this.form.is_clear
          }
        }).then(
          response=>{
            console.log(response);
            this.tableData=response.data.data.rows;
          }
        ).catch(
          error=>{
            console.log(error);
            alert('网络错误，不能访问');
          }
        )

      },
      //表格时间格式转换
      dateFormat:function(row, column) {
        var date = row[column.property];
        if (date == undefined) {
          return "";
        }
        return moment(date).format("YYYY-MM-DD HH:mm:ss");
      },
      //时间选择框格式转换
      chooseTimeRange(t) {
        console.log(t);//结果为一个数组，如：["2018-08-04", "2018-08-06"]
      },
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




</style>
