<script setup>
import Header from "@/App.vue";
import PageTitleTop from "@/components/common/PageTitleTop.vue";
import axios from "axios";
import { useAuthStore } from "@/stores/auth.js";
import { useRouter } from "vue-router";
import { ref, computed } from "vue";

const authStore = useAuthStore();
const router = useRouter();
const token = authStore.accessToken;
// formData에 문의 내용을 저장하고, 현재 시간을 createDate에 저장
const formData = ref({
  inquiryContent: "",
  createDate: new Date().toISOString()
});

const isFormValid = computed(() => {
  return formData.value.inquiryContent.trim() !== "";
});

const handleInquiryCreate = async () => {
  if (!isFormValid.value) return; // 폼이 유효하지 않으면 함수 종료
  try {
    await axios.post("http://localhost:8003/inquiry/user", formData.value, {
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      }
    });
    router.push("/mypage");
  } catch (error) {
    console.log("문의 등록 중 오류 발생: ", error);
  }
};
</script>

<template>
  <PageTitleTop />
  <main class="post-detail">
    <br />
    <div class="post-write-container">
      <h2>문의 하기</h2>
      <!-- @submit.prevent로 폼 제출 시 새로고침 방지 -->
      <form @submit.prevent="handleInquiryCreate">
        <div class="form-group">
          <label for="content">문의 내용</label>
          <textarea
              id="content"
              placeholder="내용을 입력하세요"
              v-model="formData.inquiryContent"
          ></textarea>
        </div>
        <!-- isFormValid에 따라 버튼 비활성화 -->
        <button type="submit" class="submit-button" :disabled="!isFormValid">작성 완료</button>
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