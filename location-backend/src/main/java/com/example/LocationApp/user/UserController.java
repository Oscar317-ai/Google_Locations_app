package com.example.LocationApp.user;

import com.example.LocationApp.location.LocationRepo;
import com.example.LocationApp.location.Location;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserRepo userRepo;
    private final LocationRepo locationRepo;

    @GetMapping("/get-all-users")
    public List<UserEntity> allUsers(){
        return userRepo.findAll();
    }

    @PostMapping
    public ResponseEntity<UserEntity> createUser(@RequestBody UserEntity user) {
        System.out.println("we are saving the user");
        UserEntity savedUser = userRepo.save(user);
        return ResponseEntity.ok(savedUser);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserEntity> updateUser(@PathVariable Long id, @RequestBody UserEntity user) {
        if (!userRepo.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        if (user.getLocation() != null) {
            Location location = user.getLocation();
            locationRepo.save(location);
        }
        user.setUserId(id);
        UserEntity updatedUser = userRepo.save(user);
        return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        return userRepo.findById(id).map(user -> {
            userRepo.delete(user);
            return ResponseEntity.noContent().<Void>build();
        }).orElseGet(() -> ResponseEntity.notFound().<Void>build());
    }

}

