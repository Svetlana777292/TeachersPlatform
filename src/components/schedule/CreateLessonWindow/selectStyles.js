export const selectStyles = {
    menuPortal: base => ({ ...base, zIndex: 9999 }),
    control: base => ({
        ...base,
        backgroundColor: "#F3F4F6",
        border: "1px solid #EAEAEA",
        borderRadius: "0.5rem",
        padding: "0 1rem",
        color: "#6B7280",
        fontSize: "0.9rem",
        cursor: "pointer",
    }),
    menu: base => ({
        ...base,
        backgroundColor: "#F3F4F6",
        borderRadius: "0.5rem",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        padding: "0.5rem 0",
    }),
    option: (base, state) => ({
        ...base,
        backgroundColor: state.isFocused ? "#E5E7EB" : "#F3F4F6",
        color: "#000000",
        fontSize: "0.9rem",
        padding: "0.5rem 1rem",
        cursor: "pointer",
    }),
}