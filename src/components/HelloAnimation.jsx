const helloTextClass =
  "hello-text [font-family:'Brush_Script_MT','Segoe_Script','Apple_Chancery','Lucida_Handwriting',cursive] text-[168px] font-normal tracking-normal"

function HelloAnimation() {
  return (
    <div className="flex w-full items-center justify-center overflow-visible">
      <svg
        className="hello-animation w-[min(92vw,760px)] overflow-visible"
        viewBox="0 0 640 190"
        role="img"
        aria-label="Hello"
      >
        <defs>
          <clipPath id="hello-reveal-clip">
            <rect
              className="hello-reveal-rect"
              x="-80"
              y="-60"
              width="800"
              height="380"
            />
          </clipPath>
        </defs>

        <g className="hello-drop-in" clipPath="url(#hello-reveal-clip)">
          <text
            className={`${helloTextClass} hello-shadow-text fill-none stroke-[#C5E0F3] [stroke-width:24px]`}
            x="50%"
            y="42%"
            textAnchor="middle"
          >
            Hello
          </text>
          <text
            className={`${helloTextClass} hello-outline-text fill-none stroke-[#7EC6F2] [stroke-width:17px]`}
            x="50%"
            y="42%"
            textAnchor="middle"
          >
            Hello
          </text>
          <text
            className={`${helloTextClass} hello-fill-text fill-[#D9EFFF] stroke-[#D9EFFF] [stroke-width:1px]`}
            x="50%"
            y="42%"
            textAnchor="middle"
          >
            Hello
          </text>
        </g>
      </svg>
    </div>
  )
}

export default HelloAnimation
