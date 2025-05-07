package com.SasiyaNet.Banking.System.loan;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.FindAndModifyOptions;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

@Service
public class AddLoanService {

    @Autowired
    private LoansRepository loansRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    public Loan updateLoan(String loanId, Integer loanAmount, Integer interest_rate, String dueDate, String status,
            String account_id) {
        Query query = new Query(Criteria.where("loan_id").is(loanId)); // instead of "loanId"

        Update update = new Update()
                .set("loan_amount", loanAmount)
                .set("interest_rate", interest_rate)
                .set("due_date", dueDate)
                .set("status", status)
                .set("account_id", account_id);

        // Loan updatedLoan = mongoTemplate.findAndModify(query, update, Loan.class);
        Loan updatedLoan = mongoTemplate.findAndModify(query, update, FindAndModifyOptions.options().returnNew(true),
                Loan.class);

        if (updatedLoan == null) {
            throw new RuntimeException("Loan not found for Loan ID: " + loanId);
        }

        return updatedLoan;
    }
}
