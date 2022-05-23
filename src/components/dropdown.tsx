function Dropdown({onChange}: any) {
  return (
    <div className="dropdown-container">
      <select name="frameworks" id="frameworks" className="frameworks" defaultValue={""} onChange={(event) => onChange(event)}>
        <option value="" disabled hidden>Select your news</option>
        <option value="angular">Angular</option>
        <option value="react">React</option>
        <option value="vue">Vue</option>
      </select>
    </div>
  )
}

export default Dropdown