package com.SasiyaNet.Banking.System.savings;

import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import org.bson.types.ObjectId;

@Repository
public interface SavingsRepository extends MongoRepository<Savings, ObjectId> {
    Optional<Savings> findBySavingsId(String savingsId); // Add this line
}
