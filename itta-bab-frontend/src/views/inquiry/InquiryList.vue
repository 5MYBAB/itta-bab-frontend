<script setup>
import {computed, defineProps, ref} from 'vue';
import PageNumAndWritingButton from '@/components/common/PageNumAndWritingButton.vue';
import SearchBarAndSort from '@/components/common/SearchBarAndSort.vue';
import Header from "@/App.vue";
import PageTitleTop from "@/components/common/PageTitleTop.vue";

const jsonData = [
  { title: "댓글 문의", likes: 15, date: "2024-10-11 12:00", answered: false },
  { title: "모임 문의", likes: 55, date: "2024-10-08 13:43", answered: false },
  { title: "게시글 문의", likes: 30, date: "2024-10-05 14:22", answered: false },
  { title: "채팅 문의", likes: 5, date: "2024-10-04 18:35", answered: true },
  { title: "회원가입 문의", likes: 45, date: "2024-10-02 09:10", answered: true },
  { title: "비밀번호 재설정 문의", likes: 20, date: "2024-09-30 10:15", answered: false },
  { title: "로그인 오류 문의", likes: 60, date: "2024-09-28 16:00", answered: false },
  { title: "결제 문의", likes: 25, date: "2024-09-25 08:45", answered: false },
  { title: "서비스 중단 문의", likes: 35, date: "2024-09-23 14:20", answered: true },
  { title: "프로필 수정 문의", likes: 18, date: "2024-09-21 11:05", answered: true },
  { title: "이메일 인증 문의", likes: 40, date: "2024-09-18 13:00", answered: true },
  { title: "공지사항 관련 문의", likes: 50, date: "2024-09-16 09:30", answered: true },
  { title: "비정상적인 접근 문의", likes: 27, date: "2024-09-15 17:40", answered: true },
  { title: "데이터 백업 문의", likes: 32, date: "2024-09-12 12:10", answered: true },
  { title: "계정 복구 문의", likes: 22, date: "2024-09-10 15:25", answered: true }
];


const currentPage = ref(1);
const itemsPerPage = 10;

const totalPages = computed(() => Math.ceil(jsonData.length / itemsPerPage));

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return jsonData.slice(start, end);
});

function goToPage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
}


function answerInquiry(index) {
  alert(`${paginatedData.value[index].title}에 답변을 작성합니다.`);
  // 답변 로직 구현 필요
}

function viewAnswer(index) {
  alert(`${paginatedData.value[index].title}의 답변을 확인합니다.`);
  // 답변 보기 로직 구현 필요
}

const props = defineProps({
  currentPage: Number,
  totalPages: Number,
});
</script>

<template>
  <PageTitleTop/>
  <div class="inquiry-detail">
    <div class="title">
      <h1>문의</h1>
    </div>
    <br>
    <div class="parent-container">
      <SearchBarAndSort/>
    </div>
    <br>

    <div class="board-container">
      <div class="header-row">
        <div class="header-item">번호</div>
        <div class="header-item">제목</div>
        <div class="header-item">작성시간</div>
        <div class="header-item">답변</div>
      </div>
      <div v-for="(item, index) in paginatedData" :key="index" class="data-row">
        <div class="data-item">{{ index + 1 }}</div>
        <div class="data-item">{{ item.title }}</div>
        <div class="data-item">{{ item.date }}</div>
        <div class="data-item">
          <button
              v-if="!item.answered"
              class="answer-button"
              @click="answerInquiry(index)"
          >
            답변하기
          </button>
          <button
              v-else
              class="view-answer-button"
              @click="viewAnswer(index)"
          >
            답변보기
          </button>
        </div>
      </div>
      <div class="page-named">
        <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1">〈</button>
        <span
            v-for="page in totalPages"
            :key="page"
            @click="goToPage(page)"
            :class="{ active: currentPage === page }"
        >
     {{ page }}
   </span>
        <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages">〉</button>
      </div>
    </div>
    <br>
  </div>
</template>

<style scoped>
.inquiry-detail {
  background-color: var(--background-color);
  min-height: 100vh;
  width: 100%;
}
.parent-container {
  display: flex;
  justify-content: center;
}


.title {
  text-align: center;
}

.title h1 {
  font-size: 2em;
  font-weight: bold;
}

img {
  margin-right: 10px;
}

.board-container {
  width:  80%; /* 너비를 80%로 설정 */
  margin: 0 auto;
  background-color: var(--white);
  padding: 0 20px;
  border-radius: 10px;
}

.header-row {
  display: flex;
  width: calc(100% + 40px); /* Compensate for the left and right padding */
  margin-left: -20px;
  background-color: var(--basic-yellow);
  padding: 15px;
  border-radius: 10px 10px 0 0;
  font-weight: bold;
}

.header-item {
  flex: 1;
  text-align: center;
}

.data-row {
  display: flex;
  padding: 15px;
  margin-bottom: 14px;
  border-bottom: 1px solid #ddd;
}

.data-item {
  flex: 1;
  text-align: center;
}

.answer-button {
  background-color: var(--basic-yellow);
  border: none;
  padding: 8px 12px;
  border-radius: 10px;
  cursor: pointer;
}

.view-answer-button {
  background-color: #ccc;
  border: none;
  padding: 8px 12px;
  border-radius: 10px;
  cursor: pointer;
}

.page-named {
  display: flex;
  justify-content: center;
  gap: 5px;
  margin-top: 20px;
}

.page-named span {
  cursor: pointer;
  padding: 5px 10px;
  border: 1px solid var(--gray-font);
  background-color: var(--white);
}

.page-named .active {
  font-weight: bold;
  color: black;
}
</style>
