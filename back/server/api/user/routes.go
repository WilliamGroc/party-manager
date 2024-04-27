package user

import (
	"partymanager/server/auth"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/jwtauth"
	"gorm.io/gorm"
)

type UserRoutes struct {
	Router *chi.Mux
	DB     *gorm.DB
	Auth   *auth.Auth
}

type UserRoutesInterface interface {
	SetupRoutes()

	Login()
	RegisterUser()

	GetMe()
	UpdateUser()
}

func NewUserRoutes(db *gorm.DB, auth *auth.Auth) *UserRoutes {
	router := chi.NewRouter()

	routes := &UserRoutes{
		Router: router,
		DB:     db,
		Auth:   auth,
	}

	routes.SetupRoutes()

	return routes
}

func (ur *UserRoutes) SetupRoutes() {
	ur.Router.Post("/login", ur.Login)
	ur.Router.Post("/register", ur.RegisterUser)

	ur.Router.Group(func(sr chi.Router) {
		sr.Use(jwtauth.Verifier(ur.Auth.TokenAuth))

		sr.Get("/me", ur.GetMe)
		sr.Put("/", ur.UpdateUser)
	})
}
