<script setup>
import '@/assets/css/resetcss.css';
import { useRouter } from 'vue-router';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import axios from "axios";
import {useAuthStore} from "@/stores/auth.js";
import {onMounted, ref} from "vue";

const authStore = useAuthStore();
const userData = ref(null);
const router = useRouter();

const username = ref(null);
const phone = ref(null);

const fetchUserData = async () => {
  try {
    if(authStore.isAuthorized('USER')) {
      const token = authStore.accessToken;
      const response = await axios.get('http://localhost:8003/user/mypage', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      userData.value = response.data;
      username.value = userData.value.username;
      phone.value = formatPhoneNumber(userData.value.phone);
    } else {
      alert(`권한이 없습니다.`);
      router.push('/');
    }
  } catch (error) {
    console.error('사용자 정보 가져오기 실패', error);
  }

};

onMounted(() => {
  fetchUserData();
});

// 수정 버튼 클릭 시 호출되는 함수
const goToUpdate = () => {
  router.push('/update-user'); // 회원정보 수정 페이지로 이동
};

// 삭제 버튼 클릭 시 호출되는 함수
const goToDelete = () => {
  router.push('/delete-user'); // 회원정보 삭제 확인 페이지로 이동
};

const goToInquiry = () =>{
  router.push('/inquiry')
}
function formatPhoneNumber(phone) {
  return phone.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
}
</script>

<template>
  <div class="top-box">
    <div class="flex-box" >
      <img src="@/assets/icons/logo.svg">
      <div class="name">{{ username }} 회원님</div>
    </div>
    <div class="inquiry"><input type="button" value="문의하기" @click="goToInquiry"></div>
  </div>

  <div class="padding">
    <div class="user-info-container" v-if="userData">
      <div class="red-top">회원정보</div>
      <div class="user-info">
        <div class="list-line">
          <div class="icon"><font-awesome-icon :icon="['far', 'face-smile']" size="xl"/></div>
          <div class="user-content">{{ userData.username }}</div>
        </div>
        <div class="list-line">
          <div class="icon"><font-awesome-icon :icon="['far', 'map']" size="xl"/></div>
          <div class="user-content">{{ userData.className }} {{ userData.seasonNum}}기</div>
        </div>
        <div class="list-line">
          <div class="icon"><font-awesome-icon :icon="['fas', 'mobile-screen']" size="xl" /></div>
          <div class="user-content">{{ phone }}</div>
        </div>
        <div class="list-line">
          <div class="icon"><font-awesome-icon :icon="['fas', 'user-group']" size="xl" /></div>
          <div class="user-content">23</div>
        </div>
        <div class="list-line-button">
          <!-- 수정 버튼 -->
          <div class="user-info-update"><input type="button" value="수정" @click="goToUpdate"></div>
          <!-- 삭제 버튼 -->
          <div class="user-info-delete"><input type="button" value="삭제" @click="goToDelete"></div>
        </div>
      </div>
    </div>

    <!-- 참여 중인 모임 -->
    <div class="chat-list-container">
      <div class="yellow">참여중인 모임</div>
      <div class="chat-list">
        <div class="chat-list-line">
          <div class="chat-title">든든 국밥</div>
          <div class="chat-sub-title">든든 국밥 같이 먹어요~!</div>
          <div><font-awesome-icon :icon="['far', 'user']" /> 4/6</div>
          <div class="chat-statue">참여중</div>
        </div>
        <div class="chat-list-line">
          <div class="chat-title">든든 국밥</div>
          <div class="chat-sub-title">든든 국밥 같이 먹어요~!</div>
          <div><font-awesome-icon :icon="['far', 'user']" /> 4/6</div>
          <div class="chat-statue">참여중</div>
        </div>
        <div class="chat-list-line">
          <div class="chat-title">든든 국밥</div>
          <div class="chat-sub-title">든든 국밥 같이 먹어요~!</div>
          <div><font-awesome-icon :icon="['far', 'user']" /> 4/6</div>
          <div class="chat-statue">참여중</div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.chat-list-line{
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin:15px;
  border-bottom: 2px var(--gray-font) solid;
  padding-bottom: 10px;
}
.chat-statue{
  background-color: var(--active-green);
  width: 87.732px;
  height: 43.788px;
  border-radius: 50px;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
}
.chat-sub-title{
  font-size: 15px;
  font-weight: 400;
}
.chat-title{
  font-size: 18px;
  font-weight: 700;
}
.list-line-button{
  display: flex;
  justify-content: center;
}
.user-info-delete input[type="button"]{
  width: 89px;
  height: 38px;
  background-color: var(--real-red);
  border-radius: 20px;
  border: none;
  font-size: 18px;
  font-weight: 700;
  margin: 10px;
}
.user-info-update input[type="button"]{
  width: 89px;
  height: 38px;
  background-color: var(--basic-yellow);
  border-radius: 20px;
  border: none;
  font-size: 18px;
  font-weight: 700;
  margin: 10px;
}
.chat-list{
  background-color: var(--white);
  border-radius: 0px 0px 20px 20px;
  height: 274px;
  padding: 1px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.yellow{
  border-radius: 20px 20px 0px 0px;
  background-color: var(--basic-yellow);
  height: 64px;
  text-align: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  font-size: 20px;
  font-weight: 700;
  width: 723px;
}
.padding{
  padding: 0px 60px;
  display: flex;
  justify-content: center;
  gap: 80px;
}
.user-content{
  font-size: 20px;
  margin-left: 10px;
}
.icon{
  width: 50px;
  margin-left: 25px;
}
.list-line{
  display: flex;
  margin: 12px;
}
.user-info{
  background-color: var(--white);
  height: 275px;
  text-align: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  border-radius: 0px 0px 20px 20px;
}
.red-top{
  border-radius: 20px 20px 0px 0px;
  background-color: var(--semi-red);
  height: 64px;
  text-align: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  font-size: 20px;
  font-weight: 700;
}
.user-info-container{
  width: 486px;
  height: 339px;
  border-radius: 20px;
  background-color: var(--white);
}
.top-box{
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 80px 60px;
}
.name{
  display: flex;
  align-items: center;
  margin-left: 10px;
  font-size: 40px;
}
img{
  width: 60px;
  height: 60px;
}
.flex-box{
  display: flex;
  align-items: center;
}
.inquiry{
  width: 115px;
  height: 50px;
  border-radius: 20px;
  display: contents;
}
.inquiry input[type="button"]{
  width: 115px;
  height: 50px;
  background-color: var(--white);
  text-decoration: none;
  font-size: 18px;
  font-weight: 700;
  color: var(--text-color);
  border:none;
  border-radius: 20px;
}
</style>