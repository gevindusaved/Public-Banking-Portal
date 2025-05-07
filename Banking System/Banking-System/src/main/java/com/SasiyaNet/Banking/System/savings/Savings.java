package com.SasiyaNet.Banking.System.savings;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Document(collection = "savings")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Savings {
    @Id
    private ObjectId id;

    @Field("savings_id")
    private String savingsId;

    @Field("deposit_amount")
    private Integer deposit_amount;

    @Field("interest_rate")
    private Integer interest_rate;

    @Field("account_id")
    private String account_id;

    @Field("balance")
    private Double currentBalance;

    @Field("createdAt")
    private LocalDateTime createdAt;

    public String getSavingsId() {
        return savingsId;
    }

    public void setSavingsId(String savingsId) {
        this.savingsId = savingsId;
    }
}
