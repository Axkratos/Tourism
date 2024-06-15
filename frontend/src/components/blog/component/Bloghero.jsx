import React from 'react'

const Bloghero = () => {
  return (
    <>
    <div className="bg-white">
      <div className="text-slate-700 relative flex max-w-screen-xl flex-col overflow-hidden px-4 py-4 md:mx-auto md:flex-row md:items-center">
        <h3 className="flex cursor-pointer items-center whitespace-nowrap text-2xl font-black">
          <span className="mr-2 text-4xl text-cyan-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              role="img"
              width="1em"
              height="1em"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M6.925 16.875Q5.2 16.225 4.1 14.713Q3 13.2 3 11.25q0-1.975.938-3.513Q4.875 6.2 6 5.15q1.125-1.05 2.062-1.6L9 3v2.475q0 .625.45 1.062q.45.438 1.075.438q.35 0 .65-.15q.3-.15.5-.425L12 6q.95.55 1.625 1.35t1.025 1.8l-1.675 1.675q-.05-.6-.287-1.175q-.238-.575-.638-1.05q-.35.2-.738.287q-.387.088-.787.088q-1.1 0-1.987-.612Q7.65 7.75 7.25 6.725q-.95.925-1.6 2.062Q5 9.925 5 11.25q0 .775.275 1.462q.275.688.75 1.213q.05-.5.287-.938q.238-.437.588-.787L9 10.1l2.15 2.1q.05.05.1.125t.1.125l-1.425 1.425q-.05-.075-.087-.125q-.038-.05-.088-.1L9 12.925l-.7.7q-.125.125-.212.287q-.088.163-.088.363q0 .3.175.537q.175.238.45.363ZM9 10.1Zm0 0ZM7.4 22L6 20.6L19.6 7L21 8.4L17.4 12H21v2h-5.6l-.5.5l1.5 1.5H21v2h-2.6l2.1 2.1l-1.4 1.4l-2.1-2.1V22h-2v-4.6l-1.5-1.5l-.5.5V22h-2v-3.6Z"
              />
            </svg>
          </span>
          mellow
        </h3>
        <input type="checkbox" className="peer hidden" id="navbar-open" />
        <label
          className="absolute top-5 right-7 cursor-pointer md:hidden"
          htmlFor="navbar-open"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </label>
        <div className="peer-checked:mt-8 peer-checked:max-h-56 flex max-h-0 w-full flex-col items-center justify-between overflow-hidden transition-all md:ml-24 md:max-h-full md:flex-row md:items-start">
          <ul className="flex flex-col items-center space-y-2 md:ml-auto md:flex-row md:space-y-0">
            <li className="font-bold md:mr-12">
              <a href="#">Blog</a>
            </li>
            <li className="md:mr-12">
              <a href="#">Features</a>
            </li>
            <li className="md:mr-12">
              <a href="#">Support</a>
            </li>
            <li className="md:mr-12">
              <button className="rounded-full border-2 border-cyan-500 px-6 py-1 text-cyan-600 transition-colors hover:bg-cyan-500 hover:text-white">
                Login
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div className="bg-whitea relative mx-auto mt-20 mb-10 max-w-screen-lg overflow-hidden rounded-t-lg py-32 text-center shadow-lg">
      <p className="text-white">Published April 4, 2022</p>
      <h1 className="mt-2 text-5xl font-bold text-white">
        7 rules of effective marketing
      </h1>
      <p className="mt-6 text-lg text-white">
        You're doing marketing the wrong way
      </p>
      <div className="mt-6 flex justify-center space-x-2">
        <button className="rounded-lg bg-gray-50 px-2 py-1 font-medium text-gray-900 hover:bg-gray-200">
          Marketing
        </button>
        <button className="rounded-lg bg-gray-50 px-2 py-1 font-medium text-gray-900 hover:bg-gray-200">
          Branding
        </button>
        <button className="rounded-lg bg-gray-50 px-2 py-1 font-medium text-gray-900 hover:bg-gray-200">
          Digital
        </button>
      </div>
      <img
        className="-z-10 absolute top-0 left-0 mt-10 h-full w-full object-cover"
        src="https://images.unsplash.com/photo-1504672281656-e4981d70414b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
        alt=""
      />
    </div>
  </>
  
  )
}

export default Bloghero
