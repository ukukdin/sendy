package songpa.demo.repository;

import songpa.demo.entity.TechPost;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TechPostRepository extends JpaRepository<TechPost, Long> {
    
    // 발행된 포스트만 조회
    List<TechPost> findByPublishedTrueOrderByCreatedAtDesc();
    
    // 페이지네이션으로 발행된 포스트 조회
    Page<TechPost> findByPublishedTrue(Pageable pageable);
    
    // 카테고리별 포스트 조회
    List<TechPost> findByCategoryAndPublishedTrueOrderByCreatedAtDesc(String category);
    
    // 회사별 포스트 조회
    List<TechPost> findByCompanyAndPublishedTrueOrderByCreatedAtDesc(String company);
    
    // 제목이나 내용으로 검색
    @Query("SELECT p FROM TechPost p WHERE p.published = true AND (p.title LIKE %:keyword% OR p.content LIKE %:keyword%) ORDER BY p.createdAt DESC")
    List<TechPost> searchByKeyword(@Param("keyword") String keyword);
    
    // 최신 포스트 3개 조회
    List<TechPost> findTop3ByPublishedTrueOrderByCreatedAtDesc();
    
    // 모든 카테고리 조회
    @Query("SELECT DISTINCT p.category FROM TechPost p WHERE p.published = true")
    List<String> findDistinctCategories();
    
    // 모든 회사 조회
    @Query("SELECT DISTINCT p.company FROM TechPost p WHERE p.published = true")
    List<String> findDistinctCompanies();
} 