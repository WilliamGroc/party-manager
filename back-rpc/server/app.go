package server

import (
	"fmt"
	"log"
	"net"
	"os"
	"partymanager/server/api/guest"
	"partymanager/server/api/party"
	"partymanager/server/api/tchat"
	"partymanager/server/api/user"
	"partymanager/server/models"
	"time"

	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

type App struct {
	DB *gorm.DB
}

type AppInterface interface {
	Run()
}

func (a *App) Run() {
	// Database connection
	dbLogger := logger.New(
		log.New(os.Stdout, "\r\n", log.LstdFlags), // io writer
		logger.Config{
			SlowThreshold:             time.Second, // Slow SQL threshold
			LogLevel:                  logger.Warn, // Log level
			IgnoreRecordNotFoundError: true,        // Ignore ErrRecordNotFound error for logger
			ParameterizedQueries:      true,        // Don't include params in the SQL log
			Colorful:                  false,       // Disable color
		},
	)

	uri := os.Getenv("DATABASE_URI")
	db, err := gorm.Open(postgres.Open(uri), &gorm.Config{
		Logger: dbLogger,
	})

	if err != nil {
		panic("failed to connect database")
	}

	a.DB = db

	// Migrate the schema
	db.AutoMigrate(&models.User{}, &models.Party{}, &models.Guest{}, &models.Tchat{})

	lis, err := net.Listen("tcp", fmt.Sprintf("localhost:%d", 1234))
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}
	var opts []grpc.ServerOption
	opts = append(opts, Interceptor())

	grpcServer := grpc.NewServer(opts...)

	guest.RegisterGuestServer(grpcServer, guest.NewGuestService(a.DB))
	party.RegisterPartyServer(grpcServer, party.NewPartyService(a.DB))
	user.RegisterUserServer(grpcServer, user.NewUserService(a.DB))
	tchat.RegisterTchatServer(grpcServer, tchat.NewTchatService(a.DB))

	reflection.Register(grpcServer)

	fmt.Println("RPC Server running on port 1234")
	grpcServer.Serve(lis)

	if err != nil {
		log.Fatal(err)
	}

}

func NewApp() *App {
	return &App{}
}
