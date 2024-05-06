import {
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    Chip,

} from "@material-tailwind/react";

import { useNavigate } from "react-router-dom";

const MenuItem = ({ setActiveKey, active, title, Icon }) => {
    const navigate = useNavigate();
    return (
        <ListItem
            onClick={() => {
                setActiveKey(title);
                navigate(title.toLowerCase().replace(/ /g, '-'));
            }}
            className={`hover:bg-blue-100 dark:hover:bg-gray-700 ${active === title ? 'bg-blue-100 ' : ''} `}>
            <ListItemPrefix>
                <div className={active === title ? "text-[rgb(25,118,210)]" : 'text-[rgb(134,146,157)]'}>
                    {Icon}
                </div>
            </ListItemPrefix>
            <span className={`ml-[20px] ${active === title ? 'text-[rgb(25,118,210)]' : 'text-[rgb(134,146,157)]'} `}>{title}</span>
            <ListItemSuffix>
                {/* <Chip value="14" size="sm" variant="ghost" color="blue-gray" className="rounded-full text-[rgb(25,118,210)]" /> */}
            </ListItemSuffix>
        </ListItem>
    )
}

export default MenuItem;