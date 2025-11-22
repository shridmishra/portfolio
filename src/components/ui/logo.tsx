import React from "react";

export const Logo = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="600"
      height="140"
      viewBox="0 0 600 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M0 0H115L140 25V45H45V55H140V100H25L0 75V55H95V45H0V0Z"
        fill="currentColor"
      />
      <path
        d="M155 0H185V40H265V0H295V100H265V60H185V100H155V0Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M310 0H425L450 25V100H420V60H340V100H310V0ZM340 20V40H420V25L415 20H340Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M465 0H580L605 25V75L580 100H465V0ZM495 20V80H572L580 72V28L572 20H495Z"
        fill="currentColor"
      />
    </svg>
  );
};
