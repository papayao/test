<template>
  <div>
    <div class="block">
      <span class="demonstration">时间范围</span>
      <el-date-picker
        v-model="timeData"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      >
      </el-date-picker>
    </div>
    <el-button @click="testBtn" type="success">搜索</el-button>
    <div id="Box" style="width: 100%; height: 600px; background: white"></div>
  </div>
</template>

<script>
import { setTime } from "../../utils/utils";
import echarts from "echarts";
import { api_ordertotal } from "../../apis/apis";
export default {
  data() {
    return {
      timeData: JSON.stringify(["2018-1-1 0:00:00", "2020-10-1 0:00:00"]),
      timeArr:[],
      amountArr:[],
      orderTime: [],
      orderAmount: [],
    };
  },
  methods: {
    testBtn() {
      this.timeData = JSON.stringify([
        setTime(this.timeData[0]),
        setTime(this.timeData[1]),
      ]);
      console.log(this.timeData);
      this.loadPage();
    },
    loadPage() {
      api_ordertotal({ params: { date: this.timeData } }).then((res) => {
        console.log("返回结果", res.data.data);
        this.orderTime=[]
        this.orderAmount=[]
        res.data.data.forEach(element => {
          this.orderTime.push(setTime(element.orderTime))
          this.orderAmount.push(element.orderAmount)
        });        
        var myChart = echarts.init(document.getElementById("Box"));
        var option = {
          xAxis: {
            type: "category",
            data: this.orderTime,
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              data: this.orderAmount,
              type: "line",
            },
          ],
        };
        myChart.setOption(option, true);
      });
    },
  },
  updated() {
    // this.loadPage()
  },
  mounted() {
    this.loadPage();
  },
};
</script>

<style lang="scss" scoped>
</style>