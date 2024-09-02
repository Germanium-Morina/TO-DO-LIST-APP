import { useEffect, useState } from "react";

function useVerticalScrollbar(ref) {
  const [isDragging, setIsDragging] = useState(false);
  const [showScrollbar, setShowScrollbar] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isThumbHovered, setIsThumbHovered] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const track = element.parentElement.querySelector(".scrollbar-container");
    const thumb = element.parentElement.querySelector(".scrollbar-thumb");

    if (!track || !thumb) {
      console.error("Scrollbar elements not found");
      return;
    }

    const updateScrollbar = () => {
      const { scrollHeight, clientHeight } = element;

      if (scrollHeight > clientHeight) {
        setShowScrollbar(true);
        const thumbHeight = Math.max(
          (clientHeight / scrollHeight) * clientHeight,
          30
        );
        thumb.style.height = `${thumbHeight}px`;
      } else {
        setShowScrollbar(false);
      }
    };

    const handleScroll = () => {
      const { scrollHeight, clientHeight, scrollTop } = element;

      const thumbHeight = Math.max(
        (clientHeight / scrollHeight) * clientHeight,
        30
      );
      const thumbTop =
        (scrollTop / (scrollHeight - clientHeight)) *
        (track.offsetHeight - thumbHeight);
      thumb.style.top = `${thumbTop}px`;
    };

    const handleThumbMouseDown = (event) => {
      setIsDragging(true);
      track.classList.add("scrollbar-active");
      thumb.classList.add("scrollbar-active");

      const startY = event.clientY;
      const startScrollTop = element.scrollTop;

      const handleMouseMove = (e) => {
        const deltaY = e.clientY - startY;
        const scrollPercentage =
          deltaY / (track.offsetHeight - thumb.offsetHeight);
        element.scrollTop =
          startScrollTop +
          scrollPercentage * (element.scrollHeight - element.clientHeight);
        handleScroll();
      };

      const handleMouseUp = () => {
        setIsDragging(false);
        track.classList.remove("scrollbar-active");
        thumb.classList.remove("scrollbar-active");
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);

      event.preventDefault();
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
      updateScrollbar();
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
    };

    const handleThumbMouseEnter = () => {
      setIsThumbHovered(true);
    };

    const handleThumbMouseLeave = () => {
      setIsThumbHovered(false);
    };

    thumb.addEventListener("mousedown", handleThumbMouseDown);
    element.addEventListener("scroll", handleScroll);
    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);
    thumb.addEventListener("mouseenter", handleThumbMouseEnter);
    thumb.addEventListener("mouseleave", handleThumbMouseLeave);

    // Initialize scrollbar
    updateScrollbar();

    // Cleanup
    return () => {
      thumb.removeEventListener("mousedown", handleThumbMouseDown);
      element.removeEventListener("scroll", handleScroll);
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
      thumb.removeEventListener("mouseenter", handleThumbMouseEnter);
      thumb.removeEventListener("mouseleave", handleThumbMouseLeave);
    };
  }, [ref, isDragging]);

  return { isDragging, showScrollbar, isHovered, isThumbHovered };
}

export default useVerticalScrollbar;
