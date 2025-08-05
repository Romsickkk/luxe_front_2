import { useEffect, useState } from "react";
import { ArtistData, useGetTableDataQuery } from "../features/artists/apiArtists";

export function useSelectData() {
  const [ownersData, setOwnersData] = useState<{ id: number; label: string; value: string }[]>([]);
  const { data: artists, isLoading, error } = useGetTableDataQuery();

  useEffect(() => {
    if (!isLoading && !error && artists) {
      setOwnersData(
        artists.map((artist: ArtistData) => ({
          id: artist.id,
          label: artist.name,
          value: artist.name,
          color: "#36B37E",
        }))
      );
    }
  }, [artists, isLoading, error]);

  return { ownersData, isLoading };
}

export default useSelectData;
