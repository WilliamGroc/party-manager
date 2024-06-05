package models

type Guest struct {
	ID       uint   `json:"id" gorm:"primaryKey"`
	Username string `json:"username"`
	Email    string `json:"email"`
	UserID   int    `json:"user_id"`
	PartyID  int    `json:"party_id"`
	Present  string `json:"present"`
}
