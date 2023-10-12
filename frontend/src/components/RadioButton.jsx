import styled from "styled-components";

export default function RadioButton({ value, state, setState }) {
  let isSelected = false;
  if (value.toLowerCase() === state.toLowerCase()) {
    isSelected = true;
  }

  const changeValue = () => {
    setState(value);
  };

  return (
    <CheckBoxLabel htmlFor={value}>
      <CheckBox
        type="radio"
        id={value}
        name="foo"
        value={value}
        onChange={changeValue}
        checked={isSelected}
      />
      {isSelected ? <CustomRadioSelected /> : <CustomRadio />}
      {value}
    </CheckBoxLabel>
  );
}

const CheckBox = styled.input`
  visibility: hidden;
  left: 7px;
  position: relative;
`;

const CheckBoxLabel = styled.label`
  display: flex;
  align-items: center;
  margin: 0em 0.5em 0.5em 0;
  font-family: Montserrat;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  color: var(--text-color, #5f5e5e);
  left: -10px;
  display: inline-block;
  position: relative;
`;

const CustomRadio = styled.span`
  border: 2px solid #c6d4ce;
  border-radius: 50%;
  height: 12px;
  width: 12px;
  left: -10px;
  top: 3px;
  display: inline-block;
  position: relative;
`;

const CustomRadioSelected = styled.span`
  border: 2px solid #c6d4ce;
  background: #c6d4ce;
  border-radius: 50%;
  height: 12px;
  width: 12px;
  left: -10px;
  top: 3px;
  display: inline-block;
  position: relative;
`;
