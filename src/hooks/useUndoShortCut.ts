import { useEffect } from "react";

/**
 * Custom hook that listens for the "Ctrl + Z" keyboard shortcut and executes a callback function.
 *
 * @param {() => void} callback - The function to be executed when "Ctrl + Z" is pressed.
 */
const useUndoShortcut = (callback: () => void) => {
  useEffect(() => {
    /**
     * Handles the keydown event and triggers the callback if "Ctrl + Z" is pressed.
     *
     * @param {KeyboardEvent} event - The keyboard event object.
     */
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === "z") {
        event.preventDefault();
        callback();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [callback]);
};

export default useUndoShortcut;
