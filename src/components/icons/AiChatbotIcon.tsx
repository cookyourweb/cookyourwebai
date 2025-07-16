import * as React from "react";

export function AiChatbotIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 3h-8a2 2 0 00-2 2v2h12V5a2 2 0 00-2-2z" />
      <circle cx="8.5" cy="14.5" r="1.5" />
      <circle cx="15.5" cy="14.5" r="1.5" />
      <path d="M8.5 17a3.5 3.5 0 007 0" />
    </svg>
  );
}
