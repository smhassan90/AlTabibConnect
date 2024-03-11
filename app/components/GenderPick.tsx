import React, { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { genderPicker } from "../constants";

interface GenderPickProps {
  genvalue: string;
  onGenderChange: (gender: string) => void; // Define the onGenderChange prop
}

const GenderPick: React.FC<GenderPickProps> = ({ genvalue, onGenderChange }) => {
  const [value, setValue] = useState("");
  const [items, setItems] = useState([
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ]);
  const [open, setOpen] = useState(false);

  const handleGenderChange = (gender: string) => {
    setValue(gender);
    onGenderChange(gender);
  };

  return (
      <DropDownPicker
        open={open}
        value={genvalue}
        items={items}
        setOpen={setOpen}
        setValue={handleGenderChange}
        setItems={setItems}
        placeholder="Select Gender"
        containerStyle={genderPicker.containerStyle}
        style={genderPicker.styling}
        labelStyle={genderPicker.labelStyle}
        dropDownContainerStyle={genderPicker.dropDownContainerStyle}
        closeAfterSelecting={true}
        TickIconComponent={() => (
          <MaterialCommunityIcons name="check" size={24} color="#0066a1" />
        )}
        placeholderStyle={genderPicker.placeholderStyle}
        listItemLabelStyle={genderPicker.listItemLabelStyle}
      />
  );
};

export default GenderPick;
