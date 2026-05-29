import { createContext, useContext, useState } from 'react';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export function ToastProvider({ children }) {
    const [toast, setToast] = useState(null);

    const showToast = (message) => {
        setToast(message);
        setTimeout(() => setToast(null), 3000);
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            {toast && (
                <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-neutral-900 text-white px-6 py-3 rounded-lg shadow-lg z-[100] animate-toast-slide">
                    {toast}
                </div>
            )}
        </ToastContext.Provider>
    );
}
