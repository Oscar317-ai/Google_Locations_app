package com.example.LocationApp.location;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/location")
public class LocationController {

    @Autowired
    private LocationRepo locationRepo;

    @PostMapping
    public Location saveLocation(@RequestBody Location userLocation) {
        return locationRepo.save(userLocation);
    }

    @GetMapping("/get-all-locations")
    public List<Location> getAllLocations() {
        return locationRepo.findAll();
    }
}
