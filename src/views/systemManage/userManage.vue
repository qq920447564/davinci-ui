<template>
  <div>
    <el-header :height="300">
      <div>
        <el-form ref="form" :model="form" label-width="80px">
          <el-row >
            <!--<div class="grid-content bg-purple mydiv">-->
              <!--<span class="mytitle">用户名:</span>-->
              <!--<el-select v-model="form.line_id" clearable="true" filterable placeholder="请选择" style="width: 130px">-->
                <!--<el-option-->
                  <!--v-for="item in options1"-->
                  <!--:key="item.value"-->
                  <!--:label="item.name"-->
                  <!--:value="item.id"/>-->
              <!--</el-select>-->
            <!--</div>-->
            <div class="grid-content bg-purple mydiv">
              <span class="mytitle">姓名:</span>
              <el-input v-model="form.realname" clearable="true" filterable placeholder="请选择" style="width: 130px">

              </el-input>
            </div>
            <el-button  @click="search">搜索</el-button>
            <el-button @click='addHandle'>新增</el-button>
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
          prop="role_id"
          width="170"
          label="角色"
        />
        <el-table-column
          :formatter="dateFormat"
          prop="stopped_time"
          width="170"
          label="状态"
        />
        <el-table-column
          fixed="right"
          label="操作"
          width="">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
            <el-button type="text" size="small" @click="handleClick">重置密码</el-button>
          </template>
        </el-table-column>

      </el-table>
      <el-dialog v-model="addFormVisible" :visible.sync="addFormVisible" :close-on-click-modal="false" :append-to-body="true" title="编辑" @close="closeDialog" >
        <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
          <el-form-item label="角色">

            <el-input v-model="addForm.role_id" width="200" auto-complete="off"></el-input>

          </el-form-item>
          <el-form-item label="用户名" prop="name">
            <el-input v-model="addForm.username" width="200" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="addForm.email" @change="checkemail" width="200"></el-input>
          </el-form-item>
          <el-form-item label="电话">
            <el-input v-model="addForm.mobile" width="200"></el-input>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input  v-model="addForm.realname" width="200"></el-input>
          </el-form-item>
          <el-form-item label="工号">
            <el-input v-model="addForm.employee_id" :width="200"></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-checkbox v-model="addForm.statue">启用</el-checkbox>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="addFormVisible = false">取消</el-button>
          <el-button :loading="addLoading" type="primary" @click.native="addSubmit(addForm)">提交</el-button>
        </div>
      </el-dialog>
      <el-dialog v-model="editFormVisible" :visible.sync="editFormVisible" :close-on-click-modal="false" :append-to-body="true" title="编辑">
        <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
          <el-form-item label="角色">

              <el-input v-model="editForm.role_id" width="200" auto-complete="off"></el-input>

          </el-form-item>
          <el-form-item label="用户名" prop="name">
            <el-input v-model="editForm.username" width="200" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="editForm.email" width="200"></el-input>
          </el-form-item>
          <el-form-item label="电话">
            <el-input v-model="editForm.mobile" width="200"></el-input>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input  v-model="editForm.realname" width="200"></el-input>
          </el-form-item>
          <el-form-item label="工号">
            <el-input v-model="editForm.employee_id" :width="200"></el-input>
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
  import axios from 'axios'
  import moment from 'moment'

  // 在月份、日期、小时等小于10前面补0
  var padDate = function(value) {
    return value < 10 ? '0' + value : value
  }
  export default {
    filters:{
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
    },
    components: { ElHeader },
    data() {
      return {
        editFormVisible:false,
        addFormVisible:false,
        addForm:{
          id: 0,
          name: '',
          price: 0,
          desc: '',
          reserve:'',
          options: [{
            value: '选项1',
            label: '黄金糕'
          }, {
            value: '选项2',
            label: '双皮奶'
          }]
        },
        editForm: {
          id: 0,
          name: '',
          price: 0,
          desc: '',
          reserve:'',
          options: [{
            value: '选项1',
            label: '黄金糕'
          }, {
            value: '选项2',
            label: '双皮奶'
          }]
        },
        listQuery: {
          currentPage: 1,
          limit: 20,
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
              const end = new Date(YYYY-MM-DD)
              const start = new Date(YYYY-MM-DD)
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date(YYYY-MM-DD)
              const start = new Date(YYYY-MM-DD)
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
          twotimes: [],
        },
        value6: '',
        Line: '',
        Line2: '',
        Line3: '',
        tableData: []
      }
    },
    created() {
      //处理默认时间控件的方法
      function dateFormatter(str){//默认返回yyyy-MM-dd HH-mm-ss
        var hasTime = arguments[1] != false ? true : false;//可传第二个参数false，返回yyyy-MM-dd
        var d = new Date(str);
        var year = d.getFullYear();
        var month = (d.getMonth()+1)<10 ? '0'+(d.getMonth()+1) : (d.getMonth()+1);
        var day = d.getDate()<10 ? '0'+d.getDate() : d.getDate();
        // var hour = d.getHours()<10 ? '0'+d.getHours() : d.getHours();
        // var minute = d.getMinutes()<10 ? '0'+d.getMinutes() : d.getMinutes();
        // var second = d.getSeconds()<10 ? '0'+d.getSeconds() : d.getSeconds();
        if(hasTime){
          return [year, month, day].join('-');
        }else{
          return [year, month, day].join('-');
        }
      }
      let start =dateFormatter(new Date())
      let end = dateFormatter(new Date())
      this.form.twotimes = [start, end];
      //后台接收数据get得到表格数据
      axios({
        method: 'get',
        baseURL: '/api',
        url: 'users'
      }).then(
        response => {
          console.log(response)
          this.tableData = response.data.data.rows
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
                return
            }
          })
          this.tableData.forEach((item, index) => {
            switch (item.line_id) {
              case 10000:
                item['line_id'] = '康明斯'
                break
                return
            }
          })

          console.log(this.tableData)
        }
      ).catch(
        error => {
          console.log(error)
          alert('网络错误，不能访问')
        }
      )
    },
    mounted(){
      this.chooseTimeRange()
      axios({
        method: 'get',
        baseURL: '/api',
        url: 'lines'
      }).then(
        response => {
          console.log(response)
          this.options1=response.data.data
        }
      ).catch(
        error => {
          console.log(error)
          alert('网络错误，不能访问')
        }
      )
      axios({
        method: 'get',
        baseURL: '/api',
        url: 'devices'
      }).then(
        response => {
          console.log(response)
          this.options2=response.data.data
        }
      ).catch(
        error => {
          console.log(error)
          alert('网络错误，不能访问')
        }
      )
    },
    methods: {
      checkemail:function(){
        var regEmail=/^[A-Za-zd]+([-_.][A-Za-zd]+)*@([A-Za-zd]+[-.])+[A-Za-zd]{2,5}$/;
        if(this.email==''){
          this.msgmail="请输入邮箱";
        }else if(!regEmail.test(this.email)){
          this.msgmail="邮箱格式不正确";
        }
      },
      closeDialog:function(){
        this.$refs.addForm.resetFields()
      },
      addSubmit:function(){
         axios({
           method:'post',
           baseURL:'api',
           url:'users',
           data:{
             email:this.addForm.email,
             employee_id:this.addForm.email,
             mobile:this.addForm.mobile,
             realname:this.addForm.realname,
             username:this.addForm.username,
             role_id:this.addForm.role_id,
           }
         }).then(
           response=>{
             console.log(response)
             this.$router.go(0)

           }
         ).catch(
           error=>{
             console.log(error)
             alert('网络错误请检查网络')
           }
         )
      },
      addHandle:function(){
        this.addFormVisible=true;

  },
      editSubmit:function(editForm){
        alert(editForm)
        axios({
          method:'put',
          baseURL:'api',
          url:'users/'+this.editForm.id,
          data:{
            email:this.editForm.email,
            employee_id:this.editForm.email,
            mobile:this.editForm.mobile,
            realname:this.editForm.realname,
            username:this.editForm.username,
            role_id:this.editForm.role_id,
          }


        }).then(
          response=>{
            console.log(response)

          }
        ).catch(
          error=>{
            console.log(error)
            alert('网络错误，不能访问')
          }
        )
      },
      handleEdit: function (index, row) {
       console.log(row.id)
        this.editFormVisible = true;
        this.editForm = Object.assign({}, row);
        this.id=row.id


      },
      // handleDownload() {
      //   this.downloadLoading = true
      //   require.ensure([], () => {
      //     const { export_json_to_excel } = require('@/vendor/Export2Excel')
      //     const tHeader = ['产线','工序', '设备名称', '设备编号','状态', '开始时间', '结束时间','持续时间','是否异常','异常原因']
      //     const filterVal = ['line_id', 'process', 'name','device_no','statusname','started_time','stopped_time','duration','abnormal','addon']
      //     const list = this.tableData
      //     const data = this.formatJson(filterVal, list)
      //     export_json_to_excel(tHeader, data, '运行记录列表excel')
      //     this.downloadLoading = false
      //   })
      // },
      // formatJson(filterVal, jsonData) {
      //   return jsonData.map(v => filterVal.map(j => v[j]))
      // },
      chooseTimeRange(t) {
        console.log(t)// 结果为一个数组，如：["2018-08-04", "2018-08-06"]
      },
      dateFormat: function(row, column) {
        var date = row[column.property]
        if (date == undefined) {
          return ''
        }
        return moment(date).format('YYYY-MM-DD HH:mm:ss')
      },
      search: function() {
        // if (!this.form.twotimes){
        //   this.form.twotimes = []
        // }
        // alert(this.form.twotimes)
        axios({
          method: 'get',
          baseURL: '/api',
          url: 'users',
          params: {
            realname: this.form.realname,
          }
        }).then(
          response => {
            console.log(response)
            this.tableData = response.data.data.rows
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
              switch (item.abnormal) {
                case false:
                  item['abnormal'] = '否'
                  break
                case true:
                  item['abnormal'] = '是'
                  break
                  return
              }
              this.tableData.forEach((item, index) => {
                switch (item.line_id) {
                  case 10000:
                    item['line_id'] = '康明斯'
                    break
                    return
                }
              })
            })
            console.log(this.tableData)
          }
        ).catch(
          error => {
            console.log(error)
            alert('网络错误，不能访问')
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
    margin-right: 15px;
  }
</style>
