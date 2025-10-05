
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
    imageUrl: 'https://picsum.photos/seed/cam-01/1280/720',
    imageHint: 'habitat entrance',
  },
  {
    id: 'cam-02',
    name: 'CAM-02',
    location: 'Laboratorio Científico',
    status: 'Online',
    imageUrl: 'https://picsum.photos/seed/cam-02/1280/720',
    imageHint: 'science laboratory',
  },
  {
    id: 'cam-03',
    name: 'CAM-03',
    location: 'Invernadero A',
    status: 'Online',
    imageUrl: 'https://picsum.photos/seed/cam-03/1280/720',
    imageHint: 'greenhouse plants',
  },
  {
    id: 'cam-04',
    name: 'CAM-04',
    location: 'Centro de Mando',
    status: 'Online',
    imageUrl: 'https://picsum.photos/seed/cam-04/1280/720',
    imageHint: 'control center',
  },
  {
    id: 'cam-05',
    name: 'CAM-05',
    location: 'Módulo Residencial B',
    status: 'Offline',
    imageUrl: 'https://picsum.photos/seed/cam-05/1280/720',
    imageHint: 'sleeping quarters',
  },
  {
    id: 'cam-06',
    name: 'CAM-06',
    location: 'Área de Almacenamiento',
    status: 'Online',
    imageUrl: 'https://picsum.photos/seed/cam-06/1280/720',
    imageHint: 'storage bay',
  },
    {
    id: 'cam-07',
    name: 'CAM-07',
    location: 'Plataforma de Lanzamiento',
    status: 'Online',
    imageUrl: 'https://picsum.photos/seed/cam-07/1280/720',
    imageHint: 'launch pad',
  },
  {
    id: 'cam-08',
    name: 'CAM-08',
    location: 'Taller de Mantenimiento',
    status: 'Online',
    imageUrl: 'https://picsum.photos/seed/cam-08/1280/720',
    imageHint: 'maintenance workshop',
  },
];
