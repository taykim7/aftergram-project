// 로그인, 회원가입, 탈퇴 API
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from 'firebase/auth';
import { auth } from '../plugins/firebase';

// 회원가입
async function registerUser(userData) { 
  return createUserWithEmailAndPassword(
    auth,
    userData.email,
    userData.password
  ).then((response) => response);
}

// 로그인
async function loginUser(userData) {
  return await signInWithEmailAndPassword(
    auth,
    userData.email,
    userData.password
  ).then((response) => response);
}

// 인증상태 변경 감지
async function authChanged() {
  let uid = '';
  await onAuthStateChanged(auth, (user) => {
    if (user) {
      // 로그인 - 사용자 정보를 저장하고 UI 업데이트 등의 작업 수행
      uid = user.uid;
    } else {
      // 로그아웃 - 사용자 정보를 초기화하고 UI 업데이트 등의 작업 수행
    }
  });
  return uid;
}

// 로그아웃
async function logoutUser() {
  return await signOut(auth).then((response) => response);
}

export {
  loginUser,
  registerUser,
  authChanged,
  logoutUser,
}