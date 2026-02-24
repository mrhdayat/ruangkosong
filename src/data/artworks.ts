export interface Artwork {
  id: string;
  title: string;
  artist: string;
  year: number;
  medium: string;
  dimensions: string;
  description: string;
  image: string;
}

export const artworks: Artwork[] = [
  {
    id: "kekosongan-i",
    title: "Kekosongan I",
    artist: "Aria Nusantara",
    year: 2024,
    medium: "Akrilik di atas kanvas",
    dimensions: "200 × 300 cm",
    description:
      "Sebuah meditasi visual tentang ketiadaan yang hadir. Lapisan-lapisan putih transparan menciptakan kedalaman yang tak terhingga, mengajak penikmat untuk merenungkan makna dari kekosongan itu sendiri.",
    image: "/artworks/artwork-1.svg",
  },
  {
    id: "dialog-sunyi",
    title: "Dialog Sunyi",
    artist: "Kirana Dewi",
    year: 2023,
    medium: "Instalasi mixed media",
    dimensions: "Dimensi variabel",
    description:
      "Karya instalasi yang mengeksplorasi percakapan antara cahaya dan bayangan. Objek-objek minimal ditempatkan dengan presisi matematis, menciptakan narasi yang hanya terdengar dalam keheningan.",
    image: "/artworks/artwork-2.svg",
  },
  {
    id: "ruang-antara",
    title: "Ruang Antara",
    artist: "Bayu Pratama",
    year: 2024,
    medium: "Cat minyak di atas linen",
    dimensions: "180 × 240 cm",
    description:
      "Eksplorasi liminal tentang ruang-ruang yang ada di antara — antara kehadiran dan ketiadaan, antara suara dan keheningan, antara yang terlihat dan yang tersembunyi.",
    image: "/artworks/artwork-3.svg",
  },
  {
    id: "jejak-waktu",
    title: "Jejak Waktu",
    artist: "Maya Setiawan",
    year: 2023,
    medium: "Fotografi fine art",
    dimensions: "120 × 160 cm",
    description:
      "Seri fotografi yang menangkap momen-momen transisi — saat cahaya pagi menyentuh permukaan air yang sempurna tenang, menciptakan refleksi yang kabur antara nyata dan ilusi.",
    image: "/artworks/artwork-4.svg",
  },
  {
    id: "resonansi",
    title: "Resonansi",
    artist: "Arjuna Wibowo",
    year: 2024,
    medium: "Patung stainless steel",
    dimensions: "300 × 100 × 100 cm",
    description:
      "Patung monolitik yang bergetar dengan frekuensi rendah, hampir tak terdengar. Pengunjung diundang untuk menyentuh permukaannya dan merasakan getaran yang terasa seperti detak jantung bumi.",
    image: "/artworks/artwork-5.svg",
  },
];
