import Header from "../header";
import TabsContainer from "./TabsContainer";

const UserDashboard = () => {
  return (
    <main>
      <nav className="bg-gray-900">
        <Header />
      </nav>
    <TabsContainer />
    </main>
  );
};

export default UserDashboard;
