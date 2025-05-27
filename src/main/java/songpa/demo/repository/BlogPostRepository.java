package songpa.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import songpa.demo.entity.BlogPost;

import java.util.List;

@Repository
public interface BlogPostRepository extends JpaRepository<BlogPost, Long> {
    
    // 발행된 포스트만 조회 (최신순)
    List<BlogPost> findByPublishedTrueOrderByCreatedAtDesc();
    
    // 제목으로 검색
    List<BlogPost> findByTitleContainingIgnoreCaseAndPublishedTrueOrderByCreatedAtDesc(String title);
    
    // 작성자별 포스트 조회
    List<BlogPost> findByAuthorAndPublishedTrueOrderByCreatedAtDesc(String author);
    
    // 최근 포스트 조회 (제한된 개수)
    @Query("SELECT p FROM BlogPost p WHERE p.published = true ORDER BY p.createdAt DESC")
    List<BlogPost> findRecentPosts();
} 