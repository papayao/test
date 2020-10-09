<template>
  <div>
    <p>管理信息</p>
    <p>
      <span>管理员ID：</span>
      <span>{{ id }}</span>
    </p>
    <p>
      <span>账号：</span>
      <span>{{ account }}</span>
    </p>
    <p>
      <span>用户组：</span>
      <span>{{ userGroup }}</span>
    </p>
    <p>
      <span>创建时间：</span>
      <span>{{ ctime }}</span>
    </p>
    <el-upload
      class="avatar-uploader"
      action="http://127.0.0.1:5000/users/avatar_upload"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :data="paramsId"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script>
// import {avatar_upload} from '../../apis/apis'
export default {
  data() {
    return {
      id: localStorage.id,
      account: localStorage.account,
      userGroup: localStorage.userGroup,
      ctime: localStorage.ctime,
      imageUrl: "",
      paramsId: { id: localStorage.id },
    };
  },
  methods: {
    handleAvatarSuccess(res) {
      console.log(res);
      let imgUrl = res.imgUrl;
      this.$bus.emit("imgUrl", imgUrl);
    },
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