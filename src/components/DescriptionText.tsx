import HighlightedText from "./HighlightedText";

interface Props {
  text: string;
}

/**
 * Renders description text as separate paragraphs, splitting on blank lines.
 * Authoring newlines in constants.ts then show up as real spacing instead of
 * collapsing into one block.
 */
export default function DescriptionText({ text }: Props) {
  const paragraphs = text
    .replace(/\r\n?/g, "\n")
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return (
    <>
      {paragraphs.map((paragraph, index) => (
        <p key={index}>
          <HighlightedText text={paragraph} />
        </p>
      ))}
    </>
  );
}
