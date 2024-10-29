package guest

import (
	"partymanager/server/auth"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/jwtauth"
	"gorm.io/gorm"
)

type GuestRoutes struct {
	Router *chi.Mux
	DB     *gorm.DB
	Auth   *auth.Auth
}

type GuestRoutesInterface interface {
	SetupRoutes()

	GetAllGuestFromParty()
	AddGuestToParty()
	UpdateGuest()
	DeleteGuestFromParty()
	GetShareLink()
	AddGuestWithLink()
}

func NewGuestRoutes(db *gorm.DB, auth *auth.Auth) *GuestRoutes {
	router := chi.NewRouter()
	routes := &GuestRoutes{
		Router: router,
		DB:     db,
		Auth:   auth,
	}

	routes.SetupRoutes()

	return routes
}

func (ur *GuestRoutes) SetupRoutes() {
	ur.Router.Use(jwtauth.Verifier(ur.Auth.TokenAuth))

	ur.Router.Get("/party/{partyId}", ur.GetAllGuestFromParty)
	ur.Router.Post("/party/{partyId}", ur.AddGuestToParty)
	ur.Router.Put("/{guestId}/party/{partyId}", ur.UpdateGuest)
	ur.Router.Delete("/{id}/party/{partyId}", ur.DeleteGuestFromParty)
	ur.Router.Get("/party/{partyId}/{guestId}", ur.GetShareLink)
	ur.Router.Put("/link/{link}", ur.AddGuestWithLink)
}
