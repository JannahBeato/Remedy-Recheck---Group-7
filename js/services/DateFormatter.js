(function registerDateFormatter(global) {
const { services } = global.RemedyRecheck;

services.DateFormatter = class DateFormatter {
  constructor(locale = "en-GB") {
    this.date = new Intl.DateTimeFormat(locale, { day: "numeric", month: "short", year: "numeric" });
    this.dateTime = new Intl.DateTimeFormat(locale, {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  format(value, fallback = "Not recorded") {
    if (!value) return fallback;
    const parsed = new Date(value.length === 10 ? `${value}T12:00:00` : value);
    return Number.isNaN(parsed.getTime()) ? fallback : this.date.format(parsed);
  }

  formatDateTime(value, fallback = "Not recorded") {
    if (!value) return fallback;
    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? fallback : this.dateTime.format(parsed);
  }
};
})(window);
