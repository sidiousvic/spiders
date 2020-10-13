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
  const hour = Number(
    new Date().toLocaleTimeString("en-GB", {
      hour: "2-digit",
    })
  );
  if (hour >= 18) return "dark";
  else return "light";
}

export function isomorphicLayoutEffect(
  callback: EffectCallback,
  dependencyArray: React.DependencyList
) {
  if (typeof document !== "undefined")
    useLayoutEffect(callback, dependencyArray);
  else return useEffect(callback, dependencyArray);
}
