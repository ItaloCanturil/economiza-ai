import { Plus } from "lucide-react";
import { Button } from "./components/ui/button";

const getGreeting = (): string => {
  const currentHour = new Date().getHours();

  if (currentHour >= 5 && currentHour < 12) {
    return "Good Morning";
  } else if (currentHour >= 12 && currentHour < 18) {
    return "Good Afternoon";
  } else {
    return "Good Evening";
  }
};

const dashboard = () => {
  const greeting = getGreeting();

  return (
    <div className="flex flex-col sm:flex-row items-center">
      <div className="text-lg flex justify-between items-center w-full">
        <h1>{greeting}, Italo!</h1>
        <Button variant="secondary">
          <Plus className="mr-2 h-4 w-4" />
          Add Expense
        </Button>
      </div>
    </div>
  );
};

export default dashboard;
