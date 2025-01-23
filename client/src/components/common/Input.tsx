interface InputProps {
  id: string;
  name: string;
  value: string;
  text: string;
  error: boolean;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Input({
  id,
  name,
  value,
  text,
  error,
  handleChange,
}: InputProps) {
  return (
    <>
      <div className='flex flex-col w-96 gap-1'>
        <label htmlFor={id} className='text-white leading-4 text-sm'>
          {text}
        </label>
        <input
          type='text'
          id={id}
          name={name}
          value={value}
          className={
            (!error ? "outline-error" : "") + " outline-none rounded-md px-1"
          }
          onChange={handleChange}
        />
        {!error && (
          <span className='text-error'>
            {name[0].toUpperCase() + name.substring(1) + " is required."}
          </span>
        )}
      </div>
    </>
  );
}
