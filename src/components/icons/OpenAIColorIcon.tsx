import * as React from "react";

export function OpenAIColorIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 256 256"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="256" height="256" fill="none" />
      <path
        d="M128 24C74.98 24 32 66.98 32 120c0 53.02 42.98 96 96 96s96-42.98 96-96c0-53.02-42.98-96-96-96z"
        fill="#A0AEC0"
      />
      <path
        d="M128 48a72 72 0 1072 72 72.081 72.081 0 00-72-72z"
        fill="#718096"
      />
      <path
        d="M128 72a48 48 0 1048 48 48.054 48.054 0 00-48-48z"
        fill="#4A5568"
      />
      <path
        d="M128 96a24 24 0 1024 24 24.027 24.027 0 00-24-24z"
        fill="#2D3748"
      />
    </svg>
  );
}
