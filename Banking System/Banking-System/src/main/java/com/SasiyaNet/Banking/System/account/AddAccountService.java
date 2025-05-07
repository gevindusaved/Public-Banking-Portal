package com.SasiyaNet.Banking.System.account;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import com.SasiyaNet.Banking.System.fixeddeposits.AddFixedDepositService;
import com.SasiyaNet.Banking.System.fixeddeposits.FixedDeposit;
import com.SasiyaNet.Banking.System.savings.AddSavingsService;
import com.SasiyaNet.Banking.System.savings.Savings;
import com.SasiyaNet.Banking.System.userinformation.UserInformation;
import com.SasiyaNet.Banking.System.userinformation.UserInformationRepository;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;

@Service
public class AddAccountService {

    @Autowired
    private AddSavingsService addSavingsService;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    @Autowired
    private UserInformationRepository userInformationRepository;

    @Autowired
    private AddFixedDepositService addFixedDepositService;

    public void updateAccountBalance(String accountId, Integer amount, boolean isDeposit) {
        Query query = new Query(Criteria.where("accountId").is(accountId));
        // Query query2 = new Query(Criteria.where("userInformationId").is(userInformationId));
        Account account = mongoTemplate.findOne(query, Account.class);
        // Account account2 = mongoTemplate.findOne(query2, UserInformation.class);
        if (account == null) {
            throw new RuntimeException("Account not found for Account ID: " + accountId);
        }

        int updatedBalance = isDeposit ? account.getBalance() + amount : account.getBalance() - amount;

        boolean isSavingAccount = "savings".equalsIgnoreCase(account.getAccountType());

        if (!isDeposit && updatedBalance < 0) {
            throw new RuntimeException("Insufficient balance for account: " + accountId);
        }

        Update update = new Update().set("balance", updatedBalance);
        mongoTemplate.updateFirst(query, update, Account.class);
    }

    public Account createAccountAuto(String username, String userInformationId, Integer balance, String account_type) {
        
        if (!userInformationRepository.existsByUserInformationId(userInformationId)){
            throw new RuntimeException("UserInformation with ID " + userInformationId + " does not exist.");
        }

        String newAccountId = generateNextAccountId();

        double interestRate = account_type.equalsIgnoreCase("savings") ? 6.0 : 13.0;
        balance += (int) (balance * (interestRate / 100.0));

        Account account = new Account(newAccountId, userInformationId, username, balance, account_type, LocalDateTime.now(), interestRate);
        Account savedAccount = accountRepository.save(account);

        if (account_type.equalsIgnoreCase("fixed deposits")) {
            String fixedDepositId = "FD_" + newAccountId;
            LocalDateTime now = LocalDateTime.now();
            // double interestRate = 13.0;

            // Start with balance as deposit_amount
            double currentBalance = balance * 1.0;

            String maturityDate = now.plusYears(1).toString();
            double fullAmount = balance + (balance * (interestRate / 100.0));

            FixedDeposit fd = new FixedDeposit(
                    null,
                    fixedDepositId,
                    balance,
                    (int) interestRate,
                    maturityDate,
                    newAccountId,
                    fullAmount,
                    currentBalance,
                    now);

            addFixedDepositService.saveFixedDeposit(fd);
        } else if (account_type.equalsIgnoreCase("savings")) {
            String savingsId = "SV_" + newAccountId;

            LocalDateTime now = LocalDateTime.now();
            // double interestRate = 13.0;

            // Start with balance as deposit_amount
            double currentBalance = balance * 1.0;

            Savings sv = new Savings(
                    null,
                    savingsId,
                    balance,
                    (int) interestRate,
                    newAccountId,
                    currentBalance,
                    now);

            addSavingsService.saveSavings(sv);
        }

        return savedAccount;
    }

    private String generateNextAccountId() {
        List<Account> allAccounts = accountRepository.findAll();

        String lastId = allAccounts.stream()
                .map(Account::getAccountId)
                .filter(id -> id != null && id.startsWith("accI_"))
                .max(Comparator.comparingInt(id -> Integer.parseInt(id.substring(5))))
                .orElse("accI_000");

        int nextNumber = Integer.parseInt(lastId.substring(5)) + 1;
        return String.format("accI_%03d", nextNumber);
    }

}
