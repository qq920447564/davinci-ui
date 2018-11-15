<template>
  <div>
    <el-header :height="300">
      <div>
        <el-form ref="form" :model="form" label-width="80px">
          <el-row >
            <el-col :span="24">
              <div class="grid-content bg-purple mydiv">
                <span class="mytitle">产线</span>
                <el-select v-model="form.line_id" filterable placeholder="请选择" style="width: 130px">
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
                  v-model="form.twotimes" clearable="true"
                  :picker-options="pickerOptions2"
                  value-format="yyyy-MM-dd"
                  format="yyyy-MM-dd"
                  :unlink-panels="true"
                  style="width: 280px"
                  type="daterange"
                  align="center"
                  unlink-panels
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  @change="chooseTimeRange" />
              </div>
              <div class="grid-content bg-purple mydiv">
                <el-button  @click="addHandle" >创建生产计划</el-button>
                <el-button @click="search">搜索</el-button>
                <el-button @click="handleDownload" :loading="downloadLoading">导出</el-button>
              </div>
            </el-col>
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
          prop="product_id"
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
            <el-button type="text" size="small" @click="handleClick">删除</el-button>
          </template>
        </el-table-column>

      </el-table>
      <el-dialog  width="20%" v-model="addFormVisible" :visible.sync="addFormVisible" :close-on-click-modal="false" :append-to-body="true" title='新增' @close="closeDialog" >
        <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
          <el-form-item label="产线">
              <el-select v-model="addForm.line2" :style="{ width: '90%' }" filterable placeholder="请选择">
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
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
              format="yyyy-MM-dd"
              @change="chooseTimeRange">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="时间段">
            <el-select v-model="addForm.time" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="产品名称">
            <el-select v-model="addForm.pro2" :style="{ width: '90%' }" filterable placeholder="请选择">
              <el-option
                v-for="item in options3"
                :key="item.value"
                :label="item.name"
                :value="item.id"/>
            </el-select>
          </el-form-item>
          <el-form-item label="计划产量">
            <el-input  v-model="addForm.cnt" width="200"></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="addForm.addon" :width="200"></el-input>
          </el-form-item>
          <el-form-item label="">
            <el-checkbox v-model="addForm.statue">快速创建小时计划</el-checkbox>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="addFormVisible = false">取消</el-button>
          <el-button :loading="addLoading" type="primary" @click.native="addSubmit(addForm)">提交</el-button>
        </div>
      </el-dialog>
      <el-dialog width="20%" v-model="editFormVisible" :visible.sync="editFormVisible" :close-on-click-modal="false" :append-to-body="true" title="编辑">
        <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
          <el-form-item label="产线">
            <el-select v-model="editForm.line2" :style="{ width: '90%' }" filterable placeholder="请选择">
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
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
                format="yyyy-MM-dd"
                @change="chooseTimeRange">
              </el-date-picker>
            </el-form-item>
          <el-form-item label="时间段">
            <el-select v-model="editForm.plan_time_id" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="产品名称">
            <el-select v-model="editForm.pro2" :style="{ width: '90%' }" filterable placeholder="请选择">
              <el-option
                v-for="item in options3"
                :key="item.value"
                :label="item.name"
                :value="item.id"/>
            </el-select>
          </el-form-item>
          <el-form-item label="计划产量">
            <el-input  v-model="editForm.cnt" width="200"></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="editForm.addon" :width="200"></el-input>
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
        options: [{
          value: '10000',
          label: '0:00-1:00'
        }, {
          value: '10001',
          label: '1:00-2:00'
        },{
          value: '10002',
          label: '2:00-3:00'
        },{
          value: '10003',
          label: '3:00-4:00'
        },{
          value: '10004',
          label: '4:00-5:00'
        },{
          value: '10005',
          label: '5:00-6:00'
        },{
          value: '10006',
          label: '6:00-7:00'
        },{
          value: '10007',
          label: '7:00-8:00'
        },{
          value: '10008',
          label: '8:00-9:00'
        },{
          value: '10009',
          label: '9:00-10:00'
        },{
          value: '10010',
          label: '10:00-11:00'
        },{
          value: '10011',
          label: '11:00-12:00'
        },{
          value: '10012',
          label: '12:00-13:00'
        },{
          value: '10013',
          label: '13:00-14:00'
        },{
          value: '10014',
          label: '14:00-15:00'
        },{
          value: '10015',
          label: '15:00-16:00'
        },{
          value: '10016',
          label: '16:00-17:00'
        },{
          value: '10017',
          label: '17:00-18:00'
        },{
          value: '10018',
          label: '18:00-19:00'
        },{
          value: '10019',
          label: '19:00-20:00'
        },{
          value: '10020',
          label: '20:00-21:00'
        },{
          value: '10021',
          label: '21:00-22:00'
        },{
          value: '10022',
          label: '22:00-23:00'
        },{
          value: '10023',
          label: '23:00-24:00'
        }],
        addForm:{
          id: 0,
          name: '',
          price: 0,
          desc: '',
          reserve:'',
          time:'',

        },
        editForm: {
          id: 0,
          name: '',
          price: 0,
          desc: '',
          reserve:'',

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
          line2:''
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
        url: 'plans'
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
      // axios({
      //   method: 'get',
      //   baseURL: '/api',
      //   url: 'devices'
      // }).then(
      //   response => {
      //     console.log(response)
      //     this.options2=response.data.data
      //   }
      // ).catch(
      //   error => {
      //     console.log(error)
      //     alert('网络错误，不能访问')
      //   }
      // ),
        axios({
          method: 'get',
          baseURL: '/api',
          url: 'products'
        }).then(
          response => {
            console.log(response)
            this.options3=response.data.data
          }
        ).catch(
          error => {
            console.log(error)
            alert('网络错误，不能访问')
          }
        )
    },
    methods: {
      // handleDownload() {
      //   this.downloadLoading = true
      //   require.ensure([], () => {
      //     const { export_json_to_excel } = require('@/vendor/Export2Excel')
      //     const tHeader = ['日期', '姓名', '地址']
      //     const filterVal = ['date', 'name', 'address']
      //     const list = this.tableData
      //     const data = this.formatJson(filterVal, list)
      //     export_json_to_excel(tHeader, data, '列表excel')
      //     this.downloadLoading = false
      //   })
      // },
      // formatJson(filterVal, jsonData) {
      //   return jsonData.map(v => filterVal.map(j => v[j]))
      // },
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
          url:'plans',
          data:{
            line_id:this.addForm.line2,
            plan_date :this.addForm.plan_date ,
            mobile:this.addForm.mobile,
            plan_time_id:this.addForm.time,
            product_id :this.addForm.pro2 ,
            cnt:this.addForm.cnt,
            addon:this.addForm.addon,
            plan_user_id :this.addForm.plan_user_id ,
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

        axios({
          method:'put',
          baseURL:'api',
          url:'plans/'+this.editForm.id,
          data:{
            line_id:this.editForm.line2,
            plan_date :this.editForm.plan_date ,
            plan_time_id:this.editForm.plan_time_id,
            product_id :this.editForm.pro2 ,
            cnt:this.editForm.cnt,
            addon:this.editForm.addon,
            plan_user_id :this.editForm.plan_user_id ,
          }


        }).then(
          response=>{
            console.log(response)
            this.$router.go(0)

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
        return moment(date).format('YYYY-MM-DD')
      },
      search: function() {
        if (!this.form.twotimes){
          this.form.twotimes = []
        }
        axios({
          method: 'get',
          baseURL: '/api',
          url: 'plans',
          params: {
            line_id: this.form.line_id,
            begin_date: this.form.twotimes[0],
            end_date:this.form.twotimes[1]
          }
        }).then(
          response => {
            console.log(response)
            this.tableData = response.data.data.rows
            // this.tableData.forEach((item, index) => {
            //   switch (item.status) {
            //     case 0:
            //       item['statusname'] = '关机'
            //       break
            //     case 1:
            //       item['statusname'] = '运行'
            //       break
            //     case 2:
            //       item['statusname'] = '空闲'
            //       break
            //     case 3:
            //       item['statusname'] = '报警'
            //       break
            //     case 4:
            //       item['statusname'] = '其它'
            //       return
            //   }
            //   switch (item.abnormal) {
            //     case false:
            //       item['abnormal'] = '否'
            //       break
            //     case true:
            //       item['abnormal'] = '是'
            //       break
            //       return
            //   }
            //   this.tableData.forEach((item, index) => {
            //     switch (item.line_id) {
            //       case 10000:
            //         item['line_id'] = '康明斯'
            //         break
            //         return
            //     }
            //   })
            // })
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
