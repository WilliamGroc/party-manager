package guest

import (
	"fmt"
	"net/http"
	"partymanager/server/api"
	"partymanager/server/auth"
	"partymanager/server/models"
	"strconv"

	"github.com/go-chi/chi/v5"
)

func (ur *GuestRoutes) GetAllGuestFromParty(w http.ResponseWriter, r *http.Request) {
	token, err := auth.GetToken(&r.Header, ur.Auth.TokenAuth)

	if err != nil {
		w.WriteHeader(http.StatusUnauthorized)
		w.Write([]byte(err.Error()))
		return
	}

	userid, _ := token.Get("id")
	idInt, _ := strconv.Atoi(fmt.Sprintf("%v", userid)) // Convert id to integer

	id := chi.URLParam(r, "partyId")
	partyId, _ := strconv.Atoi(id)

	var party models.Party
	ur.DB.Where(map[string]interface{}{"HostID": idInt, "ID": partyId}).First(&party)

	if party.ID == 0 {
		w.WriteHeader(http.StatusNotFound)
		w.Write([]byte("Party not found"))
		return
	}

	var guests []models.Guest
	ur.DB.Where("party_id = ?", partyId).Find(&guests)

	var response []GuestResponse
	for _, guest := range guests {
		response = append(response, GuestResponse{ID: guest.ID, Name: guest.Username, Email: guest.Email, PartyID: guest.PartyID})
	}

	api.EncodeBody(w, response)
}

func (ur *GuestRoutes) AddGuestToParty(w http.ResponseWriter, r *http.Request) {
	token, err := auth.GetToken(&r.Header, ur.Auth.TokenAuth)

	if err != nil {
		w.WriteHeader(http.StatusUnauthorized)
		w.Write([]byte(err.Error()))
		return
	}

	userid, _ := token.Get("id")
	idInt, _ := strconv.Atoi(fmt.Sprintf("%v", userid)) // Convert id to integer

	id := chi.URLParam(r, "partyId")
	partyId, _ := strconv.Atoi(id)

	var party models.Party
	ur.DB.Where(map[string]interface{}{"HostID": idInt, "ID": partyId}).First(&party)

	if party.ID == 0 {
		w.WriteHeader(http.StatusNotFound)
		w.Write([]byte("Party not found"))
		return
	}

	var body []AddGuestRequest
	api.DecodeBody(r, &body)

	for _, guest := range body {
		ur.DB.Create(&models.Guest{Username: guest.Username, Email: guest.Email, PartyID: partyId})
	}

	var guests []models.Guest
	ur.DB.Where("party_id = ?", partyId).Find(&guests)

	var response []GuestResponse
	for _, guest := range guests {
		response = append(response, GuestResponse{ID: guest.ID, Name: guest.Username, Email: guest.Email, PartyID: guest.PartyID})
	}

	api.EncodeBody(w, response)
}

func (ur *GuestRoutes) UpdateGuest(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Update guest"))
}

func (ur *GuestRoutes) DeleteGuestFromParty(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Delete guest"))
}
