package party

import "net/http"

func (ur *PartyRoutes) GetAllParties(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Get all parties"))
}

func (ur *PartyRoutes) CreateParty(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Create party"))
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