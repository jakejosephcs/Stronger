import { ICON_NAME } from "../../utils";

function Modal({ children, toggleModal, title }) {
  const CloseIcon = ICON_NAME["CloseIcon"];
  return (
    <div className="bg-black bg-opacity-50 fixed inset-0 flex justify-center items-center h-screen">
      <div className="bg-gray-200 max-w-sm flex flex-col mx-auto items-center px-6 py-6 relative rounded">
        <button className="absolute top-2 right-2" onClick={toggleModal}>
          <CloseIcon />
        </button>
        <h3 className="mt-2 font-bold mb-3">{title}</h3>
        {children}
      </div>
    </div>
  );
}

export default Modal;
