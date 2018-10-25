<template>
  <div>
    <el-header>
      <el-row :gutter="20">
        <el-col :span="24">
          <h1 style="text-align:center;">南阳飞龙康明斯产线综合管理看板</h1>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" :offset="18">
          <p class="data" >日期:<span>{{ now | dateformat('YYYY-MM-DD HH:mm:ss') }}</span></p>
        </el-col>
      </el-row>


    </el-header>
    <el-main>
     <el-row :gutter="40">
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

      <el-row :gutter="40" style="padding-top: 20px">
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

      <el-row :gutter="40" style="padding-top: 20px">
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
      return{
        imgUrl:"../../../static/1.jpg",
        imgUrl1:'../../../static/2.jpg',
        tableData: [{
          date: '设备名称',
          name: 'ABC\n',

        }, {
          date: '设备编号\n',
          name: 'op10-1\n',

        },
          {
            date: '生产数量\n',
            name: '123\n',

          },
          {
            date: '正常运行\n',
            name: '12:00:34\n',

          },
          {
            date: '空闲时长\n',
            name: '12:00:34\n',

          },
          {
            date: '报警时长\n',
            name: '12:00:34\n',

          },
          {
            date: '关机时长',
            name: '12:00:34\n',

          },
          {
            date: '报警次数',
            name: '2',

          },
        ]
      }
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
