export const Icons: Record<string, any> = {
  iyk: (props: any) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || "28"}
      height={props.size || "28"}
      viewBox="0 0 28 28"
      fill="none"
      {...props}
    >
      <g clipPath="url(#clip0_397_4887)">
        <circle cx="14" cy="14" r="14" fill="#222222" />
        <path
          d="M18.0489 11.3494L14.5586 13.2311V9.33334H13.4417V13.2311L9.9515 11.3494L9.39307 12.1559L12.8833 14.172L9.39307 16.1881L9.9515 16.9945L13.4417 15.1128V19.0107H14.5586V15.1128L18.0489 16.9945L18.6073 16.1881L15.1171 14.172L18.6073 12.1559L18.0489 11.3494Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_397_4887">
          <rect width="28" height="28" fill="white" />
        </clipPath>
      </defs>
    </svg>
  ),
  x: (props: any) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || "5"}
      height={props.size || "6"}
      viewBox="0 0 5 6"
      fill="none"
      {...props}
    >
      <path
        d="M3.1 3L5 1.1L4.4 0.5L2.5 2.4L0.6 0.5L0 1.1L1.9 3L0 4.9L0.6 5.5L2.5 3.6L4.4 5.5L5 4.9L3.1 3Z"
        fill="#818181"
      />
    </svg>
  ),
  cursive: (props: any) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || 28}
      height={props.size || 28}
      viewBox="0 0 65 64"
      fill="none"
      {...props}
    >
      <path
        d="M64.5 32C64.5 49.6731 50.1731 64 32.5 64C14.8269 64 0.5 49.6731 0.5 32C0.5 14.3269 14.8269 0 32.5 0C50.1731 0 64.5 14.3269 64.5 32Z"
        fill="#1D1E23"
      />
      <path
        d="M49.8166 40.613C49.3405 40.3875 48.7718 40.586 48.4846 41.0275C44.8759 46.6198 40.18 50.8472 33.8301 49.0622C27.9583 47.4101 24.3516 42.3634 23.3164 36.5243C23.3164 36.5243 20.8817 21.0352 31.6672 16.3354C32.7198 17.0178 34.5434 19.0535 35.5573 20.746C36.3824 22.1205 36.9973 23.601 37.541 25.1065C37.7241 25.6173 37.8995 26.1301 38.073 26.6429C38.3892 27.5855 38.7014 28.5398 39.1949 29.4034C40.953 32.4781 45.1226 32.7923 47.6807 30.5137C48.1781 30.0704 48.606 29.5325 48.9299 28.9002C51.4051 24.0771 49.0957 18.5369 43.9333 15.6569C41.8918 14.4867 39.5651 13.8294 37.2287 13.627C35.3279 13.4631 33.487 13.5981 31.7424 13.9952C30.6301 13.1296 29.9381 12.6419 29.9381 12.6419C24.9492 9.15084 20.8817 10.159 20.8817 10.159C20.34 10.2766 19.8118 10.4578 19.3067 10.6853C18.8865 10.8761 18.4798 11.0998 18.0923 11.3504C16.5598 12.3373 14.9675 14.0935 14.659 15.9075C14.5742 16.4048 14.4624 17.5518 14.8017 19.0304C15.2933 21.172 18.0749 21.7523 19.3935 19.9923C20.0296 19.1422 20.0875 17.9836 19.5246 17.0834C19.407 16.8945 19.301 16.7152 19.2161 16.559C18.6918 15.5952 18.58 14.2419 19.2258 13.307C19.5689 12.8116 20.099 12.4665 20.66 12.2487C22.5492 11.5123 24.8239 12.1292 26.5684 12.9773C26.9983 13.1875 27.4224 13.4149 27.8369 13.6559C27.8369 13.6559 28.2533 13.866 29.46 14.6872C23.0446 17.1181 18.368 23.2598 17.7067 30.9031C16.8586 40.7075 23.2104 51.1846 33.2094 52.0501C40.5732 52.6882 46.6205 48.3971 50.2735 42.0588C50.5684 41.5441 50.368 40.8771 49.8166 40.6149V40.613ZM44.9646 20.5186C45.4253 21.6135 45.6239 22.8048 45.6798 23.9923C45.7357 25.1913 45.6296 26.4482 45.1226 27.5508C44.6157 28.6477 43.5149 29.6578 42.2118 29.1913C41.5564 28.9561 41.0475 28.4183 40.7005 27.8149C40.3535 27.2116 40.1492 26.5388 39.9352 25.8776C38.6667 21.9701 36.8335 18.3248 33.7048 15.5836C37.6798 14.5561 43.3087 16.5764 44.9665 20.5205L44.9646 20.5186Z"
        fill="white"
      />
    </svg>
  ),
  burgher: (...props: any) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        d="M1.5 2.5H14.5"
        stroke="#B1B1B1"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
      <path
        d="M1.5 8H14.5"
        stroke="#B1B1B1"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
      <path
        d="M1.5 13.5H14.5"
        stroke="#B1B1B1"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
    </svg>
  ),
  close: (...props: any) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
    >
      <g clipPath="url(#clip0_682_871)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.29289 7.99979L3.44793 11.8448L3.09438 12.1983L3.80148 12.9054L4.15504 12.5519L8 8.7069L11.845 12.5519L12.1985 12.9054L12.9056 12.1983L12.5521 11.8448L8.70711 7.99979L12.5517 4.15524L12.9052 3.80168L12.1981 3.09458L11.8446 3.44813L8 7.29268L4.15545 3.44813L3.80189 3.09458L3.09479 3.80168L3.44834 4.15524L7.29289 7.99979Z"
          fill="#B1B1B1"
        />
      </g>
      <defs>
        <clipPath id="clip0_682_871">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  ),
  social: (...props: any) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="17"
      height="16"
      viewBox="0 0 17 16"
      fill="none"
    >
      <path
        d="M5.5 4.33325C5.5 5.98725 6.846 7.33325 8.5 7.33325C10.154 7.33325 11.5 5.98725 11.5 4.33325C11.5 2.67925 10.154 1.33325 8.5 1.33325C6.846 1.33325 5.5 2.67925 5.5 4.33325ZM13.8333 13.9999H14.5V13.3333C14.5 10.7606 12.406 8.66659 9.83333 8.66659H7.16667C4.59333 8.66659 2.5 10.7606 2.5 13.3333V13.9999H13.8333Z"
        fill="#808080"
      />
    </svg>
  ),
  quest: (props: any) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || "12"}
      height={props.size || "12"}
      viewBox="0 0 12 12"
      fill="none"
      {...props}
    >
      <g>
        <path
          d="M9.75 4.5C9.60082 4.5 9.45774 4.44074 9.35225 4.33525C9.24676 4.22976 9.1875 4.08668 9.1875 3.9375C9.1875 3.63913 9.06897 3.35298 8.858 3.142C8.64702 2.93103 8.36087 2.8125 8.0625 2.8125C7.91332 2.8125 7.77024 2.75324 7.66475 2.64775C7.55926 2.54226 7.5 2.39918 7.5 2.25C7.5 2.10082 7.55926 1.95774 7.66475 1.85225C7.77024 1.74676 7.91332 1.6875 8.0625 1.6875C8.36087 1.6875 8.64702 1.56897 8.858 1.358C9.06897 1.14702 9.1875 0.860869 9.1875 0.5625C9.1875 0.413316 9.24676 0.270242 9.35225 0.164752C9.45774 0.0592632 9.60082 0 9.75 0C9.89918 0 10.0423 0.0592632 10.1477 0.164752C10.2532 0.270242 10.3125 0.413316 10.3125 0.5625C10.3125 0.860869 10.431 1.14702 10.642 1.358C10.853 1.56897 11.1391 1.6875 11.4375 1.6875C11.5867 1.6875 11.7298 1.74676 11.8352 1.85225C11.9407 1.95774 12 2.10082 12 2.25C12 2.39918 11.9407 2.54226 11.8352 2.64775C11.7298 2.75324 11.5867 2.8125 11.4375 2.8125C11.1391 2.8125 10.853 2.93103 10.642 3.142C10.431 3.35298 10.3125 3.63913 10.3125 3.9375C10.3125 4.08668 10.2532 4.22976 10.1477 4.33525C10.0423 4.44074 9.89918 4.5 9.75 4.5Z"
          fill="currentColor"
        />
        <path
          d="M4.5 12C4.30109 12 4.11032 11.921 3.96967 11.7803C3.82902 11.6397 3.75 11.4489 3.75 11.25C3.75 10.4544 3.43393 9.69129 2.87132 9.12868C2.30871 8.56607 1.54565 8.25 0.75 8.25C0.551088 8.25 0.360322 8.17098 0.21967 8.03033C0.0790176 7.88968 0 7.69891 0 7.5C0 7.30109 0.0790176 7.11032 0.21967 6.96967C0.360322 6.82902 0.551088 6.75 0.75 6.75C1.54565 6.75 2.30871 6.43393 2.87132 5.87132C3.43393 5.30871 3.75 4.54565 3.75 3.75C3.75 3.55109 3.82902 3.36032 3.96967 3.21967C4.11032 3.07902 4.30109 3 4.5 3C4.69891 3 4.88968 3.07902 5.03033 3.21967C5.17098 3.36032 5.25 3.55109 5.25 3.75C5.25 4.54565 5.56607 5.30871 6.12868 5.87132C6.69129 6.43393 7.45435 6.75 8.25 6.75C8.44891 6.75 8.63968 6.82902 8.78033 6.96967C8.92098 7.11032 9 7.30109 9 7.5C9 7.69891 8.92098 7.88968 8.78033 8.03033C8.63968 8.17098 8.44891 8.25 8.25 8.25C7.45435 8.25 6.69129 8.56607 6.12868 9.12868C5.56607 9.69129 5.25 10.4544 5.25 11.25C5.25 11.4489 5.17098 11.6397 5.03033 11.7803C4.88968 11.921 4.69891 12 4.5 12Z"
          fill="currentColor"
        />
      </g>
    </svg>
  ),
  arrowRight: (props: any) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.707 8.00009L6.99991 11.7071L6.29282 10.9999L9.29282 8.00006L6.29282 4.99994L6.99994 4.29285L10.707 8.00009Z"
        fill="#B1B1B1"
      />
    </svg>
  ),
  arrowLeft: (...props: any) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.29297 7.99991L9.00009 4.29294L9.70718 5.00006L6.70718 7.99994L9.70718 11.0001L9.00006 11.7072L5.29297 7.99991Z"
        fill="#B1B1B1"
      />
    </svg>
  ),
  pin: (...props: any) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      {...props}
    >
      <path
        d="M13.5 10.5H12.9194L11.5962 3H12C12.1326 3 12.2598 2.94732 12.3536 2.85355C12.4473 2.75979 12.5 2.63261 12.5 2.5C12.5 2.36739 12.4473 2.24021 12.3536 2.14645C12.2598 2.05268 12.1326 2 12 2H4C3.86739 2 3.74021 2.05268 3.64645 2.14645C3.55268 2.24021 3.5 2.36739 3.5 2.5C3.5 2.63261 3.55268 2.75979 3.64645 2.85355C3.74021 2.94732 3.86739 3 4 3H4.40375L3.08063 10.5H2.5C2.36739 10.5 2.24021 10.5527 2.14645 10.6464C2.05268 10.7402 2 10.8674 2 11C2 11.1326 2.05268 11.2598 2.14645 11.3536C2.24021 11.4473 2.36739 11.5 2.5 11.5H7.5V15C7.5 15.1326 7.55268 15.2598 7.64645 15.3536C7.74021 15.4473 7.86739 15.5 8 15.5C8.13261 15.5 8.25979 15.4473 8.35355 15.3536C8.44732 15.2598 8.5 15.1326 8.5 15V11.5H13.5C13.6326 11.5 13.7598 11.4473 13.8536 11.3536C13.9473 11.2598 14 11.1326 14 11C14 10.8674 13.9473 10.7402 13.8536 10.6464C13.7598 10.5527 13.6326 10.5 13.5 10.5ZM5.41937 3H10.5806L11.9038 10.5H4.09625L5.41937 3Z"
        fill="#B1B1B1"
      />
    </svg>
  ),
  unpin: (props: any) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      {...props}
    >
      <path
        d="M5.20312 2.50004C5.20312 2.36743 5.2558 2.24026 5.34957 2.14649C5.44334 2.05272 5.57052 2.00004 5.70312 2.00004H12C12.1326 2.00004 12.2598 2.05272 12.3536 2.14649C12.4473 2.24026 12.5 2.36743 12.5 2.50004C12.5 2.63265 12.4473 2.75983 12.3536 2.8536C12.2598 2.94736 12.1326 3.00004 12 3.00004H11.5962L12.7681 9.64379C12.791 9.77423 12.7612 9.90842 12.6853 10.0169C12.6094 10.1254 12.4935 10.1994 12.3631 10.2225C12.3343 10.228 12.305 10.2307 12.2756 10.2307C12.1582 10.2305 12.0445 10.1891 11.9546 10.1135C11.8646 10.038 11.8042 9.93321 11.7837 9.81754L10.5806 3.00004H5.70563C5.63975 3.00037 5.57447 2.98768 5.51352 2.9627C5.45256 2.93772 5.39715 2.90094 5.35045 2.85448C5.30376 2.80802 5.26671 2.75279 5.24142 2.69196C5.21614 2.63114 5.20312 2.56591 5.20312 2.50004ZM13.3363 13.87C13.2381 13.9592 13.1086 14.0058 12.9761 13.9994C12.8437 13.9931 12.7192 13.9344 12.63 13.8363L10.5063 11.5H8.5V15C8.5 15.1327 8.44732 15.2598 8.35355 15.3536C8.25979 15.4474 8.13261 15.5 8 15.5C7.86739 15.5 7.74021 15.4474 7.64645 15.3536C7.55268 15.2598 7.5 15.1327 7.5 15V11.5H2.5C2.36739 11.5 2.24021 11.4474 2.14645 11.3536C2.05268 11.2598 2 11.1327 2 11C2 10.8674 2.05268 10.7403 2.14645 10.6465C2.24021 10.5527 2.36739 10.5 2.5 10.5H3.08063L4.14 4.50004L2.63 2.83629C2.58492 2.78786 2.54989 2.73097 2.52696 2.6689C2.50403 2.60684 2.49364 2.54084 2.4964 2.47473C2.49917 2.40863 2.51502 2.34372 2.54305 2.28379C2.57108 2.22385 2.61073 2.17008 2.65969 2.12558C2.70866 2.08108 2.76597 2.04674 2.82831 2.02455C2.89064 2.00237 2.95676 1.99277 3.02283 1.99633C3.0889 1.99988 3.15361 2.01651 3.2132 2.04526C3.27279 2.07401 3.32609 2.1143 3.37 2.16379L13.37 13.1638C13.4592 13.2619 13.5057 13.3915 13.4994 13.5239C13.493 13.6564 13.4344 13.7809 13.3363 13.87ZM9.59688 10.5L4.99 5.43254L4.09625 10.5H9.59688Z"
        fill="#B1B1B1"
      />
    </svg>
  ),
  checkedCircle: (props: any) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15ZM6.70319 11L12 5.72928L11.2671 5L6.72772 9.51703L4.75661 7.42206L4 8.12694L6.70319 11Z"
        fill="white"
      />
    </svg>
  ),
  candy: (...props: any) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
    >
      <path
        d="M18 36C27.9411 36 36 27.9411 36 18C36 8.05887 27.9411 0 18 0C8.05887 0 0 8.05887 0 18C0 27.9411 8.05887 36 18 36Z"
        fill="#8C00A3"
        fillOpacity="0.2"
      />
    </svg>
  ),
  zoom: (props: any) => (
    <svg
      fill="none"
      height="28"
      viewBox="0 0 28 28"
      width="28"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <clipPath id="a">
        <path d="m6 6h16v16h-16z" />
      </clipPath>
      <rect fill="#1b1b1b" fillOpacity=".8" height="28" rx="4" width="28" />
      <g
        clipPath="url(#a)"
        stroke="#eee"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m17.5 10.5h-7v7h7z" />
        <path d="m6.40601 11.531v-3.5c0-.39783.15803-.77936.43934-1.06066.2813-.28131.66283-.43934 1.06066-.43934h2.99999" />
        <path d="m16.406 6.531h3.5c.3978 0 .7794.15803 1.0607.43934.2813.2813.4393.66283.4393 1.06066v3.5" />
        <path d="m21.406 16.531v3.5c0 .3978-.158.7794-.4393 1.0607s-.6629.4393-1.0607.4393h-3.5" />
        <path d="m11.406 21.531h-3.49999c-.39783 0-.77936-.158-1.06066-.4393-.28131-.2813-.43934-.6629-.43934-1.0607v-3.5" />
      </g>
    </svg>
  ),
  person: (props: any) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || 12}
      height={props.size || 12}
      viewBox="0 0 12 12"
      fill="none"
    >
      <path
        d="M3.75 3.25C3.75 4.4905 4.7595 5.5 6 5.5C7.2405 5.5 8.25 4.4905 8.25 3.25C8.25 2.0095 7.2405 1 6 1C4.7595 1 3.75 2.0095 3.75 3.25ZM10 10.5H10.5V10C10.5 8.0705 8.9295 6.5 7 6.5H5C3.07 6.5 1.5 8.0705 1.5 10V10.5H10Z"
        fill="#CDE3C9"
      />
    </svg>
  ),
  twitter: (props: any) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="17"
      height="16"
      viewBox="0 0 17 16"
      fill="none"
    >
      <path
        d="M12.6627 1.5H14.868L10.05 7.00667L15.718 14.5H11.28L7.80402 9.95533L3.82669 14.5H1.62002L6.77336 8.61L1.33602 1.5H5.88669L9.02869 5.654L12.6627 1.5ZM11.8887 13.18H13.1107L5.22269 2.75067H3.91136L11.8887 13.18Z"
        fill="#B1B1B1"
      />
    </svg>
  ),
  location: (props: any) => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.1739 18C12.1739 18 16.3478 12.4791 16.3478 10.1739C16.3478 7.86872 14.4791 6 12.1739 6C9.86872 6 8 7.86872 8 10.1739C8 12.4791 12.1739 18 12.1739 18ZM12.1739 12.2609C13.3265 12.2609 14.2609 11.3265 14.2609 10.1739C14.2609 9.02132 13.3265 8.08696 12.1739 8.08696C11.0213 8.08696 10.087 9.02132 10.087 10.1739C10.087 11.3265 11.0213 12.2609 12.1739 12.2609Z"
        fill="#CDE3C9"
      />
    </svg>
  ),
  home: (props: any) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="16"
      viewBox="0 0 15 16"
      fill="currentColor"
      {...props}
    >
      <path
        d="M8.14 0.23225C7.769 -0.0777499 7.231 -0.0777499 6.86 0.23225L0.86 5.23225C0.632 5.42225 0.5 5.70325 0.5 6.00025V15.0002C0.5 15.5522 0.948 16.0002 1.5 16.0002H5.5V12.0002C5.5 11.4482 5.948 11.0002 6.5 11.0002H8.5C9.052 11.0002 9.5 11.4482 9.5 12.0002V16.0002H13.5C14.052 16.0002 14.5 15.5522 14.5 15.0002V6.00025C14.5 5.70325 14.368 5.42225 14.14 5.23225L8.14 0.23225Z"
        fill="currentColor"
      />
    </svg>
  ),
  store: (props: any) => (
    <svg
      fill="none"
      height="16"
      viewBox="0 0 33 16"
      width="33"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="m0 0h31.9116v13.8703h-31.9116z"
        fill="currentColor"
        transform="matrix(.9984581 -.05551062 .05551062 .9984581 0 1.77142)"
      />
      <g fill="#202020">
        <path d="m29.4047 9.8367.0444.7988-4.3033.2392-.3997-7.18888.8587-.04774.3552 6.39012z" />
        <path d="m20.1887 3.9392c2.1467-.11935 3.544 1.41545 3.6545 3.40238s-1.1082 3.66712-3.2548 3.78652l-2.3364.1299-.3997-7.18891zm.3053 6.3929c1.7074-.0949 2.5566-1.39406 2.4705-2.94167-.086-1.54761-1.074-2.74461-2.7813-2.64969l-1.4278.07938.3108 5.59138z" />
        <path d="m15.5999 4.19431.8586-.04774.3997 7.18893-.8587.0477z" />
        <path d="m14.2999 4.2666.2532 4.55297c.096 1.72733-.9363 2.79633-2.5338 2.88513s-2.74192-.8592-2.83795-2.58648l-.25313-4.55297.85868-.04774.2498 4.49306c.0755 1.35793.8388 1.93643 1.9371 1.87533 1.0983-.061 1.7927-.7206 1.7173-2.0785l-.2498-4.49306z" />
        <path d="m5.74377 4.74229c1.02841-.05718 2.0086.63948 2.07021 1.74777.05718 1.02842-.72326 1.58259-.80147 1.61699l.00111.01997c.19304.04936 1.14048.51748 1.20543 1.68568s-.89742 2.053-1.99573 2.114l-2.64591.1471-.39968-7.18885zm-.06653.7849-1.59753.08882.12656 2.27648 1.59753-.08882c.76882-.04274 1.15098-.55474 1.1149-1.20374s-.55252-1.11104-1.24146-1.07274zm.21867 3.03254-1.64745.09159.14433 2.59598 1.64745-.0916c.89861-.0499 1.31517-.664 1.27576-1.37292-.03942-.7089-.52147-1.27301-1.42009-1.22305z" />
      </g>
    </svg>
  ),
  loading: (props: any) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || "24"}
      height={props.size || "24"}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path
        opacity="0.14"
        d="M12 4C12.8284 4 13.5 3.32843 13.5 2.5C13.5 1.67157 12.8284 1 12 1C11.1716 1 10.5 1.67157 10.5 2.5C10.5 3.32843 11.1716 4 12 4Z"
        fill="white"
      />
      <path
        opacity="0.29"
        d="M16.75 5.27002C17.5784 5.27002 18.25 4.59845 18.25 3.77002C18.25 2.94159 17.5784 2.27002 16.75 2.27002C15.9216 2.27002 15.25 2.94159 15.25 3.77002C15.25 4.59845 15.9216 5.27002 16.75 5.27002Z"
        fill="white"
      />
      <path
        opacity="0.43"
        d="M20.23 8.75C21.0584 8.75 21.73 8.07843 21.73 7.25C21.73 6.42157 21.0584 5.75 20.23 5.75C19.4016 5.75 18.73 6.42157 18.73 7.25C18.73 8.07843 19.4016 8.75 20.23 8.75Z"
        fill="white"
      />
      <path
        opacity="0.57"
        d="M21.5 13.5C22.3284 13.5 23 12.8284 23 12C23 11.1716 22.3284 10.5 21.5 10.5C20.6716 10.5 20 11.1716 20 12C20 12.8284 20.6716 13.5 21.5 13.5Z"
        fill="white"
      />
      <path
        opacity="0.71"
        d="M20.23 18.25C21.0584 18.25 21.73 17.5784 21.73 16.75C21.73 15.9216 21.0584 15.25 20.23 15.25C19.4016 15.25 18.73 15.9216 18.73 16.75C18.73 17.5784 19.4016 18.25 20.23 18.25Z"
        fill="white"
      />
      <path
        opacity="0.86"
        d="M16.75 21.73C17.5784 21.73 18.25 21.0584 18.25 20.23C18.25 19.4016 17.5784 18.73 16.75 18.73C15.9216 18.73 15.25 19.4016 15.25 20.23C15.25 21.0584 15.9216 21.73 16.75 21.73Z"
        fill="white"
      />
      <path
        d="M12 23C12.8284 23 13.5 22.3284 13.5 21.5C13.5 20.6716 12.8284 20 12 20C11.1716 20 10.5 20.6716 10.5 21.5C10.5 22.3284 11.1716 23 12 23Z"
        fill="white"
      />
    </svg>
  ),
  externalLink: (props: any) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || "16"}
      height={props.size || "16"}
      viewBox="0 0 16 16"
      fill="none"
      {...props}
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M6.68967 4.92148L6.18967 4.92148V5.92148L6.68967 5.92148L9.71411 5.92148L4.65903 10.6342L4.29331 10.9752L4.97521 11.7066L5.34093 11.3656L10.4323 6.61908V9.66412V10.1641H11.4323V9.66412V5.42148L11.4323 4.92148L10.9323 4.92148L6.68967 4.92148Z"
        fill="#818181"
      />
    </svg>
  ),
};
