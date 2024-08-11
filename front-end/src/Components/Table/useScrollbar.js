import { useEffect } from 'react';

function useScrollbar(ref) {
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
      const startY = event.clientY;
      const startScrollTop = element.scrollTop;

      const handleMouseMove = (e) => {
        const deltaY = e.clientY - startY;
        const scrollPercentage = deltaY / (track.offsetHeight - thumb.offsetHeight);
        element.scrollTop = startScrollTop + scrollPercentage * (element.scrollHeight - element.clientHeight);
      };

      const handleMouseUp = () => {
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
    };

    // Attach event listeners
    thumb.addEventListener('mousedown', handleThumbMouseDown);
    track.addEventListener('click', handleTrackClick);
    element.addEventListener('scroll', handleScroll);

    // Initialize scrollbar
    handleScroll();

    // Cleanup
    return () => {
      thumb.removeEventListener('mousedown', handleThumbMouseDown);
      track.removeEventListener('click', handleTrackClick);
      element.removeEventListener('scroll', handleScroll);
    };
  }, [ref]);
}

export default useScrollbar;
