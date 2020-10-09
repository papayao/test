<template>
  <div>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column
        prop="account"
        label="账号"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="userGroup"
        label="用户组"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="ctime"
        label="创建时间"
        width="120"
      ></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
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
        :page-sizes="[10, 20, 30, 40]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <el-button type="danger" @click="delAll">批量删除</el-button>
    <el-button type="primary">取消选择</el-button>
    <!-- 编辑蒙态框 -->
    <div id="mengtai">
      <el-form
        :label-position="labelPosition"
        label-width="80px"
        :model="params"
        :class="{ mengtai }"
        v-show="mengtai"
      >
        <div class="inMeng">
          <el-form-item label="账户名称" style="width: 380px">
            <el-input v-model="editParams.account"></el-input>
          </el-form-item>
          <el-form-item label="用户组" prop="userGroup">
            <el-select
              v-model="editParams.userGroup"
              placeholder="请选择"
              style="width: 300px"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-button @click="edit">确定</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import {
  api_accList,
  api_delet,
  api_deletThis,
  api_edit,
} from "../../apis/apis";
export default {
  data() {
    return {
      mengtai: false,
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      delArr: [],
      labelPosition: "right",
      options: [
        {
          lable: "选项1",
          value: "普通管理员",
        },
        {
          lable: "选项2",
          value: "超级管理员",
        },
      ],
      params: {
        account: "",
        userGroup: "",
      },
      editParams: {
        account: "",
        userGroup: "",
        id: "",
      },
    };
  },
  created() {
    this.pageChange();
  },
  methods: {
    pageChange() {
      let { currentPage, pageSize } = this;
      let params = {
        params: { currentPage, pageSize },
      };
      api_accList(params).then((res) => {
        this.total = res.data.total;
        this.tableData = res.data.data;
        for (let i = 0; i < this.tableData.length; i++) {
          let date = new Date(this.tableData[i].ctime);
          this.tableData[i].ctime =
            date.getFullYear() +
            "-" +
            date.getMonth() +
            "-" +
            date.getDate() +
            " " +
            date.getHours() +
            ":" +
            date.getMinutes() +
            ":" +
            date.getSeconds();
        }
      });
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    // 单项选择
    handleSelectionChange(val) {
      let delArr = [];
      for (let i = 0; i < val.length; i++) {
        delArr.push(val[i].id);
      }
      this.delArr = delArr;
      this.delArr = JSON.stringify(this.delArr);
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.pageChange();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.pageChange();
    },
    // 批量删除
    delAll() {
      if (confirm("确认全部删除")) {
        let params = { params: { ids: this.delArr } };
        api_delet(params).then((res) => {
          console.log(res);
          this.pageChange();
        });
      }
    },
    // 单个删除
    handleDelete(index, row) {
      if (confirm("确认删除")) {
        let params = { params: { id: row.id } };
        api_deletThis(params).then((res) => {
          console.log(res);
          this.pageChange();
        });
      }
    },
    // 编辑
    handleEdit(index, row) {
      (this.mengtai = true), (this.params.userGroup = row.userGroup);
      this.editParams.id=row.id
      console.log(index, row);
    },
    // 修改信息确认
    edit() {
      this.mengtai = false;
      let params = this.editParams;
      api_edit(params).then((res) => {
        console.log(res);
      });
      console.log(params);
      this.pageChange();
    },
  },
};
</script>

<style scoped>
main > div {
  background: white;
}
.mengtai {
  z-index: 100;
  background: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  display: flex;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
  height: 100%;
  width: 100%;
}
.mengtai > .inMeng {
  padding: 20px;
  background: white;
}
</style>