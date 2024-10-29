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
	UserId   int    `json:"userId"`
}

type UpdateGuestRequest struct {
	Present string `json:"present" validate:"required"`
}
