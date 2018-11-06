<template>
  <div>
    <el-header :height="300">
      <div>

      <el-form ref="form" :model="form" label-width="80px">
        <el-row :gutter="20">
        <el-col :span="4">
        <el-form-item label="产线:">
          <el-input v-model="form.line_id"></el-input>
        </el-form-item>
        </el-col>
        <el-col :span="4">
        <el-form-item label="设备编号:">
          <el-input v-model="form.device_no"></el-input>
        </el-form-item>
        </el-col>
          <el-col :span="4">
            <el-form-item label="达成开始:">
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
            <el-form-item label="达成结束:">
              <el-date-picker
                v-model="form.end_time" @change="chooseTimeRange"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>

          </el-col>
          <el-col :span="6" :push="6">
            <!--<el-button  type="primary" @click="quickaddFormVisible = true">快速创建</el-button>-->
            <!--<el-button  type="primary" @click="addFormVisible = true">新增</el-button>-->
            <el-button  type="primary" @click="search">搜索</el-button>

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
          prop="name"
          label="程序名称"
        >
        </el-table-column>
        <el-table-column
          prop="cnt"
          label="产量计数"
        >
        </el-table-column>
        <el-table-column
          prop="stop_cnt_time" :formatter="dateFormat"
          label="达成时间"
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
    methods: {
      search: function () {
        axios({
          method: 'get',
          baseURL: '/api',
          url: 'devices/output_stat',
          params: {
            lineId:this.form.line_id,
            deviceNo:this.form.device_no,
            beginDate:this.form.begin_time,
            endDate:this.form.end_time

          }
        }).then(
          response => {
            console.log(response);
            this.tableData = response.data.data.rows;
          }
        ).catch(
          error => {
            console.log(error);
            alert('网络错误，不能访问');
          }
        )

      },
      chooseTimeRange(t) {
        console.log(t);//结果为一个数组，如：["2018-08-04", "2018-08-06"]
      },
      dateFormat:function(row, column) {
        var date = row[column.property];
        if (date == undefined) {
          return "";
        }
        return moment(date).format("YYYY-MM-DD HH:mm:ss");
      },
    },


    created(index){
      axios({
        method:'get',
        baseURL:'/api',
        url:'devices/output_stat',
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
        value6: '',
        form: {

        },
        tableData: []
      }
    },


  }
</script>
<style>
  header.el-header{
    padding-top:20px;
  }




</style>
