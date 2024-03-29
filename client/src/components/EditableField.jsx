
export default function EditableField({ label, value, onChange, isDisabled }) {
    return (
      <div className="flex w-1/4 justify-between my-3 font-bold">
        <label>{label}:</label>
        <input className="border border-gray-400 px-2" type="text" value={value} onChange={onChange} disabled={isDisabled} />
      </div>
    );
  }
  