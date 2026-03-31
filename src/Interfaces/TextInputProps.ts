export interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  isPassword?: boolean;
  onTogglePassword?: () => void;
  showPassword?: boolean;
}
