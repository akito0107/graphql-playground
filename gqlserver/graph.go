package gqlserver

import (
	"context"
	"net/http"
	"encoding/json"
	"log"
)

const HTTP_HOST = "http://localhost:3002"

type App struct {}

type UserResponse struct {
	User User `json:"user"`
}

type UsersResponse struct {
	Users []User `json:"users"`
}

func (*App) Query_users(ctx context.Context) ([]User, error) {
	resp, err := http.Get(HTTP_HOST + "/users")
	if err != nil {
		log.Println(err)
		return nil, err
	}
	defer resp.Body.Close()

	var users UsersResponse
	decoder := json.NewDecoder(resp.Body)
	if err := decoder.Decode(&users); err != nil {
		log.Println(err)
		return nil, err
	}
	return users.Users, nil
}

func (*App) Query_user(ctx context.Context, id *string) (User, error) {
	resp, err := http.Get(HTTP_HOST + "/users/" + *id)
	var user UserResponse
	if err != nil {
		log.Println(err)
		return user.User, err
	}
	defer resp.Body.Close()

	decoder := json.NewDecoder(resp.Body)
	if err := decoder.Decode(&user); err != nil {
		log.Println(err)
		return user.User, err
	}
	log.Println(user)
	return user.User, nil
}

