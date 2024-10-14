import React, { useState, useEffect } from "react";

interface TypewriterProps {
  phrases: string[];
  typingSpeed?: number; // Typing speed in milliseconds (optional)
  onComplete: () => void; // Callback when all phrases have been typed
}

const Typewriter: React.FC<TypewriterProps> = ({
  phrases,
  typingSpeed = 100, // Default typing speed is 100ms per character
  onComplete,
}) => {
  const [currentPhrase, setCurrentPhrase] = useState(""); // Current phrase being typed
  const [currentIndex, setCurrentIndex] = useState(0); // Current index of phrases array
  const [charIndex, setCharIndex] = useState(0); // Current index of character in a phrase

  useEffect(() => {
    if (charIndex < phrases[currentIndex].length) {
      const typeInterval = setTimeout(() => {
        setCurrentPhrase((prev) => prev + phrases[currentIndex][charIndex]);
        setCharIndex((prev) => prev + 1);
      }, typingSpeed);

      return () => clearTimeout(typeInterval);
    } else if (charIndex === phrases[currentIndex].length) {
      // When phrase is fully typed, wait and move to the next
      const phrasePauseTimeout = setTimeout(() => {
        if (currentIndex < phrases.length - 1) {
          setCurrentIndex((prev) => prev + 1);
          setCurrentPhrase("");
          setCharIndex(0); // Reset character index for the next phrase
        } else {
          onComplete(); // Notify parent component when typing is complete
        }
      }, 1000); // Pause for 1 second after the phrase is fully typed

      return () => clearTimeout(phrasePauseTimeout);
    }
  }, [charIndex, currentIndex, typingSpeed, phrases, onComplete]);

  return <span>{currentPhrase}</span>;
};

export default Typewriter;
