import type { ReactElement } from "react"; //ReactElement must be imported with type as per ts rules

//types of the button
interface ButtonProps {
    variant: "primary" | "secondary";
    size?: "sm" | "md" | "lg";
    text: string;
    startIcon: ReactElement; //ReactElement as svg [icon].tsx will be passed as prop
    onclick?: () => void;
}

const variantStyles = {
    primary: "bg-purple-500 text-white",
    secondary: "bg-purple-300 text-purple-600",
};

const defaultStyles =
    "px-4 py-2 rounded-md font-light flex items-center gap-3 m-3";

export default function Button(props: ButtonProps) {
    return (
        <button className={`${variantStyles[props.variant]} ${defaultStyles}`}>
            {props.startIcon}
            {props.text}
        </button>
    );
}
