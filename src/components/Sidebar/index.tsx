import { Box, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, useBreakpointValue } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSidebarDrawer } from "../../contexts/SidebarDrawerContent";
import { SidebarNav } from "./SidebarNav";

export function Sidebar(){

  const { isOpen, onClose } = useSidebarDrawer()

  const isDrawerSidebar = useBreakpointValue({
    base: true,
    lg: false,
  })




  if(isDrawerSidebar){
   return ( <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
           <DrawerOverlay>
             <DrawerContent bgColor="gray.800" p="4">


               
               <DrawerCloseButton  mt="6"  />
               <DrawerHeader> Navegação </DrawerHeader>

               <DrawerBody>
                 <SidebarNav/>
               </DrawerBody>

             </DrawerContent>
           </DrawerOverlay>
    </Drawer>)
  }
  return (
      <Box 
      as="aside"
      w="64"
      mr="8"
      >
           <SidebarNav/>
      </Box>
  )
}