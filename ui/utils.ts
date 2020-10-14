import { useLayoutEffect, useEffect, EffectCallback } from "react";

export function logGraphQLErrors(errors: any) {
  for (let error of errors)
    console.error(`GraphQL response error: ${error.message}`);
}

export function getHumanReadableDate(): string {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const days = ["日", "月", "火", "水", "木", "金", "土"];
  const date = new Date();
  const month = months[date.getMonth()];
  const day = days[date.getDay()];
  const number = date.getDate();
  const year = date.getFullYear();
  const humanReadableDate = `${day}, ${number} ${month} ${year}`;
  return humanReadableDate;
}

export function getTimeOfDayTheme(): string {
  let timeOfDayTheme: string;
  const isAfter6 = new Date().getHours() > 18;
  if (isAfter6) timeOfDayTheme = "dark";
  else timeOfDayTheme = "light";
  return timeOfDayTheme;
}

export const isomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;
