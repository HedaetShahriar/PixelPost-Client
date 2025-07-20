import React from 'react';
import MenuItem from './MenuItem';
import { CircleUserRound, Megaphone, MessageSquareWarning, UserRoundPen } from 'lucide-react';

const AdminMenu = () => {
    return (
        <>
            <MenuItem
                address={"/dashboard/admin-profile"}
                icon={CircleUserRound}
                label={"Admin Profile"}
            />
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