package database

import (
	"database/sql"
    _ "github.com/mattn/go-sqlite3"
)

func Connect() *sql.Rows {
	db, err := sql.Open("sqlite3", "users.db")
	if err != nil {
		panic(err)
	}
	defer db.Close()

    statement, err := db.Prepare("CREATE TABLE IF NOT EXISTS people (id INTEGER PRIMARY KEY, firstname TEXT, lastname TEXT)")
	if err != nil {
		panic(err)
	}
	statement.Exec()

	statement, err = db.Prepare("INSERT INTO people (firstname, lastname) VALUES (?, ?)")
	if err != nil {
		panic(err)
	}
	statement.Exec("Tom", "Scott")
	statement.Exec("Marry", "Jane")


    if err != nil {
        panic("Could not connect with db")
    }

    rows, err := db.Query("SELECT id, firstname, lastname FROM people")
	if err != nil {
		panic(err)
	} else {
		return rows
	}

}