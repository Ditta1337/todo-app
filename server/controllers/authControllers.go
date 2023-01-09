package controllers

import (
	"net/http"
	"database/sql"
)

func PrintNames(w http.ResponseWriter, r *http.Request, rows *sql.Rows) {
    var id int
	var firstname string
	var lastname string

	for rows.Next() {
		rows.Scan(&id, &firstname, &lastname)
        w.Write([]byte(firstname))
		//println(id, firstname, lastname)
	}
}