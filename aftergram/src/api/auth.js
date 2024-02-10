// 로그인, 회원가입, 탈퇴 API
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../plugins/firebase';

// 로그인 API
function loginUser(userData) {
  signInWithEmailAndPassword(
    auth,
    userData.email,
    userData.password
  );
}

export {
  loginUser
}