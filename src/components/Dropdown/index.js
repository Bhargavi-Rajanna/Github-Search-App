import { useState } from "react";
import styled from "styled-components";

const DropDownContainer = styled.div`
  position: relative;
  min-width: 120px;
  text-align: center;
  border: 1px solid #d8d0d0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  user-select: none;
  @media screen and (max-width: 768px) {
    padding: 5px;
  }
`;

const DropDownHeader = styled.div`
  font-weight: 500;
  font-size: 1em;
  color: #959595;
  background: #ffffff;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DropDownOptionsContainer = styled.ul`
  position: absolute;
  top: 39px;
  left: -1px;
  width: 100%;
  display: none;
  padding: 0;
  margin: 0;
  list-style: none;
  border-left: 1px solid #d8d0d0;
  border-right: 1px solid #d8d0d0;

  @media screen and (min-width: 768px) {
    top: 49px;
  }

  ${({ isOpen }) =>
    isOpen &&
    `
    display:block;
  `}
`;

const DropDownOption = styled.li`
  padding: 10px;
  border-bottom: 1px solid #e5e5e5;
  color: #959595;
  cursor: pointer;
  background-color: #ffffff;

  @media screen and (min-width: 768px) {
    padding: 15px;
  }
`;

const DropDownCaret = styled.svg`
  height: 24px;
  width: 24px;
  fill: #959595;

  ${({ isOpen }) =>
    isOpen &&
    `
    transform: rotate(180deg);
  `}
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
        <div>{selectedOption || "Users"}</div>
        <DropDownCaret
          isOpen={isOpen}
          viewBox="0 0 48 48"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M14 20l10 10 10-10z" />
          <path d="M0 0h48v48h-48z" fill="none" />
        </DropDownCaret>
      </DropDownHeader>

      {isOpen && (
        <DropDownOptionsContainer isOpen={isOpen}>
          {options.map((option) => (
            <DropDownOption
              onClick={onOptionClicked(option)}
              key={Math.random()}
            >
              {option}
            </DropDownOption>
          ))}
        </DropDownOptionsContainer>
      )}
    </DropDownContainer>
  );
};

export default Dropdown;
