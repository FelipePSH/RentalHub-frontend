import React, { ReactNode, MouseEvent } from 'react';
import Link from 'next/link';

interface AddItemButtonProps {
  icon: ReactNode;
  text: string;
  link: string;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
}

const AddItemButton: React.FC<AddItemButtonProps> = ({ icon, text, link, onClick }) => {
  return (
    <Link href={link}  className="border border-blaze-orange-400 border-dashed rounded-lg p-4 flex flex-col items-center justify-center"
    onClick={onClick}>
        {icon}
        <span className="text-blaze-orange-400">{text}</span>
    </Link>
  );
};

export default AddItemButton;
