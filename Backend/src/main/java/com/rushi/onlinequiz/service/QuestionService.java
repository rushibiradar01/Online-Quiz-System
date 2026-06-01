package com.rushi.onlinequiz.service;

import com.rushi.onlinequiz.entity.Question;
import com.rushi.onlinequiz.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class QuestionService {

    @Autowired
    private QuestionRepository questionRepo;

    public Question getQuestionById(Long id) {
        return questionRepo.findById(id).orElse(null);
    }

    public Question addQuestion(Question question) {
        return questionRepo.save(question);
    }
}