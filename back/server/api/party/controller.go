package party

import (
	"fmt"
	"net/http"
	"partymanager/server/api"
	"partymanager/server/auth"
	"partymanager/server/models"
	"strconv"
	"time"

	"github.com/go-chi/chi/v5"
)

func (ur *PartyRoutes) GetAllParty(w http.ResponseWriter, r *http.Request) {
	token, err := auth.GetToken(&r.Header, ur.Auth.TokenAuth)

	if err != nil {
		w.WriteHeader(http.StatusUnauthorized)
		w.Write([]byte(err.Error()))
		return
	}

	id, _ := token.Get("id")
	idInt, _ := strconv.Atoi(fmt.Sprintf("%v", id)) // Convert id to integer

	var parties []models.Party

	ur.DB.Not("deleted_at IS NOT NULL").Where("host_id = ?", idInt).Find(&parties)

	var response []PartyResponse

	for _, party := range parties {
		response = append(response, PartyResponse{ID: party.ID, Name: party.Name, Description: party.Description, Location: party.Location, Date: party.Date.String(), HostID: party.HostID})
	}

	api.EncodeBody(w, response)
}

func (ur *PartyRoutes) CreateParty(w http.ResponseWriter, r *http.Request) {
	token, err := auth.GetToken(&r.Header, ur.Auth.TokenAuth)

	if err != nil {
		w.WriteHeader(http.StatusUnauthorized)
		w.Write([]byte(err.Error()))
		return
	}

	id, _ := token.Get("id")
	idInt, _ := strconv.Atoi(fmt.Sprintf("%v", id)) // Convert id to integer

	var body CreatePartyRequest
	api.DecodeBody(r, &body)

	date, err := time.Parse("2006-01-02 15:04:05 -0700", body.Date)

	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(err.Error()))
		return
	}

	party := models.Party{
		Name:        body.Name,
		Description: body.Description,
		Location:    body.Location,
		Date:        date,
		HostID:      idInt, // Use the converted integer value
	}

	ur.DB.Create(&party)

	api.EncodeBody(w, PartyResponse{ID: party.ID, Name: party.Name, Description: party.Description, Location: party.Location, Date: party.Date.String(), HostID: party.HostID})
}

func (ur *PartyRoutes) GetParty(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")

	var party models.Party

	ur.DB.First(&party, id)

	api.EncodeBody(w, PartyResponse{ID: party.ID, Name: party.Name, Description: party.Description, Location: party.Location, Date: party.Date.String(), HostID: party.HostID})
}

func (ur *PartyRoutes) UpdateParty(w http.ResponseWriter, r *http.Request) {
	token, err := auth.GetToken(&r.Header, ur.Auth.TokenAuth)

	if err != nil {
		w.WriteHeader(http.StatusUnauthorized)
		w.Write([]byte(err.Error()))
		return
	}

	userid, _ := token.Get("id")
	idInt, _ := strconv.Atoi(fmt.Sprintf("%v", userid)) // Convert id to integer

	id := chi.URLParam(r, "id")
	partyId, _ := strconv.Atoi(id)

	var party models.Party
	ur.DB.Where(map[string]interface{}{"HostID": idInt, "ID": partyId}).First(&party)

	if party.ID == 0 {
		w.WriteHeader(http.StatusNotFound)
		w.Write([]byte("Party not found"))
		return
	}

	var body UpdatePartyRequest
	api.DecodeBody(r, &body)

	date, err := time.Parse("2006-01-02 03:04:05 -0700", body.Date)

	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(err.Error()))
		return
	}

	if body.Name != "" {
		party.Name = body.Name
	}
	if body.Description != "" {
		party.Description = body.Description
	}
	if body.Location != "" {
		party.Location = body.Location
	}
	if body.Date != "" {
		party.Date = date
	}

	ur.DB.Save(&party)

	api.EncodeBody(w, PartyResponse{ID: party.ID, Name: party.Name, Description: party.Description, Location: party.Location, Date: party.Date.String(), HostID: party.HostID})
}

func (ur *PartyRoutes) DeleteParty(w http.ResponseWriter, r *http.Request) {
	token, err := auth.GetToken(&r.Header, ur.Auth.TokenAuth)

	if err != nil {
		w.WriteHeader(http.StatusUnauthorized)
		w.Write([]byte(err.Error()))
		return
	}

	userid, _ := token.Get("id")
	idInt, _ := strconv.Atoi(fmt.Sprintf("%v", userid)) // Convert id to integer

	id := chi.URLParam(r, "id")
	partyId, _ := strconv.Atoi(id)

	var party models.Party
	party.ID = uint(partyId)
	party.HostID = idInt

	ur.DB.First(&party)

	if party.ID == 0 {
		w.WriteHeader(http.StatusNotFound)
		w.Write([]byte("Party not found"))
		return
	}

	ur.DB.Model(&models.Party{}).Where("id  = ?", partyId).Update("deleted_at", time.Now())

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Party deleted"))
}
