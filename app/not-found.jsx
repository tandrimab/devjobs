import GoBackClientComponent from "@/components/GoBackClientComponent";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center flex-col lg:max-w-[50%] sm:max-w-auto sm:px-8 mx-auto relative overflow-auto">
      <Image
      className="mb-8"
        src="/assets/desktop/404.svg"
        width={400}
        height={400}
      />
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
