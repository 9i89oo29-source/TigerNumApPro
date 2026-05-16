#!/bin/bash
# سكريبت نشر بسيط

echo "Pulling latest changes..."
git pull origin main

echo "Installing backend dependencies..."
cd backend && npm ci --production && cd ..

echo "Building Docker images..."
docker-compose build

echo "Restarting services..."
docker-compose up -d

echo "Deployment completed!"
