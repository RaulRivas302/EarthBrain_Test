import React, { useState } from "react";
import { FC } from "react";
import { MaterialData } from "../type";
import axios from "axios";
import { getName } from "../utils/getfn";
interface Props {
  materials: MaterialData[];
  setMaterials: React.Dispatch<React.SetStateAction<MaterialData[]>>;
}
const Material: FC<Props> = ({ materials, setMaterials }) => {
  console.log("material", materials);
  const [selectedMaterial, setSelectedMaterial] = useState<string | null>(null);
  const [formData, setFormData] = useState<MaterialData>({
    id: "",
    name: "",
    volume: 0,
    date: "",
    color: "",
    cost: 0,
  });
  const [editing, setEditing] = useState(false);

  //Submit Data

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/materials",
        formData
      );
      console.log("response", response.data);
      setFormData({
        id: "",
        name: "",
        volume: 0,
        date: "",
        color: "",
        cost: 0,
      });
      getName(setMaterials);
    } catch (error) {
      console.error(error);
    }
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  //select material from list function

  const handleSelect = (material: MaterialData) => {
    setSelectedMaterial(material.id);
    setFormData(material);
    setEditing(true);
  };

  // delete function

  const handleDelete = async () => {
    console.log(selectedMaterial);

    try {
      const response = await axios.delete(
        `http://localhost:3000/materials/${selectedMaterial}`
      );
      const updatedMaterials = materials.filter(
        (material) => material.id !== selectedMaterial
      );
      setMaterials(updatedMaterials);
      setSelectedMaterial(null);
      getName(setMaterials);
      if (!response.data.success) {
        throw new Error("Failed to delete material");
      }
      setEditing(false);
      // Update the list of materials after deleting the materia
    } catch (error) {
      console.error(error);
    }
  };

  // edit data function
  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/materials/${selectedMaterial}`,
        formData
      );
      if (!response.data.success) {
        throw new Error("Failed to update material");
      }
      const updatedMaterials = materials.map((material) => {
        if (material.id === selectedMaterial) {
          return formData;
        }
        return material;
      });
      setMaterials(updatedMaterials);
      setSelectedMaterial(null);
      setFormData({
        id: "",
        name: "",
        volume: 0,
        date: "",
        color: "",
        cost: 0,
      });
      setEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  //Total cast calculated
  const totalCost = materials.reduce(
    (total, material) => total + material.cost,
    0
  );

  return (
    <>
      <div className="material-container ">
        <div className="material-header">
          <h1>Materials</h1>
          <div className="material-button">
            <button className="add-button" type="button" onClick={handleSubmit}>
              <img
                src=".././src/assets/add_FILL0_wght400_GRAD0_opsz48.svg"
                alt="add"
              />
              Add
            </button>
            <button className="delete-button" onClick={handleDelete}>
              <img src=".././src/assets/delete_FILL0_wght400_GRAD0_opsz48.svg" />
              Delete
            </button>
          </div>
        </div>
        <div className="Material-body-content">
          <div className="material-content-list">
            {materials.map((material) => {
              return (
                <div
                  className={`material-list ${
                    selectedMaterial === material.id ? "selected" : ""
                  }`}
                  onClick={() => handleSelect(material)}
                >
                  <div
                    className="material-color"
                    style={{
                      backgroundColor: material.color
                        ? material.color
                        : "white",
                    }}
                  ></div>
                  <div className="material-name-volume">
                    <h3>{material.name}</h3>
                    {/* <h3>{material.id}</h3> */}
                    <p>
                      {material.volume}m<sup>3</sup>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="material-content-form">
            {editing ? (
              <form className="editable--material-form" id="MyForm" onSubmit={handleUpdate}>
                <div className="editable-form-fields">
                <div className="material-form">
                  <div className="form-field">
                    <label>Name</label>
                    <br />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-field">
                    <label>Volume (m<sup>3</sup>)</label>
                    <br />
                    <input
                      type="number"
                      id="volume"
                      name="volume"
                      value={formData.volume}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-field">
                    <label>Date</label>
                    <br />
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="material-form">
                  <div className="form-field">
                    <label>Color</label>
                    <br />
                    <div className="material-color-picker">
                    <input
                      type="color"
                      id="color"
                      className="color-picker"
                      name="color"
                      style={{backgroundColor:formData.color?formData.color:'#555763'
                      }}
                      value={formData.color}
                      onChange={handleInputChange}
                    />
                      <input
                      type="text"
                      id="color"
                      name="color"
                      className="color-picker-text"
                      value={formData.color}
                      onChange={handleInputChange}
                    />
                    </div>
                  </div>
                  <div className="form-field">
                    <label>Cost (USD per m<sup>3</sup>)</label>
                    <br />
                    <input
                      type="number"
                      id="cost"
                      name="cost"
                      value={formData.cost}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                </div>
                <div className="editable-form-button">
                  <button type="submit" className="update-button">Update</button>
                  <button type="button" className="cancel-button" onClick={() => setEditing(false)}>
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <form id="MyForm" onSubmit={() => console.log(formData)}>
                <div className="material-form">
                  <div className="form-field">
                    <label>Name</label>
                    <br />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-field">
                    <label>Volume (m<sup>3</sup>)</label>
                    <br />
                    <input
                      type="number"
                      id="volume"
                      name="volume"
                      value={formData.volume}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-field">
                    <label>Date</label>
                    <br />
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="material-form">
                  <div className="form-field">
                    <label>Color</label>
                    <br />
                    <div className="material-color-picker">
                    <input
                      type="color"
                      id="color"
                      className="color-picker"
                      name="color"
                      style={{backgroundColor:formData.color?formData.color:'#555763'
                      }}
                      value={formData.color}
                      onChange={handleInputChange}
                    />
                      <input
                      type="text"
                      id="color"
                      name="color"
                      className="color-picker-text"
                      value={formData.color}
                      onChange={handleInputChange}
                    />
                    </div>

                  </div>
                  <div className="form-field">
                    <label>Cost (USD per m<sup>3</sup>)</label>
                    <br />
                    <input
                      type="number"
                      id="cost"
                      name="cost"
                      value={formData.cost}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
        <div className="material-footer-content">
          <h1>Total cost:</h1>
          <p>${totalCost}</p>
        </div>
      </div>
    </>
  );
};
export default React.memo(Material);
