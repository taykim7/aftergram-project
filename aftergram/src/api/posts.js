import { db } from '../plugins/firebase';
import {
  doc,
  query,
  collection,
  orderBy,
  setDoc,
  getDocs,
  updateDoc,
  deleteDoc
} from 'firebase/firestore';

// 생성
function createPost(postData) {
  const key = postData.standardDate;
  setDoc(doc(db, "post", `${postData.uid}/datas/${key}`), {
    createdDate: postData.createdDate,
    standardDate: postData.standardDate,
    memo: postData.memo,
    gram: postData.gram
  });
}

// TODO 조회
async function fetchAllPosts(uid) {
  const q = query(collection(db, `post/${uid}/datas`), orderBy('standardDate', 'desc'));
  const querySnapshot = await getDocs(q);
  var response = [];
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    response.push(doc.data());
  });
  return response;
}
// 수정
function updatePost(postData) {
  const key = postData.standardDate;
  updateDoc(doc(db, "post", `${postData.uid}/datas/${key}`), {
    memo: postData.memo,
    gram: postData.gram
  });
}
// 삭제
function deletePost(postData) {
  deleteDoc(doc(db, "post", `${postData.uid}/datas/${postData.standardDate}`));
}

export {
  createPost,
  fetchAllPosts,
  updatePost,
  deletePost
}
