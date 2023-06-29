export default function Input({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="Filter by title"
      value={value}
      onChange={onChange}
      className="shadow-lg rounded-lg p-3 focus:border focus:border-indigo-500"
    />
  );
}
