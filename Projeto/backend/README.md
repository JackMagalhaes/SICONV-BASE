# Transferegov Gerenciador (Backend)

## Setup

1. `cd Projeto/backend`
2. `npm install`
3. `cp .env.example .env` e ajustar `.env` com credenciais PostgreSQL
4. `npm run migrate`
5. `npm run dev`

## Rotas

- GET `/api/instrumentos/propostas`
- POST `/api/instrumentos/proposta`
- POST `/api/etl/run`

## ETL

Coloque os arquivos CSV em `../Modelo de Dados/csv` (ou PATH personalizado em `.env`).
Execute `npm run etl` para importar `proposta`.
