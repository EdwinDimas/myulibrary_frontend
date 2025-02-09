import { Outlet } from "react-router"
import { Disclosure, Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import Logo from '../assets/logo-min.png'




const NavBar = () => {
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
                                <span className="h-5  align-middle mt-auto mb-auto">edwin dimas</span> &nbsp; &nbsp;
                                <img className="rounded-full w-10"
                                    src='https://flowbite.com/docs/images/people/profile-picture-5.jpg'
                                />  
                            </div>
                        </PopoverButton>
                        <PopoverPanel anchor="bottom" className="flex flex-col">
                            <a href="/analytics">Analytics</a>
                            <a href="/engagement">Engagement</a>
                            <a href="/security">Security</a>
                            <a href="/integrations">Integrations</a>
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