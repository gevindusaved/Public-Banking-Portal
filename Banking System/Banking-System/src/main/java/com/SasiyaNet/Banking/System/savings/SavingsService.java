package com.SasiyaNet.Banking.System.savings;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

// import com.SasiyaNet.Banking.System.savings.Savings;

@Service
public class SavingsService {

    @Autowired
    private SavingsRepository savingsRepository;

    public List<Savings> allSavings() {
        return savingsRepository.findAll();
    }
    public Optional<Savings> getSavingsById(String savingsId) {
        return savingsRepository.findBySavingsId(savingsId);
    }
    
    
    public Optional<Savings> singleSaving(String savingsId) {
        return savingsRepository.findBySavingsId(savingsId);
    }

}