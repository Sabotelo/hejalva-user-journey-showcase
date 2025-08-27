import { useState } from "react";
import { Clock } from "lucide-react";

export default function SimpleDialog() {
  const [isOpen, setIsOpen] = useState(false);

  console.log('SimpleDialog render, isOpen:', isOpen);

  const handleClick = () => {
    console.log('Simple dialog button clicked!');
    setIsOpen(true);
  };

  return (
    <>
      <button 
        onClick={handleClick}
        className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium border-2 border-primary/20 hover:border-primary/40 hover:bg-primary/5 rounded-lg transition-colors"
      >
        <Clock className="mr-2 h-5 w-5" />
        Schedule Business Meeting (Test)
      </button>

      {isOpen && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50" 
          onClick={() => setIsOpen(false)}
        >
          <div 
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full mx-4 relative z-[10000]" 
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold mb-4 text-black dark:text-white">Test Dialog</h3>
            <p className="mb-4 text-gray-700 dark:text-gray-300">This is a test dialog to see if modals work at all.</p>
            <button 
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}