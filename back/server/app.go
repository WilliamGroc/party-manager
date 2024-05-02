package server

import (
	"log"
	"net/http"
	"os"
	"partymanager/server/api/guest"
	"partymanager/server/api/party"
	"partymanager/server/api/user"
	"partymanager/server/auth"
	"partymanager/server/models"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/render"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type App struct {
	DB     *gorm.DB
	Router *chi.Mux
	Auth   *auth.Auth
}

type AppInterface interface {
	Run()
}

func (a *App) Run() {
	// Database connection
	uri := os.Getenv("DATABASE_URI")
	db, err := gorm.Open(postgres.Open(uri), &gorm.Config{})

	if err != nil {
		panic("failed to connect database")
	}

	a.DB = db

	// Migrate the schema
	db.AutoMigrate(&models.User{}, &models.Party{}, &models.Guest{})

	// Router
	a.Router = chi.NewRouter()

	a.Router.Use(middleware.Logger)
	a.Router.Use(middleware.Recoverer)
	a.Router.Use(render.SetContentType(render.ContentTypeJSON))

	a.Auth = auth.NewAuth()

	a.Router.Mount("/user", user.NewUserRoutes(a.DB, a.Auth).Router)
	a.Router.Mount("/party", party.NewPartyRoutes(a.DB, a.Auth).Router)
	a.Router.Mount("/guest", guest.NewGuestRoutes(a.DB, a.Auth).Router)

	log.Println("Server running on port 8080")
	err = http.ListenAndServe(":8080", a.Router)

	if err != nil {
		log.Fatal(err)
	}
}

func NewApp() *App {
	return &App{}
}
