#!/bin/bash

# Usage: ./openplan.sh [build|run|exec]

set -e

case "$1" in
  build)
    docker build -t openplan .
    ;;
  run)
    docker run -d -p 3000:3000 -p 6006:6006 -v "$PWD/app:/usr/app" --name openplan openplan
    ;;
  exec)
    docker exec -it openplan sh
    ;;
  *)
    echo "Usage: $0 [build|run|exec]"
    exit 1
    ;;
esac
