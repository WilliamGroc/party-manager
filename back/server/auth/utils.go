package auth

import (
	"errors"
	"fmt"
	"net/http"
	"strings"

	"github.com/go-chi/jwtauth"
	"github.com/lestrrat-go/jwx/jwt"
)

func GetToken(header *http.Header, tokenAuth *jwtauth.JWTAuth) (jwt.Token, error) {
	authorisation := header.Get("Authorization")
	if authorisation == "" {
		return nil, errors.New("no token found")
	}

	fmt.Printf("Authorisation: %s\n", authorisation)

	splitToken := strings.Split(authorisation, "Bearer ")
	if len(splitToken) != 2 {
		return nil, errors.New("missing bearer")
	}

	token, err := tokenAuth.Decode(splitToken[1])

	if err != nil {
		return nil, errors.New("invalid token")
	}

	return token, nil
}
