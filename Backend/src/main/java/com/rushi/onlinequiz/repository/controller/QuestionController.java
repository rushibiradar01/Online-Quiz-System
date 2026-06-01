package com.rushi.onlinequiz.controller;
import com.rushi.onlinequiz.service.QuestionService;

import com.rushi.onlinequiz.entity.Question;
import com.rushi.onlinequiz.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/questions")
public class QuestionController {

    @Autowired
    private QuestionService questionService;

    @Autowired
    private QuestionRepository questionRepository;

    @GetMapping
    public List<Question> getAllQuestions() {
        return questionRepository.findAll();
    }

    @PostMapping("/add")
    public Question addQuestion(@RequestBody Question question) {
        return questionRepository.save(question);
    }
    @DeleteMapping("/delete/{id}")
    public String deleteQuestion(@PathVariable Long id) {

        questionRepository.deleteById(id);

        return "Question Deleted";
    }

    @PutMapping("/update/{id}")
    public Question updateQuestion(@PathVariable Long id,
                                   @RequestBody Question updatedQuestion) {

        Question question = questionService.getQuestionById(id);

        question.setQuestionTitle(updatedQuestion.getQuestionTitle());
        question.setOption1(updatedQuestion.getOption1());
        question.setOption2(updatedQuestion.getOption2());
        question.setOption3(updatedQuestion.getOption3());
        question.setOption4(updatedQuestion.getOption4());
        question.setCorrectAnswer(updatedQuestion.getCorrectAnswer());

        return questionService.addQuestion(question);
    }
}