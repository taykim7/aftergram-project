import { db } from '../plugins/firebase';
import {
  doc,
  setDoc,
  getDoc
} from 'firebase/firestore';

// 생성
function createPost(postData) {
  setDoc(doc(db, "post", postData.uid), {
    createdDate: postData.createdDate,
    standardDate: postData.standardDate,
    memo: postData.memo,
    gram: postData.gram
  });
}

// TODO 조회
async function fetchPost(uid) {
  const docRef = doc(db, "post", uid);
  const docSnap = await getDoc(docRef)
  console.log(docSnap.data());
}

export {
  createPost,
  fetchPost
}