<template>
  <div class="content">
    <el-form
      status-icon
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <p class="title">系统登录</p>
      <p style="color: red" v-show="show">用户名或密码错误，请重新填写！</p>
      <p>
        <el-input
          type="text"
          v-model="acc"
          autocomplete="off"
          style="width: 550px"
          prefix-icon="el-icon-user-solid"
          placeholder="请输入账户"
        ></el-input>
      </p>
      <p>
        <el-input
          type="password"
          v-model="pwd"
          autocomplete="off"
          style="width: 550px"
          show-password
          prefix-icon="el-icon-lock"
          placeholder="请输入密码"
        ></el-input>
      </p>
      <p>
        <el-button
          type="primary"
          style="width: 550px; font-size: 20px"
          @click="login"
          >登录</el-button
        >
      </p>
    </el-form>

    <!-- 滑动验证 -->
  </div>
</template>

<script>
import { api_login } from "../apis/apis";
export default {
  data() {
    return {
      acc: "",
      pwd: "",
      show: false,
      loginFlag: true,
    };
  },
  methods: {
    login() {
      if (this.loginFlag) {
        this.loginFlag = false;
        setTimeout(() => {
          api_login({ account: this.acc, password: this.pwd }).then((res) => {
            console.log(res.data);
            let id = res.data.id;
            if (res.data.code == 0) {
              localStorage.setItem("id", id);
              localStorage.token = res.data.token;
              localStorage.role = res.data.role;
              this.$message({
                showClose: true,
                message: "恭喜你，登陆成功",
                type: "success",
              });
              this.show = false;
              this.$router.push("/main");
            } else {
              this.show = true;
            }
          });
        }, 3000);
        console.log("正在发送请求");
      } else {
        console.log("请稍后再试");
        setTimeout(() => {
          this.loginFlag = true;
        }, 3000);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.content {
  background-color: #2d3a4b;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
p {
  text-align: center;
  margin-bottom: 30px;
  &.title {
    color: #fff;
    font-size: 28px;
    font-weight: bold;
  }
}
</style>