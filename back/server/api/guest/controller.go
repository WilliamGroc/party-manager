package guest

import "net/http"

func (ur *GuestRoutes) GetAllGuest(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Get all guest"))
}

func (ur *GuestRoutes) CreateGuest(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Create guest"))
}

func (ur *GuestRoutes) GetGuest(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Get guest"))
}

func (ur *GuestRoutes) UpdateGuest(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Update guest"))
}

func (ur *GuestRoutes) DeleteGuest(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Delete guest"))
}
