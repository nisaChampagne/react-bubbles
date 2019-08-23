import React, { useState } from "react";
import AxiosWithAuth from './axiosWithAuth'

const newColor = {
    color: "",
    code: { hex: "" }
  };
  
function AddNewColor(props) {
  const [newColors, setNewColors] = useState(newColor)


  const changeHandler = e => {
    e.preventDefault();
    setNewColors({ ...newColors, [e.target.name]: e.target.value });
  };

  const AddColor = e => {
    e.preventDefault(); /*stops the page from refreshing upon clicking add btn*/
    AxiosWithAuth()
      .post("http://localhost:5000/api/colors", newColors)
      .then(res => {
        console.log("colors", res.data)
      })
      .catch(err => {
        console.log(err.response);
      });
      props.history.push('/bubblepage')
    // window.location.href = window.location.href; //helps
  };

  return (
    <div className="addContainer">
      <form className="form" onSubmit={event => AddColor(event)}>
        <h1 className='colorTitle'>Add More Colors</h1>
        <p className="form-group">
          <label className="label">
            Color:
            <input
              className="input"
              type="text"
              name="color"
              onChange={changeHandler}
              value={newColors.color}
            />
          </label>
        </p>

        <p className="form-group">
          <label className="label">
            Age:
            <input
              className="input"
              type="color"
              name="hex"
              onChange={changeHandler}
              value={newColors.hex}
            />
          </label>
        </p>

        <button className="btn" onClick={AddColor}>
          Add Color
        </button>
      </form>
    </div>
  );
}

export default AddNewColor;