# Transferegov Gerenciador - Projeto

Arquivo de exemplo para iniciar aplicação que consome CSVs do governo via Transferegov e popula PostgreSQL.

## Backend

- Pasta: `backend`
- Comandos:
  - `npm install`
  - `cp .env.example .env` e configurar
  - `npm run migrate`
  - `npm run dev`
  - `npm run etl`

## Frontend

- Pasta: `frontend`
- Comandos:
  - `npm install`
  - `npm run dev`

## Fluxo ETL

1. Colocar CSVs (Proposta/Convênio/Empenho) em `Modelo de Dados/csv`
2. Rodar `npm run etl` no backend
3. API REST expõe dados em `/api/instrumentos/propostas`
