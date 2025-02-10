import { Outlet } from "react-router"
import { Disclosure, Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import Logo from '../assets/logo-min.png'
import { useDispatch, useSelector } from "react-redux";
import { User, Book, FileText, LogOut } from 'lucide-react'; 
import { useEffect } from "react";
import { useGetUserQuery } from "../store/endpoints/authApi";
import { setUser, clearUser } from "../store/slices/authSlice";

const NavBar = () => {

    const dispatch = useDispatch();
    const { data: user, isLoading } = useGetUserQuery(null, { refetchOnMountOrArgChange: true });
  
    useEffect(() => {
      if (user) {
        console.log({"USER":user})
        dispatch(setUser(user));
      }
      else dispatch(clearUser());
    }, [user, dispatch]);
  
    if (isLoading) return <p>Loading...</p>;

    return (
        <>
            <nav className="flex justify-between h-25  ml-30 mr-30 border-b-3 border-blue-950" >

                <div className="h-5 mt-4" >
                    <img className="w-25"
                        src={Logo}
                    />
                </div>
                <div className="h-5 mt-auto mb-auto">

                </div>
                <div className="h-5 mt-7">
                    <Popover className="relative">
                        <PopoverButton>
                            <div className="min-w-30 flex flex-row justify-between p-2">
                                <span className="h-5  align-middle mt-auto mb-auto">{ user ? user?.first_name + user?.last_name : "Random user" }</span> &nbsp; &nbsp;
                                <img className="rounded-full w-10"
                                    src='https://flowbite.com/docs/images/people/profile-picture-5.jpg'
                                />
                            </div>
                        </PopoverButton>
                        <PopoverPanel anchor="bottom" className="flex flex-col bg-white border p-2 rounded-md shadow-lg">
                            <a href="/add-users" className="flex items-center gap-2 py-2 px-4 hover:bg-gray-100 rounded-md">
                                <User className="w-5 h-5 text-gray-700" />
                                Add users...
                            </a>
                            <div className="border-t my-2"></div> {/* Separador */}
                            <a href="/add-books" className="flex items-center gap-2 py-2 px-4 hover:bg-gray-100 rounded-md">
                                <Book className="w-5 h-5 text-gray-700" />
                                Add books...
                            </a>
                            <div className="border-t my-2"></div> {/* Separador */}
                            <a href="/request" className="flex items-center gap-2 py-2 px-4 hover:bg-gray-100 rounded-md">
                                <FileText className="w-5 h-5 text-gray-700" />
                                Book requests
                            </a>
                            <div className="border-t my-2"></div> {/* Separador */}
                            <a href="/logout" className="flex items-center gap-2 py-2 px-4 hover:bg-gray-100 rounded-md">
                                <LogOut className="w-5 h-5 text-gray-700" />
                                Logout
                            </a>
                        </PopoverPanel>
                    </Popover>
                </div>
            </nav>

            <div className="ml-30 mr-30 mt-10">
                <Outlet />
            </div>

        </>
    )
}

export default NavBar