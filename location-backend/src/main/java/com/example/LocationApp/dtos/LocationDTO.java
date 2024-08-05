package com.example.LocationApp.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LocationDTO {
    private Long locationId;
    private String locationName;
    private Long latitude;
    private Long longitude;
}
