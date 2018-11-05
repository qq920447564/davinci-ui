<template>
  <div>
    <el-header :height="100">
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
      <el-row>
        <el-form label-width="80px" style="padding-top: 20px">
          <el-col :span="6" :offset="15">
            <el-form-item label="产线:">
              <el-select placeholder="请选择">
                <!--<el-option-->
                <!--v-for="item in options"-->
                <!--:key="item.value"-->
                <!--:label="item.label"-->
                <!--:value="item.value"/>-->
              </el-select>
            </el-form-item>
          </el-col>
          <el-button type="primary">搜索</el-button>
        </el-form>
      </el-row>
    </el-header>
    <el-main>
      <el-row>
        <el-col v-for="tab in list" :span="4" :key="tab">
          <el-card :body-style="{ padding: '0'}">
            <div style="width:100%;text-align: center">
              <img :src="imgUrl1" class="image">
            </div>
            <div style="width: 85%;margin: 0 auto">
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
                  <span style="float: right">{{ tab.did }}</span>
                </div>
                <div class="bottom clearfix">
                  <span style="float: left">正常运行：</span>
                  <span style="float: right">{{ tab.normal_duration }}</span>
                </div>
                <div class="bottom clearfix">
                  <span style="float: left">空闲时长：</span>
                  <span style="float: right">{{ tab.free_duration }}</span>
                </div>
                <div class="bottom clearfix">
                  <span style="float: left">报警时长：</span>
                  <span style="float: right">{{ tab.poweroff_duration }}</span>
                </div>
                <div class="bottom clearfix">
                  <span style="float: left">关机时长：</span>
                  <span style="float: right">{{ tab.did }}</span>
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
  </div>
</template>

<script>
import axios from 'axios'
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
    }
  },
  data() {
    return {
      date: new Date(),
      imgUrl: '../../../static/1.jpg',
      imgUrl1: '../../../static/2.jpg',
      list: null
    }
  },
  created: function() {
    axios({
      method: 'get',
      baseURL: '/api',
      url: 'dashboard/line/device_stat?date=2018-10-30'
    }).then(
      response => {
        this.list = response.data.data
        console.log(this.list)
      }
    ).catch(
      error => {
        console.log(error)
        alert('网络错误，不能访问')
      }
    )
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
  // created() {
  //   this.fetchData()
  // },
  methods: {
    fetchData() {
      getList().then(response => {
        this.list = response.data.items
        console.log(this.list)
      }).catch(error => {
        console.log(error)
        alert('网络错误，不能访问')
      })
    }
  }
}
</script>
<style scoped>
  .image {
    margin: 0 auto;
    display: block;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
    width:100%;
    text-align: center;
    font-size: 15px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
</style>
