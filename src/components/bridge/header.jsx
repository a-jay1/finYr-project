import Button from '../ui/Button';

const Header = ({ handleRedirection }) => {
  return (
    <div className="bg-transparent flex justify-between px-4 py-3 md:px-24 md:py-4 text-white-50">
      <div className="flex items-center">
        <img src={'/assets/image 33.svg'} alt="img" className="w-16 md:w-36" />
      </div>

      <div className="flex items-center gap-2 md:gap-12">
        <Button
          classNames="p-2 border-[2px] border-white-50 text-white-50 py-2 px-2 xs:px-4 text-xs font-semibold whitespace-nowrap"
          onClick={handleRedirection}
          btnText="Report content piracy"
          noFill={true}
        />

        <Button
          classNames="p-2 border-white-50 h-8 w-16 text-xs font-semibold"
          onClick={handleRedirection}
          btnText="Login"
          variant="white"
        />
      </div>
    </div>
  );
};

export default Header;
