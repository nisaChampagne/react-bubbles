import React, { useState } from "react";
import axiosWithAuth from './axiosWithAuth'
import AddNewColor from './AddColor'


const initialColor = {
  color: "",
  code: { hex: "" }
};


const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  
  const data ={
    ...colorToEdit
  }

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    console.log(colorToEdit.id)
    e.preventDefault();
    axiosWithAuth()
    .put(`http://localhost:5000/api/colors/${colorToEdit.id}`, data)
    .then(res =>{
      console.log('guud', res)
      .push('/bubblepage')
    })
    .catch(err => console.log(err.response))
    window.location.href = window.location.href  
  }

  const deleteColor = color => {
    axiosWithAuth()
    .delete(`http://localhost:5000/api/colors/${colorToEdit.id}`)
    .then(res =>{
      console.log('guud', res)
      .push('/bubblepage')
    })
    .catch(err => console.log(err.response))
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={() => deleteColor(color)}>
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit"onClick={e => saveEdit(e, colors)}>save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
            <button onClick={e => deleteColor(e, colors)}>delete</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      <AddNewColor />
    </div>
  );
};

export default ColorList;
