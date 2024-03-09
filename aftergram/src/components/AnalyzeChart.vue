<template>
  <div>
    <div class="chart">
      <canvas ref='gramChart' id="gramChart"></canvas>
    </div>
  </div>
</template>

<script>
import { Chart } from 'chart.js'

export default {
  data() {
    return {
      today: {},
      todayFilter: {},
      chartDom: {},
      labelArr: [],
      dataArr: [],
      postsFilter: [],
    }
  },
  props: {
    posts: [],
  },
  watch: {
    posts(value) {
      this.removeAll();
      // chart에 업데이트할 데이터(라벨, 배열) 구성
      this.labelArr = value.map((item) => {
        return (item.standardDate).substring(2);
      });
      this.dataArr = value.map((item) => {
        return item.gram;
      });
      // chart에 업데이트
      this.chartDom.data.labels.push(...this.labelArr);
      this.chartDom.data.datasets.forEach((dataset) => { dataset.data.push(...this.dataArr) });
      this.chartDom.update();
    },
  },
  mounted() {
    this.today = new Date();
    this.todayFilter = this.today;
    this.labelArr = this.posts.map((item) => {
      return (item.standardDate).substring(2);
    });
    this.dataArr = this.posts.map((item) => {
      return item.gram;
    });
    this.init();
  },
  methods: {
    // 차트 초기값 세팅
    init() {
      this.chartDom = new Chart(document.getElementById('gramChart'), {
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
    // 임시 데이터 추가
    addData() {
      this.chartDom.data.labels.push(...['하이', '하이2', '하이3']);
      this.chartDom.data.datasets.forEach((dataset) => { dataset.data.push(...[7, 10, 89]) });
      this.chartDom.update();
    },
    // 임시 데이터 전체 제거
    removeAll() {
      this.chartDom.data.labels = [];
      this.chartDom.data.datasets.forEach((dataset) => { dataset.data = [] });
      this.chartDom.update();
    },
  }
}
</script>

<style scoped>
</style>
