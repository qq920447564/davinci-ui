<template>
  <el-container>
    <el-header>
      <el-row>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <h1>产线设备状态看板</h1>
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
        <el-col v-for="(tab, index) in list" :span="4" :key="index">
          <el-card :body-style="{ padding: '0'}">
            <div :style="{'background-color':color(tab.status), 'width':'100%', 'height':'15rem', 'text-align': 'center', 'padding': '10%'}">
              <img :src="tab.image" class="image">
            </div>
            <div style="width: 92%;margin: 0 auto">
              <div style="padding: 14px;">
                <div class="bottom clearfix">
                  <span style="float: left">设备名称：</span>
                  <span style="float: right">{{ tab.name }}</span>
                </div>
                <div class="bottom clearfix">
                  <span style="float: left">设备编号：</span>
                  <span style="float: right">{{ tab.did }}</span>
                </div>
                <div class="bottom clearfix">
                  <span style="float: left">生产数量：</span>
                  <span style="float: right">{{ tab.output_cnt }}</span>
                </div>
                <div class="bottom clearfix">
                  <span style="float: left">正常运行：</span>
                  <span style="float: right">{{ tab.normal_duration | MillisecondToDate }}</span>
                </div>
                <div class="bottom clearfix">
                  <span style="float: left">空闲时长：</span>
                  <span style="float: right">{{ tab.free_duration | MillisecondToDate }}</span>
                </div>
                <div class="bottom clearfix">
                  <span style="float: left">报警时长：</span>
                  <span style="float: right">{{ tab.poweroff_duration | MillisecondToDate }}</span>
                </div>
                <div class="bottom clearfix">
                  <span style="float: left">关机时长：</span>
                  <span style="float: right">{{ tab.poweroff_duration | MillisecondToDate }}</span>
                </div>
                <div class="bottom clearfix">
                  <span style="float: left">报警次数：</span>
                  <span style="float: right">{{ tab.alarm_times }}</span>
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
// import axios from 'axios'
import { getList } from '@/api/table'
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
      imgUrl: '../../../static/1.jpg',
      imgUrl1: '../../../static/2.jpg',
      list: null,
      colors: null
    }
  },
  created() {
    this.fetchData()
  },
  mounted: function() {
    var _this = this // 声明一个变量指向Vue实例this，保证作用域一致
    this.timer = setInterval(function() {
      _this.date = new Date() // 修改数据date
    }, 1000)
  },
  // 实例销毁之前调用。主要解绑一些使用addEventListener监听的事件等
  beforeDestroy: function() {
    if (this.timer) {
      clearInterval(this.timer) // 在Vue实例销毁前，清除我们的定时器
    }
  },
  methods: {
    fetchData() {
      getList().then(response => {
        console.log(response.data)
        this.list = response.data
      }).catch(error => {
        console.log(error)
        alert('网络错误，不能访问')
      })
    },
    color(status) {
      switch (status) {
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
