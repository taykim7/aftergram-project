// 로그인, 회원가입, 탈퇴 API
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../plugins/firebase';

// 회원가입
async function registerUser(userData) { 
  return createUserWithEmailAndPassword(
    auth,
    userData.email,
    userData.password
  ).then((userCredential) => {
    // 사용자 생성 및 로그인 성공 시
    const user = userCredential.user;
    // 사용자의 프로필 업데이트를 통해 displayName 설정
    return updateProfile(user, {
      displayName: userData.displayName
    });
  })
  .then(() => {
    // displayName 설정 성공 시
    console.log('displayName이 성공적으로 설정되었습니다.');
  })
  .catch((error) => {
    // 오류 처리
    console.error('displayName 설정 중 오류 발생:', error);
  });
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
  let userInfo = {
    uid: '',
    displayName: ''
  }
  await onAuthStateChanged(auth, (user) => {
    if (user) {
      // TODO 로그인 - 사용자 정보를 저장하고 UI 업데이트 등의 작업 수행
      userInfo.uid = user.uid;
      userInfo.displayName = user.displayName;
    } else {
      // TODO 로그아웃 - 사용자 정보를 초기화하고 UI 업데이트 등의 작업 수행
    }
  });
  return userInfo;
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