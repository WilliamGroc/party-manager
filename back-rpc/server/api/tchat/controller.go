package tchat

import (
	context "context"
	"partymanager/server/models"
	"time"

	"gorm.io/gorm"
)

type TchatService struct {
	DB *gorm.DB
	UnimplementedTchatServer
}

func NewTchatService(db *gorm.DB) *TchatService {
	return &TchatService{DB: db}
}

func (ts *TchatService) AddMessage(ctx context.Context, in *AddMessageRequest) (*AddMessageResponse, error) {
	tchat := models.Tchat{Content: in.Content, AuthorID: uint(in.UserId), PartyID: uint(in.PartyId)}
	ts.DB.Save(&tchat)

	return &AddMessageResponse{Message: &Message{
		Id:        uint32(tchat.ID),
		Content:   tchat.Content,
		UserId:    uint32(tchat.AuthorID),
		UserName:  tchat.Author.Username,
		CreatedAt: tchat.CreatedAt.Format("2006-01-02 15:04:05 -0700"),
	}}, nil
}

func (ts *TchatService) GetMessages(ctx context.Context, in *GetMessagesRequest) (*GetMessagesResponse, error) {
	var tchats []struct {
		ID        uint
		Content   string
		Username  string
		AuthorID  uint
		CreatedAt time.Time
	}
	ts.DB.Table("tchats").
		Where("party_id = ?", in.PartyId).
		Joins("inner join users on users.id = tchats.author_id").
		Select("tchats.id", "content", "users.username", "author_id", "tchats.created_at").
		Order("tchats.created_at").
		Find(&tchats)

	var messages []*Message
	for _, tchat := range tchats {
		messages = append(messages, &Message{
			Id:        uint32(tchat.ID),
			Content:   tchat.Content,
			UserId:    uint32(tchat.AuthorID),
			UserName:  tchat.Username,
			CreatedAt: tchat.CreatedAt.Format("2006-01-02 15:04:05 -0700"),
		})
	}

	return &GetMessagesResponse{Messages: messages}, nil
}
