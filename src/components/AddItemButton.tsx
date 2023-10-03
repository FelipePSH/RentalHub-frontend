import React, { ReactNode } from 'react';
import Link from 'next/link';

interface AddItemButtonProps {
  icon: ReactNode;
  text: string;
  link: string;
}

const AddItemButton: React.FC<AddItemButtonProps> = ({ icon, text, link }) => {
  return (
    <Link href={link} className="border border-violet-700 border-dashed rounded-lg p-4 flex flex-col items-center justify-center">
        {icon}
        <span className="text-violet-800">{text}</span>
    </Link>
  );
};

export default AddItemButton;
