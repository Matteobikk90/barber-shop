export const fifteenMinutes = 15 * 60 * 1000;
export const thirtyMinutes = 30 * 60 * 1000;

export const formatOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
};

export const yesterday = 86400000;

export const today = new Date().toISOString().split("T")[0];
