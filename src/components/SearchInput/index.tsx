import "./index.scss";

interface SearchInputProps {
  handleChange: () => void;
}

function SearchInput(props: SearchInputProps): JSX.Element {
  const { handleChange } = props;
  return <input type="text" className="main" onChange={() => handleChange()} />;
}

export default SearchInput;
