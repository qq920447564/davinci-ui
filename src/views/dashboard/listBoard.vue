<template>
  <div>
    <el-header>
      <el-row>
        <el-col :span="24">
          <h1 style="text-align:center;">南阳飞龙康明斯产线综合管理看板</h1>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" :offset="18">
          <p class="data" >日期:<span>{{ now | dateformat('YYYY-MM-DD ') }}</span></p>
        </el-col>
      </el-row>


    </el-header>
    <el-main>

     <mainTable :tableData="tableData" :tableStyle="{ width:'600px' }"></mainTable>

     </el-main>
    <el-footer></el-footer>
  </div>
</template>

<script>
  import ElHeader from "element-ui/packages/header/src/main";
  import moment from 'moment'
  import mainTable from  '@/views/dashboard/component/table'
  export default {
    components: {mainTable},
    filters: {
      dateformat(dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
        return moment(dataStr).format(pattern)
      }
    },
    data() {
      tableData: [
        {key: '单号', value: '1001'},
        {key: '商品名称', value: '篮球'},
        {key: '价格', value: '120.00'},
        {key: '订单日期', value: '2017-03-01'},
        {key: '付款方式', value: '在线支付'},
        {key: '收货地址', value: '北京市海淀区西北旺镇'},
      ]
    },
    methods:{
      parentMethod() {
        console.log(this.$refs.c1) //返回的是一个vue对象，所以可以直接调用其方法
        this.$refs.c1.childMethod();
      },

    },
    mounted() {
      setInterval(() => {
        this.now = moment()
      }, 1000)
    },

  }
</script>
