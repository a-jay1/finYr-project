import Image from "next/image";

const SearchBar = ({
    classNames="mx-6 md:mx-auto my-2 md:my-9",
    placeholder="Search"
}) => {
    return ( 
    <div class={`flex border-gray-300 rounded-3xl bg-white-50 mx-6 px-3 py-1 my-1 pr-2 md:my-9 md:w-[40%] md:items-center md:justify-between md:mx-auto ${classNames}`}>
            <input type="search" id="default-search" className="w-[90%] outline-none pl-5 md:pl-6" 
                placeholder={placeholder} required 
            />
            <button type="submit" className="flex items-center justify-between rounded-full bg-[#F4C05C] p-2">
                <Image src="/assets/search.svg" alt="Search Icon" width={22} height={22} />
            </button>   
        </div>
    )
}

export default SearchBar;