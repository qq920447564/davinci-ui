<template>
  <el-container>
    <el-main>
      <div style="background-color: #E9EEF3;margin-bottom: 3px">
        <chart ref="piechart" height="25rem" width="80" style="margin: 0 auto"/>
      </div>
      <div style="background-color: #E9EEF3;max-height: 30rem;min-height: 25rem">
        <el-container>
          <el-header>
            设备实时报警
          </el-header>
          <el-main style="width: 100%;padding-top: 0px;margin-top: -20px">
            <el-table
              v-loading="listLoading"
              :data="tableData"
              border
              fit
              highlight-current-row
              style="width: 100%">
              <el-table-column align="center" label="设备名称" >
                <template slot-scope="scope">
                  <span>{{ scope.row.stat_date }}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="报警信息" >
                <template slot-scope="scope">
                  <span>{{ scope.row.cnt }}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="报警类型" >
                <template slot-scope="scope">
                  <span>{{ scope.row.unqualified_cnt }}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="发生时间" >
                <template slot-scope="scope">
                  <span>{{ scope.row.qualified_cnt }}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="持续时间" >
                <template slot-scope="scope">
                  <span>{{ scope.row.normal_duration }}</span>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
              :current-page="listQuery.currentPage"
              :page-sizes="[5,10,15, 20]"
              :page-size="listQuery.limit"
              :total="total"
              layout="total, sizes, prev, pager, next, jumper"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange" />
          </el-main>
        </el-container>
      </div>
    </el-main>
    <el-main>
      <div style="background-color: #E9EEF3;margin-bottom: 3px">
        <pro-line ref="piechart" height="25rem" width="80" style="margin: 0 auto"/>
      </div>
      <div style="background-color: #E9EEF3;max-height: 30rem;min-height: 25rem">
        <el-container>
          <el-header>
            设备状态实时监控
          </el-header>
          <el-main style="width: 100%;padding-top: 0px;margin-top: -20px">
            <el-row>
              <el-col v-for="(tab, index) in list" :span="12" :key="index">
                <el-card :body-style="{ padding: '0',fontSize: '14px'}">
                  <div :style="{'background-color': showColor(isNull(isLatest(tab.data_points[0]).latest).value), 'display': showCNC(tab.type)}" style="height: 3rem;margin-bottom: 2px">
                    <span style="font-size: 18px;position:relative;bottom: 0.2rem ">{{ tab.name }}</span>
                  </div>
                  <div :style="{'background-color': showColor(isNull(isLatest(tab.data_points[3]).latest).value), 'display': showRobot(tab.type)}" style="height: 3rem;margin-bottom: 2px">
                    <span style="font-size: 18px;position:relative;bottom: 0.2rem ">{{ tab.name }}</span>
                  </div>
                  <div :style="{'background-color': showColor1(isNull(isLatest(tab.data_points[0]).latest).value), 'display': showCNC(tab.type)}" style="width: 96%;margin: 0 auto">
                    <div>
                      <div style="padding: 6px;">
                        <div class="bottom clearfix">
                          <span style="float: left">加工计数：</span>
                          <span style="float: right">{{ isNull(isLatest(tab.data_points[1]).latest).value }}</span>
                        </div>
                        <div class="bottom clearfix">
                          <span style="float: left">主程序号：</span>
                          <span style="float: right">{{ isNull(isLatest(tab.data_points[2]).latest).value }}</span>
                        </div>
                        <div class="bottom clearfix">
                          <span style="float: left">运行行号：</span>
                          <span style="float: right">{{ isNull(isLatest(tab.data_points[3]).latest).value }}</span>
                        </div>
                        <div class="bottom clearfix">
                          <span style="float: left">主轴转速：</span>
                          <span style="float: right">{{ isNull(isLatest(tab.data_points[4]).latest).value }}</span>
                        </div>
                        <div class="bottom clearfix">
                          <span style="float: left">主轴负载：</span>
                          <span style="float: right">{{ isNull(isLatest(tab.data_points[5]).latest).value }}</span>
                        </div>
                        <div class="bottom clearfix">
                          <span style="float: left">主轴倍率：</span>
                          <span style="float: right">{{ isNull(isLatest(tab.data_points[6]).latest).value }}</span>
                        </div>
                        <div class="bottom clearfix">
                          <span style="float: left">进给速度：</span>
                          <span style="float: right">{{ isNull(isLatest(tab.data_points[7]).latest).value }}</span>
                        </div>
                        <div class="bottom clearfix">
                          <span style="float: left">进给倍率：</span>
                          <span style="float: right">{{ isNull(isLatest(tab.data_points[8]).latest).value }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div :style="{'background-color': showColor1(isNull(isLatest(tab.data_points[3]).latest).value), 'display': showRobot(tab.type)}" style="width: 96%;margin: 0 auto">
                    <div style="width: 50%;float: left">
                      <div style="padding: 6px;">
                        <div class="bottom clearfix">
                          <span style="float: left">位置：</span>
                          <span style="float: right">{{ isNull(isLatest(tab.data_points[1]).latest).value }}</span>
                        </div>
                        <div class="bottom clearfix">
                          <span style="float: left">&nbsp;</span>
                          <span style="float: right">&nbsp;</span>
                        </div>
                        <div class="bottom clearfix">
                          <span style="float: left">&nbsp;</span>
                          <span style="float: right">&nbsp;</span>
                        </div>
                        <div class="bottom clearfix">
                          <span style="float: left">&nbsp;</span>
                          <span style="float: right">&nbsp;</span>
                        </div>
                        <div class="bottom clearfix">
                          <span style="float: left">&nbsp;</span>
                          <span style="float: right">&nbsp;</span>
                        </div>
                        <div class="bottom clearfix">
                          <span style="float: left">&nbsp;</span>
                          <span style="float: right">&nbsp;</span>
                        </div>
                        <div class="bottom clearfix">
                          <span style="float: left">&nbsp;</span>
                          <span style="float: right">&nbsp;</span>
                        </div>
                        <div class="bottom clearfix">
                          <span style="float: left">&nbsp;</span>
                          <span style="float: right">&nbsp;</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </el-main>
        </el-container>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import Chart from '@/components/Charts/pieChart'
import ProLine from '@/components/Charts/proLine'
import { getDevicesValue } from '@/api/device'

export default {
  name: 'Integrate',
  components: {
    Chart,
    ProLine
  },
  data() {
    return {
      date: new Date(),
      listLoading: true,
      tableData: [],
      listQuery: {
        currentPage: 1,
        limit: 5,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      total: null,
      list: []
    }
  },
  created() {
    this.fetchData()
  },
  mounted: function() {
    var _this = this // 声明一个变量指向Vue实例this，保证作用域一致
    this.timer1 = setInterval(function() {
      _this.date = new Date() // 修改数据date
    }, 1000)
    this.timer2 = setInterval(function() {
      _this.fetchData()
    }, 5000)
  },
  // 实例销毁之前调用。主要解绑一些使用addEventListener监听的事件等
  beforeDestroy: function() {
    if (this.timer1) {
      clearInterval(this.timer1) // 在Vue实例销毁前，清除我们的定时器
    }
    if (this.timer2) {
      clearInterval(this.timer2) // 在Vue实例销毁前，清除我们的定时器
    }
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    fetchData() {
      getDevicesValue().then(response => {
        this.list = []
        response.data.forEach((item, index) => {
          if (index < 2) {
            this.list.push(item)
          }
        })
      }).catch(error => {
        console.log(error)
        this.$message.error('网络错误，不能访问')
      })
    },
    isNull(val) {
      if (val) {
        return val
      } else {
        return { 'value': '' }
      }
    },
    isLatest(val) {
      if (val) {
        return val
      } else {
        return { 'latest': '' }
      }
    },
    showCNC(val) {
      switch (val) {
        case 'CNC':
          return 'block'
        case 'ROBOT':
          return 'none'
      }
    },
    showRobot(val) {
      switch (val) {
        case 'CNC':
          return 'none'
        case 'ROBOT':
          return 'block'
      }
    },
    showColor(val) {
      switch (val) {
        case 0:
          return 'grey'
        case 1:
          return 'green'
        case 2:
          return 'orange'
        case 3:
          return 'red'
        case 4:
          return 'white'
        case '':
          return 'white'
      }
    },
    showColor1(val) {
      switch (val) {
        case 0:
          return '#F5F5F5'
        case 1:
          return '#98FB98'
        case 2:
          return '#F0E68C'
        case 3:
          return '#FFC0CB'
        case 4:
          return 'white'
        case '':
          return 'white'
      }
    }
  }
}
</script>

<style scoped>
  .el-main {
    color: #333;
    text-align: center;
    line-height: 60px;
    width: 49%;
    border-right-color: white;
    border-width: 3px;
  }
  .el-header {
    color: #333;
    text-align: center;
    line-height: 25px;
    font-weight: 600;
    font-size: 18px;
  }
  .bottom {
    margin-top: 13px;
    line-height: 20px;
    width:100%;
    text-align: center;
    font-size: 13px;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
</style>
