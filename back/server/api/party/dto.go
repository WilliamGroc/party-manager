package party

import "partymanager/server/api/guest"

type CreatePartyRequest struct {
	Name        string `json:"name" validate:"required"`
	Description string `json:"description" validate:"required"`
	Location    string `json:"location" validate:"required"`
	Date        string `json:"date" validate:"required"`
}

type NewPartyResponse struct {
	ID uint `json:"id"`
}

type PartyResponse struct {
	ID          uint                  `json:"id"`
	Name        string                `json:"name"`
	Description string                `json:"description"`
	Location    string                `json:"location"`
	Date        string                `json:"date"`
	HostID      uint                  `json:"host_id"`
	Guests      []guest.GuestResponse `json:"guests"`
}

type UpdatePartyRequest struct {
	Name        string `json:"name" validate:"required"`
	Description string `json:"description" validate:"required"`
	Location    string `json:"location" validate:"required"`
	Date        string `json:"date" validate:"required"`
}
