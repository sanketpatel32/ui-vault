import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

export default function Preview() {
  return (
    <div className="w-full">
      <div className="flex items-center gap-3 p-6">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="Origin" />
          <AvatarFallback>OR</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage src="https://i.pravatar.cc/64?img=12" alt="Demo" />
          <AvatarFallback>DE</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>UV</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
