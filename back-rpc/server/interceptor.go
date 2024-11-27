package server

import (
	"context"
	"fmt"
	"partymanager/server/auth"
	"slices"
	"strings"
	"time"

	"google.golang.org/grpc"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/metadata"
	"google.golang.org/grpc/status"
)

func requestLogger(ctx context.Context, req interface{}, info *grpc.UnaryServerInfo, handler grpc.UnaryHandler) (interface{}, error) {
	fmt.Printf("[%s] %s\n", time.Now().Format("2006-01-02 15:04:05"), info.FullMethod)
	resp, err := handler(ctx, req)

	if err != nil {
		fmt.Printf("[%s] Error - Method: %s, Response: %v\n", time.Now().Format("2006-01-02 15:04:05"), info.FullMethod, err)
	}
	return resp, err
}

var (
	errMissingMetadata = status.Errorf(codes.InvalidArgument, "missing metadata")
	errInvalidToken    = status.Errorf(codes.Unauthenticated, "invalid token")
)

func valid(authorization []string) bool {
	if len(authorization) < 1 {
		return false
	}
	token := strings.TrimPrefix(authorization[0], "Bearer ")
	return auth.ValidateToken(token)
}

var validationExceptions = []string{
	"/user.User/Login",
	"/user.User/Register",
}

// ensureValidToken ensures a valid token exists within a request's metadata. If
// the token is missing or invalid, the interceptor blocks execution of the
// handler and returns an error. Otherwise, the interceptor invokes the unary
// handler.
func ensureValidToken(ctx context.Context, req any, info *grpc.UnaryServerInfo, handler grpc.UnaryHandler) (any, error) {
	md, ok := metadata.FromIncomingContext(ctx)

	if !ok {
		return nil, errMissingMetadata
	}

	if !slices.Contains(validationExceptions, info.FullMethod) {
		if !valid(md["authorization"]) {
			return nil, errInvalidToken
		}
	}

	return requestLogger(ctx, req, info, handler)
}

func Interceptor() grpc.ServerOption {
	return grpc.UnaryInterceptor(ensureValidToken)
}
