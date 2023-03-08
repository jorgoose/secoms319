// Gauge react component

import React from "react";

function Gauge() {
  return (
    <>
      <div className="py-12 px-4">
        <div className="lg:max-w-[356px] md:max-w-[516px] max-w-[343px] mx-auto">
          <div className="mx-auto bg-white px-3 py-4 rounded">
            <div>
              <img
                src="https://tuk-cdn.s3.amazonaws.com/can-uploader/Group%20813077.png"
                className="mx-auto"
              />
            </div>
            <div className="lg:block hidden">
              <div className="flex justify-between items-center gap-x-4 px-8">
                <div aria-label="one">
                  <div className="flex gap-2 items-center">
                    <svg
                      width={20}
                      height={8}
                      viewBox="0 0 20 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width={20} height={8} rx={4} fill="#EF4444" />
                    </svg>
                    <p className="text-xs font-medium leading-3 text-gray-800">
                      Poor
                    </p>
                  </div>
                  <div className="flex items-center gap-2 mt-3">
                    <svg
                      width={20}
                      height={8}
                      viewBox="0 0 20 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width={20} height={8} rx={4} fill="#FACC15" />
                    </svg>
                    <p className="text-xs font-medium leading-3 text-gray-800">
                      Fair
                    </p>
                  </div>
                  <div className="flex items-center gap-2 mt-3">
                    <svg
                      width={20}
                      height={8}
                      viewBox="0 0 20 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width={20} height={8} rx={4} fill="#BEF264" />
                    </svg>
                    <p className="text-xs font-medium leading-3 text-gray-800">
                      Satisfactory
                    </p>
                  </div>
                </div>
                <div aria-label="two">
                  <div className="flex items-center gap-2">
                    <svg
                      width={20}
                      height={8}
                      viewBox="0 0 20 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width={20} height={8} rx={4} fill="#14B8A6" />
                    </svg>
                    <p className="text-xs font-medium leading-3 text-gray-800">
                      Good
                    </p>
                  </div>
                  <div className="flex items-center gap-2 mt-3">
                    <svg
                      width={20}
                      height={8}
                      viewBox="0 0 20 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width={20} height={8} rx={4} fill="#22C55E" />
                    </svg>
                    <p className="text-xs font-medium leading-3 text-gray-800">
                      Better
                    </p>
                  </div>
                  <div className="flex items-center gap-2 mt-3">
                    <svg
                      width={20}
                      height={8}
                      viewBox="0 0 20 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width={20} height={8} rx={4} fill="#15803D" />
                    </svg>
                    <p className="text-xs font-medium leading-3 text-gray-800">
                      Exceptional
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:hidden block">
              <div className="flex flex-wrap justify-between gap-3 items-center px-8">
                <div className="flex gap-2 items-center">
                  <svg
                    width={20}
                    height={8}
                    viewBox="0 0 20 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width={20} height={8} rx={4} fill="#EF4444" />
                  </svg>
                  <p className="text-xs font-medium leading-3 text-gray-800">
                    Poor
                  </p>
                </div>
                <div className="flex items-center gap-2 ">
                  <svg
                    width={20}
                    height={8}
                    viewBox="0 0 20 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width={20} height={8} rx={4} fill="#FACC15" />
                  </svg>
                  <p className="text-xs font-medium leading-3 text-gray-800">
                    Fair
                  </p>
                </div>
                <div className="flex items-center gap-2 ">
                  <svg
                    width={20}
                    height={8}
                    viewBox="0 0 20 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width={20} height={8} rx={4} fill="#BEF264" />
                  </svg>
                  <p className="text-xs font-medium leading-3 text-gray-800">
                    Satisfactory
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    width={20}
                    height={8}
                    viewBox="0 0 20 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width={20} height={8} rx={4} fill="#14B8A6" />
                  </svg>
                  <p className="text-xs font-medium leading-3 text-gray-800">
                    Good
                  </p>
                </div>
                <div className="flex items-center gap-2 ">
                  <svg
                    width={20}
                    height={8}
                    viewBox="0 0 20 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width={20} height={8} rx={4} fill="#22C55E" />
                  </svg>
                  <p className="text-xs font-medium leading-3 text-gray-800">
                    Better
                  </p>
                </div>
                <div className="flex items-center gap-2 ">
                  <svg
                    width={20}
                    height={8}
                    viewBox="0 0 20 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width={20} height={8} rx={4} fill="#15803D" />
                  </svg>
                  <p className="text-xs font-medium leading-3 text-gray-800">
                    Exceptional
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Gauge;
