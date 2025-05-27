package songpa.demo.controller;

import songpa.demo.entity.TechPost;
import songpa.demo.service.TechPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/tech-posts")
@CrossOrigin(origins = "*")
public class TechPostController {
    
    @Autowired
    private TechPostService techPostService;
    
    // 모든 포스트 조회
    @GetMapping
    public List<TechPost> getAllPosts() {
        return techPostService.getAllPublishedPosts();
    }
    
    // 페이지네이션으로 포스트 조회
    @GetMapping("/page")
    public Page<TechPost> getPostsWithPagination(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return techPostService.getPostsWithPagination(page, size);
    }
    
    // 특정 포스트 조회
    @GetMapping("/{id}")
    public ResponseEntity<TechPost> getPostById(@PathVariable Long id) {
        Optional<TechPost> post = techPostService.getPostById(id);
        return post.map(ResponseEntity::ok)
                  .orElse(ResponseEntity.notFound().build());
    }
    
    // 최신 포스트 3개 조회
    @GetMapping("/latest")
    public List<TechPost> getLatestPosts() {
        return techPostService.getLatestPosts();
    }
    
    // 카테고리별 포스트 조회
    @GetMapping("/category/{category}")
    public List<TechPost> getPostsByCategory(@PathVariable String category) {
        return techPostService.getPostsByCategory(category);
    }
    
    // 회사별 포스트 조회
    @GetMapping("/company/{company}")
    public List<TechPost> getPostsByCompany(@PathVariable String company) {
        return techPostService.getPostsByCompany(company);
    }
    
    // 검색
    @GetMapping("/search")
    public List<TechPost> searchPosts(@RequestParam String keyword) {
        return techPostService.searchPosts(keyword);
    }
    
    // 포스트 생성
    @PostMapping
    public TechPost createPost(@RequestBody TechPost post) {
        return techPostService.createPost(post);
    }
    
    // 포스트 업데이트
    @PutMapping("/{id}")
    public ResponseEntity<TechPost> updatePost(@PathVariable Long id, @RequestBody TechPost post) {
        TechPost updatedPost = techPostService.updatePost(id, post);
        if (updatedPost != null) {
            return ResponseEntity.ok(updatedPost);
        }
        return ResponseEntity.notFound().build();
    }
    
    // 포스트 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable Long id) {
        techPostService.deletePost(id);
        return ResponseEntity.ok().build();
    }
    
    // 카테고리 목록 조회
    @GetMapping("/categories")
    public List<String> getCategories() {
        return techPostService.getCategories();
    }
    
    // 회사 목록 조회
    @GetMapping("/companies")
    public List<String> getCompanies() {
        return techPostService.getCompanies();
    }
} 