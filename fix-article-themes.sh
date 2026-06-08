#!/bin/bash
# Inject theme.js into any article that's missing it
ARTICLES_DIR="$(dirname "$0")/articles"
INJECT='<script src="../js/theme.js"></script>'
COUNT=0

for f in "$ARTICLES_DIR"/*.html; do
  if ! grep -q "theme.js" "$f"; then
    # Insert after <meta charset="UTF-8">
    sed -i '' 's|<meta charset="UTF-8">|<meta charset="UTF-8">\n'"$INJECT"'|' "$f"
    echo "Fixed: $(basename $f)"
    COUNT=$((COUNT+1))
  fi
done

echo "Done — $COUNT article(s) updated."
