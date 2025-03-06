import TextInput from "@/components/atoms/textInput";
import React, { useEffect, useState } from "react";

interface SearchInputProps {
  text?: string;
  onChange?: (search: string) => void;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
}

const defaultProps = {
  text: "",
  onChange: () => {},
  onSubmit: () => {}
};

const SearchInput = (props: SearchInputProps) => {
  const { text, onChange, onSubmit } = { ...defaultProps, ...props };

  const [search, setSearch] = useState("");

  useEffect(() => {
    setSearch(text);
  }, [text]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    onChange(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        type="text"
        size="medium"
        name="keyword"
        value={search}
        icon="search"
        placeholder="이름, 학교"
        maxLength={200}
        onChange={handleSearch}
      ></TextInput>
    </form>
  );
};

export default SearchInput;
