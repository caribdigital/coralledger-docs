#!/usr/bin/env bash
# scripts/convert-marketing-videos.sh
#
# Convert marketing demo WebM recordings to MP4 for CDN hosting.
#
# Prerequisites:
#   brew install ffmpeg   (macOS)
#   apt-get install ffmpeg (Debian/Ubuntu)
#
# Usage:
#   ./scripts/convert-marketing-videos.sh [input-dir] [output-dir]
#
# Defaults:
#   input-dir  = ./recordings
#   output-dir = ./dist/videos
#
# The resulting MP4 files should be uploaded to the CDN at:
#   https://cdn.coralledger.com/demos/<filename>.mp4
#
# Video naming convention (matches CDN paths used in the docs):
#   registration-01 … registration-04      (4 scenes)
#   client-management-01 … -03             (3 scenes)
#   transactions-01 … -03                  (3 scenes)
#   vat-returns-01 … -04                   (4 scenes)
#   compliance-01 … -02                    (2 scenes)
#   multi-tenant-01                        (1 scene)
#   rate-transition-01                     (1 scene)
#   exports-01                             (1 scene)
#   share-links-01                         (1 scene)
#   mobile-01                              (1 scene)
#   performance-01                         (1 scene)

set -euo pipefail

INPUT_DIR="${1:-./recordings}"
OUTPUT_DIR="${2:-./dist/videos}"

if ! command -v ffmpeg &>/dev/null; then
  echo "Error: ffmpeg is not installed. Install it with: brew install ffmpeg" >&2
  exit 1
fi

if [ ! -d "$INPUT_DIR" ]; then
  echo "Error: Input directory '$INPUT_DIR' does not exist." >&2
  exit 1
fi

mkdir -p "$OUTPUT_DIR"

converted=0
skipped=0

while IFS= read -r -d '' input_file; do
  base=$(basename "$input_file" .webm)
  output_file="$OUTPUT_DIR/$base.mp4"

  if [ -f "$output_file" ]; then
    echo "Skipping (already exists): $output_file"
    skipped=$((skipped + 1))
    continue
  fi

  echo "Converting: $input_file → $output_file"
  ffmpeg -i "$input_file" \
    -c:v libx264 \
    -crf 22 \
    -preset slow \
    -profile:v high \
    -pix_fmt yuv420p \
    -movflags +faststart \
    -c:a aac \
    -b:a 128k \
    -y \
    "$output_file"

  converted=$((converted + 1))
done < <(find "$INPUT_DIR" -maxdepth 1 -name "*.webm" -print0 | sort -z)

echo ""
echo "Done. Converted: $converted, Skipped (already exist): $skipped"
echo ""
echo "Next step: upload files in '$OUTPUT_DIR' to https://cdn.coralledger.com/demos/"
