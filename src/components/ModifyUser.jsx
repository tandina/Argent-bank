import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFirstName, setLastName } from "../reducers/auth";

export default function UpdateProfile() {
  const dispatch = useDispatch();
  const firstName = useSelector((state) => state.login.firstName);
  const lastName = useSelector((state) => state.login.lastName);
  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleUpdateProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("Token not found");
        return;
      }

      if (newFirstName.length < 2 || newLastName.length < 2) {
        alert("First name and last name must be at least 2 characters long");
        return;
      }

      const response = await fetch(
        "http://localhost:3001/api/v1/user/profile",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            firstName: newFirstName,
            lastName: newLastName,
          }),
        }
      );

      if (response.ok) {
        dispatch(setFirstName(newFirstName));
        dispatch(setLastName(newLastName));

        setNewFirstName("");
        setNewLastName("");
        setIsEditing(false);

        console.log("Profile updated successfully");
      } else {
        console.log("Failed to update profile");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {!isEditing && (
        <button className="edit-button" onClick={toggleEdit}>
          Edit Name
        </button>
      )}
      {isEditing && (
        <div>
          <h1>Update Profile</h1>
          <div className="updateUser">
            <div className="newUser">
              <div>
                <label htmlFor="newFirstName">New First Name:</label>
                <input
                  type="text"
                  id="newFirstName"
                  value={newFirstName}
                  onChange={(e) => setNewFirstName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="newLastName">New Last Name:</label>
                <input
                  type="text"
                  id="newLastName"
                  value={newLastName}
                  onChange={(e) => setNewLastName(e.target.value)}
                />
              </div>
            </div>
            <div className="currentUser">
              <h2>Current Profile:</h2>
              <p>First Name: {firstName}</p>
              <p>Last Name: {lastName}</p>
            </div>
          </div>

          <button className="edit-button" onClick={handleUpdateProfile}>
            Update Profile
          </button>
          <button className="edit-button" onClick={toggleEdit}>
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
