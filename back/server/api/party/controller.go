package party

import (
	"fmt"
	"net/http"
	"partymanager/server/api"
	"partymanager/server/auth"
	"partymanager/server/models"
	"strconv"
	"time"
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

	ur.DB.Find(&parties, "host_id = ?", idInt)

	
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

	date, err := time.Parse("2006-01-02 03:04:05 -0700", body.Date)

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
	w.Write([]byte("Get party"))
}

func (ur *PartyRoutes) UpdateParty(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Update party"))
}

func (ur *PartyRoutes) DeleteParty(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Delete party"))
}
