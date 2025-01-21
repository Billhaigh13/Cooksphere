import { useContext } from "react";
import { Link } from "react-router"
import { AuthContext } from '../App';
import { User } from "../types/types";

export function Navbar () {
  const currentUser = useContext(AuthContext) as User | null;
  return (
    <>
      <header className='flex justify-between items-center px-8 py-2 shadow-[0_0_0.25rem_#808080]'>
        <Link to='/'>
          <img src="/logo.png" alt="Cooksphere Logo" className="w-16" data-testid="navbar_img" />
        </Link>
        <h1 className="flex-grow text-center font-fira font-black italic text-4xl">Cooksphere</h1>
        <nav>
          <a href=""></a>
        </nav>
        {currentUser && (
          <Link to="/profile">
            <img src={`/profile_${currentUser.image}.png`} alt="Profile picture" className="w-16 rounded-full border-solid border-deepbrown border-2"/>
          </Link>
        )}
      </header>
    </>
  );
};
