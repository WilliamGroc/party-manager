package guest

type AddGuestRequest struct {
	Username string `json:"username" validate:"required"`
	Email    string `json:"email"`
}

type GuestResponse struct {
	ID       uint   `json:"id"`
	Username string `json:"username"`
	Email    string `json:"email"`
	Present  bool   `json:"present"`
	PartyID  int    `json:"party_id"`
}

type UpdateGuestRequest struct {
	Username string `json:"username" validate:"required"`
	Present  bool   `json:"present"`
}
