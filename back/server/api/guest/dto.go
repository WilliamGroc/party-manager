package guest

type AddGuestRequest struct {
	Username string `json:"username" validate:"required"`
	Email    string `json:"email"`
}

type GuestResponse struct {
	ID       uint   `json:"id"`
	Username string `json:"username"`
	Email    string `json:"email"`
	Present  string `json:"present"`
}

type UpdateGuestRequest struct {
	Username string `json:"username" validate:"required"`
	Present  string `json:"present"`
}
