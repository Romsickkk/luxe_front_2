import { StylesConfig } from "react-select";
export const selectStyles: StylesConfig = {
  input: (base) => ({
    ...base,
    color: "var(--color-grey-800)",
    caretColor: "#fff",
  }),

  menuPortal: (base) => ({
    ...base,
    zIndex: 111111,
  }),

  control: (base) => ({
    ...base,
    minHeight: 40,
    borderColor: "#4b5563",
    backgroundColor: "var(--color-grey-100)",
  }),

  option: (base, { isFocused, isSelected }) => ({
    ...base,
    backgroundColor: isSelected ? "#FF6E1B" : isFocused ? "var(--color-grey-300)" : "var(--color-grey-200)",
    color: "var(--color-grey-600)",
    "&:hover": {
      backgroundColor: "var(--color-grey-400)",
      color: "var(--color-grey-800)",
    },
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: "var(--color-grey-200)",
    zIndex: 9999,
  }),

  multiValue: (base) => ({
    ...base,
    backgroundColor: "#9EA0A3",
  }),
  multiValueLabel: (base) => ({
    ...base,
    color: "#1F2937",
  }),
  multiValueRemove: (base) => ({
    ...base,
    color: "#ffffff",
    "&:hover": {
      backgroundColor: "#ef4444",
      color: "white",
    },
  }),
  placeholder: (base) => ({
    ...base,
    color: "#9ca3af", // Серый цвет плейсхолдера
  }),
  singleValue: (base) => ({
    ...base,
    color: "#e5e7eb", // Цвет выбранного текста
  }),
  menuList: (base) => ({
    ...base,
    maxHeight: "150px", // Высота списка (подгони под себя)
    overflowY: "auto", // Скролл при переполнении
    scrollbarWidth: "thin",
    "&::-webkit-scrollbar": {
      width: "6px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#4b5563", // Цвет скролла
      borderRadius: "10px",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      backgroundColor: "#6b7280", // Цвет скролла при ховере
    },
  }),
};
