import { Card, Dropdown } from "flowbite-react";
import projectImg from "../../assets/commune.gif"

export function Projects() {
    return (
        <Card className=" project_dropdown w-[80%] border-[1px] dark:bg-[rgb(36,36,36)] bg-[#fff] border-none" style={{ fontFamily: 'Smack', gap: "0", border:"none" }}>
            <div className="flex justify-end pt-1 pl-0 dropdown" style={{ paddingLeft: "0" }}>
                <Dropdown inline label="" className=" pl-0" style={{ paddingLeft: "0" }}>
                    <Dropdown.Item>
                        <div
                            className="block px-4 py-2 text-sm text-black hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                            More Detail
                        </div>
                    </Dropdown.Item>
                    <Dropdown.Item>
                        <div
                            className="block px-4 py-2 text-sm text-black hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                            Edit
                        </div>
                    </Dropdown.Item>
                    <Dropdown.Item>
                        <div
                            className="block px-4 py-2 text-sm text-black hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                            Change Dev
                        </div>
                    </Dropdown.Item>
                    <Dropdown.Item>
                        <div
                            className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                            Delete
                        </div>
                    </Dropdown.Item>
                </Dropdown>
            </div>
            <div className="flex items-center justify-between px-3 gap-[20px] mt-[-20px]">
                <div className=" flex items-center justify-center gap-[40px]">
                    <img
                        alt=""
                        height="96"
                        src={projectImg}
                        width="96"
                        className="mb-3 rounded-full shadow-lg"
                    />
                    <div>
                        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">ComTensor</h5>
                        <span className="text-sm text-gray-500 dark:text-gray-400">Commune Bittensor project</span>
                    </div>
                </div>
                <div className=" flex gap-[20px]">
                    <div className=" flex gap-[20px] justify-center items-center">
                        <span className=" w-[10px] h-[10px] rounded-[50%] bg-red-600"></span>
                        <span className=" text-red-600">
                            Created
                        </span>
                    </div>
                    <div className=" flex gap-[20px] justify-center items-center">
                        <span className=" w-[10px] h-[10px] rounded-[50%] bg-blue-600"></span>
                        <span className=" text-blue-600">
                            In Progress
                        </span>
                    </div>
                    <div className=" flex gap-[20px] justify-center items-center">
                        <span className=" w-[10px] h-[10px] rounded-[50%] bg-green-600"></span>
                        <span className=" text-green-600">
                            Done
                        </span>
                    </div>
                </div>
                <div className=" text-blue-500 text-[20px] ml-[50px]">
                    <span className=" text-red-600">Potter</span> is handling
                </div>
            </div>
        </Card>
    );
}
