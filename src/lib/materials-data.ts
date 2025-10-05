
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

export const materials: Material[] = [
  {
    name: "Torre Marsha: Sección de Muro",
    type: "Estructura Principal",
    description: "Sección detallada del muro, combinando impresión 3D con regolito, aislamiento avanzado y capas funcionales.",
    details: `
      <h3>Composición del Muro (Exterior a Interior)</h3>
      <ul>
        <li><strong>Suelo Marciano (Compactado):</strong> La base sobre la que se construye.</li>
        <li><strong>Berma de Regolito (0.5–1.0 m):</strong> Una barrera de tierra suelta para protección adicional contra radiación y micrometeoritos. Meta de 1-2 m para protección total.</li>
        <li><strong>Anillo Base Geopolímero (f’c 20–40 MPa):</strong> La fundación impresa en 3D sobre la que se asienta el cascarón, con juntas de silicona fluorada para resistir bajas temperaturas (–120 °C).</li>
        <li><strong>1. Revestimiento Anti-Erosión (Poliurea + IR):</strong> Protege la estructura exterior del desgaste causado por el ambiente marciano.</li>
        <li><strong>2. Cascarón Impreso (300–400 mm):</strong> El cuerpo principal de la estructura, hecho de geopolímero o concreto de azufre con refuerzo de fibra de basalto.</li>
        <li><strong>3. Aislamiento (50–100 mm):</strong> Paneles de Aerogel o fibra de basalto para un control térmico superior (U ≤ 0.25 W/m²K).</li>
        <li><strong>4. Cámara Técnica (80–120 mm):</strong> Espacio para cableado, tuberías y sistemas.</li>
        <li><strong>5. Liner Hermético (ETFE/Vectran + MLI):</strong> La barrera de gas principal para mantener la presión atmosférica interna (hermeticidad objetivo n50 ≤ 0.3 h⁻¹).</li>
        <li><strong>6. Panel Interior Sándwich:</strong> Estructura de nido de abeja de Aluminio o CFRP (polímero reforzado con fibra de carbono) que forma la pared interior habitable.</li>
        <li><strong>Piel Piezoeléctrica:</strong> Módulos hexagonales en el exterior para sensado y generación de micro-energía.</li>
      </ul>
    `,
    images: [
      {
        src: "https://picsum.photos/seed/wall-section/600/400",
        alt: "Diagrama de una sección de muro de hábitat espacial.",
        hint: "habitat diagram",
      },
      {
        src: "https://picsum.photos/seed/regolith-berm/600/400",
        alt: "Una berma de tierra rojiza rodeando una estructura.",
        hint: "regolith structure",
      },
    ],
  },
  {
    name: "Módulo Piezoeléctrico Hexagonal",
    type: "Energía y Sensado",
    description:
      "Unidad modular para la 'piel' del hábitat que genera energía a partir de la presión y vibración.",
    details: `
      <h3>Diseño del Módulo (250-300 mm de lado)</h3>
      <ul>
          <li><strong>A) Película EDS Anti-Polvo/Hielo:</strong> Una capa superior con Sistema de Eliminación de Polvo electrodinámico para autolimpieza.</li>
          <li><strong>B) Material Piezoeléctrico:</strong> Película de PVDF-TrFE o parches de PZT (Titanato Zirconato de Plomo) encapsulados que convierten la presión y vibración en electricidad.</li>
          <li><strong>C) Sustrato:</strong> Base de GFRP (Polímero Reforzado con Fibra de Vidrio) o un compuesto impreso de Nylon y basalto.</li>
          <li><strong>D) Electrónica Integrada:</strong> Incluye un ASIC (Circuito Integrado de Aplicación Específica), un rectificador de corriente y un supercondensador para almacenamiento temporal de energía.</li>
          <li><strong>E) Placa Trasera:</strong> Equipada con clips de bayoneta para una instalación y mantenimiento rápidos (hot-swap).</li>
      </ul>
      <h3>Rendimiento y Especificaciones</h3>
      <ul>
          <li><strong>Producción Esperada:</strong> 1–20 mW/m². Su uso primario es para sensado de impacto, pero contribuye a la micro-generación de energía.</li>
          <li><strong>Bus de Corriente:</strong> Se conecta a un bus de 12 V DC que recorre la estructura en un anillo.</li>
          <li><strong>Encapsulado:</strong> Protegido con fluoropolímero (FEP/ETFE) resistente a la radiación UV y al polvo.</li>
      </ul>
    `,
    images: [
      {
        src: "https://picsum.photos/seed/piezo-hex/600/400",
        alt: "Patrón hexagonal de módulos tecnológicos.",
        hint: "hexagonal pattern",
      },
       {
        src: "https://picsum.photos/seed/circuit-board/600/400",
        alt: "Un pequeño circuito electrónico con chips.",
        hint: "circuit board",
      },
    ],
  },
  {
    name: "Lista Rápida de Materiales (BoM)",
    type: "Resumen de Componentes",
    description:
      "Un resumen de los materiales primarios utilizados en la construcción del hábitat.",
    details: `
      <h3>Muro de la Torre</h3>
      <ul>
          <li><strong>Cascarón impreso:</strong> Geopolímero / Azufre-concreto + Fibra de basalto.</li>
          <li><strong>Aislación:</strong> Aerogel / Fibra de basalto (50–100 mm).</li>
          <li><strong>Cámara técnica:</strong> Espacio de 80–120 mm.</li>
          <li><strong>Liner hermético:</strong> ETFE/Vectran + MLI (Aislamiento Multicapa).</li>
          <li><strong>Panel interior:</strong> Sándwich de Al/CFRP en formato nido de abeja.</li>
      </ul>
      <h3>Base y Entorno</h3>
      <ul>
          <li><strong>Anillo base:</strong> Geopolímero (resistencia f’c 20–40 MPa).</li>
          <li><strong>Juntas:</strong> Silicona fluorada (resistente hasta –120 °C).</li>
          <li><strong>Berma:</strong> Regolito marciano compactado (0.5–1.0 m).</li>
      </ul>
       <h3>Piel de Panal (Módulo Piezoeléctrico)</h3>
      <ul>
          <li><strong>Sustrato:</strong> GFRP / Nylon-basalto.</li>
          <li><strong>Capa activa:</strong> Lámina de PVDF-TrFE o parches de PZT.</li>
          <li><strong>Capa protectora:</strong> Película EDS anti-polvo/hielo.</li>
          <li><strong>Electrónica:</strong> ASIC, rectificador y supercondensador.</li>
      </ul>
    `,
    images: [],
  },
];
