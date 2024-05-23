const TagButton = ({ text }: { text: string }) => {
  return (
    <div
      className="bg-gray-light mb-3 mr-3 inline-flex items-center justify-center rounded-sm px-2 py-1 text-sm text-black duration-300 hover:bg-primary hover:text-white dark:bg-[#2C303B] dark:text-white dark:hover:bg-primary"
    >
      {text}
    </div>
  );
};

export default TagButton;
