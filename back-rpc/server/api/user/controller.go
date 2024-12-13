package user

import (
	context "context"
	"partymanager/server/models"

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
		user = models.User{Email: in.Email, Username: in.Username}
		ur.DB.Save(&user)
	} else {
		ur.DB.Model(&user).Update("username", in.Username)
	}

	return &LoginResponse{Id: uint32(user.ID), Email: user.Email}, nil
}

func (ur *UserService) GetMe(ctx context.Context, in *MeRequest) (*UserResponse, error) {
	var user models.User
	ur.DB.First(&user, "id = ?", in.Id)

	return &UserResponse{Id: uint32(user.ID), Username: user.Username, Email: user.Email}, nil
}
