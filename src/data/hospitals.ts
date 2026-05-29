export interface Hospital {
  id: string;
  name: string;
  city: string;
  address: string;
  type: string;
  area: string;
  floors: string;
  floorCount: number;
  image: string;
}

export const hospitals: Hospital[] = [
  {
    id: 'cipadung',
    name: 'RS X',
    city: 'Bandung',
    address: 'Jl. Raya Bandung No. 123, Kota Bandung, Jawa Barat 40111, Indonesia',
    type: 'Hospitality / Healthcare',
    area: '25,000 m²',
    floors: '9 Floors + 1 Basement',
    floorCount: 9,
    image: '/hospital_view.png'
  },
  {
    id: 'bekasi',
    name: 'RS Y',
    city: 'Bekasi',
    address: 'Jl. Ahmad Yani No. 45, Bekasi Selatan, Kota Bekasi 17141, Indonesia',
    type: 'Hospitality / Healthcare',
    area: '32,000 m²',
    floors: '12 Floors + 2 Basements',
    floorCount: 12,
    image: '/hospital_bekasi.png'
  }
];
