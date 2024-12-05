package guest

import (
	"crypto/sha1"
	"encoding/hex"
	"errors"
	"fmt"
	"partymanager/server/auth"
	"partymanager/server/models"
	"strconv"

	empty "github.com/golang/protobuf/ptypes/empty"
	"golang.org/x/net/context"
	"gorm.io/gorm"
)

type GuestService struct {
	DB *gorm.DB
	UnimplementedGuestServer
}

func NewGuestService(db *gorm.DB) *GuestService {
	return &GuestService{
		DB: db,
	}
}

func (ur *GuestService) GetAllGuestFromParty(ctx context.Context, in *GetAllGuestFromRequest) (*GuestsResponse, error) {
	token, err := auth.GetToken(ctx)

	if err != nil {
		return nil, err
	}

	user_id_i, _ := strconv.Atoi(fmt.Sprintf("%v", token.UserId)) // Convert id to integer

	var party models.Party
	ur.DB.Where(map[string]interface{}{"HostID": user_id_i, "ID": in.PartyId}).First(&party)

	if party.ID == 0 {
		return nil, errors.New("party not found")
	}

	var guests []models.Guest
	ur.DB.Where("party_id = ?", in.PartyId).Find(&guests)

	var response []*GuestResponse = []*GuestResponse{}
	for _, guest := range guests {
		response = append(response, &GuestResponse{Id: uint32(guest.ID), Username: guest.Username, Email: guest.Email, Present: guest.Present})
	}

	return &GuestsResponse{
		Guests: response,
	}, nil
}

func (ur *GuestService) AddGuestToParty(ctx context.Context, in *AddGuestRequest) (*GuestsResponse, error) {
	token, err := auth.GetToken(ctx)

	if err != nil {
		return nil, err
	}

	user_id_i, _ := strconv.Atoi(fmt.Sprintf("%v", token.UserId)) // Convert id to integer

	var party models.Party
	ur.DB.Where(map[string]interface{}{"host_id": user_id_i, "id": in.PartyId}).First(&party)

	if party.ID == 0 {
		return nil, errors.New("party not found")
	}

	ur.DB.Create(&models.Guest{Username: in.Username, PartyID: int(in.PartyId)})

	var guests []models.Guest
	ur.DB.Where("party_id = ?", in.PartyId).Find(&guests)

	var response []*GuestResponse
	for _, guest := range guests {
		response = append(response, &GuestResponse{Id: uint32(guest.ID), Username: guest.Username, Email: guest.Email, Present: guest.Present})
	}

	return &GuestsResponse{
		Guests: response,
	}, nil
}

func (ur *GuestService) UpdateGuest(ctx context.Context, in *UpdateGuestRequest) (*GuestResponse, error) {
	token, err := auth.GetToken(ctx)

	var user_id_i int = 0

	if err == nil {
		user_id_i, _ = strconv.Atoi(fmt.Sprintf("%v", token.UserId)) // Convert id to integer
	}

	var party models.Party
	var query = ur.DB.Model(&models.Party{}).Joins("LEFT JOIN guests on guests.party_id = parties.id")

	if user_id_i == 0 {
		query.Where("guests.link_token = ?", in.Link).Group("parties.id").First(&party)
	} else {
		query.Where("(host_id = ? OR guests.user_id = ? ) AND parties.id = ?", user_id_i, user_id_i, in.PartyId).Group("parties.id").First(&party)
	}

	if party.ID == 0 {
		return nil, errors.New("party not found")
	}

	var guest models.Guest
	ur.DB.Where("id = ?", in.GuestId).First(&guest)

	if guest.ID == 0 {
		return nil, errors.New("guest not found")
	}

	ur.DB.Model(&guest).Updates(&models.Guest{Present: in.Present})

	response := GuestResponse{
		Id:       uint32(guest.ID),
		Username: guest.Username,
		Email:    guest.Email,
		Present:  in.Present,
	}

	return &response, nil
}

func (ur *GuestService) DeleteGuestFromParty(ctx context.Context, in *GuestRequest) (*empty.Empty, error) {
	token, err := auth.GetToken(ctx)

	if err != nil {
		return nil, err
	}

	user_id_i, _ := strconv.Atoi(fmt.Sprintf("%v", token.UserId)) // Convert id to integer

	var party models.Party
	ur.DB.Where(map[string]interface{}{"host_id": user_id_i, "id": in.PartyId}).First(&party)

	if party.ID == 0 {
		return nil, errors.New("party not found")
	}

	ur.DB.Delete(&models.Guest{}, in.GuestId)

	return &empty.Empty{}, nil
}

func (ur *GuestService) GetShareLink(ctx context.Context, in *GuestRequest) (*LinkQuery, error) {
	token, err := auth.GetToken(ctx)

	if err != nil {
		return nil, err
	}

	user_id_i, _ := strconv.Atoi(fmt.Sprintf("%v", token.UserId)) // Convert id to integer

	var party models.Party
	ur.DB.Where(map[string]interface{}{"host_id": user_id_i, "id": in.PartyId}).First(&party)

	if party.ID == 0 {
		return nil, errors.New("party not found")
	}

	base_link := fmt.Sprintf("party/%d/%d", in.PartyId, in.GuestId)

	hasher := sha1.New()
	hasher.Write([]byte(base_link))

	link_token := hex.EncodeToString(hasher.Sum(nil))

	var guest models.Guest
	ur.DB.Where("id = ?", in.GuestId).First(&guest)

	if guest.ID == 0 {
		return nil, errors.New("guest not found")
	}

	ur.DB.Model(&guest).Updates(&models.Guest{LinkToken: link_token})

	return &LinkQuery{Link: link_token}, nil
}

func (ur *GuestService) AddGuestWithLink(ctx context.Context, in *LinkQuery) (*GuestResponse, error) {
	token, err := auth.GetToken(ctx)

	if err != nil {
		return nil, err
	}

	user_id_i, _ := strconv.Atoi(fmt.Sprintf("%v", token.UserId)) // Convert id to integer

	var user models.User

	ur.DB.Where("id = ?", user_id_i).First(&user)

	if user.ID == 0 {
		return nil, errors.New("user not found")
	}

	var guest models.Guest
	ur.DB.Where("link_token = ?", in.Link).First(&guest)

	if guest.ID == 0 {
		return nil, errors.New("invalid link")
	}

	guest.LinkToken = ""
	guest.UserID = user_id_i
	guest.Email = user.Email
	guest.Username = user.Username

	ur.DB.Save(&guest)

	return &GuestResponse{
		Id:       uint32(guest.ID),
		Username: guest.Username,
		Email:    guest.Email,
		Present:  guest.Present,
		UserId:   uint32(guest.UserID),
	}, nil
}
