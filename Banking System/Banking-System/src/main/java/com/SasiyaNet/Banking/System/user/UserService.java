package com.SasiyaNet.Banking.System.user;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.SasiyaNet.Banking.System.user.UserRepository;
@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public List<User> allUsers() {
        return userRepository.findAll();
    }

    public Optional<User> singleUser(String username) {
        return userRepository.findUserByUsername(username);
    }

}
