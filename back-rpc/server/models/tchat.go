package models

import "gorm.io/gorm"

type Tchat struct {
	gorm.Model
	ID       uint   `json:"id"`
	Content  string `json:"content"`
	AuthorID uint   `json:"author_id"`
	Author   User   `json:"author" gorm:"foreignKey:AuthorID"`
	PartyID  uint   `json:"party_id"`
	Party    Party  `json:"party" gorm:"foreignKey:PartyID"`
}
