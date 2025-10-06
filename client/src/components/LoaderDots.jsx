export default function LoaderDots() {
  return (
    <div className="flex space-x-1 items-center justify-center">
      <span className="h-2 w-2 rounded-full bg-red-500 animate-bounce"></span>
      <span className="h-2 w-2 rounded-full bg-green-500 animate-bounce [animation-delay:0.15s]"></span>
      <span className="h-2 w-2 rounded-full bg-blue-500 animate-bounce [animation-delay:0.3s]"></span>
    </div>
  );
}
