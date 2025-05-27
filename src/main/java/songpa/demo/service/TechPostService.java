package songpa.demo.service;

import songpa.demo.entity.TechPost;
import songpa.demo.repository.TechPostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TechPostService {
    
    @Autowired
    private TechPostRepository techPostRepository;
    
    // 모든 발행된 포스트 조회
    public List<TechPost> getAllPublishedPosts() {
        return techPostRepository.findByPublishedTrueOrderByCreatedAtDesc();
    }
    
    // 페이지네이션으로 포스트 조회
    public Page<TechPost> getPostsWithPagination(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        return techPostRepository.findByPublishedTrue(pageable);
    }
    
    // ID로 포스트 조회
    public Optional<TechPost> getPostById(Long id) {
        return techPostRepository.findById(id);
    }
    
    // 최신 포스트 3개 조회
    public List<TechPost> getLatestPosts() {
        return techPostRepository.findTop3ByPublishedTrueOrderByCreatedAtDesc();
    }
    
    // 카테고리별 포스트 조회
    public List<TechPost> getPostsByCategory(String category) {
        return techPostRepository.findByCategoryAndPublishedTrueOrderByCreatedAtDesc(category);
    }
    
    // 회사별 포스트 조회
    public List<TechPost> getPostsByCompany(String company) {
        return techPostRepository.findByCompanyAndPublishedTrueOrderByCreatedAtDesc(company);
    }
    
    // 키워드로 검색
    public List<TechPost> searchPosts(String keyword) {
        return techPostRepository.searchByKeyword(keyword);
    }
    
    // 포스트 생성
    public TechPost createPost(TechPost post) {
        return techPostRepository.save(post);
    }
    
    // 포스트 업데이트
    public TechPost updatePost(Long id, TechPost updatedPost) {
        Optional<TechPost> existingPost = techPostRepository.findById(id);
        if (existingPost.isPresent()) {
            TechPost post = existingPost.get();
            post.setTitle(updatedPost.getTitle());
            post.setContent(updatedPost.getContent());
            post.setCompany(updatedPost.getCompany());
            post.setCategory(updatedPost.getCategory());
            post.setTags(updatedPost.getTags());
            post.setReadTime(updatedPost.getReadTime());
            post.setImageUrl(updatedPost.getImageUrl());
            post.setExternalUrl(updatedPost.getExternalUrl());
            post.setPublished(updatedPost.getPublished());
            return techPostRepository.save(post);
        }
        return null;
    }
    
    // 포스트 삭제
    public void deletePost(Long id) {
        techPostRepository.deleteById(id);
    }
    
    // 카테고리 목록 조회
    public List<String> getCategories() {
        return techPostRepository.findDistinctCategories();
    }
    
    // 회사 목록 조회
    public List<String> getCompanies() {
        return techPostRepository.findDistinctCompanies();
    }
} 