
const Modal = ({ isOpen, onClose, children }: any) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white relative flex justify-center items-center">
          <button onClick={onClose} className="absolute top-2 right-2 text-xl font-bold bg-black/5 px-4 p-2 rounded-full">
            &times;
          </button>
          {children}
        </div>
      </div>
    );
  };
  
  export default Modal;