import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
interface CreateFormData {
  title: string;
  description: string;
}

export const CreateForm = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const schema = yup.object().shape({
    title: yup.string().required("Username is required!"),
    description: yup.string().required("Post detail is required!"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateFormData>({
    resolver: yupResolver(schema),
  });

  const postsRef = collection(db, "posts");
  const onPostSubmit = async (data: CreateFormData) => {
    console.log(data);

    await addDoc(postsRef, {
      // title: data.title,
      // description: data.description,
      ...data,
      username: user?.displayName,
      userId: user?.uid,
    });
    navigate("/");
  };
  return (
    <form onSubmit={handleSubmit(onPostSubmit)}>
      <input placeholder="Title" {...register("title")} />
      <p style={{ color: "red" }}>{errors.title?.message}</p>
      <textarea placeholder="Description" {...register("description")} />
      <p style={{ color: "red" }}>{errors.description?.message}</p>
      <input type="submit" className="submitFormButton" />
    </form>
  );
};
