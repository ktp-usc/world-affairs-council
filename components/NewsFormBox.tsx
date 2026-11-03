// this component is originally for the bottom of the homepage where users can sign up for the newsletter
type NewsFormBoxProps = {
  placeholder: string,
  width: string
};

export default function NewsFormBox({ placeholder, width }: NewsFormBoxProps) {
  return (
    <input
      aria-label={placeholder}
      style={{width}}
      className="border border-white px-4 py-3 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
      placeholder={placeholder}
      type="text"
    />
  );
}