package api

import (
	"encoding/json"
	"errors"
	"net/http"

	"github.com/go-playground/validator"
)

func DecodeBody(r *http.Request, v interface{}) error {
	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(&v)
	if err != nil {
		return errors.New("bad body")
	}

	validate := validator.New()
	err = validate.Struct(v)
	if err != nil {
		return errors.New("invalid body")
	}

	return nil
}

func EncodeBody(w http.ResponseWriter, v interface{}) error {
	w.Header().Set("Content-Type", "application/json")
	err := json.NewEncoder(w).Encode(v)
	if err != nil {
		return errors.New("could not encode body")
	}

	return nil
}
