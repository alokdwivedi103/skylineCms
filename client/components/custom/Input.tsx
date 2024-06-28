interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  label?: string;
}

const Input: React.FC<InputProps> = ({
  className = "",
  type = "text",
  label = "",
  ...rest
}) => {
  return (
    <div className="flex flex-col my-2">
      {label && <label className="my-1 text-gray-700 text-left">{label}</label>}
      <input
        className={`border border-gray-300 px-3 py-2 rounded-md ${className}`}
        type={type}
        {...rest}
      />
    </div>
  );
};

export default Input;
