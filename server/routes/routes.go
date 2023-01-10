package routes

import (
	"example.com/m/controllers"
	"example.com/m/database"
	"github.com/gorilla/mux"
	"net/http"
)

// Setup adds all the routes to the router
func Setup(r *mux.Router) {
	// Connect to database
	database.Connect()

	// Routes consist of a path and a handler function.

	// Requests to /api/register will be handled by Register
	r.HandleFunc("/api/register", func(w http.ResponseWriter, r *http.Request) {
		controllers.Register(w, r)
	})

	// Requests to /api/login will be handled by Login
	r.HandleFunc("/api/login", func(w http.ResponseWriter, r *http.Request) {
		controllers.Login(w, r)
	})

	// Requests to /api/user will be handled by User
	r.HandleFunc("/api/user", func(w http.ResponseWriter, r *http.Request) {
		controllers.User(w, r)
	})

	// Requests to /api/logout will be handled by Logout
	r.HandleFunc("/api/logout", func(w http.ResponseWriter, r *http.Request) {
		controllers.Logout(w, r)
	})
}
