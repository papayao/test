<template>
  <div class="main">
    <!-- 顶部搜索 -->
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="订单号">
        <el-input v-model="formInline.orderNo" placeholder="订单号"></el-input>
      </el-form-item>
      <el-form-item label="收货人">
        <el-input
          v-model="formInline.consignee"
          placeholder="收货人"
        ></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="formInline.phone" placeholder="手机号"></el-input>
      </el-form-item>
      <el-form-item label="订单状态">
        <el-select v-model="formInline.orderState" placeholder="订单状态">
          <el-option label="已完成" value="已完成"></el-option>
          <el-option label="已受理" value="已受理"></el-option>
        </el-select>
      </el-form-item>
      <!-- 时间 -->
      <div class="block">
        <span class="choose-time">选择时间</span>
        <el-date-picker
          v-model="formInline.date"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </div>
      <el-form-item>
        <el-button type="primary" @click="searchBtn" class="submit-btn"
          >查询</el-button
        >
      </el-form-item>
    </el-form>
    <!-- 列表信息 -->
    <el-table :data="tableData" border style="width: 100%" v-loading="loading">
      <el-table-column
        fixed
        prop="orderNo"
        label="订单号"
        width="150"
      ></el-table-column>
      <el-table-column
        fixed
        prop="orderTime"
        label="下单时间"
        width="150"
      ></el-table-column>
      <el-table-column
        fixed
        prop="phone"
        label="手机号"
        width="150"
      ></el-table-column>
      <el-table-column
        prop="consignee"
        label="收货人"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="deliverAddress"
        label="收货地址"
        width="300"
      ></el-table-column>
      <el-table-column
        prop="deliveryTime"
        label="送达时间"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="remarks"
        label="用户备注"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="orderAmount"
        label="订单金额"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="orderState"
        label="订单状态"
        width="120"
      ></el-table-column>

      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small"
            >查看</el-button
          >
          <el-button type="text" size="small" @click="edit(scope.row)"
            >编辑</el-button
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
        :page-sizes="[10, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <!-- 编辑框 -->

    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <el-form>
        <el-form-item label="订单号">
          <el-input v-model="params.orderNo"></el-input>
        </el-form-item>
        <el-form-item label="下单时间">
          <el-input v-model="params.orderTime"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="params.phone"></el-input>
        </el-form-item>
        <el-form-item label="送货地址">
          <el-input v-model="params.deliverAddress"></el-input>
        </el-form-item>
        <el-form-item label="送达时间">
          <el-input v-model="params.deliveryTime"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="params.remarks"></el-input>
        </el-form-item>
        <el-form-item label="订单金额">
          <el-input v-model="params.orderAmount"></el-input>
        </el-form-item>
        <el-form-item label="订单状态">
          <el-input v-model="params.orderState"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="comChange">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { api_orderList, api_orderEdit } from "../../apis/apis";
import { setTime } from "../../utils/utils";
export default {
  data() {
    return {
      loading: true,
      dialogVisible: false,
      total: 0,
      currentPage: 1,
      pageSize: 10,
      // 模糊查询数据
      formInline: {
        consignee: "",
        phone: "",
        orderNo: "",
        orderState: "",
        date: "[]",
      },
      params: {
        id: 0,
        orderNo: "",
        orderTime: "",
        phone: "",
        consignee: "",
        deliverAddress: "",
        deliveryTime: "",
        remarks: "",
        orderAmount: "",
        orderState: "",
      },
      tableData: [],
    };
  },
  methods: {
    loadPage(obj = {}) {
      let pageSize = this.pageSize;
      let currentPage = this.currentPage;
      let params = { params: { currentPage, pageSize, ...obj } };
      setTimeout(() => {
        api_orderList(params).then((res) => {
          console.log(res);
          this.total = res.data.total;
          // this.tableData.orderTime=setTime(this.tableData.orderTime)
          this.tableData = res.data.data;
          for (let obj of this.tableData) {
            obj.deliveryTime = setTime(obj.deliveryTime);
            obj.orderTime = setTime(obj.orderTime);
          }
          if(res.request.status==200) this.loading=false
        });
      }, 3000);
    },

    // 编辑
    edit(row) {
      console.log(row);
      this.dialogVisible = true;
      this.params = row;
    },
    // 确认修改
    comChange() {
      this.dialogVisible = false;
      this.$confirm("确认更改信息", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        api_orderEdit(this.params).then((res) => {
          console.log(res);
        });
        this.$message({
          type: "success",
          message: "删除成功!",
        });
        this.loadPage();
      });
    },
    handleClick(row) {
      console.log(row);
    },
    // 模糊查询
    searchBtn() {
      this.formInline.date = [
        setTime(this.formInline.date[0]),
        setTime(this.formInline.date[1]),
      ];
      // console.log(JSON.stringify(this.formInline));
      // 请求模糊查询
      this.loadPage(this.formInline);
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.loadPage();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.loadPage();
    },
  },

  created() {
    this.loadPage();
    
  },
};
</script>

<style scoped>
html,
body {
  height: 100%;
}
.el-container {
  height: 100%;
}
.main {
  padding: 5px;
  background: #fff;
}
.demo-form-inline {
  display: flex;
  flex-wrap: wrap;
}
.submit-btn {
  margin-left: 10px;
}
.choose-time {
  font-size: 14px;
  color: #606266;
  line-height: 40px;
  padding: 0 12px 0 0;
}
</style>