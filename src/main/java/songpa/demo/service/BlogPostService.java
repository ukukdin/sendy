package songpa.demo.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import songpa.demo.entity.BlogPost;
import songpa.demo.repository.BlogPostRepository;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class BlogPostService {
    
    private final BlogPostRepository blogPostRepository;
    
    // 모든 발행된 포스트 조회
    @Transactional(readOnly = true)
    public List<BlogPost> getAllPublishedPosts() {
        return blogPostRepository.findByPublishedTrueOrderByCreatedAtDesc();
    }
    
    // ID로 포스트 조회
    @Transactional(readOnly = true)
    public Optional<BlogPost> getPostById(Long id) {
        return blogPostRepository.findById(id);
    }
    
    // 포스트 생성
    public BlogPost createPost(BlogPost blogPost) {
        return blogPostRepository.save(blogPost);
    }
    
    // 포스트 수정
    public BlogPost updatePost(Long id, BlogPost updatedPost) {
        return blogPostRepository.findById(id)
                .map(post -> {
                    post.setTitle(updatedPost.getTitle());
                    post.setContent(updatedPost.getContent());
                    post.setAuthor(updatedPost.getAuthor());
                    post.setPublished(updatedPost.getPublished());
                    return blogPostRepository.save(post);
                })
                .orElseThrow(() -> new RuntimeException("포스트를 찾을 수 없습니다: " + id));
    }
    
    // 포스트 삭제
    public void deletePost(Long id) {
        blogPostRepository.deleteById(id);
    }
    
    // 제목으로 검색
    @Transactional(readOnly = true)
    public List<BlogPost> searchPostsByTitle(String title) {
        return blogPostRepository.findByTitleContainingIgnoreCaseAndPublishedTrueOrderByCreatedAtDesc(title);
    }
    
    // 작성자별 포스트 조회
    @Transactional(readOnly = true)
    public List<BlogPost> getPostsByAuthor(String author) {
        return blogPostRepository.findByAuthorAndPublishedTrueOrderByCreatedAtDesc(author);
    }
} 