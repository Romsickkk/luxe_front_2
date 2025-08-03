import { useEffect, useState } from "react";
import { ArtistData, useGetTableDataQuery } from "../features/artists/apiArtists";

export function useSelectData() {
  const [ownersNames, setOwnersNames] = useState<{ label: string; value: string }[]>([]);
  const { data: artists, isLoading, error } = useGetTableDataQuery();

  useEffect(() => {
    if (!isLoading && !error && artists) {
      setOwnersNames(
        artists.map((artist: ArtistData) => ({
          label: artist.name,
          value: artist.name,
          color: "#36B37E",
        }))
      );
    }
  }, [artists, isLoading, error]);

  return { ownersNames, isLoading };
}

export default useSelectData;
