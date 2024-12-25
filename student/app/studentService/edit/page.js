"use client";

import { useSearchParams } from "next/navigation";

const EditPage = () => {
  const searchParams = useSearchParams();
  const postId = searchParams.get("postId");
  const title = searchParams.get("title");

  if (!postId || !title) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Edit Page</h1>
      <p>Post ID: {postId}</p>
      <p>Title: {title}</p>
    </div>
  );
};

export default EditPage;
