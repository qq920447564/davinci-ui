<template>
  <el-container>
    <el-header>
      <el-row>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <h1>设备参数看板</h1>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light" style="float: right">
            <h2>{{ date| formatDate }}</h2>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <el-row>
        <el-col v-for="(tab, index) in list" :span="6" :key="index">
          <el-card :body-style="{ padding: '0'}">
            <div :style="{'background-color': showColor(isNull(isLatest(tab.data_points[0]).latest).value), 'display': showCNC(tab.type)}" style="height: 3rem;">
              <span style="font-size: 18px;position:relative;bottom: 3.3rem ">{{ tab.name }}</span>
            </div>
            <div :style="{'background-color': showColor(isNull(isLatest(tab.data_points[3]).latest).value), 'display': showRobot(tab.type)}" style="height: 3rem;">
              <span style="font-size: 18px;position:relative;bottom: 3.3rem ">{{ tab.name }}</span>
            </div>
            <div :style="{'display': showCNC(tab.type)}" style="width: 96%;margin: 0 auto">
              <div style="width: 50%;float: left">
                <div style="padding: 6px;">
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
              <div style="width: 50%;float: right">
                <div style="padding: 6px;">
                  <div class="bottom clearfix">
                    <span style="float: left">加工计数：</span>
                    <span style="float: right">{{ isNull(isLatest(tab.data_points[1]).latest).value }}</span>
                  </div>
                  <div class="bottom clearfix">
                    <span style="float: left">门开：</span>
                    <span style="float: right">{{ isNull(isLatest(tab.data_points[10]).latest).value }}</span>
                  </div>
                  <div class="bottom clearfix">
                    <span style="float: left">门关：</span>
                    <span style="float: right">{{ isNull(isLatest(tab.data_points[11]).latest).value }}</span>
                  </div>
                  <div class="bottom clearfix">
                    <span style="float: left">卡盘夹紧：</span>
                    <span style="float: right">{{ isNull(isLatest(tab.data_points[12]).latest).value }}</span>
                  </div>
                  <div class="bottom clearfix">
                    <span style="float: left">卡盘松开：</span>
                    <span style="float: right">{{ isNull(isLatest(tab.data_points[13]).latest).value }}</span>
                  </div>
                  <div class="bottom clearfix">
                    <span style="float: left">上料信号：</span>
                    <span style="float: right">{{ isNull(isLatest(tab.data_points[14]).latest).value }}</span>
                  </div>
                  <div class="bottom clearfix">
                    <span style="float: left">下料信号：</span>
                    <span style="float: right">{{ isNull(isLatest(tab.data_points[15]).latest).value }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div :style="{'display': showRobot(tab.type)}" style="width: 96%;margin: 0 auto">
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
                </div>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-main>
    <el-footer>
      <table/>
    </el-footer>
  </el-container>
</template>

<script>
import { getDevicesValue } from '@/api/device'
// 在月份、日期、小时等小于10前面补0
var padDate = function(value) {
  return value < 10 ? '0' + value : value
}

export default {
  filters: {
    formatDate: function(value) {
      var date = new Date(value)
      var year = date.getFullYear()
      var month = padDate(date.getMonth() + 1)
      var day = padDate(date.getDate())
      var hours = padDate(date.getHours())
      var minutes = padDate(date.getMinutes())
      var seconds = padDate(date.getSeconds())
      return year + '-' + month + '-' + day + ' ' + ' ' + hours + ':' + minutes + ':' + seconds
    },
    MillisecondToDate(msd) {
      var time = parseFloat(msd) / 1000
      if (time != null && time !== '') {
        if (time > 60 && time < 60 * 60) {
          time = '00:' + padDate(parseInt(time / 60.0)) + ':' + padDate(parseInt((parseFloat(time / 60.0) -
              parseInt(time / 60.0)) * 60))
        } else if (time >= 60 * 60 && time < 60 * 60 * 24) {
          time = padDate(parseInt(time / 3600.0)) + ':' + padDate(parseInt((parseFloat(time / 3600.0) -
              parseInt(time / 3600.0)) * 60)) + ':' +
              padDate(parseInt((parseFloat((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60) -
                parseInt((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60)) * 60))
        } else {
          time = '00:00:' + padDate(parseInt(time))
        }
      }
      return time
    }
  },
  data() {
    return {
      date: new Date(),
      list: null
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
    fetchData() {
      getDevicesValue().then(response => {
        this.list = response.data
      }).catch(error => {
        console.log(error)
        alert('网络错误，不能访问')
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
    }
  }
}
</script>
<style scoped>
  .el-header, .el-footer {
    line-height: 40px;
  }
  .el-main {
    text-align: center;
    line-height: 160px;
  }

  .el-aside {
    text-align: center;
    line-height: 200px;
  }
  .el-main {
    text-align: center;
    line-height: 160px;
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
  .image {
    margin: 0 auto;
    display: block;
    height: 100%;
    width: 100%;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
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
