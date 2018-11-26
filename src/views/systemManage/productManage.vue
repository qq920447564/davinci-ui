<template>
  <div>
    <el-header>
      <div>
        <el-form ref="form" :model="form" label-width="80px">
          <el-row >
            <div class="grid-content bg-purple mydiv">
              <span class="mytitle">产品名称:</span>
              <el-input v-model="form.name" clearable filterable placeholder="请选择" style="width: 130px"/>
            </div>
            <el-button @click="search">搜索</el-button>
            <el-button @click="addHandle">新增</el-button>
          </el-row>
        </el-form>
      </div>
    </el-header>
    <el-main>
      <el-table
        v-loading="listLoading"
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          fixed
          prop="id"
          label="ID"
        />
        <el-table-column
          prop="name"
          label="产品名称"
        />
        <el-table-column align="center" label="是否隐藏" >
          <template slot-scope="scope">
            <span>{{ Judg(scope.row.hidden) }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="默认选项" >
          <template slot-scope="scope">
            <span>{{ Judg(scope.row.default_option) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
            <!--<el-button type="text" size="small" @click="handleClick">删除</el-button>-->
          </template>
        </el-table-column>

      </el-table>
      <el-dialog v-model="addFormVisible" :visible.sync="addFormVisible" :close-on-click-modal="false" :append-to-body="true" title="编辑" >
        <el-form ref="addForm" :model="addForm" label-width="80px">
          <el-form-item label="产品名称" prop="name">
            <el-input v-model="addForm.name" style="width: 90%" auto-complete="off"/>
          </el-form-item>
          <el-form-item label="是否隐藏">
            <el-checkbox v-model="addForm.hidden">启用</el-checkbox>
          </el-form-item>
          <el-form-item label="默认选项">
            <el-checkbox v-model="addForm.options">启用</el-checkbox>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="addFormVisible = false">取消</el-button>
          <el-button :loading="addLoading" type="primary" @click.native="addSubmit(addForm)">提交</el-button>
        </div>
      </el-dialog>
      <el-dialog v-model="editFormVisible" :visible.sync="editFormVisible" :close-on-click-modal="false" :append-to-body="true" title="编辑">
        <el-form ref="editForm" :model="editForm" label-width="80px">
          <el-form-item label="产品名称" prop="name">
            <el-input v-model="editForm.name" style="width: 90%" auto-complete="off"/>
          </el-form-item>
          <el-form-item label="是否隐藏">
            <el-checkbox v-model="editForm.hidden">启用</el-checkbox>
          </el-form-item>
          <el-form-item label="默认选项">
            <el-checkbox v-model="editForm.options">启用</el-checkbox>
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
import { getProducts2 } from '@/api/product'
import { postProduct } from '@/api/product'
import { putProduct } from '@/api/product'

export default {
  name: 'ProductManage',
  data() {
    return {
      id: null,
      listLoading: true,
      addLoading: false,
      editLoading: false,
      editFormVisible: false,
      addFormVisible: false,
      form: {
        name: null
      },
      addForm: {
        name: null,
        hidden: false,
        options: false
      },
      editForm: {
        name: null,
        hidden: null,
        options: null
      },
      listQuery: {
        currentPage: 1,
        limit: 10,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      tableData: null,
      total: null
    }
  },
  created() {
    this.search()
  },
  mounted() {
    this.chooseTimeRange()
  },
  methods: {
    handleSizeChange(val) {
      this.fetchData(this.form.name, val, this.listQuery.currentPage)
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      this.fetchData(this.form.name, this.listQuery.limit, val)
      console.log(`当前页: ${val}`)
    },
    fetchData(name, limit, offset) {
      getProducts2(name, limit, ((offset - 1) * limit)).then(
        response => {
          console.log(response)
          this.tableData = response.data.rows
          this.listLoading = false
          console.log(this.tableData)
        }
      ).catch(
        error => {
          console.log(error)
          this.$message.error('网络错误，不能访问')
        }
      )
    },
    addProduct(name, hidden, default_option) {
      postProduct(name, hidden, default_option).then(
        response => {
          this.addLoading = false
          console.log(response)
          this.$message('新建成功！')
          this.search()
        }
      ).catch(
        error => {
          console.log(error)
          this.$message.error('网络错误，不能访问')
          this.addLoading = false
        }
      )
    },
    editProduct(id, name, hidden, default_option) {
      putProduct(id, name, hidden, default_option).then(
        response => {
          this.editLoading = false
          console.log(response)
          this.$message('修改成功！')
          this.search()
        }
      ).catch(
        error => {
          console.log(error)
          this.$message.error('网络错误，不能访问')
          this.editLoading = false
        }
      )
    },
    getTotal() {
      getProducts2().then(
        response => {
          console.log(response)
          this.total = response.data.total
        }
      ).catch(
        error => {
          console.log(error)
          this.$message.error('网络错误，不能访问')
        }
      )
    },
    addSubmit() {
      if (this.addForm.name) {
        this.addLoading = true
        this.addProduct(this.addForm.name, this.addForm.hidden, this.addForm.options)
      } else {
        this.$message.error('产品名称不能为空！')
      }
    },
    addHandle() {
      this.addLoading = false
      this.addFormVisible = true
    },
    editSubmit: function(editForm) {
      if (this.editForm.name) {
        this.editLoading = true
        this.editProduct(this.id, this.editForm.name, this.editForm.hidden, this.editForm.options)
      } else {
        this.$message.error('产品名称不能为空！')
      }
    },
    handleEdit: function(index, row) {
      this.editLoading = false
      console.log(row.id)
      this.editFormVisible = true
      this.editForm = Object.assign({}, row)
      this.id = row.id
    },
    chooseTimeRange(t) {
      console.log(t)// 结果为一个数组，如：["2018-08-04", "2018-08-06"]
    },
    search: function() {
      this.getTotal()
      this.fetchData(this.isNull(this.form.name), this.listQuery.limit, this.listQuery.currentPage)
    },
    Judg(val) {
      switch (val) {
        case true:
          return '是'
        case false:
          return '否'
      }
    },
    isNull(val) {
      if (!val && val === '') {
        return null
      } else {
        return val
      }
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
