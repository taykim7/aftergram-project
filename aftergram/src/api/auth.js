// 로그인, 회원가입, 탈퇴 API
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged
} from 'firebase/auth';
import { auth } from '../plugins/firebase';

// 회원가입 API
async function registerUser(userData) { 
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    userData.email,
    userData.password
  );
  const user = userCredential;
  console.log("회원가입 성공", user);
}

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
  registerUser,
}