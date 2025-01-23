import { Upload } from "./Upload";

interface PopupProps {
  closePopup: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export const Popup: React.FC<PopupProps> = ({ closePopup }) => {
  const handleContentClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  return (
    <div
      className='fixed top-0 bottom-0 left-0 right-0 flex justify-center bg-black/30 z-10 py-8 overflow-y-scroll'
      onClick={closePopup}
      data-testid='popup'
    >
      <div
        className='px-8 py-4 rounded-lg w-[50rem] bg-lightbeige h-fit'
        onClick={handleContentClick}
      >
        <Upload />
      </div>
    </div>
  );
};
