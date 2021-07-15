# Base TypeScript API

## Modules

- User Module
  - Hash Provider (bcrypt)
  - Ensure Authenticated
- Notification Module

## Shared Modules

- AppErrors

## Providers

  - Cache Provider
    - Redis
  - Mail Provider
    - Ethereal (development)
    - SES
    - Postmark
  - Mail Template Provider
    - Handlebars
  - Payment Provider
    - GalaxPay
  - Storage Provider
    - Disk (local/development)
    - S3

## Migrations

  - Users Table
  - Payments Table

## Middlewares

  - RateLimiter
