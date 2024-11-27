package auth

import (
	"context"
	"errors"
	"os"
	"strings"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/metadata"
	"google.golang.org/grpc/status"
)

type AppClaims struct {
	Email  string `json:"email"`
	UserId uint   `json:"userId"`
	jwt.RegisteredClaims
}

func CreateTokenAuth(userId uint, email string) string {
	secret := os.Getenv("JWT_SECRET")

	// Create claims with multiple fields populated
	claims := AppClaims{
		email,
		userId,
		jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(24 * time.Hour)),
			IssuedAt:  jwt.NewNumericDate(time.Now()),
			NotBefore: jwt.NewNumericDate(time.Now()),
			Issuer:    "test",
			Subject:   "somebody",
			ID:        "1",
			Audience:  []string{"somebody_else"},
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	tokenString, err := token.SignedString([]byte(secret))
	if err != nil {
		panic(err)
	}
	return tokenString
}

func DecodeToken(tokenString string) (*AppClaims, error) {
	secret := os.Getenv("JWT_SECRET")
	token, err := jwt.ParseWithClaims(tokenString, &AppClaims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(secret), nil
	})

	if err != nil {
		return nil, err
	}

	claims, ok := token.Claims.(*AppClaims)
	if !ok {
		return nil, errors.New("invalid clams")
	}

	return claims, nil
}

func ValidateToken(tokenString string) bool {
	secret := os.Getenv("JWT_SECRET")
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		return []byte(secret), nil
	})

	if err != nil {
		return false
	}
	return token.Valid
}

var (
	errMissingMetadata = status.Errorf(codes.InvalidArgument, "missing metadata")
	errInvalidToken    = status.Errorf(codes.Unauthenticated, "invalid token")
)

func GetToken(ctx context.Context) (*AppClaims, error) {
	md, ok := metadata.FromIncomingContext(ctx)
	if !ok {
		return nil, errMissingMetadata
	}

	authorization := md["authorization"]

	if authorization == nil {
		return nil, errInvalidToken
	}

	tokenStr := strings.TrimPrefix(authorization[0], "Bearer ")

	return DecodeToken(tokenStr)
}
