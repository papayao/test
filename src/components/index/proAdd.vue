<template>
  <el-form ref="form" :model="params" label-width="80px">
    <div class="proAddTitle">商品添加</div>
    <!-- 商品名称 -->
    <el-form-item label="商品名称">
      <el-input
        v-model="params.name"
        placeholder="商品名称"
        class="proName"
      ></el-input>
    </el-form-item>
    <!-- 商品分类 -->
    <el-form-item label="商品分类">
      <el-select v-model="params.category" placeholder="请选择商品分类">
        <el-option v-for="(item,index) in categories" :key="index" :value="item.cateName"></el-option>
      </el-select>
    </el-form-item>

    <!-- 计数器 -->
    <el-form-item label="商品价格">
      <el-input-number
        v-model="params.price"
        @change="handleChange"
        :min="1"
        label="描述文字"
      ></el-input-number>
    </el-form-item>
    <!-- 图片上传 -->
    <el-form-item label="商品图片">
      <el-upload
        class="avatar-uploader"
        action="http://127.0.0.1:5000/goods/goods_img_upload"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
      >
        <img v-if="params.imgUrl" :src="'http://127.0.0.1:5000/upload/imgs/goods_img/'+params.imgUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-form-item>

    <!-- 文本域 -->
    <el-form-item label="活动形式">
      <el-input type="textarea" v-model="params.goodsDesc"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">添加商品</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { api_categories,api_goodsadd } from "../../apis/apis";
export default {
  data() {
    return {
      params: {
        price:0,
        imgUrl: "",
        name: "",
        category: "",
        goodsDesc: "",
      },
      categories: [],
    };
  },
  methods: {
    onSubmit() {
      let params=this.params
      console.log(params);
      api_goodsadd(params).then((res)=>{console.log(res);})
},
    handleAvatarSuccess(res) {
      this.params.imgUrl = res.imgUrl
    },
    handleChange(value) {
      console.log(value);
    },
  },
  created() {
    // 获取种类
    api_categories().then((res) => {
      this.categories = res.data.categories;
    });
  },
};
</script>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.el-icon-plus {
  border: 1px dashed #d9d9d9;
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
.proName {
  width: 500px;
}
.proAddTitle {
  text-indent: 12px;
  margin-bottom: 20px;
  height: 50px;
  line-height: 50px;
  font-size: inherit;
  color: #606266;
  border-bottom: 1px solid #dcdfe6;
}
.el-form {
  padding-bottom: 25px;
  background: #fff !important;
}
</style>