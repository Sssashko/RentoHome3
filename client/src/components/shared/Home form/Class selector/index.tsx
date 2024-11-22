import { Dispatch, SetStateAction } from 'react';
import { Class } from 'types';

const types: Class[] = ['Budget', 'Medium', 'Premium'];

interface Props {
    selectedClass: Class;
    switchClass: Dispatch<SetStateAction<Class>>;
    className?: string; 
}

const ClassSelector = ({ selectedClass, switchClass, className }: Props) => (
    <div className={`flex w-full justify-between ${className}`}> 
        {types.map((item) => (
            <div
                onClick={() => switchClass(item)}
                className={`flex h-12 w-[30%] cursor-pointer items-center justify-center rounded border-2 border-[#858585] text-lg font-semibold text-[#858585] transition duration-200 focus:outline-none ${
                    selectedClass === item ? 'bg-[#858585] text-neutral-700' : 'bg-transparent'
                }`}
                key={item}
            >
                {item[0].toUpperCase() + item.slice(1)}
            </div>
        ))}
    </div>
);

export default ClassSelector;
