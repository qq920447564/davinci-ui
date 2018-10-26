<template>
  <el-container>
    <el-header>
      <el-row>
        <el-col :span="3">
          <div class="grid-content bg-purple">
            <span class="mytitle">产线</span>
            <el-select v-model="Line" filterable placeholder="请选择" style="width: 100px">
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value"/>
            </el-select>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="grid-content bg-purple">
            <span class="mytitle">产品</span>
            <el-select v-model="production" filterable placeholder="请选择" style="width: 100px">
              <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.value"/>
            </el-select>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <span class="mytitle">统计区间</span>
            <el-select v-model="statistical" filterable placeholder="请选择" style="width: 100px">
              <el-option
                v-for="item in options3"
                :key="item.value"
                :label="item.label"
                :value="item.value"/>
            </el-select>
          </div>
        </el-col>
        <el-col :span="10" style="padding-right: 0px">
          <div class="grid-content bg-purple">
            <span class="mytitle">日期</span>
            <el-date-picker
              v-model="towtimes"
              :picker-options="pickerOptions2"
              style="width: 390px"
              type="daterange"
              align="center"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期" />
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple">
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
        <el-table-column align="center" label="生产差异" >
          <template slot-scope="scope">
            <span>{{ scope.row.difference }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="达成率" >
          <template slot-scope="scope">
            <span>{{ scope.row.oee }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" >
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleClick()">查看当班人员</el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" label="备注" >
          <template slot-scope="scope">
            <span>{{ scope.row.note }}</span>
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
    <el-dialog :visible.sync="dialogTableVisible" title="当班人员信息">
      <el-table :data="gridData">
        <el-table-column property="name" label="姓名" />
        <el-table-column property="up" label="上班时间" />
        <el-table-column property="down" label="下班时间"/>
      </el-table>
    </el-dialog>
  </el-container>
</template>

<script>
export default {
  name: 'Plan',
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
      options3: [{
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
        difference: 2,
        oee: 98,
        note: 'xxxxxxxxx'
      }, {
        date: '2016-05-02',
        timeinterval: '0:00-24:00',
        actualpro: 100,
        difference: 2,
        oee: 98,
        note: 'xxxxxxxxx'
      }, {
        date: '2016-05-02',
        timeinterval: '0:00-24:00',
        actualpro: 100,
        difference: 2,
        oee: 98,
        note: 'xxxxxxxxx'
      }, {
        date: '2016-05-02',
        timeinterval: '0:00-24:00',
        actualpro: 100,
        difference: 2,
        oee: 98,
        note: 'xxxxxxxxx'
      }, {
        date: '2016-05-02',
        timeinterval: '0:00-24:00',
        actualpro: 100,
        difference: 2,
        oee: 98,
        note: 'xxxxxxxxx'
      }, {
        date: '2016-05-02',
        timeinterval: '0:00-24:00',
        actualpro: 100,
        difference: 2,
        oee: 98,
        note: 'xxxxxxxxx'
      }, {
        date: '2016-05-02',
        timeinterval: '0:00-24:00',
        actualpro: 100,
        difference: 2,
        oee: 98,
        note: 'xxxxxxxxx'
      }, {
        date: '2016-05-02',
        timeinterval: '0:00-24:00',
        actualpro: 100,
        difference: 2,
        oee: 98,
        note: 'xxxxxxxxx'
      }],
      listQuery: {
        currentPage: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      gridData: [{
        name: '王小虎',
        up: '2018-11-03 21:00:00',
        down: '2018-11-04 8:00:00'
      }],
      dialogTableVisible: false,
      towtimes: '',
      statistical: '',
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
    },
    handleClick() {
      this.dialogTableVisible = true
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
</style>
