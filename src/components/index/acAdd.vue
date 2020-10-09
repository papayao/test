<template>
  <el-form status-icon label-width="100px" class="demo-ruleForm">
    <el-form-item label="账号" prop="account">
      <el-input type="text" v-model="params.account" autocomplete="off" style="width:380px"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input type="password" v-model="params.password" autocomplete="off" style="width:380px"></el-input>
    </el-form-item>
    <el-form-item label="用户组" prop="userGroup">
      <el-select v-model="params.userGroup" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { api_add } from "../../apis/apis";
export default {
  data() {
    return {
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
        password: "",
        userGroup: "",
      },
    };
  },
  methods: {
    submitForm() {
      api_add(this.params).then(() => {
        this.$message({
          showClose: true,
          message: "账号添加成功",
          type: "success",
        });
        this.params.account = "";
        this.params.password = "";
        this.options.value="普通管理员"
      });
    },
    resetForm() {
      this.params.account = "";
      this.params.password = "";
      this.params.userGroup = "";
    },
  },
};
</script>

<style scoped>
.el-form {
  background: white;
  padding: 20px 0;
}
main > div {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  padding: 10px 0 20px 0;
  background: white;
}
</style>