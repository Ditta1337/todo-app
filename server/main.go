package main

import (
	"example.com/m/routes"
	"github.com/gorilla/mux"
	"net/http"
	"github.com/rs/cors"
)

func main() {
	// Create new router
	r := mux.NewRouter()

	// Add CORS
	r.Use(cors.New(cors.Options{
        AllowedOrigins: []string{"http://localhost:7000"},
		AllowedMethods: []string{http.MethodGet, http.MethodPost, http.MethodPut, http.MethodDelete},
		AllowedHeaders: []string{"Content-Type", "Authorization"},
		AllowCredentials: true,
		}).Handler)


	// Add routes
	routes.Setup(r)

	// Start the server
	err := http.ListenAndServe(":8000", r)
	if err != nil {
		panic(err)
	}
}
