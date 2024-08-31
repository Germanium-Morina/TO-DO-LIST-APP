import { useEffect, useState } from 'react';

function useHorizontalScrollbar(ref) {
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const track = element.parentElement.querySelector('.horizontal-scrollbar-container');
    const thumb = element.parentElement.querySelector('.horizontal-scrollbar-thumb');

    if (!track || !thumb) {
      console.error('Horizontal scrollbar elements not found');
      return;
    }

    const handleScroll = () => {
      const { scrollWidth, clientWidth, scrollLeft } = element;

      // Calculate thumb width and position
      const thumbWidth = Math.max((clientWidth / scrollWidth) * clientWidth, 30); // Minimum thumb width 30px
      thumb.style.width = `${thumbWidth}px`;

      const thumbLeft = (scrollLeft / (scrollWidth - clientWidth)) * (track.offsetWidth - thumbWidth);
      thumb.style.left = `${thumbLeft}px`;
    };

    const handleThumbMouseDown = (event) => {
      setIsDragging(true);
      track.classList.add('scrollbar-active');
      thumb.classList.add('scrollbar-active');

      const startX = event.clientX;
      const startScrollLeft = element.scrollLeft;

      const handleMouseMove = (e) => {
        const deltaX = e.clientX - startX;
        const scrollPercentage = deltaX / (track.offsetWidth - thumb.offsetWidth);
        element.scrollLeft = startScrollLeft + scrollPercentage * (element.scrollWidth - element.clientWidth);
        handleScroll(); // Update thumb position
      };

      const handleMouseUp = () => {
        setIsDragging(false);
        track.classList.remove('scrollbar-active');
        thumb.classList.remove('scrollbar-active');
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);

      event.preventDefault();
    };

    const handleTrackClick = (event) => {
      const rect = track.getBoundingClientRect();
      const clickPosition = event.clientX - rect.left;
      const thumbWidth = thumb.offsetWidth;

      // Calculate the new scroll position based on where the track was clicked
      const newScrollLeft = ((clickPosition - thumbWidth / 2) / (track.offsetWidth - thumbWidth)) * (element.scrollWidth - element.clientWidth);
      element.scrollLeft = newScrollLeft;
      handleScroll(); // Update thumb position
    };

    const handleWheel = (e) => {
      const scrollSpeed = 1; // Adjust scroll speed
      const scaledDeltaX = e.deltaX * scrollSpeed;

      const scroll = () => {
        element.scrollLeft += scaledDeltaX;
        handleScroll();
      };
      requestAnimationFrame(scroll);
      e.preventDefault(); // Prevent default scrolling behavior
    };

    // Attach event listeners
    thumb.addEventListener('mousedown', handleThumbMouseDown);
    track.addEventListener('click', handleTrackClick);
    element.addEventListener('wheel', handleWheel);
    element.addEventListener('scroll', handleScroll);

    // Initialize scrollbar
    handleScroll();

    // Cleanup
    return () => {
      thumb.removeEventListener('mousedown', handleThumbMouseDown);
      track.removeEventListener('click', handleTrackClick);
      element.removeEventListener('wheel', handleWheel);
      element.removeEventListener('scroll', handleScroll);
    };
  }, [ref, isDragging]);

  return { isDragging };
}

export default useHorizontalScrollbar;
