<template>
  <li>
    <div>
      <span>{{ dateFormatKor(standardDate) }}</span>
      <input type="text"
      :class="editFlag ? 'editGram' : 'inputGram'"
      v-model="gram"
      :readonly="!editFlag"/>kg
    </div>
    <div v-if="memo || editFlag">
      <textarea
      v-model="memo"
      :class="editFlag ? 'editMemo' : 'inputMemo'"
      :readonly="!editFlag"></textarea>
    </div>
    <div>
      <!-- TODO 수정, 삭제 추가 -->
      <button @click="edit">{{ editText }}</button>
      <button>삭제</button>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    post: Object,
  },
  data() {
    return {
      editFlag: false,
      standardDate: '',
      gram: 0,
      memo: '',
    }
  },
  mounted() {
    this.standardDate = this.post.standardDate;
    this.gram = this.post.gram;
    this.memo = this.post.memo;
  },
  computed: {
    editText() {
      return this.editFlag ? '확인' : '수정';
    }, 
  },
  methods: {
    // 날짜 포맷팅 (YYYY년 MM월 DD일)
    dateFormatKor(date) {
      let year = date.substring(0, 4);
      let month = '0' === date.substring(4, 5)? date.substring(5, 6): date.substring(4, 6);
      let day = date.substring(6);
      return `${year}년 ${month}월 ${day}일`;
    },
    async edit() {
      if (!this.editFlag) {
        this.editFlag = !this.editFlag;
      } else {
        // 확인하기
        if ((this.gram === this.post.gram) && (this.memo === this.post.memo) ) {
          this.editFlag = !this.editFlag;
        } else {
          await this.updateGram();
          this.editFlag = !this.editFlag;
        }
      }
    },
    // 게시글 수정
    async updateGram() {
      const postData = {
        uid: this.$store.state.uid,
        standardDate: this.standardDate,
        memo: this.memo,
        gram: this.gram
      };
      this.$emit("update", postData);
    },
  },
}
</script>

<style scoped>
.inputGram {
  width: 40px;
  font-size: 15px;
  border: 0;
  border-radius: 15px;
  outline: none;
  padding-left: 10px;
  background-color: rgb(233, 233, 233);
}
.editGram {
  width: 40px;
  font-size: 15px;
  border: 0;
  border-radius: 15px;
  outline: none;
  padding-left: 10px;
  background-color: rgb(7, 7, 7);
  color: white;
}
.inputMemo {
  width: 150px;
  font-size: 15px;
  border: 0;
  border-radius: 5px;
  outline: none;
  padding-left: 10px;
  background-color: rgb(233, 233, 233);
}
.editMemo {
  width: 150px;
  font-size: 15px;
  border: 0;
  border-radius: 5px;
  outline: none;
  padding-left: 10px;
  background-color: rgb(7, 7, 7);
  color: white;
}
</style>