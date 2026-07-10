#!/usr/bin/env bash
# Carrega backend/.env (se existir) e sobe o backend com mvn spring-boot:run.
set -euo pipefail
cd "$(dirname "$0")"

if [ -f .env ]; then
  set -a
  source .env
  set +a
else
  echo "Aviso: .env nao encontrado — copie .env.example para .env e preencha os valores." >&2
fi

mvn spring-boot:run
