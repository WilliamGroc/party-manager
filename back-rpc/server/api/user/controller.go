package user

import (
	context "context"
	"errors"
	"fmt"
	"partymanager/server/auth"
	"partymanager/server/models"

	"cloud.google.com/go/auth/credentials/idtoken"
	empty "github.com/golang/protobuf/ptypes/empty"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type UserService struct {
	DB *gorm.DB
	UnimplementedUserServer
}

func NewUserService(db *gorm.DB) *UserService {
	return &UserService{DB: db}
}

func (ur *UserService) Login(ctx context.Context, in *LoginRequest) (*LoginResponse, error) {

	var user models.User
	ur.DB.First(&user, "email = ?", in.Email)

	if user.ID == 0 {
		return nil, errors.New("unauthorized")
	}

	if in.IsSSO {
		switch in.TypeSSO {
		case "google":
			payload, err := idtoken.Validate(ctx, in.IdSSO, "")

			if err != nil {
				return nil, errors.New("unauthorized")
			}

			fmt.Println("Google token validated with claims", payload.Claims)

			if user.ID == 0 {
				user = models.User{Email: in.Email, GoogleId: in.IdSSO, Username: in.Username}
				ur.DB.Create(&user)
			} else if user.GoogleId == "" {
				user.GoogleId = in.IdSSO
				ur.DB.Save(&user)
			} else if user.GoogleId != in.IdSSO {
				return nil, errors.New("unauthorized")
			}
		}
	} else if !in.IsSSO && (user.ID == 0 || bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(in.Password)) != nil) {
		return nil, errors.New("unauthorized")
	}

	tokenString := auth.CreateTokenAuth(user.ID, user.Email)

	user.Token = tokenString
	ur.DB.Save(&user)

	return &LoginResponse{Token: tokenString, Email: user.Email}, nil
}

func (ur *UserService) Register(ctx context.Context, in *RegisterRequest) (*LoginResponse, error) {
	var user models.User
	ur.DB.First(&user, "username = ?", in.Username)

	if user.ID != 0 {
		return nil, errors.New("conflict")
	}

	hashed, _ := bcrypt.GenerateFromPassword([]byte(in.Password), 8)

	user = models.User{Username: in.Username, Password: string(hashed), Email: in.Email}
	ur.DB.Create(&user)

	tokenString := auth.CreateTokenAuth(user.ID, user.Email)

	return &LoginResponse{Token: tokenString, Email: user.Email}, nil
}

func (ur *UserService) GetMe(ctx context.Context, in *empty.Empty) (*UserResponse, error) {
	token, err := auth.GetToken(ctx)

	if err != nil {
		return nil, err
	}

	var user models.User
	ur.DB.First(&user, "id = ?", token.UserId)

	return &UserResponse{Id: uint32(user.ID), Username: user.Username, Email: user.Email}, nil
}

func (ur *UserService) UpdateMe(ctx context.Context, in *UpdateRequest) (*UserResponse, error) {
	token, err := auth.GetToken(ctx)
	if err != nil {
		return nil, errors.New("unauthorized")
	}

	var user models.User
	ur.DB.First(&user, "id = ?", token.UserId)

	if user.ID == 0 {
		return nil, errors.New("user not found")
	}

	if in.Password != "" {
		user.Password = in.Password
	}
	if in.Username != "" {
		user.Username = in.Username
	}
	if in.Email != "" {
		user.Email = in.Email
	}

	ur.DB.Save(&user)

	return &UserResponse{Id: uint32(user.ID), Username: user.Username, Email: user.Email}, nil
}
