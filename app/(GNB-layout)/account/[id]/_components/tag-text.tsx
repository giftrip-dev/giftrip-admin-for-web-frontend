interface TagTextProps {
  tags: string[] | null;
}
const TagText = ({ tags }: TagTextProps) => {
  return (
    <>
      {tags && tags.length > 0 ? (
        <div className="flex items-center gap-1">
          {tags.map((tag) => (
            <p key={tag} className="text-body-2">
              #{tag}
            </p>
          ))}
        </div>
      ) : (
        <p className="text-body-2">-</p>
      )}
    </>
  );
};

export default TagText;
