package guest

type AddGuestRequest struct {
	Username string `json:"username" validate:"required"`
	Email    string `json:"email"`
}

type GuestResponse struct {
	ID      uint   `json:"id"`
	Name    string `json:"name"`
	Email   string `json:"email"`
	PartyID int    `json:"party_id"`
}
