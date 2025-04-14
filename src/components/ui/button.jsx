export function Button({children, className, ...props}){
  return(
      <button 
          className={`w-full py-2 bg-white text-slate-900 rounded-lg font-semibold hover:bg-slate-100 transform hover:-translate-y-0.5 transition-all mb-1 shadow-lg hover:shadow-xl ${className || ''}`}
          {...props}
      >
          {children}
      </button>
  )
}
export default Button;