<template>
  <keep-alive>
  <div>
    <el-header :height="300">
      <div>
        <el-form ref="form" :model="form" label-width="80px">

          <el-row :gutter="10">

            <el-col :span="8">
              <!--<el-form-item label="产线:">-->
                <!--<el-input v-model="form.name"></el-input>-->
              <!--</el-form-item>-->
            </el-col>
            <el-col :span="8">
              <!--<el-form-item label="上班日期:">-->
                <!--<el-date-picker-->
                  <!--v-model="value6"-->
                  <!--type="datetimerange"-->
                  <!--start-placeholder="开始日期"-->
                  <!--end-placeholder="结束日期"-->
                  <!--:default-time="['12:00:00']">-->
                <!--</el-date-picker>-->
              <!--</el-form-item>-->
            </el-col>

            <el-col :span="8" :push="18" >
              <el-button  type="primary" @click="addFormVisible = true">新增</el-button>
              <el-button  type="primary" @click="search">参考新增</el-button>
              <!--<el-button  type="primary" @click="derive">导出</el-button>-->
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
          prop="id"
          label="ID"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="网关ID"
        >
        </el-table-column>
        <el-table-column
          prop="data_type"
          label="类型"
        >
        </el-table-column>
        <el-table-column
          prop="dpkey"
          label="数据项编码"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="数据名称"
        >
        </el-table-column>
        <el-table-column
          prop="data_type"
          label="数据类型"
        >
        </el-table-column>
        <el-table-column
          prop="formula"
          label="公式"
        >
        </el-table-column>
        <el-table-column
          prop="unit"
          label="单位"
        >
        </el-table-column>
        <el-table-column
          prop="persist"
          label="需要保留历史值"
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
                <el-form-item label="ID">
                  <el-date-picker type="date" placeholder="选择日期" v-model="editForm.date"></el-date-picker>
                </el-form-item>
                <el-form-item label="不良数量">
                  <el-input v-model="editForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                  <el-input v-model="editForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="检验员" prop="name">
                  <el-input v-model="editForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="创建人" prop="name">
                  <el-input v-model="editForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="创建时间" prop="name">
                  <el-date-picker type="date" placeholder="选择日期" v-model="editForm.date"></el-date-picker>
                </el-form-item>
                <!--<el-form-item label="备注">-->
                <!--<el-input type="textarea" v-model="editForm.addr"></el-input>-->
                <!--</el-form-item>-->
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click.native="editFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
              </div>
            </el-dialog>
            <el-dialog title="新增" v-model="addFormVisible" :visible.sync="addFormVisible" :close-on-click-modal="false" :append-to-body="true">
              <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
                <el-form-item label="产线" prop="name">
                  <el-input v-model="editForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="生产日期">
                  <el-date-picker type="date" placeholder="选择日期" v-model="editForm.date"></el-date-picker>
                </el-form-item>
                <el-form-item label="不良数量">
                  <el-input v-model="editForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                  <el-input v-model="editForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="检验员" prop="name">
                  <el-input v-model="editForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="创建人" prop="name">
                  <el-input v-model="editForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="创建时间" prop="name">
                  <el-date-picker type="date" placeholder="选择日期" v-model="editForm.date"></el-date-picker>
                </el-form-item>
                <!--<el-form-item label="备注">-->
                <!--<el-input type="textarea" v-model="editForm.addr"></el-input>-->
                <!--</el-form-item>-->
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
  </keep-alive>
</template>

<script>
  import ElHeader from "element-ui/packages/header/src/main";
   import axios from 'axios'

var num=[];

  export default {
    components: {},

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
        // editFormRules: {
        //   name: [
        //     { required: true, message: '请输入姓名', trigger: 'blur' }
        //   ]
        // },
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
        tableData: []
      }
    },
    // created(){
    //   axios({
    //     method:'get',
    //     baseURL:'/api',
    //     url:'data_points',
    //     params:{
    //       id:this.$router.push.params.id
    //     }
    //
    //   }).then(
    //     response=>{
    //       console.log(response);
    //       this.tableData=response.data.data;
    //     }
    //   ).catch(
    //     error=>{
    //       console.log(error);
    //       alert('网络错误，不能访问');
    //     }
    //   )
    // },
    created(index){

        axios({
          method:'get',
          baseURL:'/api',
          url:'data_points',
          params:{
       device_id:this.$route.query.id
          },

        }).then(
          response=>{
            console.log(response);
            this.tableData=response.data.data;
          }
        ).catch(
          error=>{
            console.log(error);
            alert('网络错误，不能访问');
          }
        )





    },
    mounted(){
      console.log(this.$route.query.id)
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
