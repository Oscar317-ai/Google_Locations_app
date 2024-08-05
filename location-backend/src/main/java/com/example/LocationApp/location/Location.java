package com.example.LocationApp.location;

import com.example.LocationApp.user.UserEntity;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Location {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long locationId;
    private String locationName;
    private Long latitude;
    private Long longitude;

    @OneToOne(mappedBy = "location")
    @JsonBackReference
    private UserEntity user;
    
}
