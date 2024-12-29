export const getPostById = (postId) => {
    // 예시 데이터 (ID가 문자열로 저장되어 있다고 가정)
    const posts = [
        { id: '1', category: '기타', title: 'React 기본 튜토리얼', author: '홍길동', date: '2024-01-01', status: 1 , content: "너무 졸린데 어뜨케요" },
        { id: '2', category: '로그인', title: 'Node.js 입문', author: '김철수', date: '2024-02-15', status: 0 , content: "쌤 너무 졸린데 어뜨케요"},
        { id: '3', category: '회원가입', title: 'Figma 디자인 팁', author: '이영희', date: '2024-03-10', status: 0 , content: " ㅇㅇㅇㅇ 너무 졸린데 어뜨케요"},
    ];
  
    // postId와 post.id를 문자열로 비교
    return posts.find(post => post.id === postId); // postId를 문자열로 비교
  }