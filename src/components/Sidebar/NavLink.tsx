import { Icon , Text, Link as ChakraLink , LinkProps as ChakraLinkProps} from "@chakra-ui/react";
import Link from "next/link";
import { ElementType } from "react";
import { RiDashboardLine } from "react-icons/ri";
import { ActiveLink } from "../ActiveLink";



interface NavLinkProps extends ChakraLinkProps {
  icon: ElementType;
  children: string;
  href: string;

}

export function NavLink({ icon, children ,  href ,...rest} : NavLinkProps){
  return (
    <ActiveLink href={href}>
    <ChakraLink
    display="flex"
    align="center"
    // color="pink.400"
    {...rest}
    
    >
        <Icon 
        as={icon}
        fontSize="20"
        />
        <Text
        ml="4"
        fontWeight="medium"
        > 
         {children}
        </Text>
    </ChakraLink>
    </ActiveLink>
  )
}