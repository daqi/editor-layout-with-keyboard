export const EventPrevent = (e: Event) => {
  e.preventDefault();
  e.stopPropagation();
};
