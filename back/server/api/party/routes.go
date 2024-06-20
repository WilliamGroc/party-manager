package party

import (
	"partymanager/server/auth"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/jwtauth"
	"gorm.io/gorm"
)

type PartyRoutes struct {
	Router *chi.Mux
	DB     *gorm.DB
	Auth   *auth.Auth
}

type PartyRoutesInterface interface {
	SetupRoutes()

	GetAllParty()
	CreateParty()
	GetParty()
	UpdateParty()
	DeleteParty()
	GetPartyFromGuestLink()
}

func NewPartyRoutes(db *gorm.DB, auth *auth.Auth) *PartyRoutes {
	router := chi.NewRouter()

	routes := &PartyRoutes{
		Router: router,
		DB:     db,
		Auth:   auth,
	}

	routes.SetupRoutes()

	return routes
}

func (ur *PartyRoutes) SetupRoutes() {
	ur.Router.Use(jwtauth.Verifier(ur.Auth.TokenAuth))

	ur.Router.Get("/", ur.GetAllParty)
	ur.Router.Post("/", ur.CreateParty)
	ur.Router.Get("/{id}", ur.GetParty)
	ur.Router.Put("/{id}", ur.UpdateParty)
	ur.Router.Delete("/{id}", ur.DeleteParty)
	ur.Router.Get("/guest/link/{link}", ur.GetPartyFromGuestLink)

}
