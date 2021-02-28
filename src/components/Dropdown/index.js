import { useState } from "react";
import styled from "styled-components";

const DropDownContainer = styled.div`
  min-width: 120px;
  margin: 0 auto;
  text-align: center;
  border: 1px solid #e5e5e5;
`;

const DropDownHeader = styled.div`
  padding: 5px;
  border-bottom: 1px solid #e5e5e5;
  font-weight: 500;
  font-size: 1em;
  color: #959595;
  background: #ffffff;
  @media screen and (min-width: 768px) {
    padding: 10px;
  }
`;

const DropDownOptionsContainer = styled.div`
  border-bottom: 1px solid #e5e5e5;
  padding: 10px;
  color: #959595;
`;

const DropDownCaret = styled.svg`
  height: 24px;
  width: 24px;
  fill: #959595;
`;

const options = ["Users", "Repositories"];

const Dropdown = ({ onClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const onOptionClicked = (value) => () => {
    setSelectedOption(value);
    setIsOpen(false);

    onClick(value);
  };

  return (
    <DropDownContainer>
      <DropDownHeader onClick={toggleDropdown}>
        <div
          onClick={toggleDropdown}
          style={{ display: "inline-flex", alignItems: "center" }}
        >
          <div>{selectedOption || "Users"}</div>

          <div>
            <DropDownCaret
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M14 20l10 10 10-10z" />
              <path d="M0 0h48v48h-48z" fill="none" />
            </DropDownCaret>
          </div>
        </div>
      </DropDownHeader>

      {isOpen && (
        <>
          {options.map((option) => (
            <DropDownOptionsContainer
              onClick={onOptionClicked(option)}
              key={Math.random()}
            >
              {option}
            </DropDownOptionsContainer>
          ))}
        </>
      )}
    </DropDownContainer>
  );
};

export default Dropdown;
