package party

import (
	"github.com/go-chi/chi/v5"
	"gorm.io/gorm"
)

type PartyRoutes struct {
	Router *chi.Mux
	DB		 *gorm.DB
}

type PartyRoutesInterface interface {
	SetupRoutes()
	GetAllParties()
	CreateParty()
	GetParty()
	UpdateParty()
	DeleteParty()
}

func NewPartyRoutes(router *chi.Mux, db *gorm.DB) *PartyRoutes {
	routes := &PartyRoutes{
		Router: router,
		DB: db,
	}

	routes.SetupRoutes()

	return routes
}

func (ur *PartyRoutes) SetupRoutes() {
	ur.Router.Get("/users", ur.GetAllParties)
	ur.Router.Post("/users", ur.CreateParty)
	ur.Router.Get("/users/{id}", ur.GetParty)
	ur.Router.Put("/users/{id}", ur.UpdateParty)
	ur.Router.Delete("/users/{id}", ur.DeleteParty)
}