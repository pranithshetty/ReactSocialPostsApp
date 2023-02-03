import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../config/firebase";
import { IPost as PostType } from "./Main";

interface Props {
  post: PostType;
}
interface Like {
  userId: string;
  likeId: string;
}

export const Post = (props: Props) => {
  const { post } = props;
  const [user] = useAuthState(auth);
  const likesRef = collection(db, "likes");
  const likesDoc = query(likesRef, where("postId", "==", post.id));
  const [likes, setLikes] = useState<Like[] | null>(null);

  const getLikes = async () => {
    const data = await getDocs(likesDoc);
    const likeData = data.docs.map((doc) => ({
      userId: doc.data().userId,
      likeId: doc.id,
    }));
    // const likeData = data.docs.length;
    // console.log("likeData", likeData);
    setLikes(likeData);
  };

  const onLike = async () => {
    try {
      const newDoc = await addDoc(likesRef, {
        userId: user?.uid,
        postId: post.id,
      });
      if (user) {
        setLikes((prev) =>
          prev
            ? [...prev, { userId: user?.uid, likeId: newDoc.id }]
            : [{ userId: user?.uid, likeId: newDoc.id }]
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onUnlike = async () => {
    try {
      const likeToDeleteQuery = query(
        likesRef,
        where("postId", "==", post.id),
        where("userId", "==", user?.uid)
      );
      const likeToDeleteData = await getDocs(likeToDeleteQuery);
      const likeId = likeToDeleteData.docs[0].id;
      const likeToDelete = doc(db, "likes", likeId); //specifieng ehich like to delete
      await deleteDoc(likeToDelete);
      if (user) {
        setLikes(
          (prev) => prev && prev.filter((like) => like.likeId !== likeId)
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const hasCurrentUserLiked = likes?.find((like) => like.userId === user?.uid);

  useEffect(() => {
    getLikes();
  }, []);

  return (
    <div>
      <div className="post-title">
        <h1>{post.title}</h1>
      </div>
      <div className="post-description">
        <p>{post.description}</p>
      </div>
      <div className="post-username">
        <p>@{post.username}</p>
        <button onClick={hasCurrentUserLiked ? onUnlike : onLike}>
          {hasCurrentUserLiked ? <>👎</> : <>👍</>}
        </button>
        {likes && <p>Likes:{likes?.length}</p>}
      </div>
    </div>
  );
};
