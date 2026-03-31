import type { ButtonPrimaryProps } from '@interfaces/ButtonPrimaryProps';

const ButtonPrimary = ({
  title,
  className = '',
  ...props
}: ButtonPrimaryProps) => {
  return (
    <button
      className={`w-full bg-[#004f8b] hover:bg-[#003c6b] active:scale-[0.98] text-white font-semibold py-3.5 px-6 rounded-full transition-all duration-300 shadow-sm hover:shadow-md ${className}`}
      {...props}>
      {title}
    </button>
  );
};

export default ButtonPrimary;
