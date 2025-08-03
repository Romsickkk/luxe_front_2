import styled from "styled-components";

const ArtistLink = styled.a`
  font-size: 1.1em;
  font-weight: bold;
`;

const UnlinkedArtist = styled.p`
  font-weight: lighter;
`;

function AGLink({ value }: { value: string }) {
  function extractUsername(url: string): string {
    if (!url) return "No data";

    const match = url.match(/(?:https?:\/\/)?(?:www\.)?[^/]+\/([^/?]+)/);

    return match ? match[1] : url;
  }

  function isValidUrl(text: string): boolean {
    try {
      new URL(text);
      return true;
    } catch {
      return false;
    }
  }

  return isValidUrl(value) ? (
    <ArtistLink href={`${value}`} target="_blank" rel="noopener noreferrer">
      {extractUsername(value)}
    </ArtistLink>
  ) : (
    <UnlinkedArtist>{extractUsername(value)}</UnlinkedArtist>
  );
}

export default AGLink;
