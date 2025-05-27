package songpa.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = "songpa.demo")
public class GatherPageApplication {

	public static void main(String[] args) {
		SpringApplication.run(GatherPageApplication.class, args);
	}

}
