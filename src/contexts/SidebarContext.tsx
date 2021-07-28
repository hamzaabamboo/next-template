import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";
import { SideBar } from "~/components/common/SideBar";

interface ISidebarContext {
  isOpen: boolean;
  setOpen?: Dispatch<SetStateAction<boolean>>;
}
export const SidebarContext = createContext<ISidebarContext>({ isOpen: false });
export const SideBarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isOpen, setOpen] = useState(true);
  return (
    <SidebarContext.Provider value={{ isOpen, setOpen }}>
      {children}
      <SideBar
        isOpen={isOpen}
        onClose={() => setOpen(false)}
        onOpen={() => {
          console.log("fuck you");
          setOpen(true);
        }}
      />
    </SidebarContext.Provider>
  );
};
