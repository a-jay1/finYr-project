import Card from "../ui/Card";

const data = {
  cardList: [
    {
      source: "/assets/Frame 11.svg",
      text: "Creator - Music/ Content",
      description: "Sell the licence of your music/ content",
    },
    {
      source: "/assets/Frame 11.svg",
      text: "Creator - Music/ Content",
      description: "Sell the licence of your music/ content",
    },
  ],
};

const CardContainer = () => {
  return (
    <div className="grid -translate-y-1/2 grid-cols-2 px-9 justify-center items-center gap-4 flex-wrap z-99 md:max-w-[900px] md:mx-auto">
      {data?.cardList?.map((item, index) => {
        return (
          <div key={index}>
            <Card source={item?.source} text={item?.text} description={item?.description} />
          </div>
        );
      })}
    </div>
  );
};

export default CardContainer;
