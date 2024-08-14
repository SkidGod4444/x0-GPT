import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  IconApi,
  IconBrandGithub,
  IconBrandGithubCopilot,
  IconCirclesRelation,
  IconHeartHandshake,
  IconLogout,
  IconSettingsCode,
  IconUserCircle,
} from "@tabler/icons-react";
import { useUser } from "@/context/user.context";

export function UserBtn() {
  const { signOut, current } = useUser();
  const user = current;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src={"https://github.com/shadcn.png"} alt="userdp" />
          <AvatarFallback>PFP</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 rounded-2xl mr-5 bg-primary-foreground">
        <DropdownMenuLabel>{user?.name || "Saidev Dhal"}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="rounded-xl cursor-pointer">
            <IconUserCircle className="h-5 w-5 mr-2" />
            Account
          </DropdownMenuItem>
          <DropdownMenuItem className="rounded-xl cursor-pointer">
            <IconSettingsCode className="h-5 w-5 mr-2" />
            Settings
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem disabled>
            <IconCirclesRelation className="h-5 w-5 mr-2" />
            Connections
          </DropdownMenuItem>
          <DropdownMenuItem className="rounded-xl cursor-pointer">
            <IconBrandGithubCopilot className="h-5 w-5 mr-2" />
            Customize x0-GPT
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="rounded-xl cursor-pointer">
          <IconBrandGithub className="h-5 w-5 mr-2" />
          GitHub
        </DropdownMenuItem>
        <DropdownMenuItem className="rounded-xl cursor-pointer">
          <IconHeartHandshake className="h-5 w-5 mr-2" />
          Support
        </DropdownMenuItem>
        <DropdownMenuItem disabled>
          <IconApi className="h-5 w-5 mr-2" />
          API
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {/* logout btn */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="ghost" className="rounded-xl w-full">
              <IconLogout className="h-5 w-5 mr-2" />
              Log out
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                You want to log out? You can&apos;t access this page after
                logging out.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={signOut}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
