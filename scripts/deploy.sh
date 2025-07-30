#!/bin/bash

# POS System Deployment Script
# Usage: ./deploy.sh [environment] [method]

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Default values
ENVIRONMENT=${1:-production}
METHOD=${2:-docker}

# Configuration
REGISTRY="ghcr.io"
IMAGE_NAME="your-username/pos-system"
TAG=$(git rev-parse --short HEAD)

# Functions
log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

check_prerequisites() {
    log_info "Checking prerequisites..."
    
    # Check if Docker is installed
    if ! command -v docker &> /dev/null; then
        log_error "Docker is not installed"
        exit 1
    fi
    
    # Check if docker-compose is installed
    if ! command -v docker-compose &> /dev/null; then
        log_error "Docker Compose is not installed"
        exit 1
    fi
    
    # Check if kubectl is installed (for Kubernetes deployment)
    if [ "$METHOD" = "kubernetes" ] && ! command -v kubectl &> /dev/null; then
        log_error "kubectl is not installed"
        exit 1
    fi
    
    log_info "Prerequisites check passed"
}

build_images() {
    log_info "Building Docker images..."
    
    # Build backend image
    log_info "Building backend image..."
    docker build -t $REGISTRY/$IMAGE_NAME/backend:$TAG ./POS-System
    docker tag $REGISTRY/$IMAGE_NAME/backend:$TAG $REGISTRY/$IMAGE_NAME/backend:latest
    
    # Build frontend image
    log_info "Building frontend image..."
    docker build -t $REGISTRY/$IMAGE_NAME/frontend:$TAG ./frontend
    docker tag $REGISTRY/$IMAGE_NAME/frontend:$TAG $REGISTRY/$IMAGE_NAME/frontend:latest
    
    log_info "Images built successfully"
}

push_images() {
    log_info "Pushing Docker images to registry..."
    
    # Login to registry (if needed)
    if [ "$ENVIRONMENT" = "production" ]; then
        echo $GITHUB_TOKEN | docker login $REGISTRY -u $GITHUB_USERNAME --password-stdin
    fi
    
    # Push backend image
    docker push $REGISTRY/$IMAGE_NAME/backend:$TAG
    docker push $REGISTRY/$IMAGE_NAME/backend:latest
    
    # Push frontend image
    docker push $REGISTRY/$IMAGE_NAME/frontend:$TAG
    docker push $REGISTRY/$IMAGE_NAME/frontend:latest
    
    log_info "Images pushed successfully"
}

deploy_docker() {
    log_info "Deploying with Docker Compose..."
    
    # Set environment variables
    export REGISTRY=$REGISTRY
    export IMAGE_NAME=$IMAGE_NAME
    export TAG=$TAG
    
    # Deploy based on environment
    if [ "$ENVIRONMENT" = "production" ]; then
        docker-compose -f docker-compose.production.yml up -d
    else
        docker-compose up -d
    fi
    
    log_info "Docker deployment completed"
}

deploy_kubernetes() {
    log_info "Deploying to Kubernetes..."
    
    # Create namespace
    kubectl apply -f k8s/namespace.yaml
    
    # Apply PostgreSQL resources
    kubectl apply -f k8s/postgres-configmap.yaml
    kubectl apply -f k8s/postgres-secret.yaml
    kubectl apply -f k8s/postgres-deployment.yaml
    
    # Wait for PostgreSQL to be ready
    log_info "Waiting for PostgreSQL to be ready..."
    kubectl wait --for=condition=ready pod -l app=postgres -n pos-system --timeout=300s
    
    # Apply backend deployment
    kubectl apply -f k8s/backend-deployment.yaml
    
    # Apply frontend deployment
    kubectl apply -f k8s/frontend-deployment.yaml
    
    log_info "Kubernetes deployment completed"
}

health_check() {
    log_info "Performing health checks..."
    
    if [ "$METHOD" = "docker" ]; then
        # Check if containers are running
        if docker-compose ps | grep -q "Up"; then
            log_info "All containers are running"
        else
            log_error "Some containers are not running"
            exit 1
        fi
    else
        # Check Kubernetes pods
        if kubectl get pods -n pos-system | grep -q "Running"; then
            log_info "All pods are running"
        else
            log_error "Some pods are not running"
            exit 1
        fi
    fi
    
    log_info "Health checks passed"
}

# Main deployment flow
main() {
    log_info "Starting POS System deployment..."
    log_info "Environment: $ENVIRONMENT"
    log_info "Method: $METHOD"
    
    check_prerequisites
    
    if [ "$METHOD" = "docker" ]; then
        build_images
        if [ "$ENVIRONMENT" = "production" ]; then
            push_images
        fi
        deploy_docker
    elif [ "$METHOD" = "kubernetes" ]; then
        build_images
        push_images
        deploy_kubernetes
    else
        log_error "Invalid deployment method: $METHOD"
        exit 1
    fi
    
    health_check
    
    log_info "Deployment completed successfully!"
}

# Run main function
main "$@" 