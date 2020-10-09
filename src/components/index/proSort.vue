<template>
  <div>
    <div class="title">
      <div>商品分类</div>
      <el-button type="primary" @click="dialogVisible = true"
        >添加分类</el-button
      >
    </div>
    <!-- 商品添加蒙态框 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <div>
        <el-input placeholder="分类名称" v-model="addSortInput"></el-input>
        <el-switch v-model="addSortSwitch"></el-switch>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="comAddSort">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 商品列表 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column
        label="序号"
        width="180"
        style="background: white"
        type="index"
      >
      </el-table-column>
      <el-table-column label="分类名称" width="180">
        <template slot-scope="scope">
          <span v-html="scope.row.cateName" v-if="!scope.row.edit"></span>
          <el-input
            v-model="scope.row.cateName"
            :placeholder="scope.row.cateName"
            v-if="scope.row.edit"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column label="是否启用" width="180">
        <template slot-scope="scope"
          ><el-switch
            :disabled="!scope.row.edit"
            v-model="scope.row.state"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch
        ></template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <!-- 编辑按钮 -->
          <el-button
            :type="scope.row.edit ? 'success' : 'primary'"
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
            class="finish"
            >{{ scope.row.edit ? "完成" : "编辑" }}</el-button
          >

          <!-- 删除按钮 -->
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <!-- 添加蒙态框 -->
    <div id="mengtai"></div>
  </div>
</template>

<script>
import {
  api_catelist,
  api_delcate,
  api_editcate,
  api_addcate,
} from "../../apis/apis";
export default {
  data() {
    return {
      addSortInput: "",
      addSortSwitch: true,
      dialogVisible: false,
      inputIndex: 0,
      show: false,
      input: "",
      total: 0,
      currentPage: 1,
      pageSize: 10,
      tableData: [],
    };
  },
  methods: {
    // 加载页面
    loadPages() {
      let { currentPage, pageSize } = this;
      let params = { params: { currentPage, pageSize } };
      api_catelist(params).then((res) => {
        // 数据添加自定属性需要循环添加
        for (let obj of res.data.data) {
          obj.state = obj.state == 1;
          obj.edit = false;
        }
        this.tableData = res.data.data;
        this.total = res.data.total;
      });
    },
    // 编辑
    handleEdit(index, item) {
      console.log(item);
      if (item.edit) {
        api_editcate(item).then(() => {
          this.$message({
            message: "修改完成",
            type: "success",
          });
        });
        item.edit = false;
      } else {
        item.edit = true;
      }
    },
    // 删除
    handleDelete(index, row) {
      let params = { params: { id: row.id } };

      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          api_delcate(params).then(() => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.loadPages();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    // 改变每页显示的条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.loadPages();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.loadPages();
    },
    // 添加分类
    comAddSort() {
      let params = {
        cateName: this.addSortInput,
        state: this.addSortSwitch,
      };
      api_addcate(params).then((res) => {
        console.log(res);
        if (res.data.code == 0) {
          this.$message({
            message: "添加成功",
            type: "success",
          });
          this.dialogVisible = false;
        }
        this.loadPages()
      });
    },
  },
  created() {
    this.loadPages();
  },
};
</script>

<style scoped>
.title {
  /* line-height: 100%; */
  padding: 5px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
}
main > div {
  background: white;
}
.cell {
  height: 120px;
}
</style>