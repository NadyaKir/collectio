import { useState } from "react";
import TicketModal from "./TicketModal";

export default function Footer() {
  const [isOpen, setOpen] = useState(false);

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <div className="flex justify-center py-4">
      {isOpen && <TicketModal closeModal={closeModal} />}
      <button
        className="text-sm text-gray-600 no-underline hover:underline"
        onClick={openModal}
      >
        Create support ticket
      </button>
    </div>
  );
}
