
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
    location: 'cam_main_entrance',
    status: 'Online',
    imageUrl: '/camera/processed-image-1.jpg',
    imageHint: 'habitat entrance',
  },
  {
    id: 'cam-02',
    name: 'CAM-02',
    location: 'cam_science_lab',
    status: 'Online',
    imageUrl: '/camera/processed-image-2.jpg',
    imageHint: 'science laboratory',
  },
  {
    id: 'cam-03',
    name: 'CAM-03',
    location: 'cam_greenhouse_a',
    status: 'Online',
    imageUrl: '/camera/processed-image-3.jpg',
    imageHint: 'greenhouse plants',
  },
  {
    id: 'cam-04',
    name: 'CAM-04',
    location: 'cam_command_center',
    status: 'Online',
    imageUrl: '/camera/processed-image-4.jpg',
    imageHint: 'control center',
  },
  {
    id: 'cam-05',
    name: 'CAM-05',
    location: 'cam_residential_b',
    status: 'Offline',
    imageUrl: '/camera/processed-image-5.jpg',
    imageHint: 'sleeping quarters',
  },
  {
    id: 'cam-06',
    name: 'CAM-06',
    location: 'cam_storage_area',
    status: 'Online',
    imageUrl: '/camera/processed-image-6.jpg',
    imageHint: 'storage bay',
  },
    {
    id: 'cam-07',
    name: 'CAM-07',
    location: 'cam_launch_pad',
    status: 'Online',
    imageUrl: '/camera/processed-image-7.jpg',
    imageHint: 'launch pad',
  },
  {
    id: 'cam-08',
    name: 'CAM-08',
    location: 'cam_maintenance_workshop',
    status: 'Online',
    imageUrl: '/camera/processed-image-8.jpg',
    imageHint: 'maintenance workshop',
  },
  {
    id: 'cam-09',
    name: 'CAM-09',
    location: 'cam_exterior_solar',
    status: 'Online',
    imageUrl: '/camera/processed-image-9.jpg',
    imageHint: 'solar panels exterior',
  },
  {
    id: 'cam-10',
    name: 'CAM-10',
    location: 'cam_gym',
    status: 'Online',
    imageUrl: '/camera/processed-image-10.jpg',
    imageHint: 'habitat gym',
  },
  {
    id: 'cam-11',
    name: 'CAM-11',
    location: 'cam_rover_bay',
    status: 'Online',
    imageUrl: '/camera/processed-image-11.jpg',
    imageHint: 'rover bay',
  },
  {
    id: 'cam-12',
    name: 'CAM-12',
    location: 'cam_recreational_pool',
    status: 'Online',
    imageUrl: '/camera/processed-image-12.jpg',
    imageHint: 'recreational pool',
  },
  {
    id: 'cam-13',
    name: 'CAM-13',
    location: 'cam_training_pool',
    status: 'Online',
    imageUrl: '/camera/processed-image-13.jpg',
    imageHint: 'training pool',
  },
  {
    id: 'cam-14',
    name: 'CAM-14',
    location: 'cam_social_hub',
    status: 'Online',
    imageUrl: '/camera/processed-image-14.jpg',
    imageHint: 'social hub',
  },
];
