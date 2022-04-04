import { auth, provider, storage } from "../firebase"
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage"
import db from "../firebase"
import { signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth"
import { SET_USER, SET_LOADING_STATUS, GET_ARTICLES } from "./actionType"
import {
  Timestamp,
  collection,
  addDoc,
  orderBy,
  query,
  onSnapshot,
} from "firebase/firestore"

export const setUser = (payload) => ({
  type: SET_USER,
  user: payload,
})

export function setLoading(status) {
  return {
    type: SET_LOADING_STATUS,
    status: status,
  }
}

export function signInAPI() {
  return (dispatch) => {
    signInWithPopup(auth, provider)
      .then((payload) => {
        dispatch(setUser(payload.user))
      })
      .catch((error) => {
        alert(error.message)
      })
  }
}

export function getUserAuth() {
  return (dispatch) => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        dispatch(setUser(user))
      }
    })
  }
}

export function signOutAPI() {
  return (dispatch) => {
    signOut(auth)
      .then(() => {
        dispatch(setUser(null))
      })
      .catch((error) => {
        console.log(error.message)
      })
  }
}

export function postArticleAPI(payload) {
  return (dispatch) => {
    dispatch(setLoading(true))

    if (payload.image != "") {
      const upload = uploadBytesResumable(
        ref(storage, `images/${payload.image.name}`),
        payload.image
      )
      upload.on(
        "state_change",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log(`Progress: ${progress}%`)
          if (snapshot.state === "RUNNING") {
            console.log(`Progress: ${progress}%`)
          }
        },
        (error) => console.log(error.code),
        async () => {
          const downloadURL = await getDownloadURL(upload.snapshot.ref)
          const docRef = addDoc(collection(db, "articles"), {
            actor: {
              description: payload.user.email,
              title: payload.user.displayName,
              date: payload.timestamp,
              image: payload.user.photoURL,
            },
            video: payload.video,
            sharedImage: downloadURL,
            comments: 0,
            description: payload.description,
            timeStamp: Timestamp.now(),
          })
          dispatch(setLoading(false))
        }
      )
    } else if (payload.video) {
      const docRef = addDoc(collection(db, "articles"), {
        actor: {
          description: payload.user.email,
          title: payload.user.displayName,
          date: payload.timestamp,
          image: payload.user.photoURL,
        },
        video: payload.video,
        sharedImage: "",
        comments: 0,
        description: payload.description,
        timeStamp: Timestamp.now(),
      })
      dispatch(setLoading(false))
    }
  }
}

export function getArticles(payload) {
  return {
    type: GET_ARTICLES,
    payload: payload,
  }
}

export function getArticlesAPI() {
  return (dispatch) => {
    let payload

    const q = query(collection(db, "articles"), orderBy("actor.date", "desc"))
    onSnapshot(q, (snapshot) => {
      payload = snapshot.docs.map((doc) => doc.data())
      dispatch(getArticles(payload))
    })
  }
}
