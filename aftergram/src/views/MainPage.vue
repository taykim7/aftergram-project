<template>
  <div>
    <!-- 날짜 선택 -->
    <div class="calender">

      <div class="calender-date mt40">
        <i class="icon icon-calender"></i>
        <div class="calender-date-picked ml12">
          {{ selectedYear }}년 {{ selectedMonth }}월
        </div>
      </div>

      <div class="calender-pick mt16">
        <span v-for="(day, index) in selectDaysArr"
        :key="index"
        :class="0 === day.listGram ? '' : 'saved'"
        >
          <button @click="selectDate(day.listDay)" :disabled="dateFormat(today) < day.listDay">
            <b v-if="3 === index">
            {{ day.listDay.substring(6) }}
          </b>
          <i v-else>
            {{ day.listDay.substring(6) }}
          </i>
          </button>
        </span>
      </div>
    </div>

    <!-- 몸무게 입력 -->
    <div class="calender-input mt16"
      v-if="!isFuture">
      <div class="calender-input-buttons">
        <button @click="subGram(1.0)">1.0</button>
        <button @click="subGram(0.1)">0.1</button>
        <div></div>
        <button @click="addGram(0.1)">0.1</button>
        <button @click="addGram(1.0)">1.0</button>
      </div>
      <div class="calender-input-kg mt8">
        <input type="text" v-model="gram" maxlength='4' >
        <span class="ml12">
          kg
        </span>
      </div>
      <div class="calender-input-memo mt16">
        <div class="memo-button">
          <div v-if="!memoyn" @click="writeMemo">
            <i class="icon icon-calender"></i>
          </div>
          <div v-else @click="writeMemo">
            <i class="icon icon-calender"></i>
          </div>
        </div>
        <div v-if="memoyn" class="memo">
          <textarea type="text" class="mt16"
            v-model="memo" placeholder="메모를 작성하세요">
          </textarea>
        </div>
      </div>
    </div>
    <div v-else>미래에 어떻게 될지는 아무도 몰라요</div>

    <!-- 저장, 분석 버튼 -->
    <div class="calender_buttons mt16">
      <button v-if="!isFuture" @click="postGram()" class="calender_button">저장</button>
      <router-link to="/analyze" class="calender_button ml16">분석</router-link>
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
        this.gram = Number(this.posts[0]?.gram) || 0;
      } else {
        this.gram =  0;
      }
    },
    // 몸무게 더하기 (소수점 제거)
    addGram(add) {
      this.gram = Math.round((this.gram + add) * 10) / 10;
    },
    // 몸무게 빼기 (소수점 제거)
    subGram(sub) {
      this.gram = Math.round((this.gram - sub) * 10) / 10;
    },
    // 날짜 선택
    selectDate(day) {
      this.selectWeek(day.substring(0, 4), day.substring(4, 6) - 1, day.substring(6));
      this.gram = this.savedGram(day);
      this.memo = this.savedMemo(day);
      if (this.memo) {
        this.memoyn = true;
      } else {
        this.memoyn = false;
      }
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
      return Number(savedData?.gram) || 0;
    },
    // 선택한 날짜의 저장된 메모
    savedMemo(day) {
      const savedData = this.$store.state.posts.find(data => data.standardDate === day);
      return savedData?.memo || '';
    },
    // 메모 열기
    writeMemo() {
      this.memoyn = !this.memoyn;
    },
    // 게시글 작성
    async postGram() {
      if (this.gram && this.validation(this.gram)) {
        const postData = {
          uid: this.$store.state.uid,
          createdDate: this.dateFormat(this.today),
          standardDate: this.dateFormat(this.standardDate),
          memo: this.memo,
          gram: this.gram
        };
        await this.$store.dispatch('POST', postData);
        alert('저장되었습니다.');
        const day = this.dateFormat(this.standardDate);
        this.selectWeek(day.substring(0, 4), day.substring(4, 6) - 1, day.substring(6));
      } else alert('입력되지 않았습니다.');
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
    },
    // 정규 표현 검증식 - 소수점 이하 1자리까지
    validation(gram) {
      const check = gram;
      if (/^\d+(\.\d{1})?$/.test(check)) {
        return true
      } else return false;
    },
  }
}
</script>

<style scoped>
/* 날짜 */
.calender .calender-date {
  display: flex;
  justify-content: left;
  align-items: center;
}
.calender .calender-pick {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.calender .calender-pick span {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: aliceblue;

  display: flex;
  justify-content: space-around;
  align-items: center;
}
.calender .calender-pick span.saved { 
  background-color:  rgb(255, 208, 0);
  color: white;
}
.calender .calender-date-picked {
  font-size: 3rem;
  font-weight: bolder;
}

/* 몸무게 입력 */
.calender-input {
  display: block;
  justify-content: center;
  align-items: center;
  
}
.calender-input .calender-input-buttons {
  display: flex;
  justify-content: center;
  align-items: center;
}
.calender-input .calender-input-buttons button{
  background-color: rgb(31, 31, 41);
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-left: 10px;
  margin-right: 10px;

  border-radius: 10px;
  width: 10%;
  height: 20px;

  font-size: 1.5rem;
  font-weight: bolder;
  text-align: center;
  color: wheat;
}
.calender-input .calender-input-kg {
  display: flex;
  justify-content: center;
  align-items: center;
}
.calender-input .calender-input-kg input {
  width: 50%;
  border: 0px;
  border-radius: 30px;
  height: 40px;

  font-size: 3rem;
  font-weight: bolder;
  text-align: center;
}
.calender-input .calender-input-kg span {}
.calender-input .calender-input-memo {
  display: block;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.calender-input .calender-input-memo .memo-button {
  display: flex;
  justify-content: center;
  align-items: center;
}
.calender-input .calender-input-memo .memo {
  display: flex;
  justify-content: center;
  align-items: center;
}
.calender-input .calender-input-memo .memo textarea {
  height: 100px;
  width: 90%;

  font-size: 2rem;
  font-weight: bolder;
  text-align: center;
  padding: 10px;

  border: 0px;
  border-radius: 10px;
}

/* 저장, 분석버튼 */
.calender_buttons {
  display: flex;
  justify-content: center;
  align-items: center;
}
.calender_button {
  background-color: rgb(44, 44, 44);
  color: white;

  font-size: 2rem;
  font-weight: bolder;
  text-align: center;

  display: flex;
  align-items: center ;
  justify-content: center;

  border-radius: 30px;
  width: 45%;
  height: 40px;
}
/* 아이콘 */
.icon {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 20px;
  height: 20px;
}
.icon.icon-calender {
  background: url(../assets/img/svg/icon_calendar.svg) no-repeat;
  background-size: contain;
}
</style>