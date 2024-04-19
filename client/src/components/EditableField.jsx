
//this component used for reuse the inputs and labels in the editUserByAdmin (because all the inputs and labels are the same but the diffrent is the name of the label and data we entered )
export default function EditableField({ label, value, onChange, isDisabled }) {
    return (
      <div className="flex w-1/4 justify-between my-3 font-bold">
        <label>{label}:</label>
        <input className="border border-gray-400 px-2" type="text" value={value} onChange={onChange} disabled={isDisabled} />
      </div>
    );
  }
  