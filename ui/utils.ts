import { ApolloError } from "@apollo/client";

export function logGraphQLErrors(errors: ApolloError[]) {
  errors.forEach((error: ApolloError) => {
    console.error(`GraphQL response error: ${error.message}`);
  });
  return errors;
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
  const res = await fetch("/graphql", {
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

  return res.json();
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
