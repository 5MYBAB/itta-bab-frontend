<script setup>

import Header from "@/App.vue";
import PageTitleTop from "@/components/common/PageTitleTop.vue";
</script>

<template>

  <main  class="post-detail">
    <br>
    <div class="post-write-container">
      <h2>문의 하기</h2>
      <form>
        <div class="form-group">
          <label for="title">문의</label>
          <input type="text" id="title" placeholder="제목을 입력하세요" />
        </div>
        <div class="form-group">
          <label for="content">문의 내용</label>
          <textarea id="content" placeholder="내용을 입력하세요"></textarea>
        </div>
        <button type="submit" class="submit-button">작성 완료</button>
      </form>
    </div>


  </main>

</template>

<style scoped>
.post-detail{/*배경 화면 노란색으로 설정하는 부분*/
  background-color: var(--background-color); /* 노란색 배경 */
  min-height: 100vh; /* 화면 전체 높이 */
  width: 100%;
}
.inline-content { /*글씨랑 사진 조화 설정*/
  display: flex;
  align-items: center; /* 세로 가운데 정렬 */
}

img {/* 사진과 글씨 간격 조정*/
  margin-right: 10px; /* 이미지 오른쪽에 간격 추가 */
}

.post-write-container {
  padding: 30px;
  background-color: var(--white);
  max-width: 600px;
  margin: 0 auto;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input,
textarea {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid var(--unactive-button);
}

textarea {
  resize: none;
  height: 150px;
}

.submit-button {
  display: block;
  width: 100%;
  background-color: var(--basic-yellow);
  color: var(--white);
  border: none;
  padding: 10px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 20px;
}

.submit-button:hover {
  background-color: var(--basic-yellow);
}
#title {
  background-color: var(--unactive-button); /* 회색 배경색 */
}
#content {
  background-color: var(--unactive-button); /* 회색 배경색 */
}

</style>