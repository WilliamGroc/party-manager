package user

import "net/http"

func (ur *UserRoutes) GetAllUsers(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Get all users"))
}

func (ur *UserRoutes) CreateUser(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Create user"))
}

func (ur *UserRoutes) GetUser(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Get user"))
}

func (ur *UserRoutes) UpdateUser(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Update user"))
}

func (ur *UserRoutes) DeleteUser(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Delete user"))
}