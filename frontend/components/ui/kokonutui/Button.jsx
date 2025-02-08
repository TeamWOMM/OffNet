const Button = ({ children, variant = "default", className, ...props }) => {
    let buttonClass = "px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-700"
    if (variant === "ghost") {
      buttonClass = "px-4 py-2 rounded border border-blue-500 text-blue-500 hover:bg-blue-100"
    }
    buttonClass += ` ${className}`
  
    return (
      <button className={buttonClass} {...props}>
        {children}
      </button>
    )
  }
  
  export default Button
  
  