package com.shiva.learnspringboot.student;


import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;
import java.util.Arrays;

@Configuration
public class StudentConfig {

    @Bean
    CommandLineRunner commandLineRunner(StudentRepository repository){
        return args -> {
                Student marium = new Student("Dinesh","dinesh@email.com", LocalDate.of(2000,1,1));
            Student alex = new Student("Alex","alex@email.com", LocalDate.of(2010,1,2));

            repository.saveAll(Arrays.asList(marium,alex));
        };
    }
}
