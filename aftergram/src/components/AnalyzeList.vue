<template>
  <li v-if="!deleted">
    <div class="analyze-list mb12">
      <div class="analyze-list-detail">
        <div>
          <span>{{ dateFormatKor(standardDate) }}</span>
          <input type="text"
          :class="editFlag ? 'editGram' : 'inputGram'"
          v-model="gram"
          :readonly="!editFlag"/>
          <span>
            kg
          </span>
        </div>
        <div class="analyze-list-buttons">
          <!-- TODO 수정, 삭제 추가 -->
          <button @click="tryUpdate">{{ editText }}</button>
          <button @click="tryDelete">삭제</button>
        </div>
      </div>
      <div class="analyze-list-textarea"
      v-if="memo || editFlag">
        <textarea
        v-model="memo"
        placeholder="추가할 메모를 입력하세요."
        :class="editFlag ? 'editMemo' : 'inputMemo'"
        :readonly="!editFlag"></textarea>
      </div>
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
      deleted: false,
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
    async tryUpdate() {
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
    async tryDelete() {
      const result = window.confirm('정말 삭제하실건가요?');
      if (result) {
        await this.deleteGram();
        this.deleted = true;
      }
    },
    // 게시글 수정
    updateGram() {
      const postData = {
        uid: this.$store.state.uid,
        standardDate: this.standardDate,
        memo: this.memo,
        gram: this.gram,
      };
      this.$emit("update", postData);
    },
    // 게시글 삭제
    deleteGram() {
      const postData = {
        uid: this.$store.state.uid,
        standardDate: this.standardDate,
      };
      this.$emit("delete", postData);
    }
  },
}
</script>

<style scoped>
.analyze-list {
  display: inline-block;
  justify-content: left;
  align-items: center;
  width: 100%;
}
.analyze-list-detail {

  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 40px;
}
.analyze-list-detail span {
  text-align: left;
  font-size: 1.5rem;
  font-weight: bolder;
}
.analyze-list-detail input {
  font-size: 15px;

  text-align: center;
  font-size: 1.5rem;
  color: white;
  font-weight: bolder;

  margin: 0 10px 0 10px;
  border: 0;
  border-radius: 15px;

  width: 20%;
  height: 28px;
}
.analyze-list-detail .analyze-list-buttons {
  width: 50%;
  display: flex;
  justify-content: right;
  align-items: center;
}
.analyze-list-detail .analyze-list-buttons button {
  background-color: rgb(44, 44, 44);
  color: white;
  font-size: 1.2rem;
  font-weight: bolder;
  text-align: center;
  border-radius: 5px;
  width: 45%;
  height: 20px;
  margin-left: 10px;
}
.analyze-list-detail .inputGram {
  background-color: rgb(166, 173, 63);
}
.analyze-list-detail .editGram {
  background-color: rgb(53, 53, 53);
  color: white;
}
.analyze-list-textarea textarea {
  width: 100%;
  font-size: 15px;
  border: 0;
  border-radius: 5px;
  outline: none;
  padding: 10px;
}
.analyze-list-textarea .inputMemo {
  background-color: rgb(255, 255, 255);
}
.analyze-list-textarea .editMemo {
  background-color: rgb(7, 7, 7);
  color: white;
}
</style>