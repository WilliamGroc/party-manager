package models

import (
	"time"

	"gorm.io/gorm"
)

type Party struct {
	gorm.Model
	Name        string  `json:"name"`
	Description string  `json:"description"`
	Location    string  `json:"location"`
	Date        time.Time  `json:"date"`
	HostID      int     `json:"host_id"`
	Guests      []Guest `json:"guests" gorm:"foreignKey:PartyID"`
}
