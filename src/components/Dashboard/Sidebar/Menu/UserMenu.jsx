import React from 'react';
import MenuItem from './MenuItem';
import { BookMarked, CirclePlus} from 'lucide-react';

const UserMenu = () => {
    return (
        <>
            <MenuItem
                address={"/dashboard/add-post"}
                icon={CirclePlus}
                label={"Add Post"}
            />
            <MenuItem
                address={"/dashboard/my-posts"}
                icon={BookMarked}
                label={"My Posts"}
            />
        </>
    );
};

export default UserMenu;