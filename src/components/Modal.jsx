import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';

export default function Modal({ title, children, onClose }) {
  return createPortal(
    <>
      <div className="backdrop" onClick={onClose} />
      <motion.dialog
      initial={{opacity: 0, y: 30}} // for initial animation when the component mounts
      animate={{opacity: 1, y: 0}}
      exit={{opacity: 0, y: 30}} // animate when disappears or when the component unmounts
       open className="modal">
        <h2>{title}</h2>
        {children}
      </motion.dialog>
    </>,
    document.getElementById('modal') 
  );
}
