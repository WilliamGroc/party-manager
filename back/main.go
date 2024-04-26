package main

import (
	"log"
	"partymanager/server"

	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	
	app := server.NewApp()
	app.Run()
}
