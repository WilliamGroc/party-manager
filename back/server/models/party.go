package models

import "gorm.io/gorm"

type Party struct {
	gorm.Model
	Name        string  `json:"name"`
	Description string  `json:"description"`
	Location    string  `json:"location"`
	Date        string  `json:"date"`
	Time        string  `json:"time"`
	HostID      int     `json:"host_id"`
	Guests      []Guest `json:"guests" gorm:"foreignKey:PartyID"`
}
