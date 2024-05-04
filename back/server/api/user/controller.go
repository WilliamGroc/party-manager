package user

import (
	"net/http"
	"partymanager/server/api"
	"partymanager/server/auth"
	"partymanager/server/models"

	"golang.org/x/crypto/bcrypt"
)

func (ur *UserRoutes) Login(w http.ResponseWriter, r *http.Request) {
	var body LoginRequest
	api.DecodeBody(r, &body)

	var user models.User

	ur.DB.First(&user, "username = ?", body.Username)

	if user.ID == 0 || bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(body.Password)) != nil {
		w.WriteHeader(http.StatusUnauthorized)
		w.Write([]byte("Unauthorized"))
		return
	}

	_, tokenString, _ := ur.Auth.TokenAuth.Encode(map[string]interface{}{"id": user.ID})

	api.EncodeBody(w, LoginResponse{Token: tokenString})
}

func (ur *UserRoutes) RegisterUser(w http.ResponseWriter, r *http.Request) {
	var body CreateUserRequest
	api.DecodeBody(r, &body)

	var user models.User

	ur.DB.First(&user, "username = ?", body.Username)

	if user.ID != 0 {
		w.WriteHeader(http.StatusConflict)
		w.Write([]byte("Conflict"))
		return
	}

	hashed, _ := bcrypt.GenerateFromPassword([]byte(body.Password), 8)

	user = models.User{Username: body.Username, Password: string(hashed), Email: body.Email}
	ur.DB.Create(&user)

	api.EncodeBody(w, UserResponse{ID: user.ID, Username: user.Username, Email: user.Email})
}

func (ur *UserRoutes) GetMe(w http.ResponseWriter, r *http.Request) {
	token, err := auth.GetToken(&r.Header, ur.Auth.TokenAuth)

	if err != nil {
		w.WriteHeader(http.StatusUnauthorized)
		w.Write([]byte(err.Error()))
		return
	}

	id, _ := token.Get("id")
	var user models.User
	ur.DB.First(&user, "id = ?", id)

	api.EncodeBody(w, UserResponse{ID: user.ID, Username: user.Username, Email: user.Email})
}

func (ur *UserRoutes) UpdateUser(w http.ResponseWriter, r *http.Request) {
	token, err := auth.GetToken(&r.Header, ur.Auth.TokenAuth)
	if err != nil {
		w.WriteHeader(http.StatusUnauthorized)
		w.Write([]byte(err.Error()))
		return
	}

	var user models.User

	id, _ := token.Get("id")
	ur.DB.First(&user, "id = ?", id)
	if user.ID == 0 {
		w.WriteHeader(http.StatusNotFound)
		w.Write([]byte("User not found"))
		return
	}

	var body UpdateUserRequest
	err = api.DecodeBody(r, &body)

	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(err.Error()))
		return
	}

	if body.Password != "" {
		user.Password = body.Password
	}
	if body.Username != "" {
		user.Username = body.Username
	}
	if body.Email != "" {
		user.Email = body.Email
	}

	ur.DB.Save(&user)

	api.EncodeBody(w, UserResponse{ID: user.ID, Username: user.Username, Email: user.Email})
}
