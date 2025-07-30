# 🚀 POS System Deployment Guide

This guide covers multiple deployment strategies for your POS System, from simple Docker Compose to full Kubernetes orchestration.

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Quick Start](#quick-start)
3. [GitHub Actions CI/CD](#github-actions-cicd)
4. [Docker Compose Deployment](#docker-compose-deployment)
5. [Kubernetes Deployment](#kubernetes-deployment)
6. [Manual Deployment](#manual-deployment)
7. [Environment Configuration](#environment-configuration)
8. [Monitoring & Health Checks](#monitoring--health-checks)
9. [Troubleshooting](#troubleshooting)

## 🔧 Prerequisites

### Required Software

- **Docker** (20.10+)
- **Docker Compose** (2.0+)
- **Git** (2.30+)
- **Java 17** (for local development)
- **Node.js 18** (for local development)

### Optional Software

- **kubectl** (for Kubernetes deployment)
- **Helm** (for Kubernetes package management)
- **Minikube** (for local Kubernetes testing)

### GitHub Setup

1. Create a GitHub repository
2. Set up GitHub Actions secrets:
   - `GITHUB_TOKEN` (automatically available)
   - `DOCKER_REGISTRY_TOKEN` (if using external registry)

## ⚡ Quick Start

### 1. Clone and Setup

```bash
git clone https://github.com/your-username/pos-system.git
cd pos-system
cp env.example .env
# Edit .env with your configuration
```

### 2. Local Development

```bash
# Start database
docker-compose up -d db

# Start backend
cd POS-System
./mvnw spring-boot:run

# Start frontend (in new terminal)
cd frontend
npm install
npm start
```

### 3. Production Deployment

```bash
# Using Docker Compose
./scripts/deploy.sh production docker

# Using Kubernetes
./scripts/deploy.sh production kubernetes
```

## 🔄 GitHub Actions CI/CD

The CI/CD pipeline automatically:

- ✅ Builds and tests both frontend and backend
- ✅ Creates Docker images
- ✅ Pushes to GitHub Container Registry
- ✅ Deploys to staging (develop branch)
- ✅ Deploys to production (main branch)

### Pipeline Features

- **Multi-stage builds** for optimized images
- **Caching** for faster builds
- **Health checks** for all services
- **Security scanning** (can be added)
- **Rollback capability** (manual)

### Setup Steps

1. **Push to GitHub**: Your code is automatically built on push
2. **Configure Secrets**: Add any required secrets in GitHub repository settings
3. **Set up Environments**: Create `staging` and `production` environments in GitHub
4. **Deploy**: Merging to `main` triggers production deployment

## 🐳 Docker Compose Deployment

### Development Environment

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Production Environment

```bash
# Deploy with production configuration
docker-compose -f docker-compose.production.yml up -d

# Scale services
docker-compose -f docker-compose.production.yml up -d --scale backend=3 --scale frontend=2
```

### Environment Variables

Create a `.env` file based on `env.example`:

```bash
cp env.example .env
# Edit .env with your production values
```

## ☸️ Kubernetes Deployment

### Prerequisites

```bash
# Install kubectl
# Install a Kubernetes cluster (Minikube, GKE, EKS, etc.)
# Configure kubectl to point to your cluster
```

### Deploy to Kubernetes

```bash
# Create namespace and deploy all resources
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/

# Check deployment status
kubectl get pods -n pos-system
kubectl get services -n pos-system
```

### Scaling

```bash
# Scale backend to 3 replicas
kubectl scale deployment backend --replicas=3 -n pos-system

# Scale frontend to 2 replicas
kubectl scale deployment frontend --replicas=2 -n pos-system
```

### Ingress Setup

1. Install NGINX Ingress Controller
2. Update `k8s/frontend-deployment.yaml` with your domain
3. Apply the ingress configuration

## 🛠️ Manual Deployment

### Backend Deployment

```bash
# Build JAR
cd POS-System
./mvnw clean package -DskipTests

# Run with Docker
docker build -t pos-backend .
docker run -p 8080:8080 pos-backend

# Run with Java
java -jar target/POS-System-0.0.1-SNAPSHOT.jar
```

### Frontend Deployment

```bash
# Build static files
cd frontend
npm run build

# Serve with nginx
docker build -t pos-frontend .
docker run -p 80:80 pos-frontend

# Or serve with any web server
npx serve -s build -l 3000
```

## ⚙️ Environment Configuration

### Development

```bash
# Database
POSTGRES_USER=aashiq
POSTGRES_PASSWORD=password
POSTGRES_DB=pos_system

# Backend
SPRING_PROFILES_ACTIVE=development
SERVER_PORT=8080
```

### Production

```bash
# Database (use strong passwords)
POSTGRES_USER=pos_user
POSTGRES_PASSWORD=your_secure_password
POSTGRES_DB=pos_system

# Backend
SPRING_PROFILES_ACTIVE=production
SERVER_PORT=8080

# Security
SSL_ENABLED=true
CORS_ORIGINS=https://yourdomain.com
```

### Environment-Specific Files

- `application-dev.properties` - Development configuration
- `application-prod.properties` - Production configuration
- `docker-compose.yml` - Development Docker setup
- `docker-compose.production.yml` - Production Docker setup

## 📊 Monitoring & Health Checks

### Health Check Endpoints

- **Backend**: `http://localhost:8080/actuator/health`
- **Frontend**: `http://localhost:80/health`
- **Database**: PostgreSQL connection check

### Monitoring Setup

```bash
# Add Prometheus monitoring
docker-compose -f docker-compose.production.yml -f docker-compose.monitoring.yml up -d

# View Grafana dashboard
# Access at http://localhost:3000 (admin/admin)
```

### Log Management

```bash
# View application logs
docker-compose logs -f backend
docker-compose logs -f frontend

# Kubernetes logs
kubectl logs -f deployment/backend -n pos-system
kubectl logs -f deployment/frontend -n pos-system
```

## 🔍 Troubleshooting

### Common Issues

#### 1. Database Connection Issues

```bash
# Check if PostgreSQL is running
docker-compose ps db

# Check database logs
docker-compose logs db

# Test connection
docker exec -it pos-postgres psql -U pos_user -d pos_system
```

#### 2. Backend Won't Start

```bash
# Check application logs
docker-compose logs backend

# Check environment variables
docker-compose exec backend env

# Test health endpoint
curl http://localhost:8080/actuator/health
```

#### 3. Frontend Build Issues

```bash
# Clear node_modules and reinstall
cd frontend
rm -rf node_modules package-lock.json
npm install

# Check for dependency conflicts
npm audit
```

#### 4. Kubernetes Issues

```bash
# Check pod status
kubectl get pods -n pos-system

# Check pod logs
kubectl logs <pod-name> -n pos-system

# Check events
kubectl get events -n pos-system

# Describe pod for details
kubectl describe pod <pod-name> -n pos-system
```

### Performance Optimization

#### Docker Optimization

```bash
# Use multi-stage builds (already implemented)
# Enable BuildKit for faster builds
export DOCKER_BUILDKIT=1

# Use .dockerignore files (already implemented)
```

#### Kubernetes Optimization

```bash
# Set resource limits (already configured)
# Use Horizontal Pod Autoscaler
kubectl autoscale deployment backend --cpu-percent=70 --min=2 --max=10 -n pos-system
```

## 🔐 Security Considerations

### Production Security Checklist

- [ ] Use strong database passwords
- [ ] Enable SSL/TLS encryption
- [ ] Configure CORS properly
- [ ] Set up firewall rules
- [ ] Use secrets management
- [ ] Enable security headers
- [ ] Regular security updates
- [ ] Backup strategy

### SSL/TLS Setup

```bash
# Generate SSL certificates
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout ssl/private.key -out ssl/certificate.crt

# Configure nginx with SSL
# Update docker-compose.production.yml
```

## 📈 Scaling Strategies

### Horizontal Scaling

- **Backend**: Scale to multiple instances behind load balancer
- **Frontend**: Scale to multiple instances with CDN
- **Database**: Use read replicas for read-heavy workloads

### Vertical Scaling

- Increase CPU/memory limits in Kubernetes
- Optimize JVM settings for Spring Boot
- Use connection pooling for database

## 🔄 Backup & Recovery

### Database Backup

```bash
# Create backup script
#!/bin/bash
docker exec pos-postgres pg_dump -U pos_user pos_system > backup_$(date +%Y%m%d_%H%M%S).sql

# Restore backup
docker exec -i pos-postgres psql -U pos_user pos_system < backup_file.sql
```

### Application Backup

```bash
# Backup Docker volumes
docker run --rm -v pos-system_postgres_data:/data -v $(pwd):/backup alpine tar czf /backup/postgres_backup.tar.gz -C /data .

# Restore volumes
docker run --rm -v pos-system_postgres_data:/data -v $(pwd):/backup alpine tar xzf /backup/postgres_backup.tar.gz -C /data
```

## 🎯 Next Steps

1. **Set up monitoring** with Prometheus/Grafana
2. **Configure logging** with ELK stack
3. **Implement backup** automation
4. **Add security scanning** to CI/CD
5. **Set up alerting** for critical issues
6. **Optimize performance** based on metrics
7. **Plan disaster recovery** procedures

---

## 📞 Support

For issues and questions:

- Check the troubleshooting section above
- Review application logs
- Check GitHub Issues
- Contact the development team

**Happy Deploying! 🚀**
