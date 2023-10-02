import './Modal.scss'

interface ModalProps {
  children: JSX.Element | null;
}

const Modal = ({ children }: ModalProps) => {
  return (
    <>
      <div className="overlay"></div>
      {children}
    </>
  );
};

export default Modal;
