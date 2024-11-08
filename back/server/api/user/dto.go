package user

type CreateUserRequest struct {
	Email    string `json:"email" validate:"required,email"`
	Password string `json:"password" validate:"required"`
	Username string `json:"username" validate:"required"`
}

type UpdateUserRequest struct {
	Email    string `json:"email" validate:"email"`
	Password string `json:"password"`
	Username string `json:"username"`
}

type CreateUserResponse struct {
	Email    string `json:"email"`
	ID       uint   `json:"id"`
	Username string `json:"username"`
}

type UserResponse struct {
	Email    string `json:"email"`
	ID       uint   `json:"id"`
	Username string `json:"username"`
}

type LoginRequest struct {
	Email    string `json:"email" validate:"required"`
	Password string `json:"password"`
	IsSSO    bool   `json:"isSSO"`
	IdSSO    string `json:"idSSO"`
	TypeSSO  string `json:"typeSSO"`
	Username string `json:"username"`
}

type LoginResponse struct {
	Email string `json:"email"`
	Token string `json:"token"`
}
