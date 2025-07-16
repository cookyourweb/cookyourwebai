import * as React from "react";

export function ChatGPTIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 2C6.48 2 2 6.48 2 12c0 2.21.72 4.25 1.93 5.9L2 22l4.1-1.93A9.956 9.956 0 0012 22c5.52 0 10-4.48 10-10S17.52 2 12 2z" />
      <path d="M8 12h8M8 16h8M8 8h8" />
    </svg>
  );
}
