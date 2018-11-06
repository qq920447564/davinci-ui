<template>
  <el-container>
    <el-header>
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple mydiv">
            <span class="mytitle">产线</span>
            <el-select v-model="Line" filterable placeholder="请选择" style="width: 130px">
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value"/>
            </el-select>
          </div>
          <div class="grid-content bg-purple mydiv">
            <span class="mytitle">产品</span>
            <el-select v-model="production" filterable placeholder="请选择" style="width: 130px">
              <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.value" />
            </el-select>
          </div>
          <div class="grid-content bg-purple mydiv">
            <span class="mytitle">日期</span>
            <el-date-picker
              v-model="towtimes"
              :picker-options="pickerOptions2"
              style="width: 390px"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期" />
          </div>
          <div class="grid-content bg-purple mydiv">
            <el-button>搜索</el-button>
            <el-button>导出</el-button>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <el-table
        v-loading="listLoading"
        :data="tableData"
        border
        fit
        highlight-current-row
        style="width: 100%">
        <el-table-column align="center" label="日期" >
          <template slot-scope="scope">
            <span>{{ scope.row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="时间区间" >
          <template slot-scope="scope">
            <span>{{ scope.row.timeinterval }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="实际生产" >
          <template slot-scope="scope">
            <span>{{ scope.row.actualpro }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="不合格产品数" >
          <template slot-scope="scope">
            <span>{{ scope.row.unqualifynum }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="合格产品数" >
          <template slot-scope="scope">
            <span>{{ scope.row.qualifynum }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="正常运行时间" >
          <template slot-scope="scope">
            <span>{{ scope.row.normaltime }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="OEE" >
          <template slot-scope="scope">
            <span>{{ scope.row.oee }}%</span>
          </template>
        </el-table-column>
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
  </el-container>
</template>

<script>
export default {
  name: 'OEE',
  data() {
    return {
      listLoading: true,
      options1: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      options2: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
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
      tableData: [{
        date: '2016-05-02',
        timeinterval: '0:00-24:00',
        actualpro: 100,
        unqualifynum: 2,
        qualifynum: 98,
        normaltime: '10:00:00',
        oee: 98
      }, {
        date: '2016-05-02',
        timeinterval: '0:00-24:00',
        actualpro: 100,
        unqualifynum: 2,
        qualifynum: 98,
        normaltime: '10:00:00',
        oee: 98
      }, {
        date: '2016-05-02',
        timeinterval: '0:00-24:00',
        actualpro: 100,
        unqualifynum: 2,
        qualifynum: 98,
        normaltime: '10:00:00',
        oee: 98
      }, {
        date: '2016-05-02',
        timeinterval: '0:00-24:00',
        actualpro: 100,
        unqualifynum: 2,
        qualifynum: 98,
        normaltime: '10:00:00',
        oee: 98
      }, {
        date: '2016-05-02',
        timeinterval: '0:00-24:00',
        actualpro: 100,
        unqualifynum: 2,
        qualifynum: 98,
        normaltime: '10:00:00',
        oee: 98
      }, {
        date: '2016-05-02',
        timeinterval: '0:00-24:00',
        actualpro: 100,
        unqualifynum: 2,
        qualifynum: 98,
        normaltime: '10:00:00',
        oee: 98
      }, {
        date: '2016-05-02',
        timeinterval: '0:00-24:00',
        actualpro: 100,
        unqualifynum: 2,
        qualifynum: 98,
        normaltime: '10:00:00',
        oee: 98
      }, {
        date: '2016-05-02',
        timeinterval: '0:00-24:00',
        actualpro: 100,
        unqualifynum: 2,
        qualifynum: 98,
        normaltime: '10:00:00',
        oee: 98
      }],
      listQuery: {
        currentPage: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      towtimes: '',
      Line: '',
      production: '',
      total: 10
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      this.listLoading = false
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    }
  }
}
</script>

<style scoped>
  .el-header, .el-footer {
    line-height: 60px;
  }

  .el-aside {
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    text-align: center;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }

  .el-row {
    margin-bottom: 20px;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .mytitle{
    font-size: .9rem;
    margin-right: 5px;
  }
  .mydiv{
    display: inline;
    margin-right: 15px;
  }
</style>
