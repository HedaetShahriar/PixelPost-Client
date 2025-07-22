import React from 'react';
import MenuItem from './MenuItem';
import { Megaphone, MessageSquareWarning, UserRoundPen } from 'lucide-react';

const AdminMenu = () => {
    return (
        <>
            <MenuItem
                address={"/dashboard/manage-users"}
                icon={UserRoundPen}
                label={"Manage Users"}
            />
            <MenuItem
                address={"/dashboard/reported-comments"}
                icon={MessageSquareWarning}
                label={"Reported Comments"}
            />
            <MenuItem
                address={"/dashboard/make-announcement"}
                icon={Megaphone}
                label={"Make Announcement"}
            />

        </>
    );
};

export default AdminMenu;