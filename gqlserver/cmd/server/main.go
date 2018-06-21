package main

import (
	"net/http"
	"github.com/vektah/gqlgen/handler"
	"log"
	"github.com/akito0107/graphql-playground/gqlserver"
	"github.com/rs/cors"
)

func main() {
	app := &gqlserver.App{}

	mux := http.NewServeMux()
	mux.Handle("/", handler.Playground("User", "/graphql"))
	mux.Handle("/graphql", handler.GraphQL(gqlserver.MakeExecutableSchema(app)))

	handle := cors.Default().Handler(mux)
	log.Fatal(http.ListenAndServe(":3001", handle))
}