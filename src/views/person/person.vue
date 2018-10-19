<template>
  <div>
    <el-header :height="300">
      <div>
        <el-form ref="form" :model="form" label-width="80px">
          <el-row :gutter="10">
            <el-col :span="6">
              <el-form-item label="产线:">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="是否异常:">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
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
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="日期"
        >
        </el-table-column>
        <el-table-column
          prop="province"
          label="上班时间"
        >
        </el-table-column>
        <el-table-column
          prop="city"
          label="下班时间"
        >
        </el-table-column>
        <el-table-column
          prop="state"
          label="姓名"
        >
        </el-table-column>
        <el-table-column
          prop="begin_time"
          label="产品"
        >
        </el-table-column>
        <el-table-column
          prop="reason"
          label="备注"
        >
        </el-table-column><el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="dialogVisible = true" type="text" size="small" :modal-append-to-body="false">下班</el-button>
          <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose">
            <span>员工确认下班?</span>
            <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
          </el-dialog>
          <el-button @click="handleClick" type="text" size="small">修改</el-button>
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
      // handleClick:function(){
      //   this.$router.push('/historicalLine/historicalLine');
      //
      // }
    },

    data() {
      return {
        dialogVisible: false,
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


  }
</script>
<style>
  header.el-header{
    padding-top: 20px;
  }


</style>
