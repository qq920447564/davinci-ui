<template>
  <el-container>
    <el-aside width="15%" style="background-color: #E9EEF3">
      <el-input
        v-model="filterText"
        placeholder="输入关键字进行过滤"/>

      <el-tree
        ref="tree2"
        :data="data2"
        :props="defaultProps"
        :filter-node-method="filterNode"
        class="filter-tree"
        default-expand-all
        @node-click="handleNodeClick"
      />

    </el-aside>
    <el-container>
      <el-main>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <!-- 基本信息 -->
          <el-tab-pane label="基本信息" name="first">
            <el-container>
              <el-aside width="60%" style="text-align: left">
                <div>
                  <div style="font-size: 14px">
                    <span style="color: red">*</span>
                    <span>设备编码：&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <el-input v-model="input1" placeholder="请输入内容" style="width: 80%" disabled/>
                  </div>
                  <div style="font-size: 14px">
                    <span style="color: red">*</span>
                    <span>设备名称：&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <el-input v-model="input2" placeholder="请输入内容" style="width: 80%" disabled/>
                  </div>
                  <div style="font-size: 14px">
                    <span style="color: red">*</span>
                    <span>所属工序：&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <el-select v-model="process" filterable placeholder="请选择" style="width: 80%" disabled>
                      <el-option
                        v-for="item in options1"
                        :key="item"
                        :label="item"
                        :value="item"/>
                    </el-select>
                  </div>
                  <div style="font-size: 14px">
                    <span style="color: red">*</span>
                    <span>所属产线：&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <el-select v-model="Line" filterable placeholder="请选择" style="width: 80%" disabled>
                      <el-option
                        v-for="item in options2"
                        :key="item.value"
                        :label="item.name"
                        :value="item.id"/>
                    </el-select>
                  </div>
                  <div style="font-size: 14px">
                    <span>设备S/N：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <el-input v-model="input2" placeholder="请输入内容" style="width: 80%"/>
                  </div>
                  <div style="font-size: 14px">
                    <span>出厂日期：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <el-date-picker
                      v-model="value1"
                      type="date"
                      placeholder="选择日期"
                      style="width: 79%"/>
                  </div>
                  <div style="font-size: 14px">
                    <span>投产日期：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <el-date-picker
                      v-model="value2"
                      type="date"
                      placeholder="选择日期"
                      style="width: 79%"/>
                  </div>
                  <div style="font-size: 14px">
                    <span>质保开始日期：</span>
                    <el-date-picker
                      v-model="value3"
                      type="date"
                      placeholder="选择日期"
                      style="width: 79%"/>
                  </div>
                  <div style="font-size: 14px">
                    <span>质保结束日期：</span>
                    <el-date-picker
                      v-model="value4"
                      type="date"
                      placeholder="选择日期"
                      style="width: 79%"/>
                  </div>
                  <div style="font-size: 14px">
                    <span>备注信息：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <el-input
                      :autosize="{ minRows: 2, maxRows: 4}"
                      v-model="textarea3"
                      type="textarea"
                      placeholder="请输入内容"
                      style="width: 80%"/>
                  </div>
                </div>
                <!--<br>-->
                <!--<el-button type="primary" style="margin-left: 45%">保存</el-button>-->
              </el-aside>
              <!--<el-main>-->
                <!--<div style="height: 50%">-->
                  <!--<el-upload-->
                    <!--:show-file-list="false"-->
                    <!--:on-success="handleAvatarSuccess"-->
                    <!--:before-upload="beforeAvatarUpload"-->
                    <!--class="avatar-uploader"-->
                    <!--action="https://jsonplaceholder.typicode.com/posts/">-->
                    <!--<img v-if="imageUrl" :src="imageUrl" class="avatar">-->
                    <!--<i v-else class="el-icon-plus avatar-uploader-icon"/>-->
                  <!--</el-upload>-->
                <!--</div>-->
                <!--<div>-->
                  <!--<div style="background-color: #1f2d3d;width: 100%;height: 15rem" />-->
                <!--</div>-->
              <!--</el-main>-->
            </el-container>
          </el-tab-pane>
          <!-- 实时数据 -->
          <el-tab-pane label="实时数据" name="second">
            <el-table
              v-loading="listLoading"
              :data="tableData2"
              border
              fit
              highlight-current-row
              style="width: 100%">
              <el-table-column align="center" label="显示名称" >
                <template slot-scope="scope">
                  <span>{{ scope.row.name }}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="数据编码" >
                <template slot-scope="scope">
                  <span>{{ scope.row.dpkey }}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="latest.value"
                label="当前值"
              />
              <el-table-column align="center" label="更新时间" >
                <template slot-scope="scope">
                  <span>{{ scope.row.updated_time }}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="单位" >
                <template slot-scope="scope">
                  <span>{{ scope.row.unit }}</span>
                </template>
              </el-table-column>
              <!--<el-table-column align="center" label="操作" >-->
              <!--<template slot-scope="scope">-->
              <!--<el-button type="text" size="small" @click="history" >历史值</el-button>-->
              <!--<el-button type="text" size="small" @click="alarmrule" >报警规则</el-button>-->
              <!--</template>-->
              <!--</el-table-column>-->
            </el-table>
            <el-pagination
              :current-page="listQuery.currentPage"
              :page-sizes="[10,20,30, 50]"
              :page-size="listQuery.limit"
              :total="total"
              layout="total, sizes, prev, pager, next, jumper"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange" />
          </el-tab-pane>
          <!-- 动态曲线 -->
          <!--<el-tab-pane label="动态曲线" name="third">-->
            <!--<el-container>-->
              <!--<el-header>-->
                <!--<div>-->
                  <!--<span>数据项目：</span>-->
                  <!--<el-select-->
                    <!--v-model="value5"-->
                    <!--multiple-->
                    <!--collapse-tags-->
                    <!--style="margin-left: 20px;"-->
                    <!--placeholder="请选择">-->
                    <!--<el-option-->
                      <!--v-for="item in tableData2"-->
                      <!--:key="item.value"-->
                      <!--:label="item.name"-->
                      <!--:value="item.id"/>-->
                  <!--</el-select>-->
                  <!--&nbsp;&nbsp;-->
                  <!--<span>日期：</span>-->
                  <!--<el-date-picker-->
                    <!--v-model="twotimes"-->
                    <!--:picker-options="pickerOptions2"-->
                    <!--style="width: 390px"-->
                    <!--type="daterange"-->
                    <!--align="right"-->
                    <!--unlink-panels-->
                    <!--range-separator="至"-->
                    <!--start-placeholder="开始日期"-->
                    <!--end-placeholder="结束日期"-->
                  <!--/>-->
                  <!--&nbsp;&nbsp;&nbsp;-->
                  <!--<span>自动刷新：</span>-->
                  <!--<el-switch-->
                    <!--v-model="switch1"-->
                    <!--active-color="#13ce66"-->
                    <!--inactive-color="grey"/>-->
                  <!--&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-->
                  <!--<el-button>搜索</el-button>-->
                  <!--<el-button>导出</el-button>-->
                <!--</div>-->
              <!--</el-header>-->
              <!--<el-main>Main</el-main>-->
            <!--</el-container>-->
          <!--</el-tab-pane>-->
          <!-- 报警记录 -->
          <!--<el-tab-pane label="报警记录" name="fourth">报警记录</el-tab-pane>-->
          <!-- 视频监控 -->
          <!--<el-tab-pane label="视频监控" name="fifth">视频监控</el-tab-pane>-->
        </el-tabs>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { getLineTree } from '@/api/line'
import { getLines } from '@/api/line'
import { getDevicePoint } from '@/api/device'
import { getDevice } from '@/api/device'
import { getProcesses } from '@/api/device'
import moment from 'moment'

export default {
  name: 'EquMonitor',

  data() {
    return {
      imageUrl: '',
      twotimes: [new Date(), new Date()],
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
      switch1: false,
      value1: null,
      value2: null,
      value3: null,
      value4: null,
      value5: null,
      options: null,
      options1: null,
      options2: null,
      textarea3: null,
      Line: null,
      process: null,
      input1: null,
      input2: null,
      equId: null,
      listLoading: false,
      tableData2: null,
      activeName: 'first',
      filterText: '',
      data2: null,
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      listQuery: {
        currentPage: 1,
        limit: 10,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      }
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val)
    }
  },
  created() {
    this.fetchLine()
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    fetchLines() {
      getLines().then(response => {
        this.options2 = response.data
      }).catch(
        error => {
          console.log(error)
          alert('网络错误，不能访问')
        }
      )
    },
    fetchProcess() {
      getProcesses().then(response => {
        this.options1 = response.data
      }).catch(
        error => {
          console.log(error)
          alert('网络错误，不能访问')
        }
      )
    },
    fetchLine() {
      getLineTree().then(response => {
        this.data2 = response.data
        this.equId = this.data2[0].children[0].id
        this.handleClick()
      }).catch(
        error => {
          console.log(error)
          alert('网络错误，不能访问')
        }
      )
    },
    fetchDevice() {
      getDevice(this.equId).then(response => {
        this.input1 = response.data.device_no
        this.input2 = response.data.name
        this.process = response.data.process
        this.Line = response.data.line_id
      }).catch(
        error => {
          console.log(error)
          alert('网络错误，不能访问')
        }
      )
    },
    fetchPoints() {
      getDevicePoint(this.equId).then(response => {
        this.tableData2 = response.data
        this.tableData2.forEach((item, index) => {
          item['updated_time'] = moment(item.updated_time).format('YYYY-MM-DD hh:mm:ss')
        })
      }).catch(
        error => {
          console.log(error)
          alert('网络错误，不能访问')
        }
      )
    },
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    handleClick() {
      switch (this.activeName) {
        case 'first':
          this.fetchLines()
          this.fetchProcess()
          this.fetchDevice()
          break
        case 'second':
          this.fetchPoints()
          break
        case 'third':
          this.fetchPoints()
          break
      }
    },
    handleNodeClick(data, node) {
      if (node.level === 2) {
        this.equId = data.id
        this.handleClick()
      }
    },
    history() {},
    alarmrule() {},
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>

<style scoped>
  .el-header, .el-footer {
    text-align: left;
    line-height: 10px;
    font-size: 13px;
  }
  .el-aside {
    text-align: center;
    line-height: 50px;
    padding: 10px;
  }
  .el-aside > .el-tree{
    background-color: #E9EEF3;
  }

  .el-main {
    text-align: center;
    line-height: 20px;
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

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100%;
    height: 100%;
    line-height: 15rem;
    text-align: center;
  }
  .avatar {
    width: 100%;
    height: 100%;
    display: block;
  }
</style>
