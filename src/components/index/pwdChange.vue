<template>
  <div>
    <el-form :label-position="labelPosition" label-width="100px">
      <el-form-item label="原密码">
        <el-input v-model="oldPwd" style="width: 500px"></el-input>
      </el-form-item>
      <el-form-item label="新密码">
        <el-input v-model="newPwd" style="width: 500px"></el-input>
      </el-form-item>
      <el-form-item label="确认新密码">
        <el-input v-model="comPwd" style="width: 500px"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确定</el-button>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { api_checkoldpwd, api_editpwd } from "../../apis/apis";
export default {
  data() {
    return {
      id: localStorage.getItem("id"),
      oldPwd: "",
      labelPosition: "right",
      newPwd: "",
      comPwd: "",
    };
  },
  methods: {
    onSubmit() {
      // 先确认原密码和现密码是否一致
      let oldPwd = this.oldPwd;
      let id = this.id;
      let params = { params: { oldPwd, id } };
      api_checkoldpwd(params).then((res) => {
        let code = res.data.code;
        if (code == 0 && this.newPwd === this.comPwd && this.oldPwd != this.newPwd) {
          //如果res.data.code为0且新密码确认过后则继续修改密码
          let newPwd = this.newPwd;
          let id = this.id;
          let params = { newPwd, id };
          api_editpwd(params).then((res) => {
            console.log(res);
            this.$message({
              message: "修改成功，请重新登录",
              type: "success",
            });
          });
        }else if(this.oldPwd==this.newPwd){
          this.$message({
          message: '新密码与旧密码一致，请重新填写',
          type: 'warning'
        });
        } else {
          this.$message.error('请确认旧密码是否正确');
        }
      });
    },
  },
};
</script>

<style scoped>
form {
  padding: 20px 15px;
  background: white;
}
</style>