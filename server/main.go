package main

import (
	"log"
	"net/http"
	"example.com/m/routes"
	"github.com/gorilla/mux"
)


func main() {


    r := mux.NewRouter()

    routes.Setup(r)
    // Routes consist of a path and a handler function.

    // Bind to a port and pass our router in and 
    log.Fatal(http.ListenAndServe(":8080", r))
}
