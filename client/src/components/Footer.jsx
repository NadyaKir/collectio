import { useState } from "react";
import { useSelector } from "react-redux";
import TicketModal from "./TicketModal";

export default function Footer() {
  const [isOpen, setOpen] = useState(false);

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <>
      {isAuthenticated && (
        <div className="flex justify-center py-4">
          {isOpen && <TicketModal closeModal={closeModal} />}
          <button
            className="text-sm text-gray-600 no-underline hover:underline"
            onClick={openModal}
          >
            Create support ticket
          </button>
        </div>
      )}
    </>
  );
}
