export function Button({children, className, variant = "default", ...props}){
    const variantClasses = {
      default: "font-semibold bg-white text-slate-900 hover:bg-slate-100",
      teal: "bg-teal-600 text-white hover:bg-cyan-800",
      outline: "bg-transparent text-white text-slate-900 border border-cyan-700/30 hover:bg-cyan-900/20"
    };
    
    return(
      <button 
        className={`w-full py-2 rounded-lg font-semibold transform hover:-translate-y-0.5 transition-all mb-1 shadow-lg hover:shadow-xl ${variantClasses[variant]} ${className || ''}`}
        {...props}
      >
        {children}
      </button>
    )
  }