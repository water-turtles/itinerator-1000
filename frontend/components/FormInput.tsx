import { useState } from 'react'

interface FormInputProps {
  labelText: string;
  placeholder: string;
  onInputChange: (value: string) => void;
}

export default function FormInput ({ labelText, onInputChange, placeholder }: FormInputProps) {
  const [input, setInput] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
    onInputChange(e.target.value)
  }

  return (
    <div className="form-control w-full max-w-xs">
      <label className="label">
        <span className="label-text">{labelText}</span>
      </label>
      <input
        type="text"
        value={input}
        placeholder={placeholder}
        className="input input-bordered w-full max-w-xs"
        onChange={handleChange}
      />
    </div>
  )
}
