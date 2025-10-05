
export type Camera = {
  id: string;
  name: string;
  location: string;
  status: 'Online' | 'Offline';
  imageUrl: string;
  imageHint: string;
};

export const cameraData: Camera[] = [
  {
    id: 'cam-01',
    name: 'CAM-01',
    location: 'Entrada Principal',
    status: 'Online',
    imageUrl: '/camera/processed-image-1.jpg',
    imageHint: 'habitat entrance',
  },
  {
    id: 'cam-02',
    name: 'CAM-02',
    location: 'Laboratorio Científico',
    status: 'Online',
    imageUrl: '/camera/processed-image-2.jpg',
    imageHint: 'science laboratory',
  },
  {
    id: 'cam-03',
    name: 'CAM-03',
    location: 'Invernadero A',
    status: 'Online',
    imageUrl: '/camera/processed-image-3.jpg',
    imageHint: 'greenhouse plants',
  },
  {
    id: 'cam-04',
    name: 'CAM-04',
    location: 'Centro de Mando',
    status: 'Online',
    imageUrl: '/camera/processed-image-4.jpg',
    imageHint: 'control center',
  },
  {
    id: 'cam-05',
    name: 'CAM-05',
    location: 'Módulo Residencial B',
    status: 'Offline',
    imageUrl: '/camera/processed-image-5.jpg',
    imageHint: 'sleeping quarters',
  },
  {
    id: 'cam-06',
    name: 'CAM-06',
    location: 'Área de Almacenamiento',
    status: 'Online',
    imageUrl: '/camera/processed-image-6.jpg',
    imageHint: 'storage bay',
  },
    {
    id: 'cam-07',
    name: 'CAM-07',
    location: 'Plataforma de Lanzamiento',
    status: 'Online',
    imageUrl: '/camera/processed-image-7.jpg',
    imageHint: 'launch pad',
  },
  {
    id: 'cam-08',
    name: 'CAM-08',
    location: 'Taller de Mantenimiento',
    status: 'Online',
    imageUrl: '/camera/processed-image-8.jpg',
    imageHint: 'maintenance workshop',
  },
  {
    id: 'cam-09',
    name: 'CAM-09',
    location: 'Exterior - Paneles Solares',
    status: 'Online',
    imageUrl: '/camera/processed-image-9.jpg',
    imageHint: 'solar panels exterior',
  },
  {
    id: 'cam-10',
    name: 'CAM-10',
    location: 'Gimnasio',
    status: 'Online',
    imageUrl: '/camera/processed-image-10.jpg',
    imageHint: 'habitat gym',
  },
  {
    id: 'cam-11',
    name: 'CAM-11',
    location: 'Bahía de Rovers',
    status: 'Online',
    imageUrl: '/camera/processed-image-11.jpg',
    imageHint: 'rover bay',
  },
];
