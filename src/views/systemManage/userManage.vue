<template>
  <div>
    <el-header>
      <div>
        <el-form ref="form" :model="form" label-width="80px">
          <el-row >
            <div class="grid-content bg-purple mydiv">
              <span class="mytitle">姓名:</span>
              <el-input v-model="form.realname" clearable filterable placeholder="请选择" style="width: 130px"/>
            </div>
            <el-button @click="search">搜索</el-button>
            <el-button @click="addHandle">新增</el-button>
          </el-row>
        </el-form>
      </div>
    </el-header>
    <el-main>
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          fixed
          prop="username"
          label="用户名"
        />
        <el-table-column
          prop="email"
          label="邮箱"
        />
        <el-table-column
          prop="mobile"
          label="电话"
        />
        <el-table-column
          prop="realname"
          label="姓名"
        />
        <el-table-column
          prop="employee_id"
          label="工号"
        />
        <el-table-column
          prop="role.name"
          width="170"
          label="角色"
        />
        <el-table-column
          prop="status"
          width="170"
          label="状态"
        />
        <el-table-column
          fixed="right"
          label="操作"
          width="">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
            <el-button type="text" size="small" @click="changPass(scope.$index, scope.row)">重置密码</el-button>
          </template>
        </el-table-column>

      </el-table>
      <el-dialog v-model="addFormVisible" :visible.sync="addFormVisible" :close-on-click-modal="false" :append-to-body="true" title="编辑" @close="closeDialog" >
        <el-form ref="addForm" :model="addForm" label-width="80px">
          <el-form-item label="角色">
            <el-select v-model="addForm.role_id" filterable clearable placeholder="请选择" style="width: 90%">
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.name"
                :value="item.id"/>
            </el-select>
          </el-form-item>
          <el-form-item label="用户名" prop="name">
            <el-input v-model="addForm.username" style="width: 90%" auto-complete="off"/>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="addForm.email" style="width: 90%" @change="checkemail"/>
          </el-form-item>
          <el-form-item label="电话">
            <el-input v-model="addForm.mobile" style="width: 90%"/>
          </el-form-item>
          <el-form-item label="密码">
            <el-input type="password" v-model="addForm.password" style="width: 90%"/>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="addForm.realname" style="width: 90%"/>
          </el-form-item>
          <el-form-item label="工号">
            <el-input v-model="addForm.employee_id" style="width: 90%"/>
          </el-form-item>
          <el-form-item label="状态">
            <el-checkbox v-model="addForm.status">启用</el-checkbox>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="addFormVisible = false">取消</el-button>
          <el-button :loading="addLoading" type="primary" @click.native="addSubmit(addForm)">提交</el-button>
        </div>
      </el-dialog>
      <el-dialog v-model="editFormVisible" :visible.sync="editFormVisible" :close-on-click-modal="false" :append-to-body="true" title="编辑">
        <el-form ref="editForm" :model="editForm" label-width="80px">
          <el-form-item label="角色">
            <el-select v-model="editForm.role_id" filterable clearable placeholder="请选择" style="width: 90%">
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.name"
                :value="item.id"/>
            </el-select>
          </el-form-item>
          <el-form-item label="用户名" prop="name">
            <el-input v-model="editForm.username" style="width: 90%" auto-complete="off"/>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="editForm.email" style="width: 90%"/>
          </el-form-item>
          <el-form-item label="电话">
            <el-input v-model="editForm.mobile" style="width: 90%"/>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="editForm.realname" style="width: 90%"/>
          </el-form-item>
          <el-form-item label="工号">
            <el-input v-model="editForm.employee_id" style="width: 90%"/>
          </el-form-item>
          <el-form-item label="状态">
            <el-checkbox v-model="editForm.statue">启用</el-checkbox>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="editFormVisible = false">取消</el-button>
          <el-button :loading="editLoading" type="primary" @click.native="editSubmit(editForm)">提交</el-button>
        </div>
      </el-dialog>
      <el-dialog v-model="editPassVisible" :visible.sync="editPassVisible" :close-on-click-modal="false" :append-to-body="true" title="重置密码" style="width: 30%;margin: 0 auto;">
        <el-form ref="passForm" :model="editForm" label-width="40px">
          <el-form-item label="密码" prop="name">
            <el-input type="password" v-model="passForm.password" style="width: 90%" auto-complete="off"/>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" style="text-align: center">
          <el-button @click.native="editPassVisible = false">取消</el-button>
          <el-button :loading="passLoading" type="primary" @click.native="passSubmit(passForm)">提交</el-button>
        </div>
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
import { getRoles } from '@/api/role'
import { getUsers } from '@/api/user'
import { postUser } from '@/api/user'
import { putUser } from '@/api/user'
import { putPassword } from '@/api/user'
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
      passLoading: false,
      addLoading: false,
      editLoading: false,
      Role1: null,
      Role2: null,
      options1: null,
      form: {
        realname: null
      },
      editPassVisible: false,
      editFormVisible: false,
      addFormVisible: false,
      addForm: {
        id: 0,
        name: '',
        price: 0,
        desc: '',
        reserve: '',
        status: true
      },
      editForm: {
        id: 0,
        name: '',
        price: 0,
        desc: '',
        reserve: '',
        status: true
      },
      passForm: {
        password: null
      },
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
      tableData: null,
      total: null
    }
  },
  created() {
    this.search()
    this.fetchRole()
  },
  mounted() {
    this.chooseTimeRange()
  },
  methods: {
    handleSizeChange(val) {
      this.fetchUserData(null, this.form.realname, null, val, this.listQuery.currentPage)
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      this.fetchUserData(null, this.form.realname, null, this.listQuery.limit, val)
      console.log(`当前页: ${val}`)
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
    fetchRole() {
      getRoles().then(
        response => {
          console.log(response)
          this.options1 = response.data
        }
      ).catch(
        error => {
          console.log(error)
          this.$message.error('网络错误，不能访问')
        }
      )
    },
    fetchUserData(mobile, realname, username, limit, offset) {
      getUsers(mobile, realname, username, limit, ((offset - 1) * limit)).then(
        response => {
          console.log(response)
          this.tableData = response.data.rows
          this.addLoading = false
          this.tableData.forEach((item, index) => {
            switch (item.status) {
              case 0:
                item['status'] = '否'
                break
              case 1:
                item['status'] = '是'
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
    addUser(email, employee_id, mobile, password, realname, username, role_id, status) {
      postUser(email, employee_id, mobile, password, realname, username, role_id, status).then(
        response => {
          console.log(response)
          this.$message('新建成功！')
          this.search()
          this.addFormVisible = false
        }
      ).catch(
        error => {
          console.log(error)
          this.$message.error('新建失败！')
          this.addLoading = false
        }
      )
    },
    editUser(email, employee_id, mobile, realname, username, role_id, status) {
      putUser(email, employee_id, mobile, realname, username, role_id, status).then(
        response => {
          this.editLoading = false
          console.log(response)
          this.$message('修改成功！')
          this.search()
        }
      ).catch(
        error => {
          console.log(error)
          this.$message.error('网络错误，不能访问')
          this.editLoading = false
        }
      )
    },
    getTotal() {
      getUsers().then(
        response => {
          console.log(response)
          this.total = response.data.rows.length
        }
      ).catch(
        error => {
          console.log(error)
          this.$message.error('网络错误，不能访问')
        }
      )
    },
    editPass(id, password) {
      putPassword(id, password).then(
        response => {
          this.passLoading = false
          console.log(response)
          this.$message('修改成功！')
          this.search()
        }
      ).catch(
        error => {
          console.log(error)
          this.$message.error('网络错误，不能访问')
        }
      )
    },
    addSubmit: function() {
      this.addLoading = true
      this.addUser(this.addForm.email, this.addForm.employee_id, this.addForm.mobile, this.addForm.password, this.addForm.realname, this.addForm.username, this.addForm.role_id, this.Judg(this.addForm.status))
    },
    addHandle: function() {
      this.addFormVisible = true
    },
    editSubmit: function(editForm) {
      this.editLoading = true
      this.editUser(this.id, this.editForm.email, this.editForm.employee_id, this.editForm.mobile, this.editForm.realname, this.editForm.username, this.editForm.role_id, this.Judg(this.editForm.status))
    },
    passSubmit(passForm) {
      this.passLoading = true
      this.editPass(this.id, this.passForm.password)
    },
    handleEdit: function(index, row) {
      console.log(row.id)
      this.editFormVisible = true
      this.editForm = Object.assign({}, row)
      this.id = row.id
    },
    changPass(index, row) {
      this.editPassVisible = true
      this.passForm = Object.assign({}, row)
      this.id = row.id
    },
    chooseTimeRange(t) {
      console.log(t)// 结果为一个数组，如：["2018-08-04", "2018-08-06"]
    },
    dateFormat: function(row, column) {
      var date = row[column.property]
      if (date === undefined) {
        return ''
      }
      return moment(date).format('YYYY-MM-DD HH:mm:ss')
    },
    search: function() {
      this.getTotal()
      this.fetchUserData(null, this.form.realname, null, this.listQuery.limit, this.listQuery.currentPage)
    },
    Judg(val) {
      if (val) {
        return 0
      } else {
        return 1
      }
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
