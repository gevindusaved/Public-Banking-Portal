package com.SasiyaNet.Banking.System.savings;

import org.springframework.web.bind.annotation.*;

import com.SasiyaNet.Banking.System.account.Account;
import com.SasiyaNet.Banking.System.account.AccountService;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/savings")
public class SavingsController {

    @Autowired
    private SavingsService savingsService;
    @Autowired
    private AccountService accountService;

    @Autowired
    private AddSavingsService addSavingsService;

    @GetMapping
    public ResponseEntity<List<Savings>> getAllSavings() {
        return new ResponseEntity<>(savingsService.allSavings(), HttpStatus.OK);
    }

    @GetMapping("/{savingsId}/{username}")
    public ResponseEntity<Savings> getSavingsById(
            @PathVariable String savingsId, @PathVariable String username) {

        Optional<Savings> optionalSV = savingsService.getSavingsById(savingsId);

        if (optionalSV.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        Savings sv = optionalSV.get();

        Optional<Account> account = accountService.singleAccount(sv.getAccount_id());
        if (account.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        double updatedBalance = calculateCurrentBalance(sv);
        sv.setCurrentBalance(updatedBalance);
        addSavingsService.saveSavings(sv); // update in DB

        return new ResponseEntity<>(sv, HttpStatus.OK);
    }

    @PostMapping("/lookup")
    public ResponseEntity<?> getSavingsSecure(@RequestBody Map<String, String> payload) {
        String savingsId = payload.get("savingsId");
        String username = payload.get("username");

        Optional<Savings> optionalSV = savingsService.getSavingsById(savingsId);
        if (optionalSV.isEmpty()) {
            return new ResponseEntity<>("Savings not found.", HttpStatus.NOT_FOUND);
        }

        Savings sv = optionalSV.get();
        String accountId = sv.getAccount_id();

        Optional<Account> optionalAccount = accountService.singleAccount(accountId);
        if (optionalAccount.isEmpty()) {
            return new ResponseEntity<>("Access denied or account mismatch.", HttpStatus.UNAUTHORIZED);
        }

        return new ResponseEntity<>(sv, HttpStatus.OK);
    }

    private double calculateCurrentBalance(Savings sv) {
        if (sv.getCreatedAt() == null)
            return sv.getDeposit_amount();

        long daysPassed = java.time.Duration.between(sv.getCreatedAt(), LocalDateTime.now()).toDays();
        double years = daysPassed / 365.0;

        return sv.getDeposit_amount() * Math.pow(1 + sv.getInterest_rate() / 100.0, years);

    }

}
