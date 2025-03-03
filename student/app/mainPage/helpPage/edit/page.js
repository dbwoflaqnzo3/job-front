"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { PageLayout } from "@/app/page";
import EditForm from "./EditForm";

const DetailPage = () => {
  const searchParams = useSearchParams();
  const postId = searchParams.get("postId");
  const title = searchParams.get("title");

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  // 렌더링될 때 GET 요청
  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const res = await fetch(`/api/posts/${postId}`);
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const postData = await res.json();
        console.log("받은 데이터:", postData);

        setPost(postData.post);
      } catch (err) {
        console.error("Error fetching post Data:", err);
      } finally {
        setLoading(false);
      }
    };

    if (postId) {
      fetchPostData();
    } else {
      console.log("아이디 감지 안됨");
    }
  }, [postId]);

  // post가 변경될 때 로그 확인
  useEffect(() => {
    if (post) {
      console.log("업데이트된 상태값 나열:", post);
    }
  }, [post]);

  // 수정 버튼 클릭 시 POST 요청
  const handleEditClick = async (e) => {
    e.preventDefault();
    
    if (!post) return;

    try {
      const response = await fetch("/api/posts/updatePost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      });

      if (response.ok) {
        alert("수정된 내용이 저장되었습니다.");
      } else {
        console.error("수정 요청에 실패했습니다.");
      }
    } catch (error) {
      console.error("서버와 연결하는 중 오류가 발생했습니다.", error);
    }
  };

  // 삭제 버튼 클릭 시 DELETE 요청
  const handleDeleteClick = async (e) => {
    e.preventDefault();
    
    if (!post) return;

    try {
      const response = await fetch("/api/posts/updatePost", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      });

      if (response.ok) {
        alert("게시글이 삭제되었습니다.");
      } else {
        console.error("삭제 요청에 실패했습니다.");
      }
    } catch (error) {
      console.error("서버와 연결하는 중 오류가 발생했습니다.", error);
    }
  };

  const handleUpdatePost = (updatedPost) => {
    setPost(updatedPost);
  }

  return (
    <PageLayout>
      {loading ? (
        <p>로딩 중...</p>
      ) : (
        <EditForm
          Category={post?.category || "에잉"}
          Title={post?.title || "제목 없음"}
          Content={post?.content || "내용 없음"}
          Answer={post?.answer || "아직 답변이 도착하지 않았습니다."}
          Author={post?.author || "작성자 없음"}
          Status={post?.status || 0}
          HandleUpdate={handleUpdatePost}  // 부모에서 받은 handleUpdatePost를 전달
        />
      )}


    </PageLayout>
  );
};

export default DetailPage;
