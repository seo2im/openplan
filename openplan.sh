#!/bin/bash

# Usage: ./openplan.sh [build|run|exec|sync]

set -e

case "$1" in
  build)
    docker build -t openplan .
    ;;
  run)
    # Bind mount source, but keep node_modules inside the container via anonymous volumes
    docker run -d \
      -p 3000:3000 -p 6006:6006 \
      -v "$PWD/app:/usr/app" \
      --name openplan openplan
    ;;
  sync)
    # Extract node_modules using tar to properly handle symlinks
    echo "Syncing node_modules from Docker image to local..."
    TEMP_CONTAINER=$(docker create openplan)
    
    # Extract each node_modules directory using tar
    docker cp $TEMP_CONTAINER:/usr/app/node_modules - | tar -xC ./app/
    docker cp $TEMP_CONTAINER:/usr/app/apps/web/node_modules - | tar -xC ./app/apps/web/
    docker cp $TEMP_CONTAINER:/usr/app/apps/storybook/node_modules - | tar -xC ./app/apps/storybook/
    docker cp $TEMP_CONTAINER:/usr/app/packages/ui/node_modules - | tar -xC ./app/packages/ui/
    docker cp $TEMP_CONTAINER:/usr/app/packages/eslint-config/node_modules - | tar -xC ./app/packages/eslint-config/ 2>/dev/null || true
    
    docker rm $TEMP_CONTAINER
    echo "✓ node_modules synced successfully!"
    ;;
  exec)
    docker exec -it openplan sh
    ;;
  *)
    echo "Usage: $0 [build|run|exec|sync]"
    exit 1
    ;;
esac
