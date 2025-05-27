package songpa.demo.config;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import songpa.demo.entity.BlogPost;
import songpa.demo.repository.BlogPostRepository;

import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {
    
    private final BlogPostRepository blogPostRepository;
    
    @Override
    public void run(String... args) throws Exception {
        // 기존 데이터가 없을 때만 샘플 데이터 생성
        if (blogPostRepository.count() == 0) {
            createSamplePosts();
        }
    }
    
    private void createSamplePosts() {
        // 샘플 포스트 1
        BlogPost post1 = new BlogPost();
        post1.setTitle("Vue.js와 Spring Boot로 만드는 블로그");
        post1.setContent("안녕하세요! 오늘은 Vue.js와 Spring Boot를 사용해서 블로그를 만드는 방법에 대해 알아보겠습니다.\n\n" +
                "Vue.js는 프론트엔드 개발을 위한 프로그레시브 프레임워크이고, Spring Boot는 Java 기반의 백엔드 프레임워크입니다.\n\n" +
                "이 두 기술을 조합하면 현대적이고 효율적인 웹 애플리케이션을 만들 수 있습니다.");
        post1.setAuthor("개발자");
        post1.setPublished(true);
        post1.setCreatedAt(LocalDateTime.now().minusDays(3));
        post1.setUpdatedAt(LocalDateTime.now().minusDays(3));
        
        // 샘플 포스트 2
        BlogPost post2 = new BlogPost();
        post2.setTitle("REST API 설계 가이드");
        post2.setContent("RESTful API를 설계할 때 고려해야 할 중요한 원칙들을 살펴보겠습니다.\n\n" +
                "1. 자원(Resource) 중심의 URL 설계\n" +
                "2. HTTP 메서드의 적절한 사용\n" +
                "3. 상태 코드의 올바른 활용\n" +
                "4. 일관성 있는 응답 형식\n\n" +
                "이러한 원칙들을 따르면 유지보수하기 쉽고 확장 가능한 API를 만들 수 있습니다.");
        post2.setAuthor("백엔드 개발자");
        post2.setPublished(true);
        post2.setCreatedAt(LocalDateTime.now().minusDays(2));
        post2.setUpdatedAt(LocalDateTime.now().minusDays(2));
        
        // 샘플 포스트 3
        BlogPost post3 = new BlogPost();
        post3.setTitle("프론트엔드 개발 트렌드 2024");
        post3.setContent("2024년 프론트엔드 개발 트렌드를 살펴보겠습니다.\n\n" +
                "- Vue 3의 Composition API 활용\n" +
                "- TypeScript의 광범위한 채택\n" +
                "- 마이크로 프론트엔드 아키텍처\n" +
                "- 성능 최적화 기법들\n" +
                "- 접근성(Accessibility) 중요성 증대\n\n" +
                "이러한 트렌드들을 이해하고 적용하는 것이 중요합니다.");
        post3.setAuthor("프론트엔드 개발자");
        post3.setPublished(true);
        post3.setCreatedAt(LocalDateTime.now().minusDays(1));
        post3.setUpdatedAt(LocalDateTime.now().minusDays(1));
        
        // 샘플 포스트 4 (미발행)
        BlogPost post4 = new BlogPost();
        post4.setTitle("데이터베이스 최적화 기법");
        post4.setContent("데이터베이스 성능을 향상시키는 다양한 최적화 기법들을 다룹니다.\n\n" +
                "이 포스트는 아직 작성 중입니다...");
        post4.setAuthor("DBA");
        post4.setPublished(false);
        post4.setCreatedAt(LocalDateTime.now());
        post4.setUpdatedAt(LocalDateTime.now());
        
        // 데이터베이스에 저장
        blogPostRepository.save(post1);
        blogPostRepository.save(post2);
        blogPostRepository.save(post3);
        blogPostRepository.save(post4);
        
        System.out.println("샘플 블로그 포스트 데이터가 생성되었습니다!");
    }
} 