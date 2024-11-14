package models

import (
	"time"

	"gorm.io/gorm"
)

type Party struct {
	gorm.Model
	Name        string    `json:"name"`
	Description string    `json:"description"`
	Location    string    `json:"location"`
	Date        time.Time `json:"date"`
	HostID      uint      `json:"host_id"`
	Host        User      `json:"host" gorm:"foreignKey:HostID"`
	Guests      []Guest   `json:"guests" gorm:"foreignKey:PartyID"`
}
