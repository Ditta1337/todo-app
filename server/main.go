package main

import (
	"example.com/m/routes"
	"github.com/gorilla/mux"
	"net/http"
)

func main() {
	// Create new router
	r := mux.NewRouter()

	// Add middleware
	r.Use(mux.CORSMethodMiddleware(r)) // maybe wrong

	// Add routes
	routes.Setup(r)

	// Start the server
	err := http.ListenAndServe(":8000", r)
	if err != nil {
		panic(err)
	}
}
