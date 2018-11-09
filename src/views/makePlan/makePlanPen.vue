<template>
  <div>
    <el-header :height="300">
      <div>
        <el-form ref="form" :model="form" label-width="80px">
          <el-row :gutter="24">
            <div class="grid-content bg-purple mydiv">
              <span class="mytitle">产线:</span>
              <el-select v-model="form.line_id" clearable="true" filterable placeholder="请选择" style="width: 130px">
                <el-option
                  v-for="item in options1"
                  :key="item.value"
                  :label="item.name"
                  :value="item.id"/>
              </el-select>
            </div>
            <div class="grid-content bg-purple mydiv">
              <span class="mytitle">达成日期</span>
              <el-date-picker
                v-model="towtimes"
                :picker-options="pickerOptions2"
                style="width: 390px"
                type="daterange"
                align="center"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期" />
            </div>
            <el-button @click="quickaddFormVisible = true">创建生产计划</el-button>
            <el-button @click="search">搜索</el-button>
            <el-button @click="handle">导出</el-button>
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
          prop="date"
          label="产线"
        />
        <el-table-column
          prop="name"
          label="日期"
        />
        <el-table-column
          prop="province"
          label="时间段"
        />
        <el-table-column
          prop="state"
          label="产品名称"
        />
        <el-table-column
          prop="begin_time"
          label="计划产量"
        />
        <el-table-column
          prop="reason"
          label="备注"
        />
        <el-table-column
          prop="reason"
          label="计划人员"
        />
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="editFormVisible = true">修改</el-button>
            <!--编辑界面-->
            <el-dialog v-model="editFormVisible" :visible.sync="editFormVisible" :close-on-click-modal="false" :append-to-body="true" title="编辑">
              <el-form ref="editForm" :model="editForm" :rules="editFormRules" label-width="80px">
                <el-form-item label="产线" prop="name">
                  <el-input v-model="editForm.name" auto-complete="off"/>
                </el-form-item>
                <el-form-item label="日期">
                  <el-date-picker v-model="editForm.date" type="date" placeholder="选择日期"/>
                </el-form-item>
                <el-form-item label="时间段:">
                  <el-time-picker
                    v-model="value5"
                    is-range
                    arrow-control
                    range-separator="至"
                    start-placeholder="开始时间"
                    end-placeholder="结束时间"
                    placeholder="选择时间范围"/>
                </el-form-item>
                <el-form-item label="产品名称" prop="name">
                  <el-input v-model="editForm.name" auto-complete="off"/>
                </el-form-item>
                <el-form-item label="计划产量" prop="name">
                  <el-input v-model="editForm.name" auto-complete="off"/>
                </el-form-item>
                <el-form-item label="备注">
                  <el-input v-model="editForm.addr" type="textarea"/>
                </el-form-item>
                <el-form-item label="计划人员" prop="name">
                  <el-input v-model="editForm.name" auto-complete="off"/>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click.native="editFormVisible = false">取消</el-button>
                <el-button :loading="editLoading" type="primary" @click.native="editSubmit">提交</el-button>
              </div>
            </el-dialog>
            <!--//新增弹窗-->
            <el-dialog v-model="addFormVisible" :visible.sync="addFormVisible" :close-on-click-modal="false" :append-to-body="true" title="新增">
              <el-form ref="editForm" :model="editForm" :rules="editFormRules" label-width="80px">
                <el-form-item label="产线:" prop="name">
                  <el-input v-model="editForm.name" auto-complete="off"/>
                </el-form-item>
                <el-form-item label="日期:">
                  <el-date-picker v-model="editForm.date" type="date" placeholder="选择日期"/>
                </el-form-item>
                <el-form-item label="时间段:">
                  <el-time-picker
                    v-model="value5"
                    is-range
                    arrow-control
                    range-separator="至"
                    start-placeholder="开始时间"
                    end-placeholder="结束时间"
                    placeholder="选择时间范围"/>
                </el-form-item>
                <el-form-item label="产品名称:" prop="name">
                  <el-input v-model="editForm.name" auto-complete="off"/>
                </el-form-item>
                <el-form-item label="计划产量:" prop="name">
                  <el-input v-model="editForm.name" auto-complete="off"/>
                </el-form-item>
                <el-form-item label="计划人员:" prop="name">
                  <el-input v-model="editForm.name" auto-complete="off"/>
                </el-form-item>
                <el-form-item label="备注:">
                  <el-input v-model="editForm.addr" type="textarea"/>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click.native="editFormVisible = false">取消</el-button>
                <el-button :loading="editLoading" type="primary" @click.native="editSubmit">提交</el-button>
              </div>
            </el-dialog>
            <el-dialog v-model="quickaddFormVisible" :visible.sync="quickaddFormVisible" :close-on-click-modal="false" :append-to-body="true" title="快速创建">
              <el-form ref="editForm" :model="editForm" :rules="editFormRules" label-width="80px">
                <el-form-item label="产线:" prop="name">
                  <el-input v-model="editForm.name" auto-complete="off"/>
                </el-form-item>
                <el-form-item label="日期:">
                  <el-date-picker v-model="editForm.date" type="date" placeholder="选择日期"/>
                </el-form-item>
                <el-form-item label="小时计划产量:" prop="name" >
                  <el-input v-model="editForm.name" auto-complete="off"/>
                </el-form-item>
                <el-form-item label="计划人员:" prop="name">
                  <el-input v-model="editForm.name" auto-complete="off"/>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click.native="editFormVisible = false">取消</el-button>
                <el-button :loading="editLoading" type="primary" @click.native="editSubmit">快速创建计划</el-button>
              </div>
            </el-dialog>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </div>
</template>

<script>
import ElHeader from 'element-ui/packages/header/src/main'

export default {
  components: { ElHeader },

  // handleClick:function(){
  //   this.$router.push('/historicalLine/historicalLine');
  //
  // }
  data() {
    return {
      filters: {
        name: ''
      },
      value5: '',
      users: [],
      total: 0,
      page: 1,
      listLoading: false,
      sels: [], // 列表选中列
      editFormVisible: false, // 编辑界面是否显示
      addFormVisible: false,
      quickaddFormVisible: false,
      editLoading: false,
      // editFormRules: {
      //   name: [
      //     { required: true, message: '请输入姓名', trigger: 'blur' }
      //   ]
      // },
      editFormVisible: false,
      editForm: {
        id: 0,
        name: '',
        sex: -1,
        age: 0,
        birth: '',
        addr: ''
      },
      dialogVisible: false,
      dialogFormVisible: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      value6: '',
      tableData: []
    }
  },
  created() {
    var fd = new FormData()
    fd.append('addon', '')
    const config = {

    }
    axios.post('http://35.220.189.208:8080/plans', fd, config).then(res => {
      console.log(res)
    }).catch(res => {
      console.log(1)
    })
  },
  methods: {
    // 显示编辑页面
    handleEdit: function(index, row) {
      this.editFormVisible = true
      this.editForm = Object.assign({}, row)
    },
    editSubmit: function() {
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            this.editLoading = true
            // NProgress.start();
            const para = Object.assign({}, this.editForm)
            para.birth = (!para.birth || para.birth === '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd')
            editUser(para).then((res) => {
              this.editLoading = false
              // NProgress.done();
              this.$message({
                message: '提交成功',
                type: 'success'
              })
              this.$refs['editForm'].resetFields()
              this.editFormVisible = false
              this.getUsers()
            })
          })
        }
      })
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
