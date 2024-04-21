import Button from "@/components/ui/Button";
import SearchBar from "@/components/ui/SearchBar";

const TabsContainer = () => {

  return (
    <div className="bg-white-50">
      <div className="tab-header px-5 flex justify-between md:justify-center gap-2 md:gap-12 text-gray-600 shadow-md ">
        <a href="#" className="py-3 border-b-[2px] border-yellow-400 text-yellow-400">Purchases</a>
        <a href="#" className="py-3">Favourites</a>
        <a href="#" className="py-3">User info</a>
      </div>
      <div className="tab-body-container max-w-5xl pt-4 px-5 mx-auto my-6 md:border md:border-white-150">
        <div className="tab-item">
          <div className="header flex justify-between items-center">
            <h4 className="text-gray-900 text-xl font-medium">List of Purchases</h4>
            <SearchBar placeholder="Search by genre, mood, artist" classNames="" />
          </div>
        <div className="h-[60vh] flex flex-col justify-center items-center">
          <div className="no-result flex flex-col items-center w-72 md:w-[400px]">
            <h3 className="text-gray-900 mb-1 md:mb-6 text-xl md:text-2xl font-semibold md:font-black">No purchase yet</h3>
            <p className="text-gray-500 text-center mb-6 md:text-xl">Browse through our large selection of royalty-free music</p>
            <Button btnText="Explore More" variant="yellow" />
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default TabsContainer;
