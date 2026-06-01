package com.rushi.onlinequiz.repository;

import com.rushi.onlinequiz.entity.Score;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ScoreRepository extends JpaRepository<Score, Long> {
}
