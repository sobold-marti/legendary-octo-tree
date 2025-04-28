import { useState } from "react";

export default function ModalTrigger({ text, content }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    if (!text) return null;
  
    function handleModal() {
      setIsModalOpen(prev => !prev);
    }

    function handleOverlayClick(e) {
      if (e.target === e.currentTarget) {
        handleModal();
      }
    }

    return (
      <>
        <button onClick={handleModal} className="absolute inset-0 m-auto bg-yellow-300 w-fit h-fit p-5 rounded-xl">
          {text}
        </button>
        {isModalOpen &&
            // ModalContent
            <div onClick={handleOverlayClick} className="modal fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="modal-content bg-white p-8 rounded-md relative w-[90%]">
              <button onClick={handleModal} className="absolute top-2 right-2 text-2xl">&times;</button>
              {content}
            </div>
          </div>
        }
      </>
    );
}
