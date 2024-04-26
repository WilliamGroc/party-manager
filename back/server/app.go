package server

import (
	"net/http"
	"os"
	"partymanager/server/api/party"
	"partymanager/server/api/user"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

type App struct {
	DB     *gorm.DB
	Router *chi.Mux
}

type AppInterface interface {
	Run()
}

func (a *App) Run() {
	// Database connection
	uri := os.Getenv("DATABASE_URI")
	db, err := gorm.Open(sqlite.Open(uri), &gorm.Config{})

	if err != nil {
		panic("failed to connect database")
	}

	a.DB = db
	
	// Migrate the schema
	// db.AutoMigrate()

	// Router
	a.Router = chi.NewRouter()

	a.Router.Use(middleware.Logger)
	a.Router.Use(middleware.Recoverer)

	user.NewUserRoutes(a.Router, a.DB)
	party.NewPartyRoutes(a.Router, a.DB)


	http.ListenAndServe(":8080", a.Router)
}

func NewApp() *App {
	return &App{}
}
