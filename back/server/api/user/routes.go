package user

import (
	"github.com/go-chi/chi/v5"
	"gorm.io/gorm"
)

type UserRoutes struct {
	Router *chi.Mux
	DB		 *gorm.DB
}

type UserRoutesInterface interface {
	SetupRoutes()
	GetAllUsers()
	CreateUser()
	GetUser()
	UpdateUser()
	DeleteUser()
}

func NewUserRoutes(router *chi.Mux, db *gorm.DB) *UserRoutes {
	routes := &UserRoutes{
		Router: router,
		DB: db,
	}

	routes.SetupRoutes()

	return routes
}

func (ur *UserRoutes) SetupRoutes() {
	ur.Router.Get("/users", ur.GetAllUsers)
	ur.Router.Post("/users", ur.CreateUser)
	ur.Router.Get("/users/{id}", ur.GetUser)
	ur.Router.Put("/users/{id}", ur.UpdateUser)
	ur.Router.Delete("/users/{id}", ur.DeleteUser)
}