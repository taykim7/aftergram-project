<template>
  <div>
    <!-- 날짜 선택 -->
    <div>
      <button>달력</button>
      {{ selectedYear }}년 {{ selectedMonth }}월
      <!-- <button>오늘</button> -->
      <div>
        <span v-for="(day, index) in selectDaysArr"
        :key="index"
        :class="0 === day.listGram ? '' : 'saved'"
        @click="selectDate(day.listDay)">
          <b v-if="3 === index">
            {{ day.listDay.substring(6) }}
          </b>
          <i v-else>
            {{ day.listDay.substring(6) }}
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
      <button v-if="!isFuture" @click="fetchGram()">저장</button>
      <router-link to="/analyze">분석</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      today: {},
      standardDate: '',
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
    isFuture() {
      return this.today < this.standardDate;
    },
    isSaved() {
      return 'saved';
    },
    posts() {
      return this.$store.state.posts;
    },
  },
  async mounted() {
    // 저장된 데이터 불러오기
    await this.$store.dispatch('FETCH');
    this.today = new Date();
    this.initWeek();
  },
  methods: {
    // 일주일 초기화
    initWeek() {
      this.selectWeek(this.today.getFullYear(), this.today.getMonth(), this.today.getDate());
      this.initGram();
    },
    // 몸무게 초기화
    initGram() {
      if (this.posts) {
        // 가장 최근의 데이터를 세팅한다.
        this.gram = this.posts[0].gram;
      } else {
        this.gram =  0;
      }
    },
    // 몸무게 계산 (소수점 제거)
    calgram(gram) {
      this.gram = Math.round((this.gram + gram) * 10) / 10;
    },
    // 날짜 선택
    selectDate(day) {
      this.selectWeek(day.substring(0, 4), day.substring(4, 6) - 1, day.substring(6));
      this.gram = this.savedGram(day);
    },
    // 선택된 날 기준 한 주 구성
    selectWeek(year, month, date) {
      this.standardDate = new Date(year, month, date);
      var standardAroundDate;
      this.selectDaysArr = [];
      for (var i = -3; i <= 3; i++) {
        standardAroundDate = new Date(Date.parse(this.standardDate) + i * 1000 * 60 * 60 * 24);
        // this.selectDaysArr.push(this.dateFormat(standardAroundDate));
        let listDay = this.dateFormat(standardAroundDate);
        let listGram = this.savedGram(listDay);
        this.selectDaysArr.push({
          listDay, listGram
        });
        
      }
      // 기준 년, 월
      this.selectedYear = this.standardDate.getFullYear();
      this.selectedMonth = this.standardDate.getMonth() + 1;
      this.selectedDate = this.standardDate.getDate();
    },
    // 선택한 날짜의 저장된 몸무게
    savedGram(day) {
      const savedData = this.$store.state.posts.find(data => data.standardDate === day);
      return savedData?.gram || 0;
    },
    // 메모 열기
    writeMemo() {
      this.memoyn = !this.memoyn;
    },
    // TODO 데이터 양식 수정 (날짜, 무게 등)
    // 게시글 작성
    async fetchGram() {
      const postData = {
        uid: this.$store.state.uid,
        createdDate: this.dateFormat(this.today),
        standardDate: this.dateFormat(this.standardDate),
        memo: this.memo,
        gram: this.gram
      };
      await this.$store.dispatch('POST', postData);
      alert('저장되었습니다.');
    },
    // 날짜 포맷팅 (YYYYMMDD)
    dateFormat(date) {
      if (date) {
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        const dateStr = `${year}${month}${day}`;
        return dateStr;
      } else return 0;
    }
  }
}
</script>

<style scoped>
.saved { 
  background-color:  rgb(95, 95, 95);
  color: white;
  }
</style>