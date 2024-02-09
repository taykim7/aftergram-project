<template>
  <div>
    <!-- 날짜 선택 -->
    <div>
      <button>달력</button>
      2024년 2월
      <div>
        <span v-for="day in nowWeek" :key="day">
          {{ day }}
        </span>
      </div>
    </div>

    <!-- 몸무게 입력 -->
    <div>
      <div>
        <button @click="calgram(1.0)">1.0</button>
        <button @click="calgram(0.1)">0.1</button>
      </div>
      <div>
        <input type="text" :value="mygram" readonly>
        kg
      </div>
      <div>
        <button @click="calgram(-0.1)">0.1</button>
        <button @click="calgram(-1.0)">1.0</button>
      </div>
      <div>
        <input type="text" value="memo">
      </div>
    </div>

    <!-- 분석 버튼 -->
    <div><button>분석</button></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mygram: 0,
      nowDate: {},
      nowWeek: [],
    }
  }, 
  computed: {
  },
  mounted() {
    this.initDate();
    this.initGram();
  },
  methods: {
    initDate() {
      const today = new Date;
      let test = new Date(today);
      for (var i=-2; i <= 2; i++) {
        test.setDate(today.getDate() + i);
        this.nowWeek.push(test.getDate());
      }
    },
    initGram() {
      this.mygram = 66.6;
    },
    calgram(gram) {
      this.mygram += gram;
    }
  }
}
</script>

<style>

</style>