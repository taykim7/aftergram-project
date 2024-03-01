<template>
  <div>
    <div class="chart">
      *이번주 *월별 조회 기능 추가 예정
      <!-- <button @click="addData">addData</button>
      <button @click="removeAll">removeAll</button> -->
      <canvas ref='gramChart' id="gramChart"></canvas>
    </div>
  </div>
</template>

<script>
import { Chart } from 'chart.js'

export default {
  data() {
    return {
      omg: {},
      labelArr: [],
      dataArr: [],
    }
  },
  props: {
    posts: [],
  },
  mounted() {
    this.labelArr = this.posts.map((item) => {
      return (item.standardDate).substring(2);
    });
    this.dataArr = this.posts.map((item) => {
      return item.gram;
    });
    this.init();
    console.log(this.posts);
    // console.log(this.posts.filter(function (item) {
    //   return item.standardDate;
    // }));
  },
  methods: {
    // 차트 초기값 세팅
    init() {
      this.omg = new Chart(document.getElementById('gramChart'), {
        type: 'line',
        data: {
          labels: this.labelArr,
          datasets: [{
            label: 'gram',
            data: this.dataArr,
            borderWidth: 3
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: false
            }
          }
        }
      });
    },
    // 데이터 추가
    addData() {
      this.omg.data.labels.push(...['하이', '하이2', '하이3']);
      this.omg.data.datasets.forEach((dataset) => { dataset.data.push(...[7, 10, 89]) });
      this.omg.update();
    },
    // 데이터 전체 제거
    removeAll() {
      this.omg.data.labels = [];
      this.omg.data.datasets.forEach((dataset) => { dataset.data = [] });
      this.omg.update();
    },
  }
}
</script>

<style scoped>
.chart {
  background-color: rgb(255, 255, 255);
}
</style>
