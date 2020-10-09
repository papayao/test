<template>
  <div class="proList">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="商品名称">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="商品价格">
              <span>{{ props.row.price }}</span>
            </el-form-item>
            <el-form-item label="商品评价">
              <span>{{ props.row.rating }}</span>
            </el-form-item>
            <el-form-item label="商品 ID">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="商品分类">
              <span>{{ props.row.category }}</span>
            </el-form-item>
            <el-form-item label="商品描述">
              <span>{{ props.row.goodsDesc }}</span>
            </el-form-item>
            <el-form-item label="创建时间">
              <span>{{ props.row.ctime }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="商品名称" prop="name"></el-table-column>
      <el-table-column label="所属分类" prop="category"></el-table-column>
      <el-table-column label="商品价格" prop="price"></el-table-column>
      <el-table-column label="商品图片">
        <template slot-scope="scope">
          <img
            :src="
              'http://127.0.0.1:5000/upload/imgs/goods_img/' + scope.row.imgUrl
            "
            alt
            class="proPic"
          />
        </template>
      </el-table-column>
      <el-table-column label="商品描述" prop="goodsDesc"></el-table-column>
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
        :page-sizes="[10, 15, 20, 30]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalPage"
      ></el-pagination>
      <!-- 编辑蒙态框 -->
      <el-dialog title="修改商品信息" :visible.sync="dialogVisible" width="30%">
        <template>
          <el-input
            :placeholder="changeTable.name"
            v-model="changeTable.name"
          ></el-input>
          <el-input
            :placeholder="changeTable.category"
            v-model="changeTable.category"
          ></el-input>
          <el-input
            :placeholder="changeTable.price"
            v-model="changeTable.price"
          ></el-input>
          <el-upload
            class="avatar-uploader"
            action="http://127.0.0.1:5000/goods/goods_img_upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
          >
            <img
              v-if="changeTable.imgUrl"
              :src="'http://127.0.0.1:5000/upload/imgs/goods_img/' + changeTable.imgUrl"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <el-input
            :placeholder="changeTable.goodsDesc"
            v-model="changeTable.goodsDesc"
          ></el-input>
        </template>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="comEdit">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { api_goodslist, api_goodsedit, api_goodsdel } from "../../apis/apis";
export default {
  data() {
    return {
      changeTable: {
        name: "",
        category: "",
        price: "",
        imgUrl: "",
        goodsDesc: "",
        id: 0,
      },
      curImgUrl: "",
      dialogVisible: false,
      currentPage: 1,
      pageSize: 10,
      totalPage: 0,
      tableData: [],
    };
  },
  methods: {
    loadPages() {
      let params = {
        params: { currentPage: this.currentPage, pageSize: this.pageSize },
      };
      api_goodslist(params).then((res) => {
        // console.log(res);
        this.tableData = res.data.data;
        this.totalPage = res.data.total;
      });
    },

    // 打开编辑
    handleEdit(index, row) {
      this.curImgUrl = row.imgUrl;
      this.changeTable = {
        id: row.id,
        name: row.name,
        imgUrl: this.curImgUrl,
        category: row.category,
        price: row.price,
        goodsDesc: row.goodsDesc,
      };
      this.dialogVisible = true;
    },
    // 编辑完成
    comEdit() {
      let params = this.changeTable;
      console.log(params);
      api_goodsedit(params).then((res) => {
        console.log(res);
        if (res.data.code == 0) {
          this.$message({
            showClose: true,
            message: "修改成功",
            type: "success",
          });
          this.dialogVisible = false;
          this.loadPages();
        } else {
          this.dialogVisible = false;
        }
      });
    },

    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.loadPages();
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.loadPages();
    },
    // 修改页面图片上传完成
    handleAvatarSuccess(res) {
      // console.log(res.imgUrl);
      this.changeTable.imgUrl = res.imgUrl;
    },
    // 删除
    handleDelete(index, row) {
      let params = { params: { id: row.id } };

      this.$confirm("此操作将永久删除该商品", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          api_goodsdel(params).then((res) => {
            console.log(res);
            if (res.data.code == 0) {
              this.$message({
                message: "删除成功",
                type: "success",
              });
              this.loadPages();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  created() {
    this.loadPages();
  },
};
</script>

<style scoped>
html,
body {
  height: 100%;
}
.proPic {
  width: 50px;
}
.demo-table-expand {
  font-size: 0;
}
.el-container {
  height: 100%;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>