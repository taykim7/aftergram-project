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
function setPost(postData) {
  const uid = postData.uid;
  const key = postData.standardDate;
  const url = `${uid}/datas/${key}`;
  return setDoc(doc(db, "post", url), {
    createdDate: postData.createdDate,
    standardDate: postData.standardDate,
    memo: postData.memo,
    gram: postData.gram
  }).then((response) => response);
}

// 조회
async function fetchPosts(uid) {
  const url = `post/${uid}/datas`
  const q = await query(collection(db, url), orderBy('standardDate', 'desc'));
  return getDocs(q).then((response) => response);
}

// 수정
function updatePost(postData) {
  const uid = postData.uid;
  const key = postData.standardDate;
  const url = `${uid}/datas/${key}`;
  return updateDoc(doc(db, "post", url), {
    memo: postData.memo,
    gram: postData.gram
  }).then((response) => response);
}

// 삭제
function deletePost(postData) {
  const uid = postData.uid;
  const standardDate = postData.standardDate;
  const url = `${uid}/datas/${standardDate}`;
  return deleteDoc(doc(db, "post", url)).then((response) => response);
}

export {
  setPost,
  fetchPosts,
  updatePost,
  deletePost
}
