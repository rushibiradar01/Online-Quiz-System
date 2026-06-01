package com.rushi.onlinequiz.controller;

import com.rushi.onlinequiz.entity.User;
import com.rushi.onlinequiz.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public User register(@RequestBody User user) {

        return userRepository.save(user);
    }

    @GetMapping("/all")
    public List<User> getAllUsers() {

        return userRepository.findAll();
    }

    @PostMapping("/login")
    public String login(@RequestBody User user) {

        User existingUser = userRepository.findByEmail(user.getEmail());

        if (existingUser != null &&
                existingUser.getPassword().equals(user.getPassword())) {

            return "Login Successful!";
        }

        return "Invalid Credentials";
    }
}