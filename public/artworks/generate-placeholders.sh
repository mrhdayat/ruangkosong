#!/bin/bash
# Generate minimal SVG placeholder artworks

# Artwork 1 - Layers of translucent white
cat > artwork-1.webp.svg << 'EOF'
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800">
  <rect fill="#F0F0F0" width="1200" height="800"/>
  <rect fill="#E8E8E8" x="100" y="80" width="1000" height="640" opacity="0.6"/>
  <rect fill="#DCDCDC" x="200" y="160" width="800" height="480" opacity="0.5"/>
  <rect fill="#D0D0D0" x="300" y="240" width="600" height="320" opacity="0.4"/>
  <rect fill="#C8C8C8" x="400" y="300" width="400" height="200" opacity="0.3"/>
  <line x1="150" y1="400" x2="1050" y2="400" stroke="#B0B0B0" stroke-width="0.5" opacity="0.3"/>
</svg>
EOF

# Artwork 2 - Geometric shadows
cat > artwork-2.webp.svg << 'EOF'
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800">
  <rect fill="#1a1a1a" width="1200" height="800"/>
  <circle cx="400" cy="400" r="120" fill="none" stroke="#444" stroke-width="1"/>
  <rect x="650" y="280" width="200" height="200" fill="none" stroke="#444" stroke-width="1" transform="rotate(45 750 380)"/>
  <line x1="200" y1="600" x2="1000" y2="600" stroke="#333" stroke-width="0.5"/>
  <circle cx="600" cy="400" r="3" fill="#666"/>
</svg>
EOF

# Artwork 3 - Gradient atmosphere
cat > artwork-3.webp.svg << 'EOF'
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800">
  <defs>
    <linearGradient id="atmo" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#E0E0E0"/>
      <stop offset="40%" stop-color="#C0C0C0"/>
      <stop offset="70%" stop-color="#8A8A8A"/>
      <stop offset="100%" stop-color="#4A4A4A"/>
    </linearGradient>
  </defs>
  <rect fill="url(#atmo)" width="1200" height="800"/>
  <line x1="0" y1="520" x2="1200" y2="480" stroke="#999" stroke-width="0.3" opacity="0.5"/>
</svg>
EOF

# Artwork 4 - Water reflection
cat > artwork-4.webp.svg << 'EOF'
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800">
  <defs>
    <linearGradient id="water" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#D8D8D8"/>
      <stop offset="50%" stop-color="#C4C4C4"/>
      <stop offset="50.5%" stop-color="#B8B8B8"/>
      <stop offset="100%" stop-color="#A0A0A0"/>
    </linearGradient>
  </defs>
  <rect fill="url(#water)" width="1200" height="800"/>
  <circle cx="600" cy="200" r="60" fill="#DDD" opacity="0.3"/>
  <ellipse cx="600" cy="600" rx="80" ry="30" fill="#AAA" opacity="0.2"/>
</svg>
EOF

# Artwork 5 - Monolith
cat > artwork-5.webp.svg << 'EOF'
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800">
  <rect fill="#F2F2F2" width="1200" height="800"/>
  <defs>
    <linearGradient id="steel" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#888"/>
      <stop offset="30%" stop-color="#CCC"/>
      <stop offset="60%" stop-color="#999"/>
      <stop offset="100%" stop-color="#777"/>
    </linearGradient>
  </defs>
  <rect x="530" y="80" width="140" height="640" fill="url(#steel)" rx="2"/>
  <rect x="530" y="720" width="180" height="4" fill="#AAA" rx="1" opacity="0.3"/>
</svg>
EOF

echo "Placeholders created"
