<template>
  <div>
    <el-header>
      <div>
        <el-form ref="form" :model="form" label-width="80px">
          <el-row :gutter="24">
            <div class="grid-content bg-purple mydiv">
              <span class="mytitle">产线:</span>
              <el-select v-model="form.line_id" filterable clearable placeholder="请选择" style="width: 130px">
                <el-option
                  v-for="item in options1"
                  :key="item.value"
                  :label="item.name"
                  :value="item.id"/>
              </el-select>
            </div>
            <div class="grid-content bg-purple mydiv">
              <span class="mytitle">姓名:</span>
              <el-select v-model="form.name" filterable clearable placeholder="请选择" style="width: 130px">
                <el-option
                  v-for="item in options2"
                  :key="item.value"
                  :label="item.realname"
                  :value="item.id"/>
              </el-select>
            </div>
            <div class="grid-content bg-purple mydiv">
              <span class="mytitle">达成日期</span>
              <el-date-picker
                v-model="twotimes"
                :picker-options="pickerOptions2"
                style="width: 16rem"
                type="daterange"
                align="center"
                unlink-panels
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期" />
            </div>
            <el-button @click="search">搜索</el-button>
            <el-button @click="addFormVisible = true">上机签到</el-button>
            <el-button @click="handleDownload">导出</el-button>
            <br>
            <el-dialog
              :visible.sync="addFormVisible"
              title="上下机签卡"
              width="30%" >
              <el-form ref="form3" :model="form3" :rules="rules1">
                <el-form-item :label-width="formLabelWidth" label="产线：" prop="line3">
                  <el-select v-model="form3.line3" :style="{ width: '90%' }" filterable clearable placeholder="请选择">
                    <el-option
                      v-for="item in options1"
                      :key="item.value"
                      :label="item.name"
                      :value="item.id"/>
                  </el-select>
                </el-form-item>
                <el-form-item :label-width="formLabelWidth" label="姓名：" prop="name3">
                  <el-select v-model="form3.name3" :style="{ width: '90%' }" filterable clearable multiple placeholder="请选择">
                    <el-option
                      v-for="item in options2"
                      :key="item.id"
                      :label="item.realname"
                      :value="item.id"/>
                  </el-select>
                </el-form-item>
                <el-form-item :label-width="formLabelWidth" label="上机：" prop="times5">
                  <el-date-picker
                    v-model="form3.times5"
                    :picker-options="pickerOptions2"
                    :style="{ width: '90%' }"
                    type="datetime"
                    placeholder="选择日期时间"
                    align="right"/>
                </el-form-item>
                <el-form-item :label-width="formLabelWidth" label="下机：">
                  <el-date-picker
                    v-model="times6"
                    :picker-options="pickerOptions2"
                    :style="{ width: '90%' }"
                    type="datetime"
                    placeholder="选择日期时间"
                    align="right"
                    disabled/>
                </el-form-item>
                <el-form-item :label-width="formLabelWidth" label="产品：" prop="pro3">
                  <el-select v-model="form3.pro3" :style="{ width: '90%' }" filterable clearable placeholder="请选择">
                    <el-option
                      v-for="item in options3"
                      :key="item.value"
                      :label="item.name"
                      :value="item.id"/>
                  </el-select>
                </el-form-item>
                <el-form-item :label-width="formLabelWidth" label="备注：">
                  <el-input v-model="form3.note3" :style="{ width: '90%' }"/>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="addFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addDataInfo('form3')">确 定</el-button>
              </div>
            </el-dialog>
          </el-row>
        </el-form>

      </div>
    </el-header>
    <el-main>
      <el-table
        v-loading="listLoading"
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="user.realname"
          label="姓名"
        />
        <el-table-column
          prop="clockin_time"
          label="上班时间"
        />
        <el-table-column
          prop="clockout_time"
          label="下班时间"
        />
        <el-table-column
          prop="product.name"
          label="产品"
        />
        <el-table-column
          prop="addon"
          label="备注"
        />
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="down(scope.row.id)" >下机</el-button>
            <!-- 下机 -->
            <el-dialog
              :visible.sync="dialogVisible"
              title="上下机签卡"
              width="30%" >
              <el-form ref="form1" :model="form1" :rules="rules2">
                <el-form-item :label-width="formLabelWidth" label="产线：">
                  <el-select v-model="form1.line1" :style="{ width: '90%' }" filterable clearable placeholder="请选择" disabled>
                    <el-option
                      v-for="item in options1"
                      :key="item.value"
                      :label="item.name"
                      :value="item.id"
                      disabled/>
                  </el-select>
                </el-form-item>
                <el-form-item :label-width="formLabelWidth" label="姓名：" disabled>
                  <el-select v-model="form1.name1" :style="{ width: '90%' }" filterable clearable placeholder="请选择" disabled>
                    <el-option
                      v-for="item in options2"
                      :key="item.value"
                      :label="item.realname"
                      :value="item.id"/>
                  </el-select>
                </el-form-item>
                <el-form-item :label-width="formLabelWidth" label="上机：">
                  <el-date-picker
                    v-model="times1"
                    :picker-options="pickerOptions2"
                    :style="{ width: '90%' }"
                    type="datetime"
                    placeholder="选择日期时间"
                    align="right"
                    disabled/>
                </el-form-item>
                <el-form-item :label-width="formLabelWidth" label="下机：" prop="times2">
                  <el-date-picker
                    v-model="form1.times2"
                    :picker-options="pickerOptions2"
                    :style="{ width: '90%' }"
                    type="datetime"
                    placeholder="选择日期时间"
                    align="right"/>
                </el-form-item>
                <el-form-item :label-width="formLabelWidth" label="产品：">
                  <el-select v-model="form1.pro1" :style="{ width: '90%' }" filterable clearable placeholder="请选择" disabled>
                    <el-option
                      v-for="item in options3"
                      :key="item.value"
                      :label="item.name"
                      :value="item.id"/>
                  </el-select>
                </el-form-item>
                <el-form-item :label-width="formLabelWidth" label="备注：">
                  <el-input v-model="form1.note1" :style="{ width: '90%' }"/>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="conf1('form1')">确 定</el-button>
              </div>
            </el-dialog>
            <el-button type="text" size="small" @click="edit(scope.row.id)">修改</el-button>
            <!-- 修改 -->
            <el-dialog
              :visible.sync="editFormVisible"
              title="上下机签卡"
              width="30%" >
              <el-form :model="form">
                <el-form-item :label-width="formLabelWidth" label="产线：">
                  <el-select v-model="form.line2" :style="{ width: '90%' }" filterable clearable placeholder="请选择">
                    <el-option
                      v-for="item in options1"
                      :key="item.value"
                      :label="item.name"
                      :value="item.id"/>
                  </el-select>
                </el-form-item>
                <el-form-item :label-width="formLabelWidth" label="姓名：">
                  <el-select v-model="form.name2" :style="{ width: '90%' }" filterable clearable placeholder="请选择">
                    <el-option
                      v-for="item in options2"
                      :key="item.value"
                      :label="item.realname"
                      :value="item.id"/>
                  </el-select>
                </el-form-item>
                <el-form-item :label-width="formLabelWidth" label="上机：">
                  <el-date-picker
                    v-model="times3"
                    :picker-options="pickerOptions2"
                    :style="{ width: '90%' }"
                    type="datetime"
                    placeholder="选择日期时间"
                    align="right"/>
                </el-form-item>
                <el-form-item :label-width="formLabelWidth" label="下机：">
                  <el-date-picker
                    v-model="times4"
                    :picker-options="pickerOptions2"
                    :style="{ width: '90%' }"
                    type="datetime"
                    placeholder="选择日期时间"
                    align="right"/>
                </el-form-item>
                <el-form-item :label-width="formLabelWidth" label="产品：">
                  <el-select v-model="form.pro2" :style="{ width: '90%' }" filterable clearable placeholder="请选择">
                    <el-option
                      v-for="item in options3"
                      :key="item.value"
                      :label="item.name"
                      :value="item.id"/>
                  </el-select>
                </el-form-item>
                <el-form-item :label-width="formLabelWidth" label="备注：">
                  <el-input v-model="form.note2" :style="{ width: '90%' }"/>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="editFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="conf2">确 定</el-button>
              </div>
            </el-dialog>
            <!--<el-button type="text" size="small" @click="deleted = true">删除</el-button>-->
            <!-- 删除 -->
            <el-dialog
              :visible.sync="deleted"
              title="删除"
              width="15%"
              center>
              <span>确认需要删除吗？</span>
              <span slot="footer" class="dialog-footer">
                <el-button @click="deleted = false">取 消</el-button>
                <el-button type="primary" @click="conf">确 定</el-button>
              </span>
            </el-dialog>
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
  </div>
</template>

<script>
import { getLines } from '@/api/line'
import { getProducts } from '@/api/product'
import { getWorkTime } from '@/api/table'
import { getUsers } from '@/api/user'
import { getUser } from '@/api/user'
import { addPunchLog } from '@/api/punchLog'
import { getPunchLog } from '@/api/punchLog'
import { putPunchLog } from '@/api/punchLog'
import moment from 'moment'

export default {
  data() {
    return {
      // 新增
      addFormVisible: false,
      // 删除
      deleted: false,
      // 修改
      editFormVisible: false,
      formLabelWidth: '80px',
      // 上下机
      dialogVisible: false,
      listLoading: true,
      value6: '',
      tableData: null,
      listQuery: {
        currentPage: 1,
        limit: 10,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
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
      options1: null,
      options2: null,
      options3: null,
      form: {
        line_id: '',
        name: '',
        name2: '',
        line2: '',
        pro2: '',
        note2: ''
      },
      form1: {
        name1: '',
        line1: '',
        pro1: '',
        note1: '',
        times2: new Date()
      },
      form3: {
        name3: [],
        line3: '',
        pro3: '',
        note3: '',
        times5: new Date()
      },
      rules1: {
        line3: [
          { required: true, message: '请选择产线名称', trigger: 'change' }
        ],
        name3: [
          { required: true, message: '请选择姓名', trigger: 'change' }
        ],
        times5: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        pro3: [
          { required: true, message: '请选择产品', trigger: 'change' }
        ]
      },
      rules2: {
        times2: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ]
      },
      twotimes: [new Date(), new Date()],
      times1: new Date(),
      times3: new Date(),
      times4: new Date(),
      times6: '',
      total: 10,
      punchLogId: null
    }
  },
  created() {
    this.fetchLine()
    this.fetchProduct()
    this.fetchUser()
  },
  methods: {
    handleDownload() {
      this.downloadLoading = true
      require.ensure([], () => {
        const { export_json_to_excel } = require('@/vendor/Export2Excel')
        const tHeader = ['姓名', '上班时间', '下班时间', '产品', '备注']
        const filterVal = ['user.realname', 'clockin_time', 'clockout_time', 'product.name', 'addon']
        const list = this.tableData
        const data = this.formatJson(filterVal, list)
        export_json_to_excel(tHeader, data, '上班时间列表' + moment(new Date()).format('YYYYMMDDHHmmss'))
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
    fetchProduct() {
      getProducts().then(response => {
        this.options3 = response.data
      }).catch(
        error => {
          console.log(error)
          this.$message.error('网络错误，不能访问')
        }
      )
    },
    fetchLine() {
      getLines().then(response => {
        this.options1 = response.data
        this.form.line_id = response.data[0].id
        this.form1.line1 = response.data[0].id
        this.form.line2 = response.data[0].id
        this.form3.line3 = response.data[0].id
        this.fetchUsers()
      }).catch(
        error => {
          console.log(error)
          this.$message.error('网络错误，不能访问')
        }
      )
    },
    fetchUsers() {
      getUsers().then(response => {
        this.options2 = response.data.rows
        this.search()
      }).catch(
        error => {
          console.log(error)
          this.$message.error('网络错误，不能访问')
        }
      )
    },
    fetchUser() {
      getUser().then(response => {
        this.form3.name3 = [response.data.id]
      }).catch(
        error => {
          console.log(error)
          this.$message.error('网络错误，不能访问')
        }
      )
    },
    fetchData(beginTime, EndTime, lineId, userId, limit, offset) {
      getWorkTime(beginTime, EndTime, lineId, userId, limit, ((offset - 1) * limit)).then(response => {
        this.listLoading = false
        this.tableData = response.data.rows
        this.tableData.forEach((item, index) => {
          if (item.clockin_time) {
            item['clockin_time'] = moment(item.clockin_time).format('YYYY-MM-DD HH:mm:ss')
          }
          if (item.clockout_time) {
            item['clockout_time'] = moment(item.clockout_time).format('YYYY-MM-DD HH:mm:ss')
          }
        })
        this.listLoading = false
      }).catch(
        error => {
          console.log(error)
          this.$message.error('网络错误，不能访问')
        }
      )
    },
    addDataInfo(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          addPunchLog(this.form3.note3, this.form3.times5, this.form3.line3, this.form3.times5, this.form3.pro3, this.form3.name3).then(response => {
            this.$message('打卡成功！')
            this.addFormVisible = false
            this.search()
          }).catch(
            error => {
              console.log(error)
              this.$message.error('网络错误，不能访问')
            }
          )
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleSizeChange(val) {
      this.fetchData(moment(this.twotimes[0]).format('YYYY-MM-DD') + ' 00:00:00', moment(this.twotimes[1]).format('YYYY-MM-DD') + ' 23:59:59', this.form.line_id, this.form.name, val, this.listQuery.currentPage)
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      this.fetchData(moment(this.twotimes[0]).format('YYYY-MM-DD') + ' 00:00:00', moment(this.twotimes[1]).format('YYYY-MM-DD') + ' 23:59:59', this.form.line_id, this.form.name, this.listQuery.limit, val)
      console.log(`当前页: ${val}`)
    },
    conf() {
      this.deleted = false
    },
    search() {
      this.listLoading = true
      if (!this.twotimes) {
        this.twotimes = []
      }
      this.getTotal()
      this.fetchData(moment(this.twotimes[0]).format('YYYY-MM-DD') + ' 00:00:00', moment(this.twotimes[1]).format('YYYY-MM-DD') + ' 23:59:59', this.form.line_id, this.form.name, this.listQuery.limit, this.listQuery.currentPage)
    },
    out() {
      console.log()
    },
    down(id) {
      getPunchLog(id).then(response => {
        this.form1.line1 = response.data.line_id
        this.form1.name1 = response.data.user_id
        this.times1 = response.data.clockin_time
        this.form1.pro1 = response.data.product_id
        this.form1.note1 = response.data.addon
        this.dialogVisible = true
        this.punchLogId = id
      }).catch(
        error => {
          console.log(error)
          this.$message.error('网络错误，不能访问')
        }
      )
    },
    conf1(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          putPunchLog(this.punchLogId, this.form1.note1, this.times1, this.form1.times2, this.form1.line1, this.form1.times2, this.form1.pro1, this.form1.name1).then(response => {
            this.$message('下机成功！')
            this.dialogVisible = false
            this.search()
          }).catch(
            error => {
              console.log(error)
              this.$message.error('网络错误，不能访问')
            }
          )
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    edit(id) {
      getPunchLog(id).then(response => {
        this.form.line2 = response.data.line_id
        this.form.name2 = response.data.user_id
        this.times3 = response.data.clockin_time
        this.times4 = response.data.clockout_time
        this.form.pro2 = response.data.product_id
        this.form.note2 = response.data.addon
        this.editFormVisible = true
        this.punchLogId = id
      }).catch(
        error => {
          console.log(error)
          this.$message.error('网络错误，不能访问')
        }
      )
    },
    conf2() {
      putPunchLog(this.punchLogId, this.form.note2, this.times3, this.times4, this.form.line2, this.times4, this.form.pro2, this.form.name2).then(response => {
        this.$message('修改成功！')
        this.editFormVisible = false
        this.search()
      }).catch(
        error => {
          console.log(error)
          this.$message.error('网络错误，不能访问')
        }
      )
    },
    getTotal() {
      getWorkTime(moment(this.twotimes[0]).format('YYYY-MM-DD') + ' 00:00:00', moment(this.twotimes[1]).format('YYYY-MM-DD') + ' 23:59:59', this.form.line_id, this.form.name).then(response => {
        this.total = response.data.total
      }).catch(
        error => {
          console.log(error)
          this.$message.error('网络错误，不能访问')
        }
      )
    }
  }
}
</script>
<style>
  header.el-header{
    padding-top: 20px;
  }
  .mytitle{
    font-size: .8rem;
    margin-right: 5px;
    font-weight: 600;
  }
  .mydiv{
    display: inline;
    margin-left: 15px;
  }
  .el-main {
    text-align: center;
  }
</style>
