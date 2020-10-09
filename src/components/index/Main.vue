<template>
  <div>
    <ul id="title">
      <li class="nav">
        <div class="el-icon-document nav-pic"></div>
        <div>
          <div class="nav-word">总订单</div>
          <div class="nav-num">100,400</div>
        </div>
      </li>
      <li class="nav">
        <div class="el-icon-document nav-pic"></div>
        <div>
          <div class="nav-word">总订单</div>
          <div class="nav-num">100,400</div>
        </div>
      </li>
      <li class="nav">
        <div class="el-icon-document nav-pic"></div>
        <div>
          <div class="nav-word">总订单</div>
          <div class="nav-num">100,400</div>
        </div>
      </li>
      <li class="nav">
        <div class="el-icon-document nav-pic"></div>
        <div>
          <div class="nav-word">总订单</div>
          <div class="nav-num">100,400</div>
        </div>
      </li>
    </ul>

    <div id="Box" style="width: 100%; height: 600px;background:white;"></div>
  </div>
</template>

<script>
import { api_totaldata } from "../../apis/apis";
import echarts from "echarts";
export default {
  data() {
    return {};
  },
  mounted() {
    var myChart = echarts.init(document.getElementById("Box"));

    api_totaldata().then((res) => {
      console.log(res.data);
      // console.log(res.data);
      var option = {
        title: {
          text: "数据统计",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["订单", "销售额", "注册人数",  "管理员人数"],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: res.data.xData
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "订单",
            type: "line",
            stack: "总量",
            data: res.data.orderData
          },
          {
            name: "销售额",
            type: "line",
            stack: "总量",
            data: res.data.amountData
          },
        ],
      };

      myChart.setOption(option);
    });
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
#title {
  display: flex;
  justify-content: space-between;
}
.nav-pic {
  font-size: 60px;
  color: #1296db;
}
.nav {
  justify-content: space-around;
  align-items: center;
  /* margin: 0 13px; */
  width: 300px;
  height: 110px;
  display: flex;
  background: #fff;
}
.nav-num {
  color: black;
}
.nav-word {
  color: #e3e3e3;
}
.right-main {
  /* padding: 5px; */
  background: #f0f2f5;
}
#Box{
  margin-top: 20px;
}
</style>