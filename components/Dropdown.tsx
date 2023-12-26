import { ReactNode, useState } from "react";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";

import FloatingComponent from "./Floating";

type DropdownOption = {
  label: string;
  icon: ReactNode;
  className?: string;
  onClick?: () => void;
};

type DropdownProps = {
  text: string;
  options: DropdownOption[];
};

const Dropdown: React.FC<DropdownProps> = ({ text, options }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <FloatingComponent
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      wrappedComponent={
        <button
          className="flex gap-2 items-center font-semibold"
          onClick={() => setIsOpen(!isOpen)}
        >
          {text}
          {isOpen ? <RiArrowUpSLine /> : <RiArrowDownSLine />}
        </button>
      }
    >
      <div className="bg-white p-2 border border-black12 rounded-md shadow-lg">
        <ul>
          {options.map((option, index) => (
            <li
              key={index}
              className={`cursor-pointer flex items-center gap-2 ${option.className}`}
              onClick={option.onClick}
            >
              {option.icon}
              {option.label}
            </li>
          ))}
        </ul>
      </div>
    </FloatingComponent>
  );
};

export default Dropdown;
