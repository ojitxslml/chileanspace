
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
    name: "Regolith Concrete",
    type: "Structure",
    description:
      "Martian soil mixed with binders to create a strong, radiation-shielding concrete.",
    details: `
      <p>El desarrollo del <strong>Concreto de Regolito</strong> (o estructuras derivadas de recursos in situ, ISRU) es fundamental para la estrategia de exploración a largo plazo, ya que el objetivo es proporcionar la <strong>capacidad de producir y construir hábitats e infraestructura de superficie utilizando recursos indígenas</strong> (in situ).</p>
      <h3>Estructura y Composición</h3>
      <p>La tecnología busca emplear materiales disponibles en el entorno planetario para construir hábitats.</p>
      <ul>
        <li><strong>Composición Basada en Basalto:</strong> Un ejemplo prominente de esta aplicación fue el proyecto Marsa, ganador del concurso <em>3D-Printed Habitat Challenge</em> de la NASA. Su composición estructural utiliza un compuesto formado por <strong>"primer de basalto"</strong>, junto con <strong>materiales reciclables y biodegradables</strong> que pueden obtenerse fácilmente en <strong>terreno marciano</strong>.</li>
        <li><strong>Procesos Análogos:</strong> Las corporaciones japonesas también han estado trabajando en el desarrollo de <strong>procesos de construcción derivados de ISRU</strong>.</li>
        <li><strong>Blindaje Integrado:</strong> En diseños de hábitats profundos como el Hábitat de Tránsito a Marte (TH), la <strong>masa logística</strong> (comida, equipo, etc.) se posiciona estratégicamente para cumplir la función adicional de <strong>protección contra la radiación</strong> para la tripulación.</li>
      </ul>
      <h3>Construcción y Rendimiento</h3>
      <p>La construcción de estas estructuras se basa en tecnologías avanzadas, como la impresión 3D, y diseños optimizados para resistir las condiciones extremas del espacio.</p>
      <ul>
        <li><strong>Impresión 3D Automatizada:</strong> El proceso de construcción de estructuras puede completarse de manera highly automatizada; en el caso de Marsa, la impresión 3D fue valorada por los ingenieros de la NASA por poder terminarse en unas <strong>30 horas sin intervención humana</strong>.</li>
        <li><strong>Eficiencia Geométrica:</strong> La base formal más eficiente y efectiva para un hábitat de superficie, especialmente como <strong>recipiente a presión</strong>, es un <strong>cilindro vertical</strong>.
          <ul>
            <li>Esta forma aporta la mayor proporción de superficie de piso utilizable por volumen y diámetro, lo que <strong>reduce la tensión estructural</strong> y la cantidad de materiales necesarios.</li>
          </ul>
        </li>
        <li><strong>Resistencia Ambiental:</strong> Debido a los <strong>drásticos cambios térmicos de Marte</strong>, las estructuras deben ser capaces de <strong>expandirse y contraerse</strong> para evitar fallos.</li>
        <li><strong>Sistema de Doble Capa:</strong> El diseño de Marsa implementa un <strong>sistema de doble capa</strong> que separa por completo el recipiente a presión del área habitable. Esta configuración asegura un <strong>acceso constante para la reparación y el mantenimiento</strong> de la pared.</li>
        <li><strong>Pruebas de Material:</strong> El material compuesto utilizado en el hábitat Marsa superó con éxito las pruebas de <strong>presión, resistencia e impacto</strong>, obteniendo una calificación muy superior a la de sus competidores.</li>
      </ul>
      <h3>Blindaje contra la Radiación (Radiation Shielding)</h3>
      <p>La protección radiológica es una cuestión tecnológica clave para la construcción de hábitats. El uso de recursos in situ para el blindaje es una estrategia crucial:</p>
      <ul>
        <li><strong>Opciones de Blindaje de ISRU:</strong> Las opciones de blindaje que utilizan recursos in situ incluyen el <strong>blindaje de regolito/suelo suelto</strong> y el <strong>blindaje de basalto sinterizado/fundido</strong>.</li>
        <li><strong>Maquinaria de Soporte:</strong> Se requiere maquinaria de movimiento de suelo y minería para la preparación del sitio, el emplazamiento del hábitat y la formación de <strong>bermas de eyección contra la radiación/explosión</strong>.</li>
        <li><strong>Requisitos Tecnológicos:</strong> Para que esta tecnología esté lista, es necesario probar la <strong>tecnología estructural ISRU</strong> y el <strong>proceso de fabricación con capacidad ISRU</strong> en condiciones simuladas.</li>
      </ul>
      <h3>Madurez Tecnológica (TRL)</h3>
      <p>El nivel de madurez tecnológica para las estructuras ISRU-Derivadas (Clase IIIh) se sitúa en TRL 1-2.</p>
      <ul>
        <li>Específicamente, se ha demostrado que la tecnología para el <strong>"Lunar-crete"</strong> tiene un <strong>Nivel de Madurez Tecnológica (TRL) de 2 a 3</strong>.</li>
        <li>La implementación exitosa de estas estructuras (Clase IIh o Clase 3) conduciría a la <strong>autosuficiencia</strong> en la infraestructura de colonias y apoyaría la expansión humana sostenida.</li>
      </ul>
    `,
    images: [
      {
        src: "https://picsum.photos/seed/regolith1/600/400",
        alt: "A 3D printed structure made from a reddish, concrete-like material.",
        hint: "3d-printed structure",
      },
      {
        src: "https://picsum.photos/seed/regolith2/600/400",
        alt: "Close-up texture of Martian regolith concrete.",
        hint: "red concrete",
      },
    ],
  },
  {
    name: "ETFE Polymer",
    type: "Dome",
    description:
      "A highly transparent and durable polymer for inflatable structures and windows.",
    details: "<p>Detailed information about ETFE Polymer will be available soon.</p>",
    images: [],
  },
  {
    name: "Basalt Fiber",
    type: "Reinforcement",
    description:
      "High-tensile strength fibers produced from melted Martian rock.",
    details: "<p>Detailed information about Basalt Fiber will be available soon.</p>",
    images: [],
  },
  {
    name: "Silica Aerogel",
    type: "Insulation",
    description: "Extremely low-density solid used for thermal insulation.",
    details: "<p>Detailed information about Silica Aerogel will be available soon.</p>",
    images: [],
  },
  {
    name: "PVDF Piezoelectric Film",
    type: "Energy",
    description:
      "A flexible polymer film that generates electricity from pressure variations during dust storms.",
    details: "<p>Detailed information about PVDF Piezoelectric Film will be available soon.</p>",
    images: [],
  },
  {
    name: "Gallium Arsenide Solar Cells",
    type: "Energy",
    description:
      "Highly efficient solar cells resistant to radiation and temperature swings.",
    details: "<p>Detailed information about Gallium Arsenide Solar Cells will be available soon.</p>",
    images: [],
  },
];
