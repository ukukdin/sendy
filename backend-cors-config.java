// Spring Boot CORS 설정 예시
@Configuration
@EnableWebMvc
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins(
                    "http://localhost:5173",        // 로컬 개발 환경
                    "https://ukukdin.github.io"     // GitHub Pages
                )
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}

// 또는 애노테이션 방식
@RestController
@CrossOrigin(origins = {"http://localhost:5173", "https://ukukdin.github.io"})
@RequestMapping("/api")
public class UserController {
    
    @PostMapping("/users")
    public ResponseEntity<?> signup(@RequestBody SignupRequest request) {
        // 회원가입 로직
        return ResponseEntity.ok().build();
    }
}
