
export function formatToISODate(dateStr: string): string {
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    return dateStr;
  }
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateStr)) {
    const [day, month, year] = dateStr.split('/');
    return `${year}-${month}-${day}`;
  }
  const date = new Date(dateStr);
  if (!isNaN(date.getTime())) {
    return date.toISOString().split('T')[0];
  }
  return dateStr;
}

export const formatBirthDate = (value: string) => {
  if (!value) return "";

  if (value.includes("T")) {
    const date = new Date(value);
    const utcDay = String(date.getUTCDate()).padStart(2, "0");
    const utcMonth = String(date.getUTCMonth() + 1).padStart(2, "0");
    const utcYear = date.getUTCFullYear();
    return `${utcDay}-${utcMonth}-${utcYear}`;
  }

  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const [year, month, day] = value.split("-");
    return `${day}-${month}-${year}`;
  }

  if (/^\d{2}\/\d{2}\/\d{4}$/.test(value)) {
    return value.replace(/\//g, "-");
  }

  return value;
};

export const formatDate = (dateString?: string | Date): string => {
  if (!dateString) return "-";
  try {
    let date: Date;
    if (typeof dateString === "string") {
      date = new Date(formatToISODate(dateString));
    } else {
      date = new Date(dateString);
    }
    if (isNaN(date.getTime())) return "-";
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  } catch {
    return "-";
  }
};

export const formatDateTime = (dateString?: string | Date): string => {
  if (!dateString) return "-";
  try {
    let date: Date;
    if (typeof dateString === "string") {
      date = new Date(formatToISODate(dateString));
    } else {
      date = new Date(dateString);
    }
    if (isNaN(date.getTime())) return "-";
    return date.toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  } catch {
    return "-";
  }
};

export const formatShortDate = (dateString?: string | Date): string => {
  if (!dateString) return "-";
  try {
    let date: Date;
    if (typeof dateString === "string") {
      date = new Date(formatToISODate(dateString));
    } else {
      date = new Date(dateString);
    }
    if (isNaN(date.getTime())) return "-";
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    });
  } catch {
    return "-";
  }
};
