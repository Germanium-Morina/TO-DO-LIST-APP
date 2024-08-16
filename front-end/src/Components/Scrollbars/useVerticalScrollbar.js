// src/Components/Table/useVerticalScrollbar.js

import { useEffect, useState } from 'react';

function useVerticalScrollbar(ref) {
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const track = element.parentElement.querySelector('.scrollbar-container');
    const thumb = element.parentElement.querySelector('.scrollbar-thumb');

    if (!track || !thumb) {
      console.error('Scrollbar elements not found');
      return;
    }

    const handleScroll = () => {
      const { scrollHeight, clientHeight, scrollTop } = element;
      
      // Calculate thumb height and position
      const thumbHeight = Math.max((clientHeight / scrollHeight) * clientHeight, 30); // Minimum thumb height 30px
      thumb.style.height = `${thumbHeight}px`;

      const thumbTop = (scrollTop / (scrollHeight - clientHeight)) * (track.offsetHeight - thumbHeight);
      thumb.style.top = `${thumbTop}px`;
    };

    const handleThumbMouseDown = (event) => {
      setIsDragging(true);
      track.classList.add('scrollbar-active');
      thumb.classList.add('scrollbar-active');

      const startY = event.clientY;
      const startScrollTop = element.scrollTop;

      const handleMouseMove = (e) => {
        const deltaY = e.clientY - startY;
        const scrollPercentage = deltaY / (track.offsetHeight - thumb.offsetHeight);
        element.scrollTop = startScrollTop + scrollPercentage * (element.scrollHeight - element.clientHeight);
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
      const clickPosition = event.clientY - rect.top;
      const thumbHeight = thumb.offsetHeight;

      // Calculate the new scroll position based on where the track was clicked
      const newScrollTop = ((clickPosition - thumbHeight / 2) / (track.offsetHeight - thumbHeight)) * (element.scrollHeight - element.clientHeight);
      element.scrollTop = newScrollTop;
      handleScroll(); // Update thumb position
    };

    const handleMouseLeave = () => {
      if (!isDragging) {
        track.classList.remove('scrollbar-active');
        thumb.classList.remove('scrollbar-active');
      }
    };

    const handleMouseEnter = () => {
      if (!isDragging) {
        track.classList.add('scrollbar-active');
        thumb.classList.add('scrollbar-active');
      }
    };

    const handleThumbMouseEnter = () => {
      if (!isDragging) {
        thumb.classList.add('scrollbar-active');
      }
    };

    const handleThumbMouseLeave = () => {
      if (!isDragging) {
        thumb.classList.remove('scrollbar-active');
      }
    };

    const handleWheel = (e) => {
      // Scale down the scroll speed by a factor (e.g., 0.2 for slower scroll)
      const scrollSpeed = 1; // Adjust this value to control the scroll speed
      const scaledDeltaY = e.deltaY * scrollSpeed;

      // Use requestAnimationFrame for smoother scrolling
      const scroll = () => {
        element.scrollTop += scaledDeltaY;
        handleScroll(); // Update thumb position
      };
      requestAnimationFrame(scroll);
      e.preventDefault(); // Prevent default scrolling behavior to avoid duplication
    };

    // Attach event listeners
    thumb.addEventListener('mousedown', handleThumbMouseDown);
    track.addEventListener('click', handleTrackClick);
    track.addEventListener('wheel', handleWheel); // Listen to wheel events on the track
    element.addEventListener('wheel', handleWheel); // Also handle wheel events directly on the scrollable element
    element.addEventListener('scroll', handleScroll);
    track.addEventListener('mouseenter', handleMouseEnter);
    track.addEventListener('mouseleave', handleMouseLeave);
    thumb.addEventListener('mouseenter', handleThumbMouseEnter);
    thumb.addEventListener('mouseleave', handleThumbMouseLeave);

    // Initialize scrollbar
    handleScroll();

    // Cleanup
    return () => {
      thumb.removeEventListener('mousedown', handleThumbMouseDown);
      track.removeEventListener('click', handleTrackClick);
      track.removeEventListener('wheel', handleWheel);
      element.removeEventListener('wheel', handleWheel);
      element.removeEventListener('scroll', handleScroll);
      track.removeEventListener('mouseenter', handleMouseEnter);
      track.removeEventListener('mouseleave', handleMouseLeave);
      thumb.removeEventListener('mouseenter', handleThumbMouseEnter);
      thumb.removeEventListener('mouseleave', handleThumbMouseLeave);
    };
  }, [ref, isDragging]);

  return { isDragging };
}

export default useVerticalScrollbar;
