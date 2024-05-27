package com.example.LocationApp;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class DirectionsController {

    @Value("${google.maps.api.key}")
    private String googleMapsApiKey;

    private static final String OFFICE_LATITUDE = "YOUR_OFFICE_LATITUDE";
    private static final String OFFICE_LONGITUDE = "YOUR_OFFICE_LONGITUDE";

    @GetMapping("/directions")
    public String getDirections(@RequestParam("lat") double latitude, @RequestParam("lon") double longitude, Model model) {
        model.addAttribute("apiKey", googleMapsApiKey);
        model.addAttribute("origin", OFFICE_LATITUDE + "," + OFFICE_LONGITUDE);
        model.addAttribute("destination", latitude + "," + longitude);
        return "directions";
    }
}

