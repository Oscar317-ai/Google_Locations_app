package com.example.LocationApp.user;

import com.example.LocationApp.dtos.LocationDTO;
import com.example.LocationApp.dtos.UserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepo;

    public List<UserDTO> getAllUsers() {
        return userRepo.findAll().stream()
                .map(user -> {
                    UserDTO dto = new UserDTO();
                    dto.setUserId(user.getUserId());
                    dto.setUsername(user.getUsername());
                    if (user.getLocation() != null) {
                        LocationDTO locationDTO = new LocationDTO();
                        locationDTO.setLocationId(user.getLocation().getLocationId());
                        locationDTO.setLocationName(user.getLocation().getLocationName());
                        locationDTO.setLatitude(user.getLocation().getLatitude());
                        locationDTO.setLongitude(user.getLocation().getLongitude());
                        dto.setLocation(locationDTO);
                    }
                    return dto;
                })
                .collect(Collectors.toList());
    }
}
