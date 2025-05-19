import { useState, useEffect } from 'react';
import { collection, addDoc, query, orderBy, where, Timestamp, onSnapshot } from 'firebase/firestore';
import { firestore } from '../firebase/config';
import { useAuthContext } from '../context/AuthContext';

interface JournalEntry {
  id: string;
  content: string;
  createdAt: Timestamp;
  userId: string;
}

export function JournalPage() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [newEntry, setNewEntry] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuthContext();
  
  // Cargar entradas del diario
  useEffect(() => {
    if (!user) return;
    
    setIsLoading(true);
    setError(null);
    
    const entriesRef = collection(firestore, 'journal');
    const q = query(
      entriesRef,
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );
    
    // Use onSnapshot instead of getDocs to set up a listener with cleanup
    const unsubscribe = onSnapshot(q, 
      (querySnapshot) => {
        const entryList: JournalEntry[] = [];
        
        querySnapshot.forEach((doc) => {
          entryList.push({
            id: doc.id,
            ...doc.data()
          } as JournalEntry);
        });
        
        setEntries(entryList);
        setIsLoading(false);
      },
      (err) => {
        console.error('Error fetching journal entries:', err);
        setError('No se pudieron cargar las entradas. Intenta nuevamente.');
        setIsLoading(false);
      }
    );
    
    // Return the unsubscribe function to clean up the listener when the component unmounts
    return () => unsubscribe();
  }, [user]);
  
  // Guardar nueva entrada
  const saveEntry = async () => {
    if (!user) return;
    if (!newEntry.trim()) return;
    
    try {
      setIsLoading(true);
      setError(null);
      
      const entryData = {
        content: newEntry,
        createdAt: Timestamp.now(),
        userId: user.uid
      };
      
      const docRef = await addDoc(collection(firestore, 'journal'), entryData);
      
      setEntries([
        {
          id: docRef.id,
          ...entryData
        } as JournalEntry,
        ...entries
      ]);
      
      setNewEntry('');
    } catch (err) {
      console.error('Error saving journal entry:', err);
      setError('No se pudo guardar la entrada. Intenta nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Formato de fecha
  const formatDate = (timestamp: Timestamp) => {
    const date = timestamp.toDate();
    return new Intl.DateTimeFormat('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  return (
    <div className="py-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Mi Diario</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
          <p>{error}</p>
        </div>
      )}
      
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <h2 className="text-lg font-medium text-gray-900 mb-3">Nueva entrada</h2>
        <textarea
          value={newEntry}
          onChange={(e) => setNewEntry(e.target.value)}
          placeholder="¿Cómo te sientes hoy? Escribe tus pensamientos..."
          className="w-full h-32 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-splash focus:border-splash"
        />
        <button
          onClick={saveEntry}
          disabled={isLoading || !newEntry.trim()}
          className="mt-3 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-splash hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-splash disabled:opacity-50"
        >
          {isLoading ? 'Guardando...' : 'Guardar entrada'}
        </button>
      </div>
      
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Entradas anteriores</h2>
      
      {entries.length === 0 ? (
        <p className="text-gray-500 text-center py-6">No hay entradas aún. Comienza escribiendo tus pensamientos.</p>
      ) : (
        <div className="space-y-4">
          {entries.map((entry) => (
            <div key={entry.id} className="bg-white rounded-lg shadow-md p-4">
              <p className="text-gray-500 text-sm mb-2">{formatDate(entry.createdAt)}</p>
              <p className="text-gray-700 whitespace-pre-wrap">{entry.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 