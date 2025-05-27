package songpa.demo.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import songpa.demo.entity.BlogPost;
import songpa.demo.service.BlogPostService;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/posts")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000") // Vue.js 개발 서버용
public class BlogPostController {
    
    private final BlogPostService blogPostService;
    
    // 모든 발행된 포스트 조회
    @GetMapping
    public ResponseEntity<List<BlogPost>> getAllPosts() {
        List<BlogPost> posts = blogPostService.getAllPublishedPosts();
        return ResponseEntity.ok(posts);
    }
    
    // ID로 포스트 조회
    @GetMapping("/{id}")
    public ResponseEntity<BlogPost> getPostById(@PathVariable Long id) {
        return blogPostService.getPostById(id)
                .map(post -> ResponseEntity.ok(post))
                .orElse(ResponseEntity.notFound().build());
    }
    
    // 포스트 생성
    @PostMapping
    public ResponseEntity<BlogPost> createPost(@Valid @RequestBody BlogPost blogPost) {
        BlogPost createdPost = blogPostService.createPost(blogPost);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdPost);
    }
    
    // 포스트 수정
    @PutMapping("/{id}")
    public ResponseEntity<BlogPost> updatePost(@PathVariable Long id, 
                                             @Valid @RequestBody BlogPost blogPost) {
        try {
            BlogPost updatedPost = blogPostService.updatePost(id, blogPost);
            return ResponseEntity.ok(updatedPost);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    // 포스트 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable Long id) {
        blogPostService.deletePost(id);
        return ResponseEntity.noContent().build();
    }
    
    // 제목으로 검색
    @GetMapping("/search")
    public ResponseEntity<List<BlogPost>> searchPosts(@RequestParam String title) {
        List<BlogPost> posts = blogPostService.searchPostsByTitle(title);
        return ResponseEntity.ok(posts);
    }
    
    // 작성자별 포스트 조회
    @GetMapping("/author/{author}")
    public ResponseEntity<List<BlogPost>> getPostsByAuthor(@PathVariable String author) {
        List<BlogPost> posts = blogPostService.getPostsByAuthor(author);
        return ResponseEntity.ok(posts);
    }
} 