package server

import (
	"context"
	"fmt"
	"os"
	"strings"
	"time"

	"google.golang.org/grpc"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/metadata"
	"google.golang.org/grpc/status"
)

var (
	errMissingMetadata = status.Errorf(codes.InvalidArgument, "missing metadata")
	errInvalidApiKey   = status.Errorf(codes.Unauthenticated, "invalid api key")
)

func validateApiKey(ctx context.Context) error {
	md, ok := metadata.FromIncomingContext(ctx)
	if !ok {
		return errMissingMetadata
	}

	apiKey := md["api-key"]

	if len(apiKey) == 0 || !strings.Contains(os.Getenv("API_KEYS"), apiKey[0]) {
		return errInvalidApiKey
	}

	return nil
}

func middleware(ctx context.Context, req any, info *grpc.UnaryServerInfo, handler grpc.UnaryHandler) (any, error) {
	fmt.Printf("[%s] %s\n", time.Now().Format("2006-01-02 15:04:05"), info.FullMethod)

	if validateApiKey(ctx) != nil {
		return nil, errInvalidApiKey
	}

	resp, err := handler(ctx, req)

	if err != nil {
		fmt.Printf("[%s] Error - Method: %s, Response: %v\n", time.Now().Format("2006-01-02 15:04:05"), info.FullMethod, err)
	}

	return resp, err
}

func Interceptor() grpc.ServerOption {
	return grpc.UnaryInterceptor(middleware)
}
