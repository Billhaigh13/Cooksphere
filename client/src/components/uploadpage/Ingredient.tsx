import { Input } from "../common/Input";

interface IngredientProps {
  number: number;
  values: Record<string, string>;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Ingredient({ number, values, handleChange }: IngredientProps) {
  return (
    <>
      <div className='flex gap-4'>
        <Input
          id={"ingredient-" + number}
          name={"ingredient-" + number}
          value={values["ingredient" + number]}
          text={"Ingredient " + number + ":"}
          handleChange={handleChange}
          error=''
        />
        <Input
          id={"measure-" + number}
          name={"measure-" + number}
          value={values["measure" + number]}
          text={"Measure " + number + ":"}
          handleChange={handleChange}
          error=''
        />
      </div>
    </>
  );
}
