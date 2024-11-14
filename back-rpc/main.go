package main

import (
	"log"
	"partymanager/server"

	"github.com/joho/godotenv"
)

//protoc --go_out=. --go_opt=paths=source_relative --go-grpc_out=. --go-grpc_opt=paths=source_relative server/**/*.proto

func main() {
	log.Println("App starting...")

	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	app := server.NewApp()
	app.Run()
}
