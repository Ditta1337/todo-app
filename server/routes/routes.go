package routes

import (
	"example.com/m/controllers"
	"example.com/m/database"
	"github.com/gorilla/mux"
	"net/http"
)

func Setup(r *mux.Router) {

	rows := database.Connect()

	// Routes consist of a path and a handler function.
	r.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		controllers.PrintNames(w, r, rows)
	})
}
