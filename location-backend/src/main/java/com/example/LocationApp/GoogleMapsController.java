package com.example.LocationApp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class GoogleMapsController {

    @Autowired
    private GoogleMapsService googleMapsService;

    @GetMapping("/")
    public String index() {
        return "index"; // This will serve the index.html from src/main/resources/templates
    }

    @GetMapping("/geocode")
    @ResponseBody
    public String geocode(@RequestParam String address) {
        return googleMapsService.getGeocodingData(address);
    }
}
