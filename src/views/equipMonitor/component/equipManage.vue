<template>
  <div>
    <el-header >
      <el-row>
      <!--<p>设备管理列表</p>-->
        <el-button  type="primary" @click="addFormVisible = true">新增</el-button>
        <el-dialog title="新增" v-model="addFormVisible" :visible.sync="addFormVisible" :close-on-click-modal="false" :append-to-body="true">
          <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
            <el-form-item label="产线:" prop="name">
              <el-input v-model="editForm.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="日期:">
              <el-date-picker type="date" placeholder="选择日期" v-model="editForm.date"></el-date-picker>
            </el-form-item>
            <el-form-item label="时间段:">
              <el-time-picker
                is-range
                arrow-control
                v-model="value5"
                range-separator="至"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                placeholder="选择时间范围">
              </el-time-picker>
            </el-form-item>
            <!--<el-form-item label="下班时间">-->
            <!--<el-date-picker type="date" placeholder="选择日期" v-model="editForm.xia"></el-date-picker>-->
            <!--</el-form-item>-->
            <el-form-item label="产品名称:" prop="name">
              <el-input v-model="editForm.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="计划产量:" prop="name">
              <el-input v-model="editForm.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="计划人员:" prop="name">
              <el-input v-model="editForm.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="备注:">
              <el-input type="textarea" v-model="editForm.addr"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click.native="editFormVisible = false">取消</el-button>
            <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
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
          prop="date"
          label="ID"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="设备类型编码"
        >
        </el-table-column>
        <el-table-column
          prop="province"
          label="设备编号"
        >
        </el-table-column>
        <el-table-column
          prop="city"
          label="设备名称"
        >
        </el-table-column>
        <el-table-column
          prop="state"
          label="工序"
        >
        </el-table-column>
        <el-table-column
          prop="begin_time"
          label="产线"
        >
        </el-table-column>
        <el-table-column
          prop="begin_time"
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
            <el-dialog title="编辑" v-model="editFormVisible" :visible.sync="editFormVisible" :close-on-click-modal="false" :append-to-body="true">
              <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
                <el-form-item label="产线" prop="name">
                  <el-input v-model="editForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="日期">
                  <el-date-picker type="date" placeholder="选择日期" v-model="editForm.date"></el-date-picker>
                </el-form-item>
                <el-form-item label="时间段:">
                  <el-time-picker
                    is-range
                    arrow-control
                    v-model="value5"
                    range-separator="至"
                    start-placeholder="开始时间"
                    end-placeholder="结束时间"
                    placeholder="选择时间范围">
                  </el-time-picker>
                </el-form-item>
                <el-form-item label="产品名称" prop="name">
                  <el-input v-model="editForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="计划产量" prop="name">
                  <el-input v-model="editForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                  <el-input type="textarea" v-model="editForm.addr"></el-input>
                </el-form-item>
                <el-form-item label="计划人员" prop="name">
                  <el-input v-model="editForm.name" auto-complete="off"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click.native="editFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
              </div>
            </el-dialog>
            <el-button @click="dataHandleClick" type="text" size="small">数据项配置</el-button>
            <el-button @click="handleClick" type="text" size="small">图片配置</el-button>

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
    methods: {
      dataHandleClick:function(){
        this.$router.push('/dataPage/dataPage');

      }
    },

    data() {
      return {
        addFormVisible: false,
        editFormVisible:false,
        value6: '',
        editForm: {
          id: 0,
          name: '',
          sex: -1,
          age: 0,
          birth: '',
          addr: ''
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
        tableData: [{
          date: '康明斯\n',
          name: 'OP10\n\n',
          province: '机床1\n',
          city: 'OP10-1\n',
          state: '加工\n',
          begin_time: 200333,
          end_time:200333,
          during_time:10,
          if_wrong:'is'

        }, {
          date: '康明斯\n\n',
          name: 'OP10\n\n',
          province: '机床1\n',
          city: 'OP10-1\n',
          state: '空闲\n',
          begin_time: 200333,
          end_time:200333,
          during_time:10,
          if_wrong:'is'
        }, {
          date: '康明斯\n\n',
          name: 'OP10\n\n',
          province: '机床1\n',
          city: 'OP10-1\n',
          state: '报警\n',
          begin_time: 200333,
          end_time:200333,
          during_time:10,
          if_wrong:''
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
            if_wrong:''
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
            if_wrong:''
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
            if_wrong:''
          }]
      }
    },


  }
</script>
<style>
  header.el-header{
    padding-top:20px;
  }




</style>
