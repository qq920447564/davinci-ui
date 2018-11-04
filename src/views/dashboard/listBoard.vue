<template>
  <div>
    <el-header :height='100'>
      <el-row :gutter="20">
        <el-col :span="24">
          <h1>产线设备状态看板</h1>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" :offset="18">
          <!--<p class="data" >日期:<span>{{ now |date | formatDate }}</span></p>-->
         <h2>{{ date| formatDate}}</h2>
        </el-col>
      </el-row>
      <table></table>
      <el-row>
        <el-form ref="form" :model="form" label-width="80px" style="padding-top: 20px">
        <el-col :span="6" :offset="15">
          <el-form-item label="产线:">
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-button  type="primary" @click="search">搜索</el-button>
        </el-form>
      </el-row>
      <div>

      </div>
    </el-header>
    <el-main>
     <el-row :gutter="20">
       <el-col :span="6"  >
       <div style="border: 1px solid">
         <el-row style=" text-align: center;background-color: green">
           <img :src="imgUrl">
         </el-row>
         <el-table
           :data="tableData" :show-header="false"
           style="width: 100%">
           <el-table-column
             prop="id"
             label="日期"
           >
           </el-table-column>
           <el-table-column
             prop="name"
             label="姓名"
           >
           </el-table-column>

         </el-table>
       </div>
     </el-col>

       <el-col :span="6"  >
         <div style="border: 1px solid">
           <el-row style=" text-align: center;background-color: red">
             <img :src="imgUrl">
           </el-row>
           <el-table
             :data="tableData" :show-header="false"
             style="width: 100%">
             <el-table-column
               prop="date"
               label="日期"
             >
             </el-table-column>
             <el-table-column
               prop="name"
               label="姓名"
             >
             </el-table-column>

           </el-table>
         </div>
       </el-col>


       <el-col :span="6"  >
         <div style="border: 1px solid">
           <el-row style=" text-align: center;background-color: orange">
             <img :src="imgUrl">
           </el-row>
           <el-table
             :data="tableData" :show-header="false"
             style="width: 100%">
             <el-table-column
               prop="date"
               label="日期"
             >
             </el-table-column>
             <el-table-column
               prop="name"
               label="姓名"
             >
             </el-table-column>

           </el-table>
         </div>
       </el-col>


       <el-col :span="6"  >
         <div style="border: 1px solid">
           <el-row style=" text-align: center;background-color: gray">
             <img :src="imgUrl">
           </el-row>
           <el-table
             :data="tableData" :show-header="false"
             style="width: 100%">
             <el-table-column
               prop="date"
               label="日期"
             >
             </el-table-column>
             <el-table-column
               prop="name"
               label="姓名"
             >
             </el-table-column>

           </el-table>
         </div>
       </el-col>


     </el-row>

      <el-row :gutter="20" style="padding-top: 20px">
        <el-col :span="6"  >
          <div style="border: 1px solid">
            <el-row style=" text-align: center;background-color: green">
              <img :src="imgUrl">
            </el-row>
            <el-table
              :data="tableData" :show-header="false"
              style="width: 100%">
              <el-table-column
                prop="date"
                label="日期"
              >
              </el-table-column>
              <el-table-column
                prop="name"
                label="姓名"
              >
              </el-table-column>

            </el-table>
          </div>
        </el-col>


        <table></table>
        <table></table>
        <el-col :span="6"  >
          <div style="border: 1px solid">
            <el-row style=" text-align: center;background-color: red">
              <img :src="imgUrl">
            </el-row>
            <el-table
              :data="tableData" :show-header="false"
              style="width: 100%">
              <el-table-column
                prop="date"
                label="日期"
              >
              </el-table-column>
              <el-table-column
                prop="name"
                label="姓名"
              >
              </el-table-column>

            </el-table>
          </div>
        </el-col>


        <el-col :span="6"  >
          <div style="border: 1px solid">
            <el-row style=" text-align: center;background-color: orange">
              <img :src="imgUrl">
            </el-row>
            <el-table
              :data="tableData" :show-header="false"
              style="width: 100%">
              <el-table-column
                prop="date"
                label="日期"
              >
              </el-table-column>
              <el-table-column
                prop="name"
                label="姓名"
              >
              </el-table-column>

            </el-table>
          </div>
        </el-col>


        <el-col :span="6"  >
          <div style="border: 1px solid">
            <el-row style=" text-align: center;background-color: gray">
              <img :src="imgUrl">
            </el-row>
            <el-table
              :data="tableData" :show-header="false"
              style="width: 100%">
              <el-table-column
                prop="date"
                label="日期"
              >
              </el-table-column>
              <el-table-column
                prop="name"
                label="姓名"
              >
              </el-table-column>

            </el-table>
          </div>
        </el-col>


      </el-row>

      <el-row :gutter="20" style="padding-top: 20px">
        <el-col :span="6"  >
          <div style="border: 1px solid">
            <el-row style=" text-align: center;background-color: green">
              <img :src="imgUrl">
            </el-row>
            <el-table
              :data="tableData" :show-header="false"
              style="width: 100%">
              <el-table-column
                prop="date"
                label="日期"
              >
              </el-table-column>
              <el-table-column
                prop="name"
                label="姓名"
              >
              </el-table-column>

            </el-table>
          </div>
        </el-col>

        <el-col :span="6"  >
          <div style="border: 1px solid">
            <el-row style=" text-align: center;background-color: red">
              <img :src="imgUrl1">
            </el-row>
            <el-table
              :data="tableData" :show-header="false"
              style="width: 100%">
              <el-table-column
                prop="date"
                label="日期"
              >
              </el-table-column>
              <el-table-column
                prop="name"
                label="姓名"
              >
              </el-table-column>

            </el-table>
          </div>
        </el-col>


        <el-col :span="6"  >
          <div style="border: 1px solid">
            <el-row style=" text-align: center;background-color: orange">
              <img :src="imgUrl1">
            </el-row>
            <el-table
              :data="tableData" :show-header="false"
              style="width: 100%">
              <el-table-column
                prop="date"
                label="日期"
              >
              </el-table-column>
              <el-table-column
                prop="name"
                label="姓名"
              >
              </el-table-column>

            </el-table>
          </div>
        </el-col>


        <el-col :span="6"  >
          <div style="border: 1px solid">
            <el-row style=" text-align: center;background-color: gray">
              <img :src="imgUrl1">
            </el-row>
            <el-table
              :data="tableData" :show-header="false"
              style="width: 100%">
              <el-table-column
                prop="date"
                label="日期"
              >
              </el-table-column>
              <el-table-column
                prop="name"
                label="姓名"
              >
              </el-table-column>

            </el-table>
          </div>
        </el-col>


      </el-row>
     </el-main>
    <el-footer>
      <table></table>
    </el-footer>
  </div>
</template>

<script>

  import ElHeader from "element-ui/packages/header/src/main";
  import moment from 'moment'
  import mainTable from  '@/views/dashboard/component/table'
  import  axios from 'axios'
  import table from '@/views/dashboard/component/table'
  var myData = {
    date:new Date()
  };
  //在月份、日期、小时等小于10前面补0
  var padDate = function (value) {
    return value <10 ? '0' + value:value;
  };
  export default {
    components: {table},
    filters: {
      formatDate:function (value) {
        var date = new Date(value);
        var year = date.getFullYear();
        var month = padDate(date.getMonth()+1);
        var day = padDate(date.getDate());
        var hours = padDate(date.getHours());
        var minutes = padDate(date.getMinutes());
        var seconds = padDate(date.getSeconds());
        return year + '-' + month + '-' + day + ' ' + ' ' + hours + ':' + minutes + ':' + seconds;
      }
    },
    data() {

      return{
        from:{

        },
        date: new Date(),
        imgUrl:"../../../static/1.jpg",
        imgUrl1:'../../../static/2.jpg',
        tableData: []
      }
    },
    created:function(){

      axios({
        method:'get',
        baseURL:'/api',
        url:'dashboard/line/device_stat?date=2018-10-30'
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

    mounted:function () {
      var _this = this; //声明一个变量指向Vue实例this，保证作用域一致
      this.timer = setInterval(function(){
        _this.date = new Date(); //修改数据date
      },1000)
    },
    //实例销毁之前调用。主要解绑一些使用addEventListener监听的事件等
    beforeDestroy:function(){
      if(this.timer){
        clearInterval(this.timer); //在Vue实例销毁前，清除我们的定时器
      }
    }


  }
</script>
