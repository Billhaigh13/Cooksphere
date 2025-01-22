import { useContext, useEffect, useState } from "react";
import { Ingredient } from "./Ingredient";
import { Input } from "../common/Input";
import { Instruction } from "./Instruction";
import { uploadImage, uploadRecipe, updateUploaded } from "../../ApiClient";
import { FileUpload } from "./FileUpload";
import { AuthContext } from "../../App";
import { FormState, Recipe, UploadRecipe } from "../../types/types";

interface ErrorState {
  name: boolean;
  ingredients: boolean;
  instructions: boolean;
  cookingTime: boolean;
  category: boolean;
  tags: boolean;
  imageFile: boolean;
}

const initialState: FormState = {
  name: "",
  ingredients: {
    "ingredient-1": "",
    "measure-1": "",
  },
  instructions: { "instruction-1": "" },
  cookingTime: { hours: "", minutes: "" },
  category: "",
  tags: { "tag-1": "", "tag-2": "", "tag-3": "" },
  imageFile: null,
  imageUrl: "",
};

const initialErrorState: ErrorState = {
  name: true,
  ingredients: true,
  instructions: true,
  cookingTime: true,
  category: true,
  tags: true,
  imageFile: true,
};

// ! General component: i know this file is a mess, but the tracking the form state and validation stressed me a lot.
export function Upload() {
  const currentUser = useContext(AuthContext);

  const [numOfIngredients, setNumOfIngredients] = useState(1);
  const [numOfInstructions, setNumOfInstructions] = useState(1);
  const [formKey, setFormKey] = useState(0);

  const [formState, setFormState] = useState(initialState);
  const [errorState, setErrorState] = useState(initialErrorState);

  useEffect(() => {}, [errorState]);

  function addIngredient() {
    setNumOfIngredients((prev) => prev + 1);
    setFormState((prevState) => {
      const newIngredientNumber = numOfIngredients + 1;
      return {
        ...prevState,
        ingredients: {
          ...prevState.ingredients,
          ["ingredient-" + newIngredientNumber]: "",
          ["measure-" + newIngredientNumber]: "",
        },
      };
    });
  }

  function addInstruction() {
    setNumOfInstructions((prev) => prev + 1);
    setFormState((prevState) => {
      const newInstructionNumber = numOfInstructions + 1;
      return {
        ...prevState,
        instructions: {
          ...prevState.instructions,
          ["instruction-" + newInstructionNumber]: "",
        },
      };
    });
  }

  // TODO: refactor
  function handleChange(event: any) {
    const { name, value } = event.target;
    setFormState((prevState) => {
      if (name.includes("ingredient") || name.includes("measure")) {
        return {
          ...prevState,
          ingredients: { ...prevState.ingredients, [name]: value },
        };
      } else if (name.includes("instruction")) {
        return {
          ...prevState,
          instructions: { ...prevState.instructions, [name]: value },
        };
      } else if (name === "hours" || name === "minutes") {
        return {
          ...prevState,
          cookingTime: {
            ...prevState.cookingTime,
            [name]: value,
          },
        };
      } else if (name.includes("tag")) {
        return {
          ...prevState,
          tags: {
            ...prevState.tags,
            [name]: value,
          },
        };
      } else if (name === "imageFile") {
        return {
          ...prevState,
          [name]: event.target.files[0],
        };
      }

      return {
        ...prevState,
        [name]: value,
      };
    });
    validateFormData();
  }

  // ! ChatGPT generated: I needed help to upload images to cloudinary
  async function handleImageUpload(imageFile: File): Promise<string | null> {
    if (!imageFile) {
      return null;
    }

    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", "cooksphere");

    try {
      const response = await uploadImage(formData);
      return response.secure_url;
    } catch (e) {
      console.log(`Upload failed: ${e}`);
      return null;
    }
  }

  async function handleUpload(event: any) {
    console.log("handleupload fired");
    event.preventDefault();

    //! Validation
    // if (validateFormData()) return;
    const isValid = validateFormData();
    console.log(isValid);
    if (isValid) {
      console.log("form valid");
      if (formState.imageFile) {
        console.log("formstate image file valid");
        const imageUrl = await handleImageUpload(formState.imageFile);

        if (!imageUrl) {
          //TODO show error to user
          console.log("Error uploading recipe");
          return;
        }
        const updatedFormState = {
          ...formState,
          imageUrl: imageUrl,
        };
        console.log("updated form state", updatedFormState);

        const formatted = formatFormData(updatedFormState);
        console.log("formatted", formatted);
        const recipe = await uploadRecipe(formatted);
        if (currentUser) {
          await updateUploaded(currentUser, recipe);
          setFormState(initialState);
          setNumOfIngredients(1);
          setNumOfInstructions(1);
          setFormKey((prevKey) => prevKey + 1);
        }
      }
    }
  }

  function formatFormData(data: FormState): UploadRecipe {
    const formattedInstructions = [];
    const instructions = data.instructions;
    for (let i = 1; instructions[`instruction-${i}`] !== undefined; i++) {
      const instructionKey = `instruction-${i}`;
      const instructionValue = instructions[instructionKey].trim();
      if (instructionValue) formattedInstructions.push(instructionValue);
    }

    const formattedIngredients = [];
    const ingredients = data.ingredients;
    for (let i = 1; ingredients[`ingredient-${i}`] !== undefined; i++) {
      const ingredientKey = `ingredient-${i}`;
      const measureKey = `measure-${i}`;

      const ingredientValue = ingredients[ingredientKey].trim();
      const measureValue = ingredients[measureKey].trim();

      if (ingredientValue && measureValue)
        formattedIngredients.push({
          ingredient: ingredientValue,
          measure: measureValue,
        });
    }

    const formattedTags = [
      data.tags["tag-1"],
      data.tags["tag-2"],
      data.tags["tag-3"],
    ].filter((elem) => elem.trim() !== "");
    const hours =
      data.cookingTime.hours !== "" ? parseInt(data.cookingTime.hours) : 0;
    const minutes =
      data.cookingTime.minutes !== "" ? parseInt(data.cookingTime.minutes) : 0;
    const formattedCookingTime = hours * 60 + minutes;
    return {
      ...data,
      instructions: formattedInstructions,
      ingredients: formattedIngredients,
      tags: formattedTags,
      cookingTimeInMinutes: formattedCookingTime,
      image: data.imageUrl,
    };
  }

  //TODO: validation incomplete
  //TODO: FEAT: complete form validation
  //TODO: Form validation made no sense, needs to be re-worked
  function validateFormData() {
    const newErrorState: ErrorState = errorState;

    if (formState.name.length > 0) {
      newErrorState.name = true;
    } else {
      newErrorState.name = false;
    }
    if (formState.instructions["instruction-1"].length > 0) {
      newErrorState.instructions = true;
    } else {
      newErrorState.instructions = false;
    }
    if (
      formState.ingredients["ingredient-1"].length > 0 &&
      formState.ingredients["measure-1"].length > 0
    ) {
      newErrorState.ingredients = true;
    } else {
      newErrorState.ingredients = false;
    }
    if (formState.category.length > 0) {
      newErrorState.category = true;
    } else {
      newErrorState.category = false;
    }
    if (formState.imageFile !== null) {
      newErrorState.imageFile = true;
    } else {
      newErrorState.imageFile = false;
    }
    if (
      formState.tags["tag-1"].length > 0 &&
      formState.tags["tag-2"].length > 0 &&
      formState.tags["tag-3"].length > 0
    ) {
      newErrorState.tags = true;
    } else {
      newErrorState.tags = false;
    }
    if (
      formState.cookingTime.hours.length > 0 ||
      formState.cookingTime.minutes.length > 0
    ) {
      newErrorState.cookingTime = true;
    } else {
      newErrorState.cookingTime = false;
    }
    setErrorState(newErrorState);
    if (!Object.values(newErrorState).includes(false)) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <>
      <form
        key={formKey}
        onSubmit={handleUpload}
        className='flex flex-col gap-4'
      >
        <h2 className='text-2xl font-bold font-fira'>Upload Recipe</h2>
        {/* name */}
        <div className='bg-brown rounded-md p-2 w-fit'>
          <Input
            id='recipe-name'
            name='name'
            value={formState.name}
            text='Name:'
            error={errorState.name}
            handleChange={handleChange}
          />
        </div>
        {/* ingredients */}
        <div className='flex flex-col gap-4 bg-brown rounded-md p-2'>
          {Array.from({ length: numOfIngredients }).map((elem, index) => (
            <Ingredient
              key={index}
              number={index + 1}
              values={formState.ingredients}
              handleChange={handleChange}
              error={errorState.ingredients}
            />
          ))}
          <button
            className='bg-orange text-white hover:bg-deeporange rounded-md px-2 py-1 uppercase text-sm cursor-pointer w-fit'
            onClick={addIngredient}
            type='button'
          >
            Add ingredient
          </button>
        </div>
        {/* instructions */}
        <div className='flex flex-col gap-4 bg-brown rounded-md p-2'>
          {Array.from({ length: numOfInstructions }).map((elem, index) => (
            <>
              <Instruction
                number={index + 1}
                value={formState.ingredients["ingredient-" + `${index + 1}`]}
                handleChange={handleChange}
              />
            </>
          ))}
          <button
            className='bg-orange text-white hover:bg-deeporange rounded-md px-2 py-1 uppercase text-sm cursor-pointer w-fit'
            onClick={addInstruction}
            type='button'
          >
            Add instruction
          </button>
          {!errorState.instructions && (
            <span className='text-error'>Instructions are required.</span>
          )}
        </div>
        {/* cooking time */}
        <div className='flex items-center gap-4 bg-brown rounded-md p-2'>
          <span className='text-white w-32'>Cooking time</span>
          <Input
            id='time-hours'
            name='hours'
            value={formState.cookingTime.hours}
            text='Hours:'
            handleChange={handleChange}
            error={errorState.cookingTime}
          />
          <Input
            id='time-minutes'
            name='minutes'
            value={formState.cookingTime.minutes}
            text='Minutes:'
            handleChange={handleChange}
            error={errorState.cookingTime}
          />
          {!errorState.cookingTime && (
            <span className='text-error'>Cooking time is required.</span>
          )}
        </div>
        {/* category */}
        <div className='bg-brown rounded-md p-2'>
          <label htmlFor='category' className='text-white'>
            Category
          </label>
          <select
            name='category'
            id='category'
            className='px-2 py-2 rounded-lg ml-4 cursor-pointer bg-softyellow'
            onChange={handleChange}
          >
            <option disabled selected hidden>
              -- Select a category --
            </option>
            <option value='Breakfast'>Breakfast</option>
            <option value='Pasta'>Pasta</option>
            <option value='Dessert'>Dessert</option>
            <option value='Vegan'>Vegan</option>
          </select>
          {!errorState.category && (
            <span className='text-error ml-4'>Category is required.</span>
          )}
        </div>
        {/* tags */}
        <div className='flex items-center gap-4 bg-brown rounded-md p-2'>
          <span className='text-white'>Tags</span>
          <Input
            id='tag-1'
            name='tag-1'
            value={formState.tags["tag-1"]}
            text='Tag 1:'
            handleChange={handleChange}
            error={errorState.tags}
          />
          <Input
            id='tag-2'
            name='tag-2'
            value={formState.tags["tag-2"]}
            text='Tag 2:'
            handleChange={handleChange}
            error={errorState.tags}
          />
          <Input
            id='tag-3'
            name='tag-3'
            value={formState.tags["tag-3"]}
            text='Tag 3:'
            handleChange={handleChange}
            error={errorState.tags}
          />
        </div>
        {/* image */}
        <FileUpload
          value={formState.imageUrl}
          error={errorState.imageFile}
          handleChange={handleChange}
        />

        <button
          className='bg-orange text-white hover:bg-deeporange gap-2 rounded-md px-2 py-1 uppercase text-sm cursor-pointer w-fit'
          type='submit'
        >
          Upload
        </button>
      </form>
    </>
  );
}

//TODO: TEST add unit tests for upload functions
//TODO: TEST add integration tests for upload
