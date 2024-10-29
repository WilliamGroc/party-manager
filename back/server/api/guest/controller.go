package guest

import (
	"crypto/sha1"
	"encoding/hex"
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

	var response []GuestResponse = []GuestResponse{}
	for _, guest := range guests {
		response = append(response, GuestResponse{ID: guest.ID, Username: guest.Username, Email: guest.Email, Present: guest.Present})
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

	fmt.Println(idInt)

	id := chi.URLParam(r, "partyId")
	partyId, _ := strconv.Atoi(id)

	fmt.Println(partyId)

	var party models.Party
	ur.DB.Where(map[string]interface{}{"host_id": idInt, "id": partyId}).First(&party)

	if party.ID == 0 {
		w.WriteHeader(http.StatusNotFound)
		w.Write([]byte("Party not found"))
		return
	}

	var body AddGuestRequest
	api.DecodeBody(r, &body)

	ur.DB.Create(&models.Guest{Username: body.Username, Email: body.Email, PartyID: partyId})

	var guests []models.Guest
	ur.DB.Where("party_id = ?", partyId).Find(&guests)

	var response []GuestResponse
	for _, guest := range guests {
		response = append(response, GuestResponse{ID: guest.ID, Username: guest.Username, Email: guest.Email, Present: guest.Present})
	}

	api.EncodeBody(w, response)
}

func (ur *GuestRoutes) UpdateGuest(w http.ResponseWriter, r *http.Request) {
	token, err := auth.GetToken(&r.Header, ur.Auth.TokenAuth)

	if err != nil {
		w.WriteHeader(http.StatusUnauthorized)
		w.Write([]byte(err.Error()))
		return
	}

	user_id_s, _ := token.Get("id")
	user_id_i, _ := strconv.Atoi(fmt.Sprintf("%v", user_id_s)) // Convert id to integer

	party_id_s := chi.URLParam(r, "partyId")
	party_id_i, _ := strconv.Atoi(party_id_s)

	fmt.Printf("token: %v \n", token)
	fmt.Printf("user id: %v, party id: %v \n", user_id_i, party_id_i)
	var party models.Party
	ur.DB.Model(&models.Party{}).Joins("LEFT JOIN guests on guests.party_id = parties.id").Where("(host_id = ? OR guests.user_id = ? ) AND parties.id = ?", user_id_i, user_id_i, party_id_i).Group("parties.id").First(&party)

	if party.ID == 0 {
		w.WriteHeader(http.StatusNotFound)
		w.Write([]byte("Party not found"))
		return
	}

	guestid_s := chi.URLParam(r, "guestId")
	guest_id_i, _ := strconv.Atoi(guestid_s)

	var body UpdateGuestRequest
	api.DecodeBody(r, &body)

	var guest models.Guest
	ur.DB.Where("id = ?", guest_id_i).First(&guest)

	if guest.ID == 0 {
		w.WriteHeader(http.StatusNotFound)
		w.Write([]byte("Guest not found"))
		return
	}

	ur.DB.Model(&guest).Updates(&models.Guest{Present: body.Present})

	response := GuestResponse{
		ID:       guest.ID,
		Username: guest.Username,
		Email:    guest.Email,
		Present:  body.Present,
	}

	api.EncodeBody(w, response)
}

func (ur *GuestRoutes) DeleteGuestFromParty(w http.ResponseWriter, r *http.Request) {
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
	ur.DB.Where(map[string]interface{}{"host_id": idInt, "id": partyId}).First(&party)

	if party.ID == 0 {
		w.WriteHeader(http.StatusNotFound)
		w.Write([]byte("Party not found"))
		return
	}

	id = chi.URLParam(r, "id")
	guestId, _ := strconv.Atoi(id)

	ur.DB.Delete(&models.Guest{}, guestId)

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Guest deleted"))
}

func (ur *GuestRoutes) GetShareLink(w http.ResponseWriter, r *http.Request) {
	token, err := auth.GetToken(&r.Header, ur.Auth.TokenAuth)

	if err != nil {
		w.WriteHeader(http.StatusUnauthorized)
		w.Write([]byte(err.Error()))
		return
	}

	user_id_s, _ := token.Get("id")
	user_id_i, _ := strconv.Atoi(fmt.Sprintf("%v", user_id_s)) // Convert id to integer

	party_id_s := chi.URLParam(r, "partyId")
	party_id_i, _ := strconv.Atoi(party_id_s)

	guest_id_s := chi.URLParam(r, "guestId")
	guest_id_i, _ := strconv.Atoi(guest_id_s)

	fmt.Printf("user id: %v, party id: %v, guest id: %v \n", user_id_i, party_id_i, guest_id_i)
	var party models.Party
	ur.DB.Where(map[string]interface{}{"host_id": user_id_i, "id": party_id_i}).First(&party)

	if party.ID == 0 {
		w.WriteHeader(http.StatusNotFound)
		w.Write([]byte("Party not found"))
		return
	}

	baseLink := fmt.Sprintf("party/%d/%d", party_id_i, guest_id_i)

	hasher := sha1.New()
	hasher.Write([]byte(baseLink))

	linkToken := hex.EncodeToString(hasher.Sum(nil))

	var guest models.Guest
	ur.DB.Where("id = ?", guest_id_i).First(&guest)

	if guest.ID == 0 {
		w.WriteHeader(http.StatusNotFound)
		w.Write([]byte("Guest not found"))
		return
	}

	ur.DB.Model(&guest).Updates(&models.Guest{LinkToken: linkToken})

	api.EncodeBody(w, map[string]string{"link": linkToken})
}

func (ur *GuestRoutes) AddGuestWithLink(w http.ResponseWriter, r *http.Request) {
	token, err := auth.GetToken(&r.Header, ur.Auth.TokenAuth)

	if err != nil {
		w.WriteHeader(http.StatusUnauthorized)
		w.Write([]byte(err.Error()))
		return
	}

	userid, _ := token.Get("id")
	idInt, _ := strconv.Atoi(fmt.Sprintf("%v", userid)) // Convert id to integer

	var user models.User

	fmt.Println("user id from token: %v", idInt)
	ur.DB.Where("id = ?", idInt).First(&user)

	if user.ID == 0 {
		w.WriteHeader(http.StatusNotFound)
		w.Write([]byte("User not found"))
		return
	}

	link := chi.URLParam(r, "link")

	var guest models.Guest
	ur.DB.Where("link_token = ?", link).First(&guest)

	if guest.ID == 0 {
		w.WriteHeader(http.StatusNotFound)
		w.Write([]byte("Invalid link"))
		return
	}

	guest.LinkToken = ""
	guest.UserID = idInt
	guest.Email = user.Email
	guest.Username = user.Username

	ur.DB.Save(&guest)

	api.EncodeBody(w, GuestResponse{
		ID:       guest.ID,
		Username: guest.Username,
		Email:    guest.Email,
		Present:  guest.Present,
		UserId:   guest.UserID,
	})
}
