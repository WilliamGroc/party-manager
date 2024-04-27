package auth

import (
	"os"

	"github.com/go-chi/jwtauth"
)

type Auth struct {
	TokenAuth *jwtauth.JWTAuth
}

type AuthInterface interface {
	CreateTokenAuth() *jwtauth.JWTAuth
}

func NewAuth() *Auth {
	a := &Auth{}
	a.CreateTokenAuth()
	return a
}

func (a *Auth) CreateTokenAuth() {
	secret := os.Getenv("JWT_SECRET")
	a.TokenAuth = jwtauth.New("HS256", []byte(secret), nil)
}
