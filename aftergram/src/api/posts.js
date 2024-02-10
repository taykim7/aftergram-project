import { db } from '../plugins/firebase';
import {
  doc,
  setDoc,
  // getDoc
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

export {
  createPost,
}