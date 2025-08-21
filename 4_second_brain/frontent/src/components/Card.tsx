import type { ReactElement } from "react";
import ShareIcon from "../icons/Share";

interface CardProps {
    title: string;
    link?: string;
    type?: "twitter" | "Youtube";
    icon?: ReactElement;
}

export default function Card(props: CardProps) {
    return (
        <div>
            <div className="p-4 bg-white rounded-md border-gray-200 max-w-72  border min-h-48 min-w-72">
                <div className="flex justify-between">
                    <div className="flex items-center text-md">
                        <div className="text-gray-500 pr-2">
                            <ShareIcon />
                        </div>
                        {props.title}
                    </div>
                    <div className="flex items-center">
                        <div className="pr-2 text-gray-500">
                            <a href={props.link} target="_blank">
                                <ShareIcon />
                            </a>
                        </div>
                        <div className="text-gray-500">
                            <ShareIcon />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
