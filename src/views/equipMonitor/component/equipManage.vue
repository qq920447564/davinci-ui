<template>
  <div>
    <el-header >
      <el-row>
      <!--<p>设备管理列表</p>-->
        <el-button  type="primary" @click="addFormVisible = true">新增</el-button>
        <el-dialog title="新增" v-model="addFormVisible" :visible.sync="addFormVisible" :close-on-click-modal="false" :append-to-body="true">
          <el-form :model="addForm" label-width="80px" :rules="editFormRules" ref="addFrom">
            <el-form-item label="设备标识:" prop="did">
              <el-input v-model="addForm.did" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="网关ID:" prop="gwid">
              <el-input v-model="addForm.gwid" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="图片URL:" prop="image">
              <el-input v-model="addForm.image" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="设备类型编码:" prop="type">
              <el-input v-model="addForm.type" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="设备编号:" prop="device_no">
              <el-input v-model="addForm.device_no" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="设备名称:" prop="name">
              <el-input v-model="addForm.name" auto-complete="off"></el-input>
            </el-form-item>

            <el-form-item label="工序:" prop="process">
              <el-input v-model="addForm.process" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="启用:" prop="enabled">
              <el-input v-model="addForm.enabled" auto-complete="off"></el-input>
            </el-form-item>

          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click.native="addFormVisible = false">取消</el-button>
            <el-button type="primary" @click.native="addSubmit" :loading="editLoading">提交</el-button>
          </div>
        </el-dialog>
      </el-row>
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
          prop="type"
          label="设备类型编码"
        >
        </el-table-column>
        <el-table-column
          prop="device_no"
          label="设备编号"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="设备名称"
        >
        </el-table-column>
        <el-table-column
          prop="process"
          label="工序"
        >
        </el-table-column>
        <el-table-column
          prop="line_id"
          label="产线"
        >
        </el-table-column>
        <el-table-column
          prop="enabled"
          label="启用"
        >
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="300">
          <template slot-scope="scope">
            <el-button @click="handleClick" type="text" size="small">禁用</el-button>
            <el-button @click="editFormVisible=true" type="text" size="small">修改</el-button>
            <el-dialog title="编辑" v-model="editFormVisible" :visible.sync="editFormVisible" :close-on-click-modal="false" :append-to-body="true" :before-close="handleClose">
              <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
                <el-form-item label="设备标识:" prop="did">
                  <el-input v-model="editForm.did" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="网关ID:" prop="gwid">
                  <el-input v-model="editForm.gwid" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="图片URL:" prop="image">
                  <el-input v-model="editForm.image" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="设备类型编码:" prop="type">
                  <el-input v-model="editForm.type" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="设备编号:" prop="device_no">
                  <el-input v-model="editForm.device_no" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="设备名称:" prop="name">
                  <el-input v-model="editForm.name" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="工序:" prop="process">
                  <el-input v-model="editForm.process" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="启用:" prop="enabled">
                  <el-input v-model="editForm.enabled" auto-complete="off"></el-input>
                </el-form-item>

              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click.native="handleCancel('editForm')">取消</el-button>
                <el-button type="primary" @click.native="handleUpdate('editForm')">更新</el-button>
              </div>
            </el-dialog>
            <el-button @click="dataHandleClick" type="text" size="small">数据项配置</el-button>
            <el-button @click="handleClick" type="text" size="small">图片配置</el-button>

          </template>
        </el-table-column>



      </el-table>
    </el-main>
    <el-footer>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400">
      </el-pagination>
    </el-footer>
  </div>
</template>

<script>
  import ElHeader from "element-ui/packages/header/src/main";
  import axios from 'axios'
  import index from "../../../router";

  var id,num


  export default {
    components: {},
    created(index){
      axios({
        method:'get',
        baseURL:'/api',
        url:'devices',
        async:false
      }).then(
        response=>{
          console.log(response);
          this.tableData=response.data.data;
          id=response.data.data
          for(let i in id){
            num=id[i].id
          }
        }
      ).catch(
        error=>{
          console.log(error);
          alert('网络错误，不能访问');
        }
      )

    },

    update:function(index){
      axios({
        method:'get',
        baseURL:'/api',
        url:'devices'
      }).then(
        response=>{
          console.log(response)
          this.editForm=response.data.data[index];
        }
      )
    },
    methods: {
      //跳转数据配置
      dataHandleClick:function(){
        console.log(id)
        this.$router.push({
          path: '/dataPage/dataPage',
          params: {
           id:this.tableData.id
          }
          /*query: {
              key: 'key',
              msgKey: this.msg
          }*/
        })
      },
      //点击取消
      handleCancel(formName) {
        this.editFormVisible = false;
      },
      //分页
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      //当前页
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      //点击编辑
      handleEdit(index, row) {
        this.editFormVisible = true;
        this.editForm = Object.assign({}, row); //这句是关键！！！
      },
      //点击更新
      handleUpdate(forName) {
        //更新的时候就把弹出来的表单中的数据写到要修改的表格中
        var postData = {
          device_no : this.editForm.device_no
      }

        //这里再向后台发个post请求重新渲染表格数据
        this.editFormVisible = false;
      },

      //提交post功能
      addSubmit(){
        axios({
          method:'post',
          baseURL:'/api',
          url:'devices',
          data:{
            did:this.addForm.did,
            gwid:this.addForm.gwid,
            image:this.addForm.image,
            type:this.addForm.type,
            device_no:this.addForm.device_no,
            name:this.addForm.name,
            process:this.addForm.process,
            line_id:this.addForm.line_id,
            enabled:this.addForm.enabled,
          }
        }).then(function(response){
          console.log(response);
          try {
            that.$refs['dialogContent'].resetFields();
          } catch (e) {

          }
        })
          .catch(function(error){
            console.log(error);
          })
      }
    },

    data() {
      return {
        currentPage4: 4,
        addFormVisible: false,
        editFormVisible:false,
        value6: '',
        addForm:{
          created_by: '',
          created_time: "",
          device_no: "",
          did: "",
          enabled:'' ,
          gwid: "",
          id: '',
          image: "",
          line_id: '',
          name: "",
          process: "",
          type: "",
          updated_by: '',
          updated_time: ""

        },
        editForm: {
          created_by: '',
          created_time: "",
          device_no: "",
          did: "",
          enabled:'' ,
          gwid: "",
          id: '',
          image: "",
          line_id: '',
          name: "",
          process: "",
          type: "",
          updated_by: '',
          updated_time: ""
        },
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
        tableData: []
      }
    },


  }
</script>
<style>
  header.el-header{
    padding-top:20px;
  }




</style>
