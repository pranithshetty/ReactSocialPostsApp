import { getDocs, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../config/firebase";
import { Post } from "./Post";
export interface IPost {
  id: string;
  userId: string;
  title: string;
  username: string;
  description: string;
}
export const Main = () => {
  const [postList, setPostList] = useState<IPost[] | null>(null);
  const postsRef = collection(db, "posts");

  const getPosts = async () => {
    const data = await getDocs(postsRef);
    const postData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    })) as IPost[];
    // console.log("postData", postData);
    setPostList(postData);
  };
  useEffect(() => {
    getPosts();
  }, []);
  return (
    <div>
      All Posts!
      {postList?.map((post, key) => {
        return <Post post={post} key={key} />;
      })}
    </div>
  );
};
