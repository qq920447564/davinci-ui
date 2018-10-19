<template>
  <div>
    <el-header :height="300">
      <div>

      <el-form ref="form" :model="form" label-width="80px">
        <el-row :gutter="20">
        <el-col :span="6">
        <el-form-item label="产线:">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        </el-col>
        <el-col :span="6">
        <el-form-item label="设备编号:">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="日期:">
            <el-date-picker
              v-model="value6"
              type="datetimerange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['12:00:00']">
            </el-date-picker>
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
          prop="date"
          label="产线"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="工序"
        >
        </el-table-column>
        <el-table-column
          prop="province"
          label="设备名称"
        >
        </el-table-column>
        <el-table-column
          prop="city"
          label="设备编号"
        >
        </el-table-column>
        <el-table-column
          prop="state"
          label="程序名称"
        >
        </el-table-column>
        <el-table-column
          prop="begin_time"
          label="产量计数"
        >
        </el-table-column>
        <el-table-column
          prop="end_time"
          label="达成时间"
        >
        </el-table-column>
      </el-table>
    </el-main>
  </div>
</template>

<script>
  import ElHeader from "element-ui/packages/header/src/main";



  export default {
    components: {ElHeader},
    methods: {
      // handleClick:function(){
      //   this.$router.push('/historicalLine/historicalLine');
      //
      // }
    },

    data() {
      return {
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
        tableData: [{
          date: '康明斯\n',
          name: 'OP10\n\n',
          province: '机床1\n',
          city: 'OP10-1\n',
          state: '加工\n',
          begin_time: 200333,
          end_time:200333,
          during_time:10,
          if_wrong:'is'

        }, {
          date: '康明斯\n\n',
          name: 'OP10\n\n',
          province: '机床1\n',
          city: 'OP10-1\n',
          state: '空闲\n',
          begin_time: 200333,
          end_time:200333,
          during_time:10,
          if_wrong:'is'
        }, {
          date: '康明斯\n\n',
          name: 'OP10\n\n',
          province: '机床1\n',
          city: 'OP10-1\n',
          state: '报警\n',
          begin_time: 200333,
          end_time:200333,
          during_time:10,
          if_wrong:''
        },
          {
            date: '康明斯\n\n',
            name: 'OP10\n\n',
            province: '机床1\n',
            city: 'OP10-1\n',
            state: '关机\n',
            begin_time: 200333,
            end_time:200333,
            during_time:10,
            if_wrong:''
          },
          {
            date: '康明斯\n\n',
            name: 'OP10\n\n',
            province: '机床1\n',
            city: 'OP10-1\n',
            state: '加工\n',
            begin_time: 200333,
            end_time:200333,
            during_time:10,
            if_wrong:''
          },
          {
            date: '康明斯\n\n',
            name: 'OP10\n\n',
            province: '机床1\n',
            city: 'OP10-1\n',
            state: '空闲',
            begin_time: 200333,
            end_time:200333,
            during_time:10,
            if_wrong:''
          }]
      }
    },


  }
</script>
<style>
  header.el-header{
    padding-top:20px;
  }




</style>
