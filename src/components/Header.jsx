import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import NewChallenge from './NewChallenge.jsx';

export default function Header() {
  const [isCreatingNewChallenge, setIsCreatingNewChallenge] = useState();

  function handleStartAddNewChallenge() {
    setIsCreatingNewChallenge(true);
  }

  function handleDone() {
    setIsCreatingNewChallenge(false);
  }

  return (
    <>
    <AnimatePresence>{isCreatingNewChallenge && <NewChallenge onDone={handleDone} />}</AnimatePresence>  {/* AnimatePresence is used here to check wether an exit animation is present and waits to play the exit animation before the component unmounts */}
      <header id="main-header">
        <h1>Your Challenges</h1>
        <motion.button 
        whileHover={{scale: 1.1}}  // to change button size while hovering
        transition={{type: 'spring', stiffness: 500}} // to add bouncy effect to button when hovered. we can also play around mass prop
        onClick={handleStartAddNewChallenge} className="button">
          Add Challenge
        </motion.button>
      </header>
    </>
  );
}
