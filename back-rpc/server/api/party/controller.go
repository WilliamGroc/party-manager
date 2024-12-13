package party

import (
	context "context"
	"errors"
	"partymanager/server/models"
	"time"

	"partymanager/server/api/guest"

	empty "github.com/golang/protobuf/ptypes/empty"
	"gorm.io/gorm"
)

type PartyService struct {
	DB *gorm.DB
	UnimplementedPartyServer
}

func NewPartyService(db *gorm.DB) *PartyService {
	return &PartyService{DB: db}
}

func (ur *PartyService) GetAllParty(ctx context.Context, in *GetAllRequest) (*PartiesResponse, error) {
	var parties []models.Party

	ur.DB.Model(&models.Party{}).Joins("LEFT JOIN guests on guests.party_id = parties.id").Not("deleted_at IS NOT NULL").Where("host_id = ?", in.UserId).Or("guests.user_id = ?", in.UserId).Group("parties.id").Find(&parties)

	var response = []*PartyResponse{}

	for _, party := range parties {
		response = append(response, &PartyResponse{Id: uint32(party.ID), Name: party.Name, Description: party.Description, Location: party.Location, Date: party.Date.String(), HostId: uint32(party.HostID)})
	}

	return &PartiesResponse{Parties: response}, nil
}

func (ur *PartyService) CreateParty(ctx context.Context, in *CreatePartyRequest) (*CreatePartyResponse, error) {
	// date, err := time.Parse("2006-01-02T15:04", body.Date)
	date, err := time.Parse("2006-01-02 15:04:05 -0700", in.Date)

	if err != nil {
		return nil, err
	}

	party := models.Party{
		Name:        in.Name,
		Description: in.Description,
		Location:    in.Location,
		Date:        date,
		HostID:      uint(in.UserId),
	}

	ur.DB.Create(&party)

	return &CreatePartyResponse{Id: uint32(party.ID)}, nil
}

func (ur *PartyService) GetParty(ctx context.Context, in *GetRequest) (*PartyResponse, error) {
	var party models.Party
	ur.DB.Model(&models.Party{}).Joins("LEFT JOIN guests on guests.party_id = parties.id").Where("(host_id = ? OR guests.user_id = ?) AND parties.id = ?", in.UserId, in.UserId, in.Id).Group("parties.id").First(&party)

	if party.ID == 0 {
		return nil, errors.New("party not found")
	}

	var guests []models.Guest
	ur.DB.Where("party_id = ?", in.Id).Order("id asc").Find(&guests)

	var guestList []*guest.GuestResponse = []*guest.GuestResponse{}
	for _, guestItem := range guests {
		guestList = append(guestList, &guest.GuestResponse{
			Id:       uint32(guestItem.ID),
			Username: guestItem.Username,
			Email:    guestItem.Email,
			Present:  guestItem.Present,
			UserId:   uint32(guestItem.UserID),
		})
	}

	return &PartyResponse{
		Id:          uint32(party.ID),
		Name:        party.Name,
		Description: party.Description,
		Location:    party.Location,
		Date:        party.Date.String(),
		HostId:      uint32(party.HostID),
		Guests:      guestList,
	}, nil
}

func (ur *PartyService) UpdateParty(ctx context.Context, in *UpdatePartyRequest) (*PartyResponse, error) {
	var party models.Party
	ur.DB.Where(map[string]interface{}{"host_id": in.UserId, "id": in.Id}).First(&party)

	if party.ID == 0 {
		return nil, errors.New("party not found")
	}

	// date, err := time.Parse("2006-01-02T15:04", body.Date)
	date, err := time.Parse("2006-01-02 15:04:05 -0700", in.Date)

	if err != nil {
		return nil, err
	}

	if in.Name != "" {
		party.Name = in.Name
	}
	if in.Description != "" {
		party.Description = in.Description
	}
	if in.Location != "" {
		party.Location = in.Location
	}
	if in.Date != "" {
		party.Date = date
	}

	ur.DB.Save(&party)

	return &PartyResponse{
		Id:          uint32(party.ID),
		Name:        party.Name,
		Description: party.Description,
		Location:    party.Location,
		Date:        party.Date.String(),
		HostId:      uint32(party.HostID),
	}, nil
}

func (ur *PartyService) DeleteParty(ctx context.Context, in *GetRequest) (*empty.Empty, error) {
	var party models.Party
	party.ID = uint(in.Id)
	party.HostID = uint(in.UserId)

	ur.DB.First(&party)

	if party.ID == 0 {
		return nil, errors.New("party not found")
	}

	ur.DB.Model(&models.Party{}).Where("id  = ?", in.Id).Update("deleted_at", time.Now())

	return &empty.Empty{}, nil
}

func (ur *PartyService) GetSharedParty(ctx context.Context, in *GetSharedRequest) (*PartyResponse, error) {

	var currentGuest models.Guest
	ur.DB.Where("link_token = ?", in.Link).First(&currentGuest)

	if currentGuest.ID == 0 {
		return nil, errors.New("guest not found")
	}

	var party models.Party
	ur.DB.Where("id = ?", currentGuest.PartyID).First(&party)

	if party.ID == 0 {
		return nil, errors.New("party not found")
	}

	var guestsList []*guest.GuestResponse = []*guest.GuestResponse{}
	guestsList = append(guestsList, &guest.GuestResponse{
		Id:       uint32(currentGuest.ID),
		Username: currentGuest.Username,
		Email:    currentGuest.Email,
		Present:  currentGuest.Present,
		UserId:   uint32(currentGuest.UserID),
	})

	return &PartyResponse{
		Id:          uint32(party.ID),
		Name:        party.Name,
		Description: party.Description,
		Location:    party.Location,
		Date:        party.Date.String(),
		HostId:      uint32(party.HostID),
		Guests:      guestsList,
	}, nil
}
