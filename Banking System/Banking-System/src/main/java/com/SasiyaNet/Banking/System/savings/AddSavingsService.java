package com.SasiyaNet.Banking.System.savings;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

@Service
public class AddSavingsService {

    @Autowired
    private SavingsRepository savingsRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    public Savings saveSavings(Savings savings) {
        return savingsRepository.save(savings);
    }

    public Savings updateSavings(String savingsId, Integer deposit_amount, Integer interest_rate,
            String maturity_date, String account_id) {
        Query query = new Query(Criteria.where("savings_id").is(savingsId));
        Update update = new Update()
                .set("deposit_amount", deposit_amount)
                .set("interest_rate", interest_rate)
                .set("balance", (double) deposit_amount)
                .set("account_id", account_id);

                Savings updatedSavings = mongoTemplate.findAndModify(query, update, Savings.class);

        if (updatedSavings == null) {
            throw new RuntimeException("Savings not found for Savings ID: " + savingsId);
        }

        return updatedSavings;
    }
}
