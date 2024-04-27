package models

import "gorm.io/gorm"

type Guest struct {
	gorm.Model
	Username string `json:"username"`
	Email    string `json:"email"`
	UserID   int    `json:"user_id"`
	PartyID  int    `json:"party_id"`
	Present  bool   `json:"present"`
}
