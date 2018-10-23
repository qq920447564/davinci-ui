<template>
  <div>
    <el-header :height="300">
      <div>
        <el-form ref="form" :model="form" label-width="80px">

          <el-row :gutter="10">

            <el-col :span="8">
              <el-form-item label="产线:">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="上班日期:">
                <el-date-picker
                  v-model="value6"
                  type="datetimerange"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :default-time="['12:00:00']">
                </el-date-picker>
              </el-form-item>
            </el-col>

            <el-col :span="8" :push="3" >
              <el-button  type="primary" @click="addFormVisible = true">新增</el-button>
              <el-button  type="primary" @click="addFormVisible = true">搜索</el-button>
              <el-button  type="primary" @click="addFormVisible = true">导出</el-button>



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
          prop="date"
          label="生产日期"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="产线"
        >
        </el-table-column>
        <el-table-column
          prop="province"
          label="不良数量"
        >
        </el-table-column>
        <el-table-column
          prop="city"
          label="备注"
        >
        </el-table-column>
        <el-table-column
          prop="state"
          label="创建人"
        >
        </el-table-column>
        <el-table-column
          prop="begin_time"
          label="创建时间"
        >
        </el-table-column>
        <!--<el-table-column-->
          <!--prop="reason"-->
          <!--label="备注"-->
        <!--&gt;-->
        <!--</el-table-column>-->
        <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="dialogVisible = true" type="text" size="small" >删除</el-button>
          <el-dialog title="删除提醒" :visible.sync="dialogVisible" width="30%" :before-close="handleClose" :append-to-body="true">
            <span>确认删除?</span><span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
             <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
          </span>
          </el-dialog>
          <el-button type="text" size="small"  @click="editFormVisible = true">编辑</el-button>
          <!--编辑界面-->
          <el-dialog title="编辑" v-model="editFormVisible" :visible.sync="editFormVisible" :close-on-click-modal="false" :append-to-body="true">
            <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
              <el-form-item label="产线" prop="name">
                <el-input v-model="editForm.name" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="日期">
                <el-date-picker type="date" placeholder="选择日期" v-model="editForm.date"></el-date-picker>
              </el-form-item>
              <el-form-item label="上班时间">
                <el-date-picker type="date" placeholder="选择日期" v-model="editForm.shang"></el-date-picker>
              </el-form-item>
              <el-form-item label="下班时间">
                <el-date-picker type="date" placeholder="选择日期" v-model="editForm.xia"></el-date-picker>
              </el-form-item>
              <el-form-item label="姓名" prop="name">
                <el-input v-model="editForm.name" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="产品" prop="name">
                <el-input v-model="editForm.name" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="备注">
                <el-input type="textarea" v-model="editForm.addr"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click.native="editFormVisible = false">取消</el-button>
              <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
            </div>
          </el-dialog>
          <el-dialog title="编辑" v-model="addFormVisible" :visible.sync="addFormVisible" :close-on-click-modal="false" :append-to-body="true">
            <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
              <el-form-item label="产线" prop="name">
                <el-input v-model="editForm.name" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="日期">
                <el-date-picker type="date" placeholder="选择日期" v-model="editForm.date"></el-date-picker>
              </el-form-item>
              <el-form-item label="上班时间">
                <el-date-picker type="date" placeholder="选择日期" v-model="editForm.shang"></el-date-picker>
              </el-form-item>
              <el-form-item label="下班时间">
                <el-date-picker type="date" placeholder="选择日期" v-model="editForm.xia"></el-date-picker>
              </el-form-item>
              <el-form-item label="姓名" prop="name">
                <el-input v-model="editForm.name" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="产品" prop="name">
                <el-input v-model="editForm.name" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="备注">
                <el-input type="textarea" v-model="editForm.addr"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click.native="editFormVisible = false">取消</el-button>
              <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
            </div>
          </el-dialog>
        </template>
      </el-table-column>
      </el-table>
    </el-main>
  </div>
</template>

<script>
  import ElHeader from "element-ui/packages/header/src/main";



  export default {
    components: {ElHeader},

    // handleClick:function(){
    //   this.$router.push('/historicalLine/historicalLine');
    //
    // }
    data() {
      return {
        filters: {
          name: ''
        },
        users: [],
        total: 0,
        page: 1,
        listLoading: false,
        sels: [],//列表选中列
        editFormVisible: false,//编辑界面是否显示
        addFormVisible: false,
        editLoading: false,
        editFormRules: {
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' }
          ]
        },
        editFormVisible:false,
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
        value6:'',
        tableData: [{
          date: '康明斯\n',
          name: 'OP10\n\n',
          province: '机床1\n',
          city: 'OP10-1\n',
          state: '加工\n',
          begin_time: 200333,
          end_time:200333,
          during_time:10,
          if_wrong:'是',
          reason:''

        }, {
          date: '康明斯\n\n',
          name: 'OP10\n\n',
          province: '机床1\n',
          city: 'OP10-1\n',
          state: '空闲\n',
          begin_time: 200333,
          end_time:200333,
          during_time:10,
          if_wrong:'否',
          reason:''
        }, {
          date: '康明斯\n\n',
          name: 'OP10\n\n',
          province: '机床1\n',
          city: 'OP10-1\n',
          state: '报警\n',
          begin_time: 200333,
          end_time:200333,
          during_time:10,
          if_wrong:'是',
          reason:''
        },
          {
            date: '康明斯\n\n',
            name: 'OP10\n\n',
            province: '机床1\n',
            city: 'OP10-1\n',
            state: '关机\n',
            begin_time: 200333,
            end_time:200333,
            during_time:10,
            if_wrong:'否',
            reason:''
          },
          {
            date: '康明斯\n\n',
            name: 'OP10\n\n',
            province: '机床1\n',
            city: 'OP10-1\n',
            state: '加工\n',
            begin_time: 200333,
            end_time:200333,
            during_time:10,
            if_wrong:'是',
            reason:''
          },
          {
            date: '康明斯\n\n',
            name: 'OP10\n\n',
            province: '机床1\n',
            city: 'OP10-1\n',
            state: '空闲',
            begin_time: 200333,
            end_time:200333,
            during_time:10,
            if_wrong:'否',
            reason:''
          }]
      }
    },
    methods:{
      //显示编辑页面
      handleEdit: function (index, row) {
        this.editFormVisible = true;
        this.editForm = Object.assign({}, row);
      },
      editSubmit: function () {
        this.$refs.editForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.editLoading = true;
              //NProgress.start();
              let para = Object.assign({}, this.editForm);
              para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
              editUser(para).then((res) => {
                this.editLoading = false;
                //NProgress.done();
                this.$message({
                  message: '提交成功',
                  type: 'success'
                });
                this.$refs['editForm'].resetFields();
                this.editFormVisible = false;
                this.getUsers();
              });
            });
          }
        });
      },
    }


  }
</script>
<style>
  header.el-header{
    padding-top: 20px;
  }


</style>
