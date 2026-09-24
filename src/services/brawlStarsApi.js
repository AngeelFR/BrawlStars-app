import axios from 'axios';

const BASE_URL = 'https://api.brawlapi.com/v1';


const CLASS_TRANSLATIONS = {
  'Damage Dealer': 'Destructor',
  'Tank': 'Tanque',
  'Marksman': 'Tirador',
  'Artillery': 'Artillería',
  'Controller': 'Controlador',
  'Assassin': 'Asesino',
  'Support': 'Apoyo',
  'Hybrid': 'Híbrido'
};


const LOCAL_DESCRIPTIONS = {
  'Vince': 'Vince atiende la cafetera espresso y a sus amigos de muchas patas. Camina despacio por su Creepy Café cuidando no pisar a ninguno.',
  'Cosmo': 'Cosmo es el astrónomo principal del Observatorio de Starr Park. Además de enseñar el universo a los visitantes, pasa el tiempo observando las estrellas.',
  'Wendy': 'Una científica inteligente con un alma nostálgica. Tras años trabajando en laboratorios corporativos sombríos, los dejó para construir Windstock y ayudar al planeta.'
};

export const fetchBrawlers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/brawlers`);
    const list = response.data.list || [];

    return list.map((brawler) => {
      const rawClass = brawler.class?.name || brawler.class || 'Brawler';
      const translatedClass = CLASS_TRANSLATIONS[rawClass] || rawClass;
      
      
      const translatedDescription = LOCAL_DESCRIPTIONS[brawler.name] || brawler.description || '';

      return {
        ...brawler,
        classNameTranslated: translatedClass,
        descriptionTranslated: translatedDescription,
        imageUrl:
          brawler.images?.image ||
          brawler.images?.icon ||
          brawler.imageUrl ||
          brawler.iconUrl
      };
    });
  } catch (error) {
    if (error.response) {
      throw new Error(`Error en el servidor (${error.response.status}): Inténtalo más tarde.`);
    } else if (error.request) {
      throw new Error('Error de conexión. Verifica tu acceso a internet.');
    } else {
      throw new Error('Error inesperado al solicitar los datos de Brawl Stars.');
    }
  }
};