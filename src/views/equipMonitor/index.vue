<template>
  <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      prop="date"
      label="项目"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="1月"
      width="180">
    </el-table-column>
    <el-table-column
      prop="address"
      label="2月">
    </el-table-column>
    <el-table-column
      prop="3"
      label="3月">
    </el-table-column>
    <el-table-column
      prop="4"
      label="4月">
    </el-table-column>
    <el-table-column
      prop="5"
      label="5月">
    </el-table-column>
    <el-table-column
      prop='6'
      label="6月">
    </el-table-column>
    <el-table-column
      prop="7"
      label="7月">
    </el-table-column>
    <el-table-column
      prop="8"
      label="8月">
    </el-table-column>
    <el-table-column
      prop="9"
      label="9月">
    </el-table-column>
    <el-table-column
      prop="10"
      label="10月">
    </el-table-column>
    <el-table-column
      prop="11"
      label="11月">
    </el-table-column>
    <el-table-column
      prop="12"
      label="12月">
    </el-table-column>
    <el-table-column
      prop="total"
      label="合计">
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [{
          date: '时间稼动率',
          name: '88.69%',
          address: '82.59%',
          3:'85.90%',
          4:'87.28%',
          5:'87.66%',
          6:'88.90%',
          7:'84.35%',
          8:'86.73%',
          9:'87.23%',
          10:'86.46%',
          11:'88.95%',
          12:'89.83%',
          total:'87.27%'
        }, {
          date: '性能稼动率',
          name: '88.69%',
          address: '82.59%',
          3:'85.90%',
          4:'87.28%',
          5:'87.66%',
          6:'88.90%',
          7:'84.35%',
          8:'86.73%',
          9:'87.23%',
          10:'86.46%',
          11:'88.95%',
          12:'89.83%',
          total:'87.27%'
        }, {
          date: '良品率',
          name: '88.69%',
          address: '82.59%',
          3:'85.90%',
          4:'87.28%',
          5:'87.66%',
          6:'88.90%',
          7:'84.35%',
          8:'86.73%',
          9:'87.23%',
          10:'86.46%',
          11:'88.95%',
          12:'89.83%',
          total:'87.27%'
        },{
          date: '良品率',
          name: '88.69%',
          address: '82.59%',
          3:'85.90%',
          4:'87.28%',
          5:'87.66%',
          6:'88.90%',
          7:'84.35%',
          8:'86.73%',
          9:'87.23%',
          10:'86.46%',
          11:'88.95%',
          12:'89.83%',
          total:'87.27%'
        }]
      }
    }
  }
</script>
