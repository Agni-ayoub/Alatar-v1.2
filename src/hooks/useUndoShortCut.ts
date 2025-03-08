import { useEffect } from "react";

/**
 * Custom hook that listens for the "Ctrl + Z" keyboard shortcut and executes a callback function.
 *
 * @param {() => void} callback - The function to be executed when "Ctrl + Z" is pressed.
 * @param {boolean} condition - The condition wheter the undo should happen or not.
 */
const useUndoShortcut = (callback: () => void, condition?: boolean) => {
  useEffect(() => {
    /**
     * Handles the keydown event and triggers the callback if "Ctrl + Z" is pressed.
     *
     * @param {KeyboardEvent} event - The keyboard event object.
     */
    const handleKeyDown = (event: KeyboardEvent) => {
      if(condition) return;
      if (event.ctrlKey && event.key === "z") {
        event.preventDefault();
        callback();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [callback, condition]);
};

export default useUndoShortcut;
