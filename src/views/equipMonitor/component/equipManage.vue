<template>
  <div>
    <el-header >
      <el-row>
      <!--<p>设备管理列表</p>-->
      <el-button  type="primary" @click="search" >新增</el-button>
      </el-row>
    </el-header>
    <el-main>
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          fixed
          prop="date"
          label="ID"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="设备类型编码"
        >
        </el-table-column>
        <el-table-column
          prop="province"
          label="设备编号"
        >
        </el-table-column>
        <el-table-column
          prop="city"
          label="设备名称"
        >
        </el-table-column>
        <el-table-column
          prop="state"
          label="工序"
        >
        </el-table-column>
        <el-table-column
          prop="begin_time"
          label="产线"
        >
        </el-table-column>
        <el-table-column
          prop="begin_time"
          label="启用"
        >
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="300">
          <template slot-scope="scope">
            <el-button @click="handleClick" type="text" size="small">禁用</el-button>
            <el-button @click="handleClick" type="text" size="small">修改</el-button>
            <el-button @click="handleClick" type="text" size="small">数据项配置</el-button>
            <el-button @click="handleClick" type="text" size="small">图片配置</el-button>
          </template>
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
