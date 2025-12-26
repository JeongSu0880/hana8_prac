import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@radix-ui/react-hover-card';

const DummyProfileImage = '/profile_dummy.png';

export default function UserProfile() {
  // const isModile = i
  // const isModbie() =< {]}
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className="h-10 w-10">
          <Avatar>
            <AvatarImage src={DummyProfileImage} />
            <AvatarFallback>VC</AvatarFallback>
          </Avatar>
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="grid grid-cols-3 rounded-3xl border bg-white">
          <Avatar>
            <AvatarImage src={DummyProfileImage} />
            <AvatarFallback>VC</AvatarFallback>
          </Avatar>
          <div>@guest guest@gmail.com 12 Books23 Marks 00 Followers</div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
