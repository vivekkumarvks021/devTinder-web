import { useState } from "react";

const useSwipe = ({
  onSwipeLeft,
  onSwipeRight,
  disabled = false,
  threshold = 100,
}) => {
  const [startX, setStartX] = useState(null);
  const [currentX, setCurrentX] = useState(0);
  const [dragging, setDragging] = useState(false);

  const handlePointerDown = (e) => {
    if (disabled) return;
    console.log(e.clientX, "start");

    setStartX(e.clientX);
    setDragging(true);

    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!dragging || startX === null) return;

    const difference = e.clientX - startX;
    console.log("Kitna move hua", difference);

    setCurrentX(difference);
  };

  const handlePointerUp = () => {
    if (!dragging) return;

    if (currentX > threshold) {
      onSwipeRight?.();
    } else if (currentX < -threshold) {
      onSwipeLeft?.();
    }

    setStartX(null);
    setCurrentX(0);
    setDragging(false);
  };

  return {
    currentX,
    dragging,

    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
  };
};

export default useSwipe;
