<template>
  <el-container>
    <el-aside width="200px" class="leftSide">
      <el-row class="tac">
        <el-col :span="12">
          <el-menu
            router
            :default-active="defaultHash"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            active-text-color="#3E91E3"
            background-color="#304156"
          >
            <div v-for="(item, index) in navList" :key="index">
              <!-- 折叠导航 -->
              <el-submenu :index="item.navIndex" v-if="item.children">
                <template slot="title">
                  <i :class="item.icon" class="icon"></i>
                  <span class="foldWords">{{ item.title }}</span>
                </template>
                <ul
                  class="downList"
                  v-for="children in item.children"
                  :key="children.name"
                >
                  <el-menu-item :index="children.index">{{
                    children.name
                  }}</el-menu-item>
                </ul>
              </el-submenu>

              <!-- 一层导航 -->
              <el-menu-item :index="item.navIndex" v-else>
                <i :class="item.icon"></i>
                <span slot="title" class="homePage">{{ item.title }}</span>
              </el-menu-item>
            </div>
          </el-menu>
        </el-col>

        <!-- 自定义颜色 -->
      </el-row>
    </el-aside>
    <el-container>
      <el-header>
        <!-- 顶部面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>活动管理</el-breadcrumb-item>
          <el-breadcrumb-item>活动列表</el-breadcrumb-item>
          <el-breadcrumb-item>活动详情</el-breadcrumb-item>
          <el-menu router >
            <el-menu-item class="userInfo" :index="userInfo">
              <p><img class="headIcon" :src="imgUrl" alt="" /></p>
              <p style="color:black">{{ account }}</p>
            </el-menu-item>
          </el-menu>
        </el-breadcrumb>
      </el-header>
      <el-main class="right-main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { api_accountinfo, api_token } from "../apis/apis";
export default {
  data() {
    return {
      userInfo: "/userInfo",
      defaultHash: "/",
      newStr: "",
      imgUrl: "",
      id: localStorage.id,
      account: "",
      userName: localStorage.userName,
      normalNavList: [],
      navList: [
        {
          navIndex: "/main",
          title: "后台首页",
          icon: "el-icon-s-home",
          role: ["super", "normal"],
        },
        {
          navIndex: "/order",
          title: "订单管理",
          icon: "el-icon-s-order",
          role: ["super", "normal"],
        },
        {
          navIndex: "/proMana",
          title: "商品管理",
          icon: "el-icon-s-cooperation",
          children: [
            { index: "/proList", name: "商品列表" },
            { index: "/proAdd", name: "商品添加" },
            { index: "/proSort", name: "商品分类" },
          ],
          role: ["super"],
        },
        {
          navIndex: "/shopMana",
          title: "店铺管理",
          icon: "el-icon-s-shop",
          role: ["super", "normal"],
        },
        {
          navIndex: "/account",
          title: "账号管理",
          icon: "el-icon-user-solid",
          children: [
            { index: "/acList", name: "账号列表" },
            { index: "/acAdd", name: "添加账号" },
            { index: "/pwdChange", name: "修改密码" },
          ],
          role: ["super"],
        },
        {
          navIndex: "/statistics",
          title: "销售统计",
          icon: "el-icon-pie-chart",
          children: [
            { index: "/proStat", name: "商品统计" },
            { index: "/orderStat", name: "订单统计" },
          ],
          role: ["super"],
        },
      ],
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
  created() {
    // 解决进入页面导航颜色bug
    this.defaultHash = this.$route.path;

    let id = this.id;
    // 用户信息请求
    api_accountinfo({ params: { id: id } }).then((res) => {
      // console.log(res);
      // console.log(res.data.accountInfo.imgUrl);
      this.imgUrl = res.data.accountInfo.imgUrl;
      localStorage.userGroup = res.data.accountInfo.userGroup;
      localStorage.ctime = res.data.accountInfo.ctime;
      this.headIcon = res.data.accountInfo.imgUrl;
      localStorage.account = res.data.accountInfo.account;
      this.account = localStorage.account;
    });
    // 验证token是否过期请求
    let token = localStorage.token;
    api_token({ params: { token: token } }).then((res) => {
      if (res.data.code == 0) {
        this.account = localStorage.account;
      } else {
      this.userInfo= "/",
        this.imgUrl=''
        this.account = "请登录";
      }
    });
    // 接收bus传参
    this.$bus.on("imgUrl", (imgUrl) => {
      // 在bus中截取字符串
      let strNum = this.imgUrl.lastIndexOf("/");
      this.newStr = this.imgUrl.substring(0, strNum + 1);
      this.imgUrl = this.newStr + imgUrl;
    });
    // 设置管理员权限

    this.normalNavList = this.navList.filter((obj) => {
      return obj.role.includes("normal");
    });
    // console.log(this.normalNavList);
    if (localStorage.role == "normal") {
      this.navList = this.normalNavList;
    } else if (!localStorage.role) {
      this.navList = [];
    }
  },
};
</script>

<style scoped>
.headIcon {
  height: 50px;
  width: 50px;
  border-radius: 50%;
}
.el-submenu__title {
  padding: 0;
}
html,
body {
  height: 100%;
}
main > div,
main > form {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.el-header > .el-breadcrumb {
  line-height: 60px;
}

.el-container {
  height: 100%;
}
.el-icon-s-home,
.el-icon-s-shop,
.el-icon-s-cooperation,
.el-icon-s-order,
.el-icon-pie-chart,
.el-icon-user-solid {
  color: #f4f5f6;
}
.right-main {
  /* padding: 5px; */
  background: #f0f2f5;
}
.foldWords {
  text-indent: 8px;
  float: left;
  color: #f4f5f6;
}
.foldWords::after {
  overflow: hidden;
}
.icon {
  text-indent: 3px;
  float: left;
  line-height: 56px;
  font-size: 18px;
}
.icon::after {
  overflow: hidden;
}
.downList > .el-menu-item {
  background: #202f3f;
}
.el-col {
  width: 200px;
}
.el-menu-vertical-demo {
  border: 0;
}

.el-menu-item {
  color: #f4f5f6;
  text-align: left;
}
.userInfo {
  display: flex;
  margin-right: 50px;
  float: right;
  overflow: hidden;
  /* align-items: center; */
}
</style>