import React from 'react'

export default function NewPostComponent(prop) {
  const {placeholder} = prop;
  return (
    <div className="card-header bg-transparent">
        <form className="form-inline">
            <div className="input-group w-100">
                <input type="text" name="message" id="message" placeholder = {placeholder} className = "form-control form-control-md"/>
                <div className="input-group-append">
                    <div className="input-group-text">
                            <i className="fas fa-forward"></i>
                        </div>
                </div>
            </div> 
        </form>
    </div>
  )
}
