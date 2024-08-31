import { useEffect, useState } from "react";

function useHorizontalScrollbar(ref) {
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const track = element.parentElement.querySelector(
      ".horizontal-scrollbar-container"
    );
    const thumb = element.parentElement.querySelector(
      ".horizontal-scrollbar-thumb"
    );
    const verticalScrollbarWidth = 10; // The width of the vertical scrollbar

    if (!track || !thumb) {
      console.error("Horizontal scrollbar elements not found");
      return;
    }

    const handleScroll = () => {
      const { scrollWidth, clientWidth, scrollLeft } = element;

      // Adjust the width of the horizontal scrollbar container to not overlap the vertical scrollbar
      track.style.width = `${clientWidth - verticalScrollbarWidth}px`;

      // Calculate thumb width and position
      const thumbWidth = Math.max(
        (clientWidth / scrollWidth) * track.offsetWidth,
        30
      ); // Minimum thumb width 30px
      thumb.style.width = `${thumbWidth}px`;

      const thumbLeft =
        (scrollLeft / (scrollWidth - clientWidth)) *
        (track.offsetWidth - thumbWidth);
      thumb.style.left = `${thumbLeft}px`;

      // Show scrollbar if content overflows
      if (scrollWidth > clientWidth) {
        track.style.opacity = "1";
        track.style.visibility = "visible";
        track.style.pointerEvents = "auto";
      } else {
        track.style.opacity = "0";
        track.style.visibility = "hidden";
        track.style.pointerEvents = "none";
      }
    };

    const handleThumbMouseDown = (event) => {
      setIsDragging(true);
      track.classList.add("scrollbar-active");
      thumb.classList.add("scrollbar-active", "dragging");

      const startX = event.clientX;
      const startScrollLeft = element.scrollLeft;

      const handleMouseMove = (e) => {
        const deltaX = e.clientX - startX;
        const scrollPercentage =
          deltaX / (track.offsetWidth - thumb.offsetWidth);
        element.scrollLeft =
          startScrollLeft +
          scrollPercentage * (element.scrollWidth - element.clientWidth);
        handleScroll(); // Update thumb position
      };

      const handleMouseUp = () => {
        setIsDragging(false);
        track.classList.remove("scrollbar-active");
        thumb.classList.remove("scrollbar-active", "dragging");
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);

        // Hide scrollbar if not hovering after drag ends
        if (!element.matches(":hover")) {
          track.style.opacity = "0";
          track.style.visibility = "hidden";
          track.style.pointerEvents = "none";
        }
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);

      event.preventDefault();
    };

    const handleMouseEnter = () => {
      if (element.scrollWidth > element.clientWidth) {
        track.style.opacity = "1";
        track.style.visibility = "visible";
        track.style.pointerEvents = "auto";
      }
    };

    const handleMouseLeave = () => {
      if (!isDragging) {
        track.style.opacity = "0";
        track.style.visibility = "hidden";
        track.style.pointerEvents = "none";
      }
    };

    thumb.addEventListener("mousedown", handleThumbMouseDown);
    element.addEventListener("scroll", handleScroll);
    element.parentElement.addEventListener("mouseenter", handleMouseEnter);
    element.parentElement.addEventListener("mouseleave", handleMouseLeave);

    // Initialize scrollbar
    handleScroll();

    // Cleanup
    return () => {
      thumb.removeEventListener("mousedown", handleThumbMouseDown);
      element.removeEventListener("scroll", handleScroll);
      element.parentElement.removeEventListener("mouseenter", handleMouseEnter);
      element.parentElement.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [ref, isDragging]);

  return { isDragging };
}

export default useHorizontalScrollbar;
