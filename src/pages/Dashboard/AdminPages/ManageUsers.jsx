import { useState } from 'react';
import { Trash2, Search, ShieldCheck } from 'lucide-react';
// import Modal from '../../../components/ui/Modal';
// import { set } from 'react-hook-form';
import Swal from 'sweetalert2';

const fakeUsers = [
    { id: '1', name: 'Alice Johnson', email: 'alice@example.com', role: 'user', membership: 'bronze' },
    { id: '2', name: 'Bob Smith', email: 'bob@example.com', role: 'consultant', membership: 'gold' },
    { id: '3', name: 'Charlie Lee', email: 'charlie@example.com', role: 'admin', membership: 'gold' },
    { id: '4', name: 'Diana Ross', email: 'diana@example.com', role: 'user', membership: 'bronze' },
    { id: '5', name: 'Ethan Davis', email: 'ethan@example.com', role: 'consultant', membership: 'gold' },
    { id: '6', name: 'Fiona Green', email: 'fiona@example.com', role: 'user', membership: 'bronze' },
];

const ManageUsers = () => {
    const [users, setUsers] = useState(fakeUsers);
    const [search, setSearch] = useState('');
    // const [modalContent, setModalContent] = useState(null);
    // console.log(modalContent);

    // const handleDelete = (id) => {
    //     Swal.fire({
    //         title: 'Are you sure?',
    //         text: "You won't be able to revert this!",
    //         icon: 'warning',
    //         showCancelButton: true,
    //         confirmButtonColor: '#d33',
    //         cancelButtonColor: '#3085d6',
    //         confirmButtonText: 'Yes, delete it!'
    //     }).then((result) => {
    //         if (result.isConfirmed) {
    //             setUsers(prev => prev.filter(user => user.id !== id));
    //             Swal.fire('Deleted!', 'User has been deleted.', 'success');
    //         }
    //     });
    // };

    const handleMakeAdmin = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "This user will be made an admin.",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#aaa',
            confirmButtonText: 'Yes, make admin!'
        }).then((result) => {
            if (result.isConfirmed) {
            setUsers(prev =>
                prev.map(user =>
                user.id === id ? { ...user, role: 'admin' } : user
                )
            );
            Swal.fire('Success!', 'User has been made an admin.', 'success');
            }
        });
    };
    // Function to remove admin role
    const handleRemoveAdmin = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "This user will be removed as admin.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, remove admin!'
        }).then((result) => {
            if (result.isConfirmed) {
            setUsers(prev =>
                prev.map(user =>
                user.id === id ? { ...user, role: 'user' } : user
                )
            );
            Swal.fire('Removed!', 'Admin role has been removed.', 'success');
            }
        });
    };

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-semibold">Manage Users</h2>
                <div className="relative">
                    <Search className="absolute top-2.5 left-2 h-4 w-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by name or email"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-8 pr-3 py-1.5 text-sm border w-full rounded-md focus:outline-none"
                    />
                </div>
            </div>

            <div className="overflow-x-auto border border-gray-400 rounded-md bg-base-200 shadow-sm">
                <table className="min-w-full text-sm">
                    <thead className="bg-base-300 font-medium">
                        <tr>
                            <th className="p-3 text-left">Name</th>
                            <th className="p-3 text-left">Email</th>
                            {/* <th className="p-3 text-center">Role</th> */}
                            <th className="p-3 text-center">Membership</th>
                            <th className="p-3 text-center">Action</th>
                            {/* <th className="p-3 text-center">Delete</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.length ? (
                            filteredUsers.map((user) => (
                                <tr key={user.id} className="border-t hover:bg-base-100 border-gray-400 transition">
                                    <td className="p-3">{user.name}</td>
                                    <td className="p-3">{user.email}</td>
                                    {/* <td className="p-3 text-center capitalize">{user.role}</td> */}
                                    <td className="p-3 text-center">
                                        <span
                                            className={`px-2 py-0.5 rounded text-xs font-medium ${user.membership === 'gold'
                                                ? 'bg-yellow-100 text-yellow-700'
                                                : 'bg-orange-100 text-orange-600'
                                                }`}
                                        >
                                            {user.membership}
                                        </span>
                                    </td>
                                    <td className="p-3 text-center">
                                        {user.role !== 'admin' ? (
                                            <button
                                                // onClick={() => setModalContent({ userId: user.id, userName: user.name, action: 'makeAdmin' })}
                                                onClick={() => handleMakeAdmin(user.id)}
                                                className="text-blue-600 px-2 py-1 border bg-blue-50 rounded-full text-sm cursor-pointer"
                                            >
                                                Make Admin
                                            </button>
                                        ) : (
                                            <button
                                                className=" text-green-600 items-center px-2 py-1 border bg-green-50 rounded-full text-sm cursor-pointer gap-1"
                                                // onClick={() => setModalContent({ userId: user.id, userName: user.name, action: 'removeAdmin' })}
                                                onClick={() => handleRemoveAdmin(user.id)}
                                            >
                                                {/* <ShieldCheck className="w-4 h-4 text-green-600" title="Already Admin" /> */}
                                                Remove Admin
                                            </button>
                                        )}
                                    </td>
                                    {/* <td className="p-3 text-center">
                                        <button
                                            onClick={() => handleDelete(user.id)}
                                            className="text-red-500 hover:text-red-600 cursor-pointer"
                                        >
                                            <Trash2 className="w-4 h-4 mx-auto" />
                                        </button>
                                    </td> */}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="p-4 text-center">
                                    No users found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>


            {/* Modal for making/removing admin */}
            {/* <Modal
                open={modalContent?.action === 'makeAdmin'}
                onClose={() => setModalContent(null)}
            >
                <div className="p-6 text-center">
                    <p className="text-lg font-medium text-gray-700 mb-4">
                        Are you sure you want to make <span className="text-indigo-600 font-semibold">{modalContent?.userName}</span> an <span className="text-indigo-600 font-semibold">Admin</span>?
                    </p>
                    <div className="mt-6 flex justify-center gap-4">
                        <button
                            onClick={() => setModalContent(null)}
                            className="px-4 py-2 rounded-md text-sm font-medium bg-gray-200 hover:bg-gray-300 text-gray-800"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => {
                                handleMakeAdmin(modalContent?.userId);
                                setModalContent(null);
                            }}
                            className="px-4 py-2 rounded-md text-sm font-medium bg-indigo-600 hover:bg-indigo-700 text-white"
                        >
                            Confirm
                        </button>
                    </div>
                </div>
            </Modal>
            <Modal
                open={modalContent?.action === 'removeAdmin'}
                onClose={() => setModalContent(null)}
            >
                <div className="p-6 text-center">
                    <p className="text-lg font-medium text-gray-700 mb-4">
                        Are you sure you want to remove <span className="text-indigo-600 font-semibold">{modalContent?.userName}</span> as an <span className="text-indigo-600 font-semibold">Admin</span>?
                    </p>
                    <div className="mt-6 flex justify-center gap-4">
                        <button
                            onClick={() => setModalContent(null)}
                            className="px-4 py-2 rounded-md text-sm font-medium bg-gray-200 hover:bg-gray-300 text-gray-800"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => {
                                handleRemoveAdmin(modalContent?.userId);
                                setModalContent(null);
                            }}
                            className="px-4 py-2 rounded-md text-sm font-medium bg-indigo-600 hover:bg-indigo-700 text-white"
                        >
                            Confirm
                        </button>
                    </div>
                </div>
            </Modal> */}

        </div>
    );
};

export default ManageUsers;
