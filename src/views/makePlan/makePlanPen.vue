<template>
  <div>
    <el-header>
      <div>
        <el-form ref="form" :model="form" label-width="80px">
          <el-row >
            <el-col :span="24">
              <div class="grid-content bg-purple mydiv">
                <span class="mytitle">产线</span>
                <el-select v-model="form.line_id" filterable clearable placeholder="请选择" style="width: 130px" value="">
                  <el-option
                    v-for="item in options1"
                    :key="item.value"
                    :label="item.name"
                    :value="item.id"/>
                </el-select>
              </div>
              <div class="grid-content bg-purple mydiv">
                <span class="mytitle">日期</span>
                <el-date-picker
                  v-model="form.twotimes"
                  :picker-options="pickerOptions2"
                  :unlink-panels="true"
                  clearable
                  value-format="yyyy-MM-dd"
                  format="yyyy-MM-dd"
                  style="width: 390px"
                  type="daterange"
                  align="center"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  @change="chooseTimeRange" />
              </div>
              <div class="grid-content bg-purple mydiv">
                <el-button @click="addHandle" >创建生产计划</el-button>
                <el-button @click="search">搜索</el-button>
                <el-button @click.native="handleDownload()">导出</el-button>
              </div>
            </el-col>
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
          fixed
          prop="line_id"
          label="产线"
        />
        <el-table-column
          :formatter="dateFormat"
          prop="plan_date"
          label="日期"
        />
        <el-table-column
          prop="plan_time.name"
          label="时间段"
        />
        <el-table-column
          prop="product.name"
          label="产品名称"
        />
        <el-table-column
          prop="cnt"
          label="计划产量"
        />
        <el-table-column
          prop="addon"
          width="170"
          label="备注"
        />
        <el-table-column
          prop="plan_user_id"
          width="170"
          label="计划人员"
        />
        <el-table-column
          fixed="right"
          label="操作"
          width="">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
            <!--<el-button type="text" size="small" @click="handleClick">删除</el-button>-->
          </template>
        </el-table-column>

      </el-table>
      <el-dialog v-model="addFormVisible" :visible.sync="addFormVisible" :close-on-click-modal="false" :append-to-body="true" width="30%" title="新增" @close="closeDialog" >
        <el-form ref="addForm" :model="addForm" label-width="80px">
          <el-form-item label="产线">
            <el-select v-model="addForm.line2" :style="{ width: '90%' }" filterable clearable placeholder="请选择">
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.name"
                :value="item.id"/>
            </el-select>
          </el-form-item>
          <el-form-item label="日期">
            <el-date-picker
              v-model="addForm.plan_date"
              :style="{ width: '90%' }"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
              format="yyyy-MM-dd"
              @change="chooseTimeRange"/>
          </el-form-item>
          <el-form-item label="时间段">
            <el-select v-model="addForm.time" :style="{ width: '90%' }" :disabled="thisdisable" filterable clearable placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"/>
            </el-select>
          </el-form-item>
          <el-form-item label="">
            <el-checkbox v-model="addForm.statue" @change="changes">快速创建小时计划</el-checkbox>
          </el-form-item>
          <el-form-item label="产品名称">
            <el-select v-model="addForm.pro2" :style="{ width: '90%' }" filterable clearable placeholder="请选择">
              <el-option
                v-for="item in options3"
                :key="item.value"
                :label="item.name"
                :value="item.id"/>
            </el-select>
          </el-form-item>
          <el-form-item label="计划产量">
            <el-input v-model="addForm.cnt" :style="{ width: '90%' }"/>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="addForm.addon" :style="{ width: '90%' }"/>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="addFormVisible = false">取消</el-button>
          <el-button :loading="addsub" type="primary" @click.native="addSubmit(addForm)">提交</el-button>
        </div>
      </el-dialog>
      <el-dialog v-model="editFormVisible" :visible.sync="editFormVisible" :close-on-click-modal="false" :append-to-body="true" width="30%" title="编辑">
        <el-form ref="editForm" :model="editForm" label-width="80px">
          <el-form-item label="产线">
            <el-select v-model="editForm.line2" :style="{ width: '90%' }" filterable clearable placeholder="请选择">
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.name"
                :value="item.id"/>
            </el-select>
          </el-form-item>
          <el-form-item label="日期">
            <el-date-picker
              v-model="editForm.plan_date"
              :style="{ width: '90%' }"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
              format="yyyy-MM-dd"
              @change="chooseTimeRange"/>
          </el-form-item>
          <el-form-item label="时间段">
            <el-select v-model="editForm.plan_time_id" :style="{ width: '90%'}" filterable clearable placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"/>
            </el-select>
          </el-form-item>
          <el-form-item label="产品名称">
            <el-select v-model="editForm.pro2" :style="{ width: '90%' }" filterable clearable placeholder="请选择">
              <el-option
                v-for="item in options3"
                :key="item.value"
                :label="item.name"
                :value="item.id"/>
            </el-select>
          </el-form-item>
          <el-form-item label="计划产量">
            <el-input v-model="editForm.cnt" :style="{ width: '90%' }"/>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="editForm.addon" :style="{ width: '90%' }"/>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="editFormVisible = false">取消</el-button>
          <el-button :loading="editsub" type="primary" @click.native="editSubmit(editForm)">提交</el-button>
        </div>
      </el-dialog>
      <el-dialog
        :visible.sync="iscover"
        title="提示"
        width="30%">
        <span>是否覆盖</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="iscover = false">取 消</el-button>
          <el-button type="primary" @click="thisconfirm">确 定</el-button>
        </span>
      </el-dialog>
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
import ElHeader from 'element-ui/packages/header/src/main'
import { getLines } from '@/api/line'
import { getPlans } from '@/api/table'
import { postPlans } from '@/api/plan'
import { putPlans } from '@/api/plan'
import { getExist } from '@/api/plan'
import { getProducts } from '@/api/product'
import moment from 'moment'

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
  components: { ElHeader },
  data() {
    return {
      addsub: false,
      editsub: false,
      thisdisable: false,
      listLoading: true,
      iscover: false,
      editFormVisible: false,
      addFormVisible: false,
      options: [{
        value: 10000,
        label: '0:00-1:00'
      }, {
        value: 10001,
        label: '1:00-2:00'
      }, {
        value: 10002,
        label: '2:00-3:00'
      }, {
        value: 10003,
        label: '3:00-4:00'
      }, {
        value: 10004,
        label: '4:00-5:00'
      }, {
        value: 10005,
        label: '5:00-6:00'
      }, {
        value: 10006,
        label: '6:00-7:00'
      }, {
        value: 10007,
        label: '7:00-8:00'
      }, {
        value: 10008,
        label: '8:00-9:00'
      }, {
        value: 10009,
        label: '9:00-10:00'
      }, {
        value: 10010,
        label: '10:00-11:00'
      }, {
        value: 10011,
        label: '11:00-12:00'
      }, {
        value: 10012,
        label: '12:00-13:00'
      }, {
        value: 10013,
        label: '13:00-14:00'
      }, {
        value: 10014,
        label: '14:00-15:00'
      }, {
        value: 10015,
        label: '15:00-16:00'
      }, {
        value: 10016,
        label: '16:00-17:00'
      }, {
        value: 10017,
        label: '17:00-18:00'
      }, {
        value: 10018,
        label: '18:00-19:00'
      }, {
        value: 10019,
        label: '19:00-20:00'
      }, {
        value: 10020,
        label: '20:00-21:00'
      }, {
        value: 10021,
        label: '21:00-22:00'
      }, {
        value: 10022,
        label: '22:00-23:00'
      }, {
        value: 10023,
        label: '23:00-24:00'
      }],
      addForm: {
        line2: null,
        plan_date: null,
        plan_time_id: null,
        pro2: null,
        cnt: null,
        addon: null,
        statue: false
      },
      editForm: {
        line2: null,
        plan_date: null,
        plan_time_id: null,
        pro2: null,
        cnt: null,
        addon: null
      },
      listQuery: {
        currentPage: 1,
        limit: 10,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      options1: [],
      options2: [],
      options3: [{
        value: '0',
        label: '关机'
      }, {
        value: '1',
        label: '加工'
      }, {
        value: '2',
        label: '空闲'
      }, {
        value: '3',
        label: '报警'
      }, {
        value: '4',
        label: '其他'
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
      form: {
        begin_time: '',
        end_time: '',
        line_id: '',
        device_no: '',
        status: '',
        abnormal: 0,
        twotimes: [new Date(), new Date()],
        line2: ''
      },
      value6: '',
      Line: '',
      Line2: '',
      Line3: '',
      total: null,
      tableData: [],
      rep: null,
      planIds: [],
      planTimeIds: []
    }
  },
  created() {
    this.fetchLines()
    this.fetchProduct()
  },
  mounted() {
    this.chooseTimeRange()
  },
  methods: {
    handleDownload() {
      this.downloadLoading = true
      require.ensure([], () => {
        const { export_json_to_excel } = require('@/vendor/Export2Excel')
        const tHeader = ['产线','日期', '时间段', '产品名称', '计划产量','备注','计划人员']
        const filterVal = ['line_id', 'plan_date', 'plan_time.name','product_id','cnt','addon','plan_user_id']
        const list = this.tableData
        const data = this.formatJson(filterVal, list)
        export_json_to_excel(tHeader, data, '生产计划列表'+moment(new Date()).format('YYYYMMDDHHmmss'))
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
    checkemail: function() {
      var regEmail = /^[A-Za-zd]+([-_.][A-Za-zd]+)*@([A-Za-zd]+[-.])+[A-Za-zd]{2,5}$/
      if (this.email === '') {
        this.msgmail = '请输入邮箱'
      } else if (!regEmail.test(this.email)) {
        this.msgmail = '邮箱格式不正确'
      }
    },
    closeDialog: function() {
      this.$refs.addForm.resetFields()
    },
    addSubmit(addForm) {
      this.addsub = true
      if (this.addForm.line2 && this.addForm.plan_date && this.addForm.pro2 && this.addForm.cnt) {
        if (this.thisdisable) {
          this.options.forEach((item, index) => {
            this.ifExist(this.addForm.line2, this.addForm.plan_date, item.value, this.addForm.pro2, this.addForm.cnt, this.addForm.addon, this.addForm.plan_user_id, index)
            if (index === this.options.length - 1) {
              if (this.planIds.length !== 0) {
                this.iscover = true
              }
            }
          })
        } else {
          this.ifExist(this.addForm.line2, this.addForm.plan_date, this.addForm.time, this.addForm.pro2, this.addForm.cnt, this.addForm.addon, this.addForm.plan_user_id)
        }
      } else {
        this.$message.error('请填写完整')
      }
    },
    addHandle() {
      this.addFormVisible = true
    },
    editSubmit(editForm) {
      this.editsub = true
      this.coverPlan(this.rep, this.editForm.line2, this.editForm.plan_date, this.editForm.plan_time_id, this.editForm.pro2, this.editForm.cnt, this.editForm.addon, this.editForm.plan_user_id)
    },
    handleEdit: function(index, row) {
      console.log(row.id)
      this.editFormVisible = true
      this.rep = row.id
      this.editForm.line2 = row.line_id
      this.editForm.plan_date = row.plan_date
      this.editForm.plan_time_id = row.plan_time_id
      this.editForm.pro2 = row.product_id
      this.editForm.cnt = row.cnt
      this.editForm.addon = row.addon
    },
    chooseTimeRange(t) {
      console.log(t)// 结果为一个数组，如：["2018-08-04", "2018-08-06"]
    },
    dateFormat: function(row, column) {
      var date = row[column.property]
      if (date === undefined) {
        return ''
      }
      return moment(date).format('YYYY-MM-DD')
    },
    search() {
      if (!this.form.twotimes) {
        this.form.twotimes = []
      }
      this.listLoading = true
      this.getTotal()
      this.fetchPlans(this.form.line_id, moment(this.form.twotimes[0]).format('YYYY-MM-DD'), moment(this.form.twotimes[1]).format('YYYY-MM-DD'), this.listQuery.limit, this.listQuery.currentPage)
    },
    fetchPlans(line_id, begin_date, end_date, limit, offset) {
      getPlans(line_id, begin_date, end_date, limit, ((offset - 1) * limit)).then(response => {
        console.log(response)
        this.listLoading = false
        this.tableData = response.data.rows
        this.tableData.forEach((item, index) => {
          switch (item.status) {
            case 0:
              item['statusname'] = '关机'
              break
            case 1:
              item['statusname'] = '运行'
              break
            case 2:
              item['statusname'] = '空闲'
              break
            case 3:
              item['statusname'] = '报警'
              break
            case 4:
              item['statusname'] = '其它'
              return
          }
        })
        this.tableData.forEach((item, index) => {
          switch (item.abnormal) {
            case false:
              item['abnormal'] = '否'
              break
            case true:
              item['abnormal'] = '是'
              break
          }
        })
        console.log(this.tableData)
      }
      ).catch(
        error => {
          console.log(error)
          this.$message.error('网络错误，不能访问')
        }
      )
    },
    fetchLines() {
      getLines().then(
        response => {
          console.log(response)
          this.options1 = response.data
          this.form.line_id = response.data[0].id
          this.search()
        }
      ).catch(
        error => {
          console.log(error)
          this.$message.error('网络错误，不能访问')
        }
      )
    },
    fetchProduct() {
      getProducts().then(
        response => {
          console.log(response)
          this.options3 = response.data
        }
      ).catch(
        error => {
          console.log(error)
          this.$message.error('网络错误，不能访问')
        }
      )
    },
    ifExist(line_id, plan_date, plan_time_id, product_id, cnt, addon, plan_user_id, index) {
      getExist(line_id, plan_date, plan_time_id, product_id).then(
        response => {
          if (response.data.existed) {
            this.planIds.push(response.data.plan_id)
            this.planTimeIds.push(plan_time_id)
            this.iscover = true
          } else {
            this.newPlan(line_id, plan_date, plan_time_id, product_id, cnt, addon, plan_user_id, index)
          }
        }
      ).catch(
        error => {
          console.log(error)
          this.$message.error('网络错误，不能访问')
        }
      )
    },
    newPlan(line_id, plan_date, plan_time_id, product_id, cnt, addon, plan_user_id, index) {
      postPlans(line_id, plan_date, plan_time_id, product_id, cnt, addon, plan_user_id).then(
        response => {
          if (index !== null && index !== undefined) {
            if (index === this.options.length - 1) {
              this.addsub = false
              this.$message('创建成功！')
              this.search()
              this.addFormVisible = false
            }
          } else {
            this.addsub = false
            this.$message('创建成功！')
            this.search()
            this.addFormVisible = false
          }
        }
      ).catch(
        error => {
          console.log(error)
          this.$message.error('网络错误请检查网络')
        }
      )
    },
    handleSizeChange(val) {
      this.fetchPlans(this.form.line_id, moment(this.form.twotimes[0]).format('YYYY-MM-DD'), moment(this.form.twotimes[1]).format('YYYY-MM-DD'), val, this.listQuery.currentPage)
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      this.fetchPlans(this.form.line_id, moment(this.form.twotimes[0]).format('YYYY-MM-DD'), moment(this.form.twotimes[1]).format('YYYY-MM-DD'), this.listQuery.limit, val)
      console.log(`当前页: ${val}`)
    },
    getTotal() {
      getPlans(this.form.line_id, moment(this.form.twotimes[0]).format('YYYY-MM-DD'), moment(this.form.twotimes[1]).format('YYYY-MM-DD')).then(response => {
        console.log(response)
        this.total = response.data.total
      }
      ).catch(
        error => {
          console.log(error)
          this.$message.error('网络错误，不能访问')
        }
      )
    },
    coverPlan(id, line_id, plan_date, plan_time_id, product_id, cnt, addon, plan_user_id, index) {
      putPlans(id, line_id, plan_date, plan_time_id, product_id, cnt, addon, plan_user_id).then(
        response => {
          if (index !== null && index !== undefined && this.planIds.length !== 0) {
            if (index === this.planIds.length - 1) {
              this.addsub = false
              this.$message('修改成功！')
              this.search()
              this.addFormVisible = false
            }
          } else {
            this.editsub = false
            console.log(response)
            this.$message('修改成功！')
            this.search()
            this.editFormVisible = false
          }
        }
      ).catch(
        error => {
          console.log(error)
          this.$message.error('网络错误，不能访问')
        }
      )
    },
    handleClick() {},
    changes() {
      if (this.addForm.statue) {
        this.thisdisable = true
      } else {
        this.thisdisable = false
      }
    },
    thisconfirm() {
      this.planIds.forEach((item, index) => {
        this.coverPlan(item, this.addForm.line2, this.addForm.plan_date, this.planTimeIds[index], this.addForm.pro2, this.addForm.cnt, this.addForm.addon, this.addForm.plan_user_id, index)
      })
      this.planIds = []
      this.planTimeIds = []
      this.iscover = false
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
    margin-right: 15px;
  }
</style>
