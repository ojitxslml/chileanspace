
export type Material = {
  name: string;
  type: string;
  description: string;
  details: string;
  images: {
    src: string;
    alt: string;
    hint: string;
  }[];
};

type Translator = (key: string) => string;

export const getMaterialsData = (t: Translator): Material[] => [
  {
    name: t('materials.tower_wall_name'),
    type: t('materials.main_structure'),
    description: t('materials.tower_wall_desc'),
    details: t('materials.tower_wall_details'),
    images: [
      {
        src: "https://picsum.photos/seed/wall-section/600/400",
        alt: t('materials.image_alt_wall_diagram'),
        hint: "habitat diagram",
      },
      {
        src: "https://picsum.photos/seed/regolith-berm/600/400",
        alt: t('materials.image_alt_regolith_berm'),
        hint: "regolith structure",
      },
    ],
  },
  {
    name: t('materials.piezo_module_name'),
    type: t('materials.energy_sensing'),
    description: t('materials.piezo_module_desc'),
    details: t('materials.piezo_module_details'),
    images: [
      {
        src: "https://picsum.photos/seed/piezo-hex/600/400",
        alt: t('materials.image_alt_piezo_hex'),
        hint: "hexagonal pattern",
      },
       {
        src: "https://picsum.photos/seed/circuit-board/600/400",
        alt: t('materials.image_alt_circuit_board'),
        hint: "circuit board",
      },
    ],
  },
  {
    name: t('materials.bom_name'),
    type: t('materials.components_summary'),
    description: t('materials.bom_desc'),
    details: t('materials.bom_details'),
    images: [],
  },
];
