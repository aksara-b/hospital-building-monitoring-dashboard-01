export interface Hospital {
  id: string;
  name: string;
  shortName: string;
  city: string;
  address: string;
  phone?: string;
  type: string;
  area: string;
  floors: string;
  floorCount: number;
  image: string;
}

export const hospitals: Hospital[] = [
  {
    id: 'arroyyan',
    name: 'RS Ar Royyan',
    shortName: 'Ar Royyan',
    city: 'Indralaya Utara',
    address: 'Indralaya Utara, Kabupaten Ogan Ilir, Sumatera Selatan',
    phone: '(0711) 581976',
    type: 'Hospitality / Healthcare',
    area: '8,500 m²',
    floors: '3 Lantai',
    floorCount: 3,
    image: '/hospital_arroyyan.png'
  },
  {
    id: 'cipadung',
    name: 'RS X',
    shortName: 'RS X',
    city: 'Bandung',
    address: 'Jl. Raya Bandung No. 123, Kota Bandung, Jawa Barat 40111, Indonesia',
    type: 'Hospitality / Healthcare',
    area: '25,000 m²',
    floors: '9 Floors + 1 Basement',
    floorCount: 9,
    image: '/hospital_dummy_x.png'
  },
  {
    id: 'bekasi',
    name: 'RS Y',
    shortName: 'RS Y',
    city: 'Bekasi',
    address: 'Jl. Ahmad Yani No. 45, Bekasi Selatan, Kota Bekasi 17141, Indonesia',
    type: 'Hospitality / Healthcare',
    area: '32,000 m²',
    floors: '12 Floors + 2 Basements',
    floorCount: 12,
    image: '/hospital_bekasi.png'
  },
  {
    id: 'surabaya',
    name: 'RS Z',
    shortName: 'RS Z',
    city: 'Surabaya',
    address: 'Jl. Raya Darmo No. 90, Wonokromo, Kota Surabaya 60241, Indonesia',
    type: 'Hospitality / Healthcare',
    area: '41,000 m²',
    floors: '15 Floors + 3 Basements',
    floorCount: 15,
    image: '/hospital_bekasi.png'
  }
];
