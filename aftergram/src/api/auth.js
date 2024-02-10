// 로그인, 회원가입, 탈퇴 API
import {
  signInWithEmailAndPassword,
  onAuthStateChanged
} from 'firebase/auth';
import { auth } from '../plugins/firebase';

// 로그인 API
async function loginUser(userData) {
  await signInWithEmailAndPassword(
    auth,
    userData.email,
    userData.password
  );
  let uid='';
  // 현재 로그인한 사용자 가져오기
  await onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in
      uid = user.uid;
    } else {
      // User is signed out
    }
  });
  return uid;
}

export {
  loginUser,
}