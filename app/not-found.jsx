import GoBackClientComponent from "@/components/GoBackClientComponent";

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-10rem)] flex items-center justify-center flex-col lg:max-w-[50%] sm:max-w-auto sm:px-8 mx-auto relative overflow-auto">
      <div>
        <span className="text-[10rem] font-bold text-darkGrey">4</span>
        <span className="text-[10rem] text-veryLightGrey font-bold">0</span>
        <span className="text-[10rem] font-bold text-darkGrey">4</span>
      </div>
      <p className="text-3xl text-darkBlue font-medium mb-4 text-center">
        There is nothing here...
      </p>
      <p className="text-darkGrey text-xl text-center">
        ...maybe the page you're looking for is not listed yet or never existed
      </p>
      <GoBackClientComponent />
    </div>
  );
}
