// src/components/FeedbackState.jsx
import React from 'react';
import { Loader2, AlertCircle } from 'lucide-react';

export const LoadingState = () => (
  <div className="flex flex-col items-center justify-center py-20 space-y-4">
    <Loader2 className="w-12 h-12 text-yellow-400 animate-spin" />
    <p className="text-lg font-extrabold text-yellow-400 tracking-wider uppercase">
      Cargando Brawlers...
    </p>
  </div>
);

export const ErrorState = ({ message, onRetry }) => (
  <div className="max-w-md mx-auto my-10 p-6 bg-red-900/80 border-l-4 border-red-500 rounded-r-xl shadow-2xl text-center backdrop-blur-md">
    <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-3" />
    <h3 className="text-xl font-black text-white uppercase mb-1">Error de Conexión</h3>
    <p className="text-sm text-red-200 mb-4">{message}</p>
    <button
      onClick={onRetry}
      className="px-5 py-2.5 bg-yellow-400 text-slate-950 font-black uppercase rounded-xl hover:bg-yellow-300 transition-colors shadow-lg"
    >
      Reintentar
    </button>
  </div>
);