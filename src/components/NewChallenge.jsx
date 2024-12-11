import { useContext, useRef, useState } from 'react';
import {  motion, stagger, useAnimate } from 'framer-motion';

import { ChallengesContext } from '../store/challenges-context.jsx';
import Modal from './Modal.jsx';
import images from '../assets/images.js';

export default function NewChallenge({ onDone }) {
  const title = useRef();
  const description = useRef();
  const deadline = useRef();

  const [scope, animate] = useAnimate(); // to handle element animations imperatively


  const [selectedImage, setSelectedImage] = useState(null);
  const { addChallenge } = useContext(ChallengesContext);
  const [errorMessages, setErrorMessages] = useState("");

  function handleSelectImage(image) {
    setSelectedImage(image);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const challenge = {
      title: title.current.value,
      description: description.current.value,
      deadline: deadline.current.value,
      image: selectedImage,
    };

    if (
      !challenge.title.trim() ||
      !challenge.description.trim() ||
      !challenge.deadline.trim() ||
      !challenge.image
    ) {
      setErrorMessages("error");
      animate (
        'input, textarea, .error',
        { x: [-10, 0, 10 , 0], borderColor: "red", color: "red"},
        { type: 'spring', duration: 0.2, delay: stagger(0.05)}
      )
      // first parameter is the list of tags u want to animate, u can use classname instead, 2nd is like the animate prop, third is like the transition prop
      return;
    }

    onDone();
    addChallenge(challenge);
  }

  return (
    <Modal title="New Challenge" onClose={onDone}>
      <form id="new-challenge" onSubmit={handleSubmit} ref={scope}> 
        <p>
          <label htmlFor="title" className='error'>Title</label>
          <input ref={title} type="text" name="title" id="title" />
          {errorMessages && <p className='error'>{errorMessages}</p>}
          {/* here we wanted to animate the p tag using framer motion , using the animate function */}
        </p>
        

        <p>
          <label htmlFor="description">Description</label>
          <textarea ref={description} name="description" id="description" />
        </p>

        <p>
          <label htmlFor="deadline">Deadline</label>
          <input ref={deadline} type="date" name="deadline" id="deadline" />
        </p>

        <motion.ul id="new-challenge-images" variants={{
          visible: {transition: {staggerChildren: 0.05}}, // the staggeredChildren is used to display the li one after other by a delay of 0.05
        }} >
          {images.map((image) => (
            <motion.li
              variants={{
                hidden: {opacity: 0, scale: 0.5},
                visible: {opacity: 1, scale: [0.8, 1.3, 1]}, //adding keyframes to the image so that they can first appear on the screen at 80% then 130% and finally on 100%
              }} // inherits the parent prop where we have used hidden and visible for ex: here the parent component is modal and the hidden and visible variants are set to initial, exit and animate so here also in this li it will be set to initial exit and animate.
              // exit={{opacity: 1, scale: 1}} //overwrites the parent prop
              transition={{type: 'spring'}}
              key={image.alt}
              onClick={() => handleSelectImage(image)}
              className={selectedImage === image ? 'selected' : undefined}
            >
              <img {...image} />
            </motion.li>
          ))}
        </motion.ul>

        <p className="new-challenge-actions">
          <button type="button" onClick={onDone}>
            Cancel
          </button>
          <button>Add Challenge</button>
        </p>
      </form>
    </Modal>
  );
}
