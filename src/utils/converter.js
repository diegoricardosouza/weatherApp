export function fahrenheitToCelsius(fahrenheit) {
  const converter = (fahrenheit - 32) * 5 / 9;
  // return String(converter).slice(0, 2)
  return Math.round(converter)
}

export function converterDateFull(date) {
  return new Date(date).toLocaleDateString(
            "pt-br",
            {
              weekday: "long",
              day: "2-digit",
              month: "long",
            }
          );
}

export function converterHours(hours) {
  return new Date(hours).toLocaleTimeString(
            "pt-BR",
            {
              timeStyle: "short",
              hour12: false
            }
          );
}
