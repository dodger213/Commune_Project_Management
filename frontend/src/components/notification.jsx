import { Alert } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { Flip } from "react-reveal";

function Icon({ type }) {
  return (
    type === 'success' ? <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-6 w-6"
    >
      <path
        fillRule="evenodd"
        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
        clipRule="evenodd"
      />
    </svg> :
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
  );
}

export function Alerts({ message, type }) {
  const [show, setShow] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setShow(false)
    }, 3000);
  }, [])
  return (
    show && <Flip right>
      <div className='fixed z-[199] mt-[100px] right-[50px]'>
        <Alert
          icon={<Icon type={type} />}
          className={`rounded-none border-l-4 border-[${type === 'success' ? '#2ec946' : '#2ec946'}] bg-[#2ec946]/10 font-medium text-[#2ec946]`}
        >
          {message}
        </Alert>
      </div>
    </Flip>
  );
}
