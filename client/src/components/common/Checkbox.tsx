interface CheckboxProps {
  id: string;
  value: string;
  text: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Checkbox({ id, value, text, handleChange }: CheckboxProps) {
  return (
    <>
      <div>
        <input
          type='checkbox'
          id={id}
          name={id}
          value={value}
          onChange={(event) => handleChange(event)}
          className='accent-softyellow'
        />
        <label htmlFor={id} className='ml-2'>
          {text}
        </label>
      </div>
    </>
  );
}
