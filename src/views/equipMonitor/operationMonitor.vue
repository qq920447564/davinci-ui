<template>
  <div>
  <el-header style="display: none"></el-header>
  <el-main>
  <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      fixed
      prop="date"
      label="变量名称"
     >
    </el-table-column>
    <el-table-column
      prop="name"
      label="变量别名"
      >
    </el-table-column>
    <el-table-column
      prop="province"
      label="当前值"
     >
    </el-table-column>
    <el-table-column
      prop="city"
      label="单位"
      >
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick" type="text" size="small">历史曲线</el-button>
      </template>
    </el-table-column>
  </el-table>
  </el-main>
  </div>
</template>

<script>
  import ElHeader from "element-ui/packages/header/src/main";
  import lineChart from '../../views/equipMonitor/component/lineChart'


  export default {
    components: {ElHeader,lineChart},
    methods: {
      handleClick:function(){
        this.$router.push('/historicalLine/historicalLine');

      }
    },

    data() {
      return {
        tableData: [{
          date: 'spindle_rate\n',
          name: '主轴倍率\n',
          province: '100',
          city: '%',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: 'feed_rate\n',
          name: '进给倍率\n',
          province: '100',
          city: '%',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: 'spindle_load\n',
          name: '主轴负载\n',
          province: '50',
          city: '%',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        },
          {
            date: 'prog_name\n',
            name: '当前程序号\n',
            province: '00001',
            city: '--',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333
          },
          {
            date: 'work_counter\n',
            name: '加工数量\n',
            province: '234',
            city: '件',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333
          },
          {
            date: 'spindle_speed\n',
            name: '主轴转速\n',
            province: '1223',
            city: 'r/min',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333
          }]
      }
    },


  }
</script>
