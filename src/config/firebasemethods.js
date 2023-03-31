import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { getDatabase, set, ref, onValue, push,update, remove  } from "firebase/database";

import app from "./firebaseconfig";

const auth = getAuth(app);
const db = getDatabase(app);
const dt = getDatabase(app);
const dbStuData = getDatabase(app);

let signUpUser = (obj) => {
  return new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(auth, obj.email, obj.password)
      .then((res) => {
        let uid = res.user.uid;
        obj.id = uid;
        const userReference = ref(db, `users/${obj.id}`);
        set(userReference, obj)
          .then(() => {
            resolve("Data Send Successfully in Database and User Created");
          })
          .catch((err) => {
            reject(err.message);
          });
      })
      .catch((err) => {
        reject(err.message);
      });
  });
};
let loginUser = (obj) => {
  return new Promise((resolve, reject) => {
    signInWithEmailAndPassword(auth, obj.email, obj.password)
      .then((res) => {
        let uid = res.user.uid;
        let Reference = ref(db, `users/${uid}`);
        onValue(Reference, (dt) => {
          if (dt.exists()) {
            resolve(dt.val());
          } else {
            reject("Data Not Found...");
          }
        });
      })
      .catch((err) => {
        reject(err.message);
      });
  });
};
let checkAuth = () => {
  return new Promise((resolve,reject) =>{
    onAuthStateChanged(auth, (user) =>{
      if(user) {
        const uid = user.uid;
        resolve(uid);
      }else{
        reject("user not logged in")
      }
    })
  })
};
let userlogOut = () => {
  return signOut(auth);
};
let GetFBData = (nodeName ,id) => {
let Reference = ref(db, `${nodeName}/${id ? id : ""}`);
return new Promise((resolve,reject) =>{
  onValue(Reference, (dt) =>{
    if(dt.exists()){
      if(id) {
        resolve(dt.val());
      }else{
        resolve(Object.values(dt.val()));
      }
    }else{
      reject("no data found")
    }
  })
})
};
let postFBData = (nodeName, obj, id) => {
return new Promise((resolve,reject) =>{
  if(id) {
    let Reference = ref(dt, `${nodeName}/${id ? id : ""}`);
    set(Reference, obj)
    .then((res) =>{
      resolve(res)
    })
    .catch((err) =>{
      reject(err)
    })
  }else{
    let keyRef = ref(dt, `${nodeName}`);
    obj.id = push(keyRef).key;
    let postRef = ref(dt, `${nodeName}/${obj,id}`);
    set(postRef, obj)
    .then((res) =>{
resolve(res)
    })
    .catch((err) =>{
      reject(err)
    })
  }
})
};
function writeToDatabase(obj) {
return new Promise((resolve, reject) => {
  const reference = ref(dbStuData, 'students')
  const NewRef = push(reference).key;
  const send = ref(dbStuData, `students/${NewRef}`);
  obj.id = NewRef;
  set(send, obj)
      .then(() => {
          resolve("Registration Complete")
      })
      .catch((err) => {
          reject(err)
      })
})
};

function addCourse(obj) {
return new Promise((resolve, reject) => {
  const reference = ref(dbStuData, 'course data')
  const NewRef = push(reference).key;
  const send = ref(dbStuData, `course data/${NewRef}`);
  obj.id = NewRef;
  set(send, obj)
      .then(() => {
          resolve("Course Add Successfully")
      })
      .catch((err) => {
          reject(err)
      })
})
};

function addQuiz(obj) {
return new Promise((resolve, reject) => {
  const reference = ref(dbStuData, 'quiz data')
  const NewRef = push(reference).key;
  const send = ref(dbStuData, `quiz data/${NewRef}`);
  set(send, obj)
      .then(() => {
          resolve("Question Add Successfully")
      })
      .catch((err) => {
          reject(err)
      })
})
};

function quizDetail(obj) {
return new Promise((resolve, reject) => {
  const reference = ref(dbStuData, 'quiz detail')
  const NewRef = push(reference).key;
  const send = ref(dbStuData, `quiz detail/${NewRef}`);
  set(send, obj)
      .then(() => {
          resolve("Success")
      })
      .catch((err) => {
          reject(err)
      })
})
};

const ReadFromDatabase = (nodeName, id) => {
// console.log(`nodeName=======>`, nodeName)
// console.log(`id=====>`, id && id)
return new Promise((resolve, reject) => {
  const reference = ref(dbStuData, `${nodeName}/${id || ""}`)
  onValue(reference, (snapshot) => {
      const data = snapshot.val()
      if (data) {
          resolve(data)
          return
      } else {
          reject('error')
          return
      }
  })
})
}


const updateData = (newData) => {
console.log(newData)
const reference = ref(dbStuData, `course data/${newData.id}`)
update(reference, newData)
  .then(() => {
      console.log("Success")
  })
  .catch(() => {
      console.log("Error")
  })
// console.log(reference)
}

const DeleteDataFromDataBase = (nodeName) => {
const reference = ref(dbStuData, `${nodeName}`)
remove(reference).then(() => console.log("Deleted")).catch(err => console.error(err))
}
export {
  signUpUser,
  loginUser,
  checkAuth,
  signOut,
  addCourse,
  userlogOut,
  GetFBData,
  postFBData,
  writeToDatabase,
  ReadFromDatabase,
  addQuiz,
  quizDetail,
  updateData,
  DeleteDataFromDataBase
};