interface Props {
  text: string;
}

/** Renders **text** segments using the site's purple accent. */
export default function HighlightedText({ text }: Props) {
  const parts = text.split(/\*\*(.*?)\*\*/g);

  return (
    <>
      {parts.map((part, index) =>
        index % 2 === 1 ? (
          <span key={index} className="accent">{part}</span>
        ) : (
          part
        ),
      )}
    </>
  );
}
