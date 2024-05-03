export const scrollbarStyles = `
/* Scrollbar styles */
.scrollBar::-webkit-scrollbar {
  width: 0;
  height: 0;
}
.scrollBar:hover::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
.scrollBar::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.3);
  border-radius: 3px;
  transition: background 0.3s ease-in-out;
}
.scrollBar::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.6);
}
.scrollBar::-webkit-scrollbar-thumb:vertical {
  border-radius: 3px;
}
`;
