'use client';

interface Props {
  onClose: () => void;
}

export default function ProfileModal({ onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-gray-900 p-8 rounded-lg max-w-sm w-full">
        <h3 className="text-xl font-bold mb-4">Mi Perfil</h3>
        <p>Contenido del modal...</p>
        <button
          onClick={onClose}
          className="mt-6 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}
