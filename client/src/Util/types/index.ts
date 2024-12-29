export interface iTime {
  hoursUntilMidnight: number;
  minutesUntilMidnight: number;
  secondsUntilMidnight: number;
}

export interface IOption {
  name: string;
  value: string;
}

export interface RowColumnProps {
  $gap?: string;
  $justifyContent?: string;
  $alignItems?: string;
  $flexWrap?: string;
}

export type languages = "en" | "sl";

export interface BadgeProps {
  $color: "orange" | "red" | "green" | "yellow";
  $size?: "medium" | "small";
}
