// import { useState, useEffect } from "react";
// import { useIsHaveArtistQuery } from "../artists/apiArtists";

// function useUniqueId() {
//   const [newId, setNewId] = useState<number>();
//   const [isChecking, setIsChecking] = useState<boolean>(false);
//   const [generatedId, setGeneratedId] = useState<number>();

//   const { data: artistData, isLoading, isError } = useIsHaveArtistQuery(0);

//   const generateUniqueId = () => {
//     const id = Date.now();
//     setGeneratedId(id);
//   };

//   useEffect(() => {
//     if (generatedId) {
//       setIsChecking(true);
//       if (artistData === 0) {
//         setNewId(generatedId);
//         setIsChecking(false);
//       } else {
//         generateUniqueId();
//       }
//     } else {
//       generateUniqueId();
//     }
//   }, [artistData, generatedId]);

//   return { newId, isLoading: isLoading || isChecking, isError };
// }

// export default useUniqueId;
