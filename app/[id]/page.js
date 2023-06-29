"use client";
import { useState, useEffect, Fragment, Suspense } from "react";
import Loading from "../loading";

export default function PostDetail({ params }) {
  const [data, setData] = useState(null);
  const [comments, setComments] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${params.id}`
      );
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${params.id}/comments`
      );
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    fetchData();
    fetchComments();

    return () => controller.abort();
  }, []);

  if (!data) return <Loading />;

  return (
    <div className="container mx-auto py-10">
      <div className="pb-10 max-w-xl">
        <p className="text-5xl font-bold">{data.id}.</p>
        <p className="text-4xl font-semibold pt-6 pb-2">{data.title}</p>
        <p className="text-gray-600">{data.body}</p>
      </div>

      <p className="font-medium">Comments:</p>
      <div className="space-y-6 divide-y">
        {comments.map((comment, index) => {
          return (
            <Fragment key={index}>
              <Suspense fallback={<p>Loading</p>}>
                <CardComment comment={comment} />
              </Suspense>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}

const CardComment = ({ comment }) => {
  const { name, email, body } = comment;

  return (
    <div className="pt-6 max-w-md">
      <p className="text-xl font-semibold">{name}</p>
      <p className="text-sm text-gray-500 pt-1 pb-2">{email}</p>
      <p className="text-gray-700">{body}</p>
    </div>
  );
};
