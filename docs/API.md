# TigerNum API Documentation

## Authentication
- POST /api/auth/register
- POST /api/auth/login
- POST /api/auth/refresh

## User
- GET /api/user/profile (Header: Authorization: uuid)
- GET /api/user/balance (Header: Authorization: uuid)
- GET /api/user/orders (Header: Authorization: uuid)

## Meta
- GET /api/meta/countries
- GET /api/meta/services

## Buy
- POST /api/buy/number (Header: Authorization: uuid)
- GET /api/buy/code/:orderId (Header: Authorization: uuid)

## Admin (JWT required)
- POST /api/admin/login
- GET /api/admin/users
- POST /api/admin/topup
- GET /api/admin/pricing
- POST /api/admin/pricing
- PUT /api/admin/pricing/:id
- DELETE /api/admin/pricing/:id
