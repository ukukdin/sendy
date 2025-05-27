package songpa.demo.config;

import songpa.demo.entity.TechPost;
import songpa.demo.repository.TechPostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

// @Component 주석 처리하여 DataInitializer 비활성화
// @Component
public class DataInitializer implements CommandLineRunner {
    
    @Autowired
    private TechPostRepository techPostRepository;
    
    @Override
    public void run(String... args) throws Exception {
        // 데이터 초기화 로직 비활성화
        System.out.println("DataInitializer가 비활성화되었습니다. 기존 데이터베이스 데이터를 유지합니다.");
        
        // 기존 데이터 모두 삭제 - 주석 처리
        // techPostRepository.deleteAll();
        // System.out.println("기존 TechPost 데이터를 모두 삭제했습니다.");
        
        // 샘플 TechPost 데이터 생성 - 주석 처리
        // createSampleTechPosts();
    }
    
    private void createSampleTechPosts() {
        TechPost[] posts = {
            new TechPost(
                "React 18의 새로운 기능과 성능 최적화",
                "React 18에서 도입된 Concurrent Features와 Automatic Batching에 대해 알아보고, 실제 프로젝트에서 어떻게 활용할 수 있는지 살펴봅니다. Suspense와 함께 사용하는 방법과 성능 향상 팁을 제공합니다.",
                "카카오",
                "Frontend",
                "React, JavaScript, Performance, Web Development",
                8
            ),
            new TechPost(
                "Kubernetes 환경에서의 마이크로서비스 배포 전략",
                "대규모 마이크로서비스 아키텍처를 Kubernetes 환경에 배포할 때 고려해야 할 사항들을 다룹니다. Service Mesh, Ingress Controller, 그리고 모니터링 전략에 대해 설명합니다.",
                "네이버",
                "DevOps",
                "Kubernetes, Microservices, Docker, DevOps",
                12
            ),
            new TechPost(
                "머신러닝 모델의 실시간 추론 시스템 구축",
                "TensorFlow Serving과 Kubernetes를 활용하여 머신러닝 모델의 실시간 추론 시스템을 구축하는 방법을 소개합니다. 모델 버전 관리와 A/B 테스트 전략도 함께 다룹니다.",
                "라인",
                "AI/ML",
                "Machine Learning, TensorFlow, Kubernetes, MLOps",
                15
            ),
            new TechPost(
                "Spring Boot 3.0과 GraalVM Native Image",
                "Spring Boot 3.0에서 지원하는 GraalVM Native Image를 활용하여 애플리케이션 시작 시간을 단축하고 메모리 사용량을 최적화하는 방법을 알아봅니다.",
                "우아한형제들",
                "Backend",
                "Spring Boot, GraalVM, Java, Performance",
                10
            ),
            new TechPost(
                "Vue.js 3 Composition API 완벽 가이드",
                "Vue.js 3의 Composition API를 활용하여 더 재사용 가능하고 유지보수하기 쉬운 컴포넌트를 작성하는 방법을 설명합니다. TypeScript와의 통합 방법도 함께 다룹니다.",
                "토스",
                "Frontend",
                "Vue.js, TypeScript, Composition API, Frontend",
                9
            ),
            new TechPost(
                "대용량 데이터 처리를 위한 Apache Kafka 활용법",
                "실시간 데이터 스트리밍 처리를 위한 Apache Kafka의 핵심 개념과 실제 운영 환경에서의 최적화 방법을 소개합니다. 파티셔닝 전략과 컨슈머 그룹 관리에 대해 다룹니다.",
                "쿠팡",
                "Backend",
                "Kafka, Data Streaming, Big Data, Distributed Systems",
                14
            ),
            new TechPost(
                "모바일 앱 성능 모니터링과 최적화",
                "React Native와 Flutter 앱의 성능을 모니터링하고 최적화하는 방법을 비교 분석합니다. 메모리 누수 방지와 렌더링 성능 향상 기법을 제공합니다.",
                "당근마켓",
                "Mobile",
                "React Native, Flutter, Performance, Mobile Development",
                11
            ),
            new TechPost(
                "GraphQL과 REST API 비교 분석",
                "GraphQL과 REST API의 장단점을 실제 프로젝트 경험을 바탕으로 비교 분석합니다. 언제 어떤 기술을 선택해야 하는지에 대한 가이드라인을 제시합니다.",
                "배달의민족",
                "Backend",
                "GraphQL, REST API, API Design, Web Development",
                7
            ),
            new TechPost(
                "AWS Lambda를 활용한 서버리스 아키텍처",
                "AWS Lambda와 API Gateway를 활용하여 서버리스 아키텍처를 구축하는 방법을 설명합니다. 비용 최적화와 콜드 스타트 문제 해결 방안도 함께 다룹니다.",
                "야놀자",
                "Cloud",
                "AWS Lambda, Serverless, Cloud Computing, API Gateway",
                13
            ),
            new TechPost(
                "TypeScript 고급 타입 시스템 활용법",
                "TypeScript의 고급 타입 기능을 활용하여 더 안전하고 표현력 있는 코드를 작성하는 방법을 소개합니다. Conditional Types, Mapped Types, Template Literal Types 등을 다룹니다.",
                "NHN",
                "Frontend",
                "TypeScript, Type System, JavaScript, Web Development",
                6
            ),
            new TechPost(
                "Redis를 활용한 캐싱 전략과 성능 최적화",
                "Redis를 활용한 다양한 캐싱 패턴과 실제 운영 환경에서의 성능 최적화 방법을 소개합니다. 메모리 관리와 클러스터 구성에 대해서도 다룹니다.",
                "SK플래닛",
                "Backend",
                "Redis, Caching, Performance, Database",
                9
            ),
            new TechPost(
                "CI/CD 파이프라인 구축과 자동화",
                "Jenkins, GitLab CI, GitHub Actions를 활용한 CI/CD 파이프라인 구축 방법을 비교하고, 각각의 장단점과 적용 사례를 소개합니다.",
                "LG CNS",
                "DevOps",
                "CI/CD, Jenkins, GitLab CI, GitHub Actions, Automation",
                10
            )
        };
        
        String[] urls = {
            "https://whatthaburger.tistory.com/",
            "https://d2.naver.com/helloworld/7804182",
            "https://whatthaburger.tistory.com/",
            "https://techblog.woowahan.com/10969/",
            "https://toss.tech/article/vue3-composition-api",
            "https://medium.com/coupang-engineering/kafka-best-practices",
            "https://medium.com/daangn/mobile-performance-monitoring",
            "https://techblog.yogiyo.co.kr/graphql-vs-rest-api",
            "https://yanolja.github.io/2023/03/15/serverless-architecture/",
            "https://meetup.nhncloud.com/posts/295",
            "https://tech.socarcorp.kr/data/2023/03/15/redis-caching-strategy/",
            "https://www.lgcns.com/blog/cns-tech/cicd-pipeline-automation/"
        };
        
        for (int i = 0; i < posts.length; i++) {
            TechPost post = posts[i];
            post.setCreatedAt(LocalDateTime.now().minusDays((int)(Math.random() * 30)));
            post.setImageUrl("https://via.placeholder.com/400x200?text=" + post.getCategory());
            post.setExternalUrl(urls[i]);
            techPostRepository.save(post);
        }
        
        System.out.println("샘플 TechPost 데이터 " + posts.length + "개가 생성되었습니다.");
    }
} 