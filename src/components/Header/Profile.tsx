import { Avatar, Box, Flex , Text} from "@chakra-ui/react";

interface ProfileProps {
  showProfileData?: boolean;
}

export function Profile({showProfileData = true}: ProfileProps){
  return (
    <Flex
    align="center"
    >
      { showProfileData === true && (<Box
      mr="4"
      textAlign="right"
      >
         <Text>
           Cristiano Azevedo 
         </Text>

         <Text 
         color="gray.300"
         fontSize="small"
         >
           cristiccorrea@gmail.com
         </Text>
      </Box>)}

      <Avatar 
      size="md"
      name="Cristiano Azevedo"
      src="https://avatars.githubusercontent.com/u/65018066?v=4"
      />

    </Flex>

  )
}