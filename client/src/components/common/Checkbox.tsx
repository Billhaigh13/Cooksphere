interface CheckboxProps {
  id: string;
  checked: boolean;
  text: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Checkbox({ id, checked, text, handleChange }: CheckboxProps) {
  return (
    <>
      <div>
        <input
          type='checkbox'
          id={id}
          name={id}
          checked={checked}
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
