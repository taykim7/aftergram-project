<template>
  <div>
    <!-- 날짜 선택 -->
    <div>
      <button>달력</button>
      {{ selectedYear }}년 {{ selectedMonth }}월
      <!-- <button>오늘</button> -->
      <div>
        <span v-for="(day, index) in selectDaysArr" :key="index" @click="selectDate(day.split('-')[0], day.split('-')[1], day.split('-')[2])">
          <b v-if="3 === index">
            {{ day.split('-')[2] }}
          </b>
          <i v-else>
            {{ day.split('-')[2] }}
          </i>
        </span>
      </div>
    </div>

    <!-- 몸무게 입력 -->
    <div>
      <div>
        <button @click="calgram(-1.0)">1.0</button>
        <button @click="calgram(-0.1)">0.1</button>
        <button @click="calgram(0.1)">0.1</button>
        <button @click="calgram(1.0)">1.0</button>
      </div>
      <div>
        <input type="text" v-model="gram">
        kg
      </div>
      <div>
        <div v-if="!memoyn" @click="writeMemo">메모</div>
        <div v-else>
          <input type="text" v-model="memo">
          <div v-if="memoyn" @click="writeMemo">닫기</div>
        </div>
      </div>
    </div>

    <!-- 저장, 분석 버튼 -->
    <div>
      <button @click="fetchGram()">저장</button>
      <router-link to="/analyze">분석</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      today: {},
      standardDate: {},
      gram: 0,
      memo: '',
      memoyn: false,
      nowDate: {},
      selectDaysArr: [],
      selectedYear: '',
      selectedMonth: '',
      selectedDate: '',
    }
  }, 
  computed: {
  },
  async mounted() {
    this.today = new Date();
    this.init();
  },
  methods: {
    init() {
      this.selectWeek(this.today.getFullYear(), this.today.getMonth(), this.today.getDate());
      this.initGram();
    },
    initGram() {
      this.gram = 66.6;
    },
    // 몸무게 계산
    calgram(gram) {
      this.gram = Math.round((this.gram + gram) * 10) / 10;
    },
    selectDate(year, month, date) {
      this.selectWeek(year, month - 1, date);
    },
    // 선택된 날 기준 한 주 구성
    selectWeek(year, month, date) {
      this.standardDate = new Date(year, month, date);
      var standardAroundDate;
      this.selectDaysArr = [];
      for (var i = -3; i <= 3; i++) {
        standardAroundDate = new Date(Date.parse(this.standardDate) + i * 1000 * 60 * 60 * 24);
        this.selectDaysArr.push(`${standardAroundDate.getFullYear()}-${standardAroundDate.getMonth() + 1}-${standardAroundDate.getDate()}`);
      }
      // 기준 년, 월
      this.selectedYear = this.standardDate.getFullYear();
      this.selectedMonth = this.standardDate.getMonth() + 1;
      this.selectedDate = this.standardDate.getDate();
    },
    writeMemo() {
      this.memoyn = !this.memoyn;
    },
    // TODO 데이터 양식 수정 (날짜, 무게 등)
    async fetchGram() {
      const postData = {
        uid: this.$store.state.uid,
        createdDate: `${this.today.getFullYear()}-${this.today.getMonth() + 1}-${this.today.getDate()}`,
        standardDate: `${this.standardDate.getFullYear()}-${this.standardDate.getMonth() + 1}-${this.standardDate.getDate()}`,
        memo: this.memo,
        gram: this.gram
      };
      await this.$store.dispatch('POST', postData);
    }
  }
}
</script>

<style>

</style>