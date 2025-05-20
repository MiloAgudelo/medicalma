import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { firestore } from '../firebase/config';

const modulesData = {
  'stress-management': {
    title: 'Manejo del Estrés',
    description: 'Este módulo te enseñará estrategias efectivas para identificar y manejar el estrés en tu vida diaria. Aprenderás técnicas basadas en evidencia científica que te ayudarán a reducir la tensión y encontrar mayor equilibrio.',
    lessons: [
      {
        title: 'Entendiendo el estrés',
        description: 'Aprende sobre los mecanismos del estrés y cómo afecta a tu cuerpo y mente.',
        content: `
          <h1>Entendiendo el estrés</h1>
          
          <p>El estrés es una respuesta natural del cuerpo ante situaciones que percibimos como amenazantes o desafiantes. Cuando experimentamos estrés, nuestro cuerpo libera hormonas como el cortisol y la adrenalina que nos preparan para enfrentar estas situaciones.</p>
          
          <h2>¿Qué ocurre en nuestro cuerpo?</h2>
          
          <ul>
            <li>Aumento del ritmo cardíaco</li>
            <li>Respiración más rápida</li>
            <li>Tensión muscular</li>
            <li>Mayor estado de alerta</li>
          </ul>
          
          <p>El estrés en pequeñas dosis puede ser beneficioso, ayudándonos a estar motivados y alerta. Sin embargo, cuando se vuelve crónico, puede afectar negativamente nuestra salud física y mental.</p>
          
          <h2>Tipos de estrés</h2>
          
          <ol>
            <li><strong>Estrés agudo:</strong> Es inmediato, de corta duración y desaparece rápidamente. Puede ser positivo en pequeñas dosis.</li>
            <li><strong>Estrés crónico:</strong> Persiste durante períodos prolongados y puede tener efectos negativos en nuestra salud.</li>
          </ol>
          
          <p>En las próximas lecciones, aprenderás a identificar tus desencadenantes de estrés y técnicas para manejarlo efectivamente.</p>
        `
      },
      {
        title: 'Identificando tus desencadenantes',
        description: 'Reconoce los patrones y situaciones que desencadenan tu estrés.',
        content: `
          <h1>Identificando tus desencadenantes de estrés</h1>
          
          <p>Para manejar efectivamente el estrés, es fundamental reconocer qué lo causa en tu vida. Los desencadenantes del estrés son diferentes para cada persona y pueden surgir de diversas fuentes.</p>
          
          <h2>Fuentes comunes de estrés</h2>
          
          <ul>
            <li><strong>Trabajo:</strong> Plazos, sobrecarga laboral, conflictos con compañeros</li>
            <li><strong>Relaciones:</strong> Discusiones, expectativas no cumplidas, falta de apoyo</li>
            <li><strong>Finanzas:</strong> Deudas, presupuesto limitado, gastos inesperados</li>
            <li><strong>Salud:</strong> Enfermedad, dolor crónico, preocupaciones sobre el bienestar</li>
            <li><strong>Entorno:</strong> Ruido, desorden, falta de espacio personal</li>
          </ul>
          
          <h2>Ejercicio: Diario de estrés</h2>
          
          <p>Durante la próxima semana, lleva un registro de las situaciones que te generan estrés. Anota:</p>
          
          <ol>
            <li>¿Qué ocurrió?</li>
            <li>¿Cómo te sentiste física y emocionalmente?</li>
            <li>¿Cómo respondiste?</li>
            <li>¿Qué pensamientos tuviste?</li>
          </ol>
          
          <p>Este registro te ayudará a identificar patrones y reconocer tus desencadenantes personales, el primer paso para desarrollar estrategias efectivas de manejo.</p>
        `
      },
      {
        title: 'Técnicas de respiración para la calma',
        description: 'Domina ejercicios de respiración que activan la respuesta de relajación del cuerpo.',
        content: `
          <h1>Técnicas de respiración para la calma</h1>
          
          <p>La respiración consciente es una de las herramientas más poderosas y accesibles para reducir el estrés inmediatamente. Cuando respiramos profundamente, activamos el sistema nervioso parasimpático, que contrarresta la respuesta de "lucha o huida" del estrés.</p>
          
          <h2>Respiración diafragmática</h2>
          
          <p>Esta técnica te ayuda a utilizar completamente tu capacidad pulmonar:</p>
          
          <ol>
            <li>Siéntate cómodamente o acuéstate</li>
            <li>Coloca una mano en el pecho y otra en el abdomen</li>
            <li>Inhala lentamente por la nariz, sintiendo cómo se expande tu abdomen (no el pecho)</li>
            <li>Exhala lentamente por la boca</li>
            <li>Repite de 5 a 10 veces</li>
          </ol>
          
          <h2>Respiración 4-7-8</h2>
          
          <p>Esta técnica es especialmente efectiva para inducir la calma rápidamente:</p>
          
          <ol>
            <li>Inhala en silencio contando hasta 4</li>
            <li>Mantén la respiración contando hasta 7</li>
            <li>Exhala completamente contando hasta 8</li>
            <li>Repite el ciclo 3-4 veces</li>
          </ol>
          
          <p>Practica estas técnicas diariamente, no solo cuando sientas estrés, para desarrollar el hábito y aumentar su efectividad cuando realmente las necesites.</p>
        `
      },
      {
        title: 'Incorporando el manejo del estrés en tu rutina',
        description: 'Estrategias para mantener prácticas anti-estrés en tu vida cotidiana.',
        content: `
          <h1>Incorporando el manejo del estrés en tu rutina diaria</h1>
          
          <p>Para que las técnicas de manejo del estrés sean realmente efectivas, necesitan convertirse en parte de tu vida cotidiana. Este enfoque preventivo te ayudará a mantener niveles de estrés manejables en lugar de solo responder a crisis.</p>
          
          <h2>Consejos para una rutina anti-estrés</h2>
          
          <ul>
            <li><strong>Consistencia:</strong> Establece horarios regulares para tus prácticas de relajación</li>
            <li><strong>Micro-prácticas:</strong> Incorpora momentos breves de atención plena durante el día</li>
            <li><strong>Señales ambientales:</strong> Usa recordatorios visuales en tu entorno</li>
            <li><strong>Vinculación:</strong> Asocia tus prácticas con actividades que ya realizas</li>
          </ul>
          
          <h2>Plan semanal sugerido</h2>
          
          <table>
            <tr>
              <th>Día</th>
              <th>Mañana</th>
              <th>Tarde</th>
              <th>Noche</th>
            </tr>
            <tr>
              <td>Lunes</td>
              <td>5 min respiración</td>
              <td>Pausa consciente</td>
              <td>Escaneo corporal</td>
            </tr>
            <tr>
              <td>Martes</td>
              <td>Estiramiento</td>
              <td>Caminar atento</td>
              <td>Gratitud</td>
            </tr>
            <tr>
              <td>Miércoles</td>
              <td>5 min respiración</td>
              <td>Pausa consciente</td>
              <td>Visualización</td>
            </tr>
          </table>
          
          <p>Recuerda que la consistencia es más importante que la duración. Es mejor practicar 5 minutos todos los días que 30 minutos una vez por semana.</p>
          
          <h2>¡Felicitaciones!</h2>
          <p>Has completado el módulo de manejo del estrés. Continúa practicando estas técnicas y observa cómo mejora tu bienestar general con el tiempo.</p>
        `
      }
    ]
  },
  'mindfulness-intro': {
    title: 'Introducción al Mindfulness',
    description: 'Este módulo te introducirá a los conceptos fundamentales de la atención plena o mindfulness. Descubrirás cómo esta práctica milenaria puede ayudarte a vivir con mayor consciencia y reducir el sufrimiento emocional.',
    lessons: [
      {
        title: '¿Qué es el mindfulness?',
        description: 'Comprende los principios básicos de la atención plena y su origen.',
        content: `
          <h1>¿Qué es el mindfulness?</h1>
          
          <p>El mindfulness o atención plena es la práctica de prestar atención deliberadamente al momento presente, sin juzgar. Es una forma de relacionarnos con nuestras experiencias —tanto internas como externas— con apertura y curiosidad.</p>
          
          <h2>Orígenes del mindfulness</h2>
          
          <p>Aunque el mindfulness tiene sus raíces en tradiciones contemplativas budistas con más de 2,500 años de antigüedad, en las últimas décadas ha sido adaptado a contextos seculares y respaldado por numerosas investigaciones científicas que confirman sus beneficios.</p>
          
          <h2>Componentes esenciales</h2>
          
          <ul>
            <li><strong>Atención al momento presente:</strong> Enfocarse en el aquí y ahora</li>
            <li><strong>Actitud de no juicio:</strong> Observar sin calificar las experiencias como buenas o malas</li>
            <li><strong>Curiosidad:</strong> Mantener una mente de principiante frente a cada experiencia</li>
            <li><strong>Aceptación:</strong> Reconocer la realidad tal como es, no como desearíamos que fuera</li>
          </ul>
          
          <p>En las próximas lecciones, exploraremos cómo practicar mindfulness en diferentes contextos y situaciones cotidianas.</p>
        `
      },
      {
        title: 'La práctica formal e informal',
        description: 'Conoce las distintas formas de incorporar mindfulness en tu vida.',
        content: `<!-- Contenido simulado -->`
      },
      {
        title: 'Meditación de la respiración',
        description: 'Aprende esta práctica fundamental para desarrollar atención plena.',
        content: `<!-- Contenido simulado -->`
      },
      {
        title: 'Mindfulness para emociones difíciles',
        description: 'Técnicas para trabajar con emociones desafiantes usando atención plena.',
        content: `<!-- Contenido simulado -->`
      },
      {
        title: 'La compasión y la autocompasión',
        description: 'Desarrolla una actitud de amabilidad hacia ti mismo y los demás.',
        content: `<!-- Contenido simulado -->`
      }
    ]
  },
  'better-sleep': {
    title: 'Mejora tu Sueño',
    description: 'Aprende a optimizar la calidad de tu descanso con este módulo enfocado en la higiene del sueño. Descubrirás prácticas y rutinas basadas en la ciencia del sueño para despertar con más energía y vitalidad.',
    lessons: [
      {
        title: 'La ciencia del sueño',
        description: 'Conoce cómo funciona el sueño y por qué es tan importante para tu salud.',
        content: `
          <h1>La Ciencia del Sueño</h1>
          
          <p>El sueño es un proceso biológico fundamental, tan esencial para nuestra supervivencia como comer o respirar. Durante el sueño, nuestro cuerpo y mente realizan funciones críticas para mantenernos saludables, alertas y emocionalmente equilibrados.</p>
          
          <h2>¿Por qué dormimos?</h2>
          <p>Dormir no es simplemente un estado de inactividad. Es un período vital donde ocurren procesos de restauración y consolidación:</p>
          <ul>
            <li><strong>Restauración física:</strong> Reparación de tejidos, crecimiento muscular y liberación de hormonas importantes.</li>
            <li><strong>Consolidación de la memoria:</strong> El cerebro procesa la información del día, fortaleciendo recuerdos importantes y descartando lo irrelevante.</li>
            <li><strong>Regulación emocional:</strong> El sueño ayuda a procesar emociones y a mantener un estado de ánimo estable.</li>
            <li><strong>Limpieza cerebral:</strong> Se eliminan subproductos metabólicos tóxicos acumulados en el cerebro durante la vigilia.</li>
          </ul>

          <h2>Las Fases del Sueño</h2>
          <p>El sueño se compone de ciclos que alternan entre dos tipos principales: el sueño No-REM (NREM) y el sueño REM (Movimiento Rápido de los Ojos).</p>
          <ol>
            <li><strong>Sueño No-REM (NREM):</strong> Se divide en tres etapas:
                <ul>
                    <li><strong>Etapa N1 (Sueño Ligero):</strong> Transición entre la vigilia y el sueño. Dura pocos minutos. Es fácil despertarse.</li>
                    <li><strong>Etapa N2 (Sueño Ligero Profundo):</strong> Disminuye el ritmo cardíaco y la temperatura corporal. El cuerpo se prepara para el sueño profundo. Pasamos la mayor parte de nuestro tiempo de sueño en esta etapa.</li>
                    <li><strong>Etapa N3 (Sueño Profundo u Ondas Lentas):</strong> Es la etapa más restauradora físicamente. Es difícil despertar a alguien en esta fase. Es crucial para la reparación de tejidos, el crecimiento y el sistema inmunológico.</li>
                </ul>
            </li>
            <li><strong>Sueño REM:</strong> Se caracteriza por movimientos oculares rápidos, aumento de la actividad cerebral (similar a la vigilia), y parálisis muscular temporal. Es la etapa donde ocurren la mayoría de los sueños vívidos. Crucial para el aprendizaje, la memoria y el procesamiento emocional.</li>
          </ol>
          <p>Un ciclo completo de sueño dura aproximadamente 90-110 minutos y se repite varias veces durante la noche.</p>

          <h2>¿Cuántas horas necesitamos?</h2>
          <p>La cantidad de sueño necesaria varía según la edad y el individuo, pero aquí hay algunas pautas generales:</p>
          <ul>
            <li><strong>Adultos (18-64 años):</strong> 7-9 horas</li>
            <li><strong>Adultos mayores (65+ años):</strong> 7-8 horas</li>
            <li><strong>Adolescentes (14-17 años):</strong> 8-10 horas</li>
          </ul>

          <h2>Consecuencias de la privación del sueño</h2>
          <p>La falta crónica de sueño puede tener serias consecuencias para la salud:</p>
          <ul>
            <li>Dificultad para concentrarse y tomar decisiones.</li>
            <li>Problemas de memoria y aprendizaje.</li>
            <li>Irritabilidad y cambios de humor.</li>
            <li>Sistema inmunológico debilitado.</li>
            <li>Mayor riesgo de accidentes.</li>
            <li>Aumento del riesgo de condiciones crónicas como obesidad, diabetes, enfermedades cardiovasculares y depresión.</li>
          </ul>
          <p>En la próxima lección, aprenderemos cómo crear un ambiente y una rutina que favorezcan un sueño reparador.</p>
        `
      },
      {
        title: 'Creando una rutina nocturna efectiva',
        description: 'Diseña rituales nocturnos que preparen a tu cuerpo y mente para descansar.',
        content: `
          <h1>Creando una Rutina Nocturna Efectiva</h1>
          
          <p>Una rutina nocturna consistente y relajante es clave para preparar tu cuerpo y mente para un sueño de calidad. Esto se conoce como "higiene del sueño" e implica adoptar hábitos que promuevan un descanso óptimo.</p>
          
          <h2>Optimiza tu Entorno de Sueño</h2>
          <p>Tu dormitorio debe ser un santuario para el descanso. Considera estos factores:</p>
          <ul>
            <li><strong>Oscuridad:</strong> Usa cortinas opacas para bloquear la luz exterior. La oscuridad estimula la producción de melatonina, la hormona del sueño.</li>
            <li><strong>Temperatura:</strong> Mantén una temperatura fresca, generalmente entre 18-22°C (65-72°F).</li>
            <li><strong>Silencio:</strong> Minimiza los ruidos. Considera usar tapones para los oídos o una máquina de ruido blanco si es necesario.</li>
            <li><strong>Comodidad:</strong> Invierte en un colchón y almohadas cómodos y adecuados para ti.</li>
            <li><strong>Libre de distracciones:</strong> Evita tener televisores, computadoras o material de trabajo en el dormitorio.</li>
          </ul>

          <h2>Hábitos a Cultivar y Evitar</h2>
          
          <h3>Qué hacer:</h3>
          <ul>
            <li><strong>Establece un horario regular:</strong> Intenta acostarte y levantarte a la misma hora todos los días, incluso los fines de semana, para regular tu reloj biológico.</li>
            <li><strong>Crea un ritual relajante:</strong> Dedica 30-60 minutos antes de acostarte a actividades tranquilas como leer un libro (físico, no en pantalla), tomar un baño tibio, escuchar música suave o practicar técnicas de relajación.</li>
            <li><strong>Haz ejercicio regularmente:</strong> Pero evita el ejercicio intenso cerca de la hora de dormir.</li>
            <li><strong>Exponte a la luz natural durante el día:</strong> Esto ayuda a regular tu ciclo de sueño-vigilia.</li>
          </ul>

          <h3>Qué evitar:</h3>
          <ul>
            <li><strong>Cafeína y Nicotina:</strong> Evita estimulantes al menos 4-6 horas antes de dormir.</li>
            <li><strong>Alcohol:</strong> Aunque puede ayudarte a conciliar el sueño inicialmente, interrumpe los ciclos de sueño más tarde en la noche.</li>
            <li><strong>Comidas pesadas o picantes:</strong> Pueden causar indigestión o malestar. Si tienes hambre, opta por un snack ligero.</li>
            <li><strong>Líquidos en exceso:</strong> Para evitar interrupciones para ir al baño.</li>
            <li><strong>Pantallas (teléfonos, tablets, TV, computadoras):</strong> La luz azul que emiten suprime la melatonina. Deja de usarlas al menos una hora antes de acostarte.</li>
            <li><strong>Siestas largas o tardías:</strong> Si necesitas una siesta, que sea corta (20-30 minutos) y temprano en la tarde.</li>
            <li><strong>Preocupaciones en la cama:</strong> Si no puedes dormir después de 20 minutos, levántate, ve a otra habitación y haz algo relajante hasta que sientas sueño nuevamente.</li>
          </ul>
          <p>Implementar estos cambios gradualmente puede marcar una gran diferencia en la calidad de tu sueño.</p>
        `
      },
      {
        title: 'Meditaciones para el sueño profundo',
        description: 'Prácticas guiadas específicamente diseñadas para inducir un sueño reparador.',
        content: `
          <h1>Meditaciones para el Sueño Profundo</h1>
          
          <p>La meditación y las técnicas de relajación pueden ser herramientas muy efectivas para calmar la mente, reducir la ansiedad y preparar el cuerpo para un sueño reparador. Si te cuesta desconectar por la noche, estas prácticas pueden ayudarte.</p>
          
          <h2>¿Cómo ayuda la meditación al sueño?</h2>
          <ul>
            <li><strong>Calma el sistema nervioso:</strong> Activa la respuesta de relajación (sistema nervioso parasimpático), contrarrestando el estrés.</li>
            <li><strong>Reduce los pensamientos rumiantes:</strong> Ayuda a observar los pensamientos sin engancharse en ellos, disminuyendo la "mente ocupada" que impide dormir.</li>
            <li><strong>Aumenta la conciencia corporal:</strong> Permite identificar y liberar tensiones físicas.</li>
            <li><strong>Mejora la producción de melatonina:</strong> Al reducir el estrés y la ansiedad.</li>
          </ul>

          <h2>Técnicas de Meditación para Dormir</h2>
          
          <h3>1. Relajación Muscular Progresiva</h3>
          <p>Esta técnica consiste en tensar y relajar sistemáticamente diferentes grupos musculares.</p>
          <ol>
            <li>Acuéstate cómodamente en tu cama.</li>
            <li>Comienza por los pies: tensa los músculos de los pies durante 5 segundos y luego relájalos completamente durante 10-15 segundos, notando la diferencia.</li>
            <li>Sube lentamente por el cuerpo: pantorrillas, muslos, glúteos, abdomen, pecho, brazos, hombros, cuello y cara.</li>
            <li>Concéntrate en la sensación de relajación profunda en cada área.</li>
          </ol>

          <h3>2. Escaneo Corporal (Body Scan) Enfocado al Sueño</h3>
          <p>Similar a la relajación progresiva, pero sin tensar. Se trata de llevar la atención a cada parte del cuerpo.</p>
          <ol>
            <li>Acuéstate y cierra los ojos.</li>
            <li>Dirige tu atención a la respiración por unos momentos.</li>
            <li>Comienza por los dedos de los pies, sintiendo cualquier sensación presente (hormigueo, calor, presión) sin juzgar.</li>
            <li>Lentamente, mueve tu atención hacia arriba: pies, tobillos, piernas, etc., hasta llegar a la coronilla.</li>
            <li>Permite que cada parte de tu cuerpo se sienta pesada y relajada al llevar tu atención a ella. Si te distraes, suavemente regresa tu atención.</li>
          </ol>
          
          <h3>3. Visualización Guiada</h3>
          <p>Imagina un lugar tranquilo y pacífico. Puede ser una playa, un bosque, o cualquier sitio que te transmita calma.</p>
          <ol>
            <li>Acuéstate cómodamente.</li>
            <li>Cierra los ojos e imagina todos los detalles de tu lugar seguro: los sonidos, los olores, las texturas, la temperatura.</li>
            <li>Sumérgete en la sensación de paz y seguridad de ese lugar.</li>
            <li>Permanece en esta visualización, permitiendo que tu cuerpo se relaje cada vez más.</li>
          </ol>
          
          <h3>4. Meditación de Respiración Consciente</h3>
          <p>Simplemente enfócate en tu respiración.</p>
          <ol>
            <li>Nota la sensación del aire entrando y saliendo de tu cuerpo.</li>
            <li>Puedes contar tus respiraciones (ej. inhala 1, exhala 2... hasta 10, y vuelve a empezar) para mantener la concentración.</li>
            <li>Si tu mente divaga, reconócelo amablemente y regresa tu atención a la respiración.</li>
          </ol>
          
          <h2>Consejos para Meditar en la Cama</h2>
          <ul>
            <li><strong>Intención:</strong> Tu objetivo es relajarte y permitir que el sueño llegue, no "forzarte" a dormir.</li>
            <li><strong>Comodidad:</strong> Asegúrate de estar en una posición cómoda.</li>
            <li><strong>Sin expectativas:</strong> No te preocupes si no te duermes inmediatamente. La relajación en sí misma es beneficiosa.</li>
            <li><strong>Consistencia:</strong> Como cualquier habilidad, la meditación se vuelve más efectiva con la práctica regular.</li>
          </ul>
          <p>Experimenta con estas técnicas y encuentra la que mejor te funcione. ¡Dulces sueños!</p>
        `
      }
    ]
  }
};

function LessonContent({ content }: { content: string }) {
  return (
    <div 
      className="prose prose-slate max-w-none"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}

export function ModuleDetailPage() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [activeLesson, setActiveLesson] = useState<number | null>(null);
  const [progress, setProgress] = useState<{[key: string]: boolean[]}>({});
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Cargar progreso desde Firebase si el usuario está autenticado
    const loadProgress = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }
      
      try {
        setIsLoading(true);
        // Crear una referencia al documento de progreso del usuario
        const progressDocRef = doc(firestore, `users/${user.uid}/progress/modules`);
        const progressDoc = await getDoc(progressDocRef);
        
        if (progressDoc.exists()) {
          setProgress(progressDoc.data() as {[key: string]: boolean[]});
          console.log('Progreso cargado correctamente desde Firebase');
        } else {
          console.log('No se encontró progreso guardado en Firebase');
          // Cargar desde localStorage como respaldo
          const savedProgress = localStorage.getItem('moduleProgress');
          if (savedProgress) {
            setProgress(JSON.parse(savedProgress));
            console.log('Progreso cargado desde localStorage');
          }
        }
      } catch (error) {
        console.error('Error al cargar el progreso:', error);
        // Cargar desde localStorage como respaldo
        const savedProgress = localStorage.getItem('moduleProgress');
        if (savedProgress) {
          setProgress(JSON.parse(savedProgress));
        }
      } finally {
        setIsLoading(false);
      }
    };
    
    loadProgress();
  }, [user]);
  
  if (!moduleId || !modulesData[moduleId as keyof typeof modulesData]) {
    return <div className="p-4 text-center">Módulo no encontrado</div>;
  }
  
  const module = modulesData[moduleId as keyof typeof modulesData];
  
  // Obtener o inicializar el progreso del módulo actual
  const moduleProgress = progress[moduleId] || Array(module.lessons.length).fill(false);
  
  const markLessonComplete = async (lessonIndex: number) => {
    const updatedModuleProgress = [...moduleProgress];
    updatedModuleProgress[lessonIndex] = true;
    
    const updatedProgress = {
      ...progress,
      [moduleId]: updatedModuleProgress
    };
    
    setProgress(updatedProgress);
    
    // Guardar en localStorage como respaldo
    localStorage.setItem('moduleProgress', JSON.stringify(updatedProgress));
    
    // Guardar en Firebase si el usuario está autenticado
    if (user) {
      try {
        // Crear una referencia al documento de progreso del usuario
        const progressDocRef = doc(firestore, `users/${user.uid}/progress/modules`);
        
        // Guardar los datos con merge: true para no sobrescribir otros módulos
        await setDoc(progressDocRef, updatedProgress, { merge: true });
        
        console.log('Progreso guardado correctamente en Firebase');
      } catch (error) {
        console.error('Error al guardar el progreso:', error);
      }
    }
  };
  
  const startModule = () => {
    setActiveLesson(0);
  };
  
  const nextLesson = () => {
    if (activeLesson !== null && activeLesson < module.lessons.length - 1) {
      markLessonComplete(activeLesson);
      setActiveLesson(activeLesson + 1);
    } else if (activeLesson === module.lessons.length - 1) {
      // Completar última lección
      markLessonComplete(activeLesson);
      setActiveLesson(null);
    }
  };
  
  const completedLessons = moduleProgress.filter(Boolean).length;
  const completionPercentage = Math.round((completedLessons / module.lessons.length) * 100);
  
  if (isLoading) {
    return (
      <div className="py-6 flex justify-center">
        <div className="w-8 h-8 border-t-2 border-splash border-solid rounded-full animate-spin"></div>
      </div>
    );
  }
  
  if (activeLesson !== null) {
    const lesson = module.lessons[activeLesson];
    
    return (
      <div className="py-6">
        <button 
          onClick={() => setActiveLesson(null)}
          className="mb-4 flex items-center text-splash"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Volver al módulo
        </button>
        
        <div className="bg-white rounded-lg shadow-md p-5 mb-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-gray-500">
              Lección {activeLesson + 1} de {module.lessons.length}
            </span>
            <div className="w-24 bg-gray-200 rounded-full h-2">
              <div className="bg-splash h-2 rounded-full" style={{ width: `${((activeLesson + 1) / module.lessons.length) * 100}%` }}></div>
            </div>
          </div>
          
          <LessonContent content={lesson.content} />
        </div>
        
        <div className="flex justify-between">
          <button 
            onClick={() => setActiveLesson(null)}
            className="py-2 px-4 border border-gray-300 rounded-lg text-gray-700"
          >
            Guardar y salir
          </button>
          
          <button 
            onClick={nextLesson}
            className="bg-splash text-white py-2 px-6 rounded-lg font-medium hover:bg-opacity-90 transition-colors"
          >
            {activeLesson < module.lessons.length - 1 ? 'Siguiente lección' : 'Finalizar módulo'}
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="py-6">
      <button 
        onClick={() => navigate(-1)}
        className="mb-4 flex items-center text-splash"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        Volver
      </button>
      
      <h1 className="text-2xl font-bold text-splash mb-4">{module.title}</h1>
      
      <div className="bg-white rounded-lg shadow-md p-5 mb-6">
        <p className="text-gray-700 mb-6">{module.description}</p>
        
        {completedLessons > 0 && (
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-1">
              <span>Progreso</span>
              <span>{completionPercentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-splash h-2.5 rounded-full" style={{ width: `${completionPercentage}%` }}></div>
            </div>
          </div>
        )}
        
        <h2 className="text-xl font-semibold text-splash mb-4">Lecciones</h2>
        
        <div className="space-y-4">
          {module.lessons.map((lesson, index) => (
            <div 
              key={index} 
              className={`border rounded-lg p-4 ${moduleProgress[index] ? 'border-green-200 bg-green-50' : 'border-gray-200'}`}
              onClick={() => setActiveLesson(index)}
            >
              <div className="flex items-start cursor-pointer">
                <div className={`w-8 h-8 flex items-center justify-center flex-shrink-0 mr-3 rounded-full ${moduleProgress[index] ? 'bg-green-100 text-green-600' : 'bg-secondary-100 text-splash'}`}>
                  {moduleProgress[index] ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    index + 1
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{lesson.title}</h3>
                  <p className="mt-1 text-sm text-gray-500">{lesson.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <button 
        className="w-full bg-splash text-white py-3 px-4 rounded-lg font-medium hover:bg-opacity-90 transition-colors"
        onClick={startModule}
      >
        {completedLessons > 0 ? 'Continuar módulo' : 'Comenzar módulo'}
      </button>
    </div>
  );
} 