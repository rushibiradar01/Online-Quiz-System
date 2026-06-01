package com.rushi.onlinequiz.repository;

import com.rushi.onlinequiz.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    User findByEmail(String email);

}