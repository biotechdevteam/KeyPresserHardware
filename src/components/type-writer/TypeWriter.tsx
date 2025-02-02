import React, { useState, useEffect } from "react";

interface TypewriterProps {
  phrases: string[];
  typingSpeed?: number; // Typing speed in milliseconds (optional)
  pauseDuration?: number; // Pause time after each phrase (optional)
  loop?: boolean; // Whether the typewriter should restart after completion (optional)
  onComplete?: () => void; // Callback when all phrases are typed (optional)
}

const Typewriter: React.FC<TypewriterProps> = ({
  phrases,
  typingSpeed = 100, // Default: 100ms per character
  pauseDuration = 1000, // Default: 1s pause after phrase
  loop = false, // Default: No looping
  onComplete,
}) => {
  const [currentPhrase, setCurrentPhrase] = useState(""); // Current phrase being typed
  const [currentIndex, setCurrentIndex] = useState(0); // Current index in phrases array
  const [charIndex, setCharIndex] = useState(0); // Current index of character in a phrase

  useEffect(() => {
    if (charIndex < phrases[currentIndex].length) {
      const typeInterval = setTimeout(() => {
        setCurrentPhrase((prev) => prev + phrases[currentIndex][charIndex]);
        setCharIndex((prev) => prev + 1);
      }, typingSpeed);

      return () => clearTimeout(typeInterval);
    } else if (charIndex === phrases[currentIndex].length) {
      // Pause before moving to the next phrase
      const phrasePauseTimeout = setTimeout(() => {
        if (currentIndex < phrases.length - 1) {
          setCurrentIndex((prev) => prev + 1);
          setCurrentPhrase("");
          setCharIndex(0); // Reset character index for the next phrase
        } else if (loop) {
          // Restart typing from the first phrase after a delay
          setTimeout(() => {
            setCurrentIndex(0);
            setCurrentPhrase("");
            setCharIndex(0);
          }, pauseDuration);
        } else if (onComplete) {
          onComplete(); // Notify parent component when typing is complete
        }
      }, pauseDuration);

      return () => clearTimeout(phrasePauseTimeout);
    }
  }, [
    charIndex,
    currentIndex,
    typingSpeed,
    phrases,
    loop,
    pauseDuration,
    onComplete,
  ]);

  return <span>{currentPhrase}</span>;
};

export default Typewriter;
