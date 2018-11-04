<template>
  <div>
    <el-header :height="300">
      <div>
        <el-form ref="form" :model="form" label-width="80px">
          <el-row :gutter="10">
            <el-col :span="4">
              <el-form-item label="产线:">
                <el-input v-model="form.name"/>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="设备编号:">
                <el-input v-model="form.name"/>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="状态:">
                <el-input v-model="form.name"/>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="是否异常:">
                <el-input v-model="form.name"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="日期:">
                <el-date-picker
                  v-model="value6"
                  :default-time="['12:00:00']"
                  type="datetimerange"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"/>
              </el-form-item>
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
          prop="status"
          label="状态"
        />
        <el-table-column
          prop="started_time"
          label="开始时间"
        />
        <el-table-column
          prop="stopped_time"
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

export default {
  components: { ElHeader },
  created(){
    axios({
      method:'get',
      baseURL:'/api',
      url:'devices/status_stat',
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
      value6: '',
      tableData: []
    }
  },
  methods: {
    // handleClick:function(){
    //   this.$router.push('/historicalLine/historicalLine');
    //
    // }
  }

}
</script>
<style>
  header.el-header{
    padding-top: 20px;
  }
  .el-date-editor--datetimerange.el-input, .el-date-editor--datetimerange.el-input__inner{
    width:220px;
  }
</style>
