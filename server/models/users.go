package models

type User struct {
	Id       int    `json:"id"`
	Username string `json:"username"`
	Password []byte `json:"-"`
}
