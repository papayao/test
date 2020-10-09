<template>
  <div class="main">
    <!-- id	int	id
    name	String	店铺名称
    bulletin	String	公告
    avatar	String	店铺头像
    deliveryPrice	int	配送费
    deliveryTime	int	送达时间
    description	String	描述
    score	String	评分
    sellCount	int	销量
    supports	String	活动
    pics	String	店铺图片
    date	date	营业时间
    minPrice	String	起送价格 -->
    <el-form ref="form" :model="shopList" label-width="80px">
      <!-- 店铺名称 -->
      <el-form-item label="店铺名称">
        <el-input
          :placeholder="shopList.name"
          v-model="shopList.name"
        ></el-input>
      </el-form-item>
      <!-- 店铺公告 -->
      <el-form-item label="店铺公告">
        <el-input
          :placeholder="shopList.bulletin"
          v-model="shopList.bulletin"
          :autosize="true"
          type="textarea"
        ></el-input>
      </el-form-item>
      <!-- 店铺头像 -->
      <el-form-item label="店铺头像">
        <el-upload
          class="avatar-uploader"
          action="http://127.0.0.1:5000/shop/upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
        >
          <img
            v-if="shopAvatar"
            :src="shopAvatar"
            class="avatar"
            style="height: 150px; width: 150px"
          />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <!-- 商品图片添加 -->
      <el-form-item label="商品图片">
        <el-upload
          action="http://127.0.0.1:5000/shop/upload"
          list-type="picture-card"
          :on-remove="handleRemove"
          :on-success="upShopPics"
          :file-list="uploadedPics"
          :on-preview="handlePictureCardPreview"
        >
          <!-- file-list要用上传过的图片数组 -->
          <i class="el-icon-plus"></i>
        </el-upload>
        <!-- <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt />
        </el-dialog> -->
      </el-form-item>
      <!-- 配送费 -->
      <el-form-item label="配送费">
        <el-input v-model="shopList.deliveryPrice"></el-input>
      </el-form-item>
      <!-- 配送时间 -->
      <el-form-item label="配送时间">
        <el-input v-model="shopList.deliveryTime"></el-input> </el-form-item
      ><el-form-item label="配送描述">
        <el-input v-model="shopList.description"></el-input> </el-form-item
      ><el-form-item label="店铺评分">
        <el-input v-model="shopList.score"></el-input>
      </el-form-item>
      <!-- 销量 -->
      <el-form-item label="销量">
        <el-input v-model="shopList.sellCount"></el-input>
      </el-form-item>
      <!-- 活动专栏 -->
      <el-form-item label="添加活动">
        <el-input v-model="newActive"></el-input>
        <el-button @click="addAcBtn">添加活动</el-button>
      </el-form-item>
      <el-form-item label="活动" class="shopActive">
        <el-checkbox-group v-model="choosedActive">
          <el-checkbox
            :label="item"
            name="type"
            v-for="(item, index) in activeList"
            :key="index"
          ></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <!-- 时间 -->
      <el-form-item label="时间">
        <el-time-picker
          is-range
          v-model="shopList.date"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          placeholder="选择时间范围"
        ></el-time-picker>
      </el-form-item>
      <el-button type="success" @click="saveData">保存</el-button>
    </el-form>
  </div>
</template>

<script>
import { api_shopinfo,api_shopedit } from "../../apis/apis";
import { setTime } from "../../utils/utils";
export default {
  data() {
    return {
      // 之前上传的图的名称-----给file-list用
      uploadedPics: [],
      // 新上传的图片名称-----给删除数组用
      newUpPics: [],
      // 存放删除过后的图片数组
      deletedPics: [],
      // 添加的活动
      newActive: "",
      // 取值的数组
      activeList: [],
      //选中的复选框数组
      choosedActive: [],
      shopList: {
        pics: [],
        supports: [],
        date: [],
      }, //店铺信息列表
      avatar:'',
      shopAvatar: "", //店铺头像
      dialogImageUrl: "",
      dialogVisible: false,
      // 修改过后的参数
      changeData: {
        id: 0,
        name: "",
        bulletin: "",
        avatar: "",
        deliveryPrice: 0,
        deliveryTime: 0,
        description: "",
        score: 0.0,
        sellCount: 0,
        supports: "[]",
        date: "[]",
        pics: "[]",
      },
    };
  },
  methods: {
    // 商品照片上传成功返回的信息
    upShopPics(res) {
      // 向新的上传图片数组加入返回的结果
      this.newUpPics.push(res.imgUrl);
      this.shopList.pics.push(...this.newUpPics);
      this.changeData.pics = this.shopList.pics;
    },
    handleRemove(file) {
      // console.log(file);
      let imgUrl = file.response?file.response.imgUrl:file.name
      for (let i = 0; i < this.newUpPics.length; i++) {
        if (this.newUpPics[i] == imgUrl) {
          this.newUpPics.splice(i, 1);
        }
      }
      
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 更改店铺头像
    handleAvatarSuccess(res) {
      this.avatar=res.imgUrl
      this.shopAvatar = "http://127.0.0.1:5000/upload/shop/" + res.imgUrl;
    },
    // 添加活动清单
    addAcBtn() {
      this.activeList.push(this.newActive);
      this.newActive = "";
    },
    // 保存修改信息
    saveData() {
      this.shopList.date = [
        setTime(this.shopList.date[0]),
        setTime(this.shopList.date[1]),
      ];
      this.changeData.id = this.shopList.id; //店铺id
      this.changeData.name = this.shopList.name; //店铺名
      this.changeData.bulletin = this.shopList.bulletin; //公告
      this.changeData.avatar = this.avatar; //头像
      this.changeData.deliveryPrice = this.shopList.deliveryPrice; //配送费
      this.changeData.deliveryTime = this.shopList.deliveryTime; //配送时间
      this.changeData.description = this.shopList.description; //描述
      this.changeData.score = parseFloat(this.shopList.score); //店铺分数
      this.changeData.sellCount = this.shopList.sellCount; //销量
      this.changeData.supports = JSON.stringify(this.choosedActive); //活动
      this.changeData.date = JSON.stringify(this.shopList.date);
      this.changeData.pics = JSON.stringify(this.newUpPics);
      console.log(this.changeData);
      // 发送请求
      api_shopedit(this.changeData).then((res) => {
        console.log(res);
      });
    },
  },
  created() {
    api_shopinfo().then((res) => {
      console.log(res);
      this.shopList = res.data.data;
      this.shopAvatar =
        "http://127.0.0.1:5000/upload/shop/" + res.data.data.avatar;
      let num = res.data.data.avatar.lastIndexOf("/");
      this.changeData.avatar = res.data.data.avatar.substring(num + 1);
      // 上照片墙显示之前上传过的图片列表,上传过的图片名称可以从res.data.data.pics中查看，然后通过遍历拼接
      this.uploadedPics = this.shopList.pics.map((name) => {
        return { name, url: "http://127.0.0.1:5000/upload/shop/" + name };
      });
      this.activeList = [...this.shopList.supports, ...this.activeList];
      // 把之前的图加入新图数组
      this.newUpPics.push(...this.shopList.pics);
    });
  },
};
</script>

<style scoped>
.main {
  padding: 20px;
  background: white;
}
</style>