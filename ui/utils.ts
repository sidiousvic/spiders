import { ApolloError } from "@apollo/client";

export function logGraphQLErrors([error]: ApolloError[]) {
  const { message } = error;
  throw message;
}

export function getHumanReadableDate(date: Date): string {
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
  const month = months[date.getMonth()];
  const day = days[date.getDay()];
  const number = date.getDate();
  const year = date.getFullYear();
  const humanReadableDate = `${day}, ${number} ${month} ${year}`;
  return humanReadableDate;
}

export async function fireGraphQLQuery(
  query,
  variables,
  headers?
): Promise<any> {
  const httpRes = await fetch("/graphql", {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const gqlRes = await httpRes.json();

  return { data: gqlRes.data || {}, errors: gqlRes.errors || [] };
}

export function event(
  eventName: string,
  detail?: {
    [key: string]: any;
  }
) {
  return new CustomEvent(eventName, {
    detail,
    bubbles: true,
    composed: true,
  });
}

export function isMobile() {
  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  )
    return true;

  return false;
}

export function states(service) {
  const children = { ...service.state.children };
  const childStates = {};
  Object.entries(children).forEach(([k, v]) => {
    /** @ts-ignore @TODO */
    childStates[k] = v.state;
  });
  return childStates as any;
}

export class Warning extends Error {
  constructor(message) {
    super();
    this.message = message;
    this.name = "Warning";
    this.stack = undefined;
  }
}
