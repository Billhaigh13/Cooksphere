interface RadioProps {
  id: string;
  name: string;
  value: string;
  text: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Radiobutton({
  id,
  name,
  value,
  text,
  handleChange,
}: RadioProps) {
  return (
    <>
      <div>
        <input
          type="radio"
          id={id}
          name={name}
          value={value}
          onChange={(event) => handleChange(event)}
          className="accent-softyellow"
        />
        <label htmlFor={id} className="ml-2">
          {text}
        </label>
      </div>
    </>
  );
}
